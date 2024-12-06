/* eslint-disable @typescript-eslint/no-explicit-any */
import { pusherServer } from "@/lib/pusher";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

interface StripeEvent {
  type: string;
  data: {
    object: {
      metadata?: {
        clerkId: string;
        deliveryLocation: string;
        cartFoods: string; // JSON stringified cartFoods
        totalPrice: string;
      };
      payment_intent?: string;
    };
  };
}

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature");

  let event: StripeEvent;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature!,
      process.env.STRIPE_WEBHOOK_SECRET!
    ) as StripeEvent;
  } catch (error) {
    return new NextResponse(
      `Webhook Error:${process.env.STRIPE_WEBHOOK_SECRET}    ${
        (error as Error).message
      }`,
      {
        status: 400,
      }
    );
  }

  const session = event.data.object;
  const metadata = session?.metadata;

  if (!metadata) {
    return new NextResponse("Metadata is missing in the event.", {
      status: 400,
    });
  }

  // Format the payload for validation server
  const formattedPayload = {
    clerkId: metadata.clerkId,
    foods: JSON.parse(metadata.cartFoods || "[]").map((item: any) => ({
      foodId: item._id,
      quantity: item.quantity,
    })),
    paymentStatus: "Paid", // Set based on successful payment
    orderStatus: "Order Placed", // Initial status for new orders
    deliveryLocation: metadata.deliveryLocation,
    totalPrice: parseFloat(metadata.totalPrice),
    transactionId: session.payment_intent || null,
  };

  if (event.type === "checkout.session.completed") {
    // Send Payment Recieved Notification using Pusher Start

    const notificationPayload = {
      user: formattedPayload.clerkId,
      name: "Payment received",
      description: `Payment received successfully. Transaction ID: ${formattedPayload.transactionId}.`,
      icon: "💸",
      color: "#00C9A7",
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/notification`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(notificationPayload),
        }
      );

      // Check if the response is not OK (e.g., status codes 4xx or 5xx)
      if (!res.ok) {
        // Extract error message if available or throw a generic error
        const errorText = await res.text();
        throw new Error(
          `Failed to send notification. Status: ${res.status}, Message: ${errorText}`
        );
      }

      const notificationRes = await res.json();

      try {
        await pusherServer.trigger(
          metadata.clerkId,
          "notification:new",
          notificationRes?.data
        );
      } catch (error) {
        console.log("Failed to send notification:", error);
      }
    } catch (error) {
      console.error(
        "An error occurred while sending the notification from /api/webhook:",
        error
      );
    }

    // Send Payment Recieved Notification using Pusher End

    // Send the formatted payload to the validation server
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedPayload),
      });

      const orderResponse = await res.json();

      if (!res.ok) {
        console.error("Failed to create order on webhook", orderResponse);
        return new NextResponse("Failed to create order.", { status: 500 });
      }

      return NextResponse.json({ success: true, order: orderResponse });
    } catch (error) {
      console.error("Error while processing order:", (error as Error).message);
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  }

  return Response.json({ success: true });
}
