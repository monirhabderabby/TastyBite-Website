import { stripe } from "@/lib/stripe";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

interface CheckoutPayload {
  cartFoods: CartFood[];
  deliveryLocation: string;
  totalPrice: number;
}

interface CartFood {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  quantity: number;
  sizes?: { size: string; price: number }[];
  extras?: { name: string; extra_price: number }[];
}

interface StripeCustomerResponse {
  success: boolean;
  data?: { customerId: string };
}

// async function checkBookingStatus(
//   userId: string,
//   packageId: string
// ): Promise<boolean> {
//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/booking/already-book`,
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ clerkId: userId, packageId }),
//       }
//     );

//     const bookingStatus = await res.json();
//     return !bookingStatus.success;
//   } catch (error) {
//     console.error("Error checking booking status:", (error as Error).message);
//     throw new Error("Failed to check booking status.");
//   }
// }

async function getStripeCustomer(
  userId: string
): Promise<StripeCustomerResponse | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/users/stripe-user/${userId}`
    );

    return (await res.json()) as StripeCustomerResponse;
  } catch (error) {
    console.error("Error fetching Stripe customer:", (error as Error).message);
    return null;
  }
}

const createLineItems = (cartFoods: CartFood[]) => {
  return cartFoods.map((food) => ({
    price_data: {
      currency: "USD",
      product_data: {
        name: food.name,
        images: [food.images[0]], // Use the first image
        description: food.description,
      },
      unit_amount:
        (food.price +
          (food.sizes?.[0]?.price || 0) +
          (food.extras?.[0]?.extra_price || 0)) *
        100, // Convert to cents
    },
    quantity: food.quantity,
  }));
};

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const user = await currentUser();
    const { cartFoods, deliveryLocation, totalPrice }: CheckoutPayload =
      await req.json();

    if (!user || !user.id || !cartFoods || cartFoods.length === 0) {
      return new NextResponse("Invalid request data", { status: 400 });
    }

    const stripeCustomerResponse = await getStripeCustomer(user.id);
    let stripeCustomerId = stripeCustomerResponse?.data?.customerId;

    if (!stripeCustomerId) {
      const stripeCustomer = await stripe.customers.create({
        email: user.emailAddresses[0]?.emailAddress,
      });
      stripeCustomerId = stripeCustomer.id;
    }

    const lineItems = createLineItems(cartFoods);

    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/order-success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/order-cancelled`,
      metadata: {
        clerkId: user.id,
        deliveryLocation,
        cartFoods: JSON.stringify(cartFoods), // Store food details as metadata
        totalPrice,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("[CHECKOUT_ERROR]", (error as Error).message);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
