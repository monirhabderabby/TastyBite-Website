import { scheduleTourReminderEmail } from "@/lib/scheduleReminderEmail";
import { sendPaymentSuccessEmail } from "@/lib/sendPaymentSuccessEmail";
import { stripe } from "@/lib/stripe";
import { convertToISO } from "@/lib/utils";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

interface StripeEvent {
  type: string;
  data: {
    object: {
      metadata?: {
        clerkId: string;
        packageId: string;
        packagePrice: string;
        packageName: string;
        customerEmail: string;
      };
      payment_intent?: string;
    };
  };
}

export async function POST(req: Request): Promise<NextResponse> {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature");

  let event: StripeEvent;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature || "",
      process.env.STRIPE_WEBHOOK_SECRET!
    ) as StripeEvent;
  } catch (error) {
    return new NextResponse(`Webhook Error: ${(error as Error).message}`, {
      status: 400,
    });
  }

  const session = event.data.object;
  const metadata = session.metadata || {};
  const transactionId = session.payment_intent;

  if (event.type === "checkout.session.completed") {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/booking`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            clerkId: metadata.clerkId,
            packageId: metadata.packageId,
            amount: Number(metadata.packagePrice),
            paymentStatus: "Paid",
            transactionId: transactionId,
          }),
        }
      );

      const bookingData = await res.json();

      if (!res.ok) {
        console.error("Failed to create booking on stripe webhook", bookingData);
      }

      if (metadata.customerEmail) {
        const emailResponse = await sendPaymentSuccessEmail({
          to: metadata.customerEmail,
          packageName: metadata.packageName,
          price: metadata.packagePrice,
          transactionId: transactionId!,
        });

        if (emailResponse) {
          console.log("Email Sent Successfully!");
        }
      }

      await scheduleEmailForTourReminder({
        packageId: metadata.packageId,
        customerName: bookingData?.data?.name,
        customerEmail: metadata.customerEmail,
      });
    } catch (error) {
      console.error("An error occurred while creating a booking:", (error as Error).message);
    }
  }

  return NextResponse.json({ success: true });
}

const scheduleEmailForTourReminder = async ({
  packageId,
  customerName,
  customerEmail,
}: {
  packageId: string;
  customerName: string;
  customerEmail: string;
}): Promise<void> => {
  try {
    const packageRes = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/package/${packageId}`
    ).then((res) => res.json());

    const {
      guideName,
      guideContact,
      pickUpLocation,
      pickUpTime,
      name,
      startDate,
    } = packageRes?.data || {};

    const scheduledAt = convertToISO(startDate);

    if (scheduledAt) {
      await scheduleTourReminderEmail({
        customerName,
        guideNumber: guideContact,
        packageName: name,
        pickupLocation: pickUpLocation,
        pickupTime: pickUpTime,
        to: customerEmail,
        scheduledAt,
      });
    }
  } catch (error) {
    console.error((error as Error).message);
  }
};
