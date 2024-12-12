"use server";

import { StripeCustomerResponse } from "./get-stripe-customer";

async function storeStripeCustomer(
  clerkId: string,
  customerId: string
): Promise<StripeCustomerResponse | undefined> {
  try {
    // Ensure the backend URL is defined
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (!backendUrl) {
      throw new Error("Backend URL is not defined in environment variables.");
    }

    // Prepare payload and request options
    const payload = { clerkId, customerId };
    const response = await fetch(`${backendUrl}/users/stripe-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    // Handle HTTP errors
    if (!response.ok) {
      const errorDetails = await response.json();
      throw new Error(
        `Failed to store Stripe customer: ${response.status} ${
          response.statusText
        } - ${JSON.stringify(errorDetails)}`
      );
    }

    // Parse and return the response data
    const data = await response.json();
    return data as StripeCustomerResponse;
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error in storeStripeCustomer:", error);
    throw error;
  }
}

export default storeStripeCustomer;
