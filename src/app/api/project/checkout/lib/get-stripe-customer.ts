"use server";

export interface StripeCustomerResponse {
  success: boolean;
  data?: { customerId: string };
}

async function getStripeCustomer(
  userId: string
): Promise<StripeCustomerResponse | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/stripe-user/${userId}`
    );

    // Handle HTTP errors
    if (!res.ok) {
      const errorDetails = await res.json();
      throw new Error(
        `Failed to store Stripe customer: ${res.status} ${
          res.statusText
        } - ${JSON.stringify(errorDetails)}`
      );
    }

    const data = await res.json();

    return data as StripeCustomerResponse;
  } catch (error) {
    console.error("Error fetching Stripe customer:", (error as Error).message);
    return null;
  }
}

export default getStripeCustomer;
