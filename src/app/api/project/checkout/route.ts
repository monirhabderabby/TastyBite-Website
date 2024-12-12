// Packages
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Local imports
import { stripe } from "@/lib/stripe";
import getStripeCustomer from "./lib/get-stripe-customer";
import storeStripeCustomer from "./lib/store-stripe-customer";

interface CheckoutPayload {
  cartFoods: CartFood[];
  deliveryLocation: string;
  totalPrice: number;
}

interface CartFood {
  _id: string;
  name: string;
  price: number;
  quantity: number;
}

const createLineItems = (cartFoods: CartFood[]) => {
  return cartFoods.map((food) => {
    return {
      price_data: {
        currency: "USD",
        product_data: {
          name: food.name,
        },
        unit_amount: food.price * 100, // Convert price to cents
      },
      quantity: food.quantity,
    };
  });
};

export async function POST(req: Request): Promise<NextResponse> {
  try {
    // getting logged in user information
    const user = await currentUser();

    // body
    const { cartFoods, deliveryLocation, totalPrice }: CheckoutPayload =
      await req.json();

    // validating request body
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
      await storeStripeCustomer(user.id, stripeCustomerId);
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
