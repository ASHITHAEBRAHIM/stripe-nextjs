import Stripe from "stripe";
import { NextResponse, NextRequest } from "next/server";
import { paymentTable } from "@/db/schema";
import { generateIdFromEntropySize } from "lucia";
import { db } from "@/db";
import { constants } from "@/lib/constants";

const stripe = new Stripe(process.env.NEXT_PUBLIC_API_SECRET_KEY!);

async function registerPayment(
  userId: string,
  productId: string,
  userEmail: string,
  amount: number,
  paymentDetails: string,
  paymentType: string,
  createdDate: string,
  currency?: string
) {
  const paymentId = generateIdFromEntropySize(10);
  try {
    await db.insert(paymentTable).values({
      id: paymentId,
      userId,
      productId,
      userEmail,
      amount,
      paymentDetails,
      paymentType,
      createdDate,
      currency,
    });
    console.log("Payment saved successfully");
  } catch (error) {
    console.error("Error inserting payment into database:", error);
    throw new Error("Failed to insert payment into database");
  }
}

export async function POST(req: NextRequest) {
  const payload = await req.text();
  const sig = req.headers.get("Stripe-Signature");

  try {
    const event = stripe.webhooks.constructEvent(
      payload,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    console.log("Event:", event?.type);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      console.log("Session:", session);

      const userId = session.client_reference_id;
      console.log("User ID:", userId);

      if (!userId) {
        console.error("User ID not found in webhook event");
        return NextResponse.json({ status: "Failed", error: "User ID not found in webhook event" });
      }
      

      const amount = session.amount_total ? session.amount_total/ 100 : 0;
      const userEmail = session.customer_details?.email || "unknown@example.com";
      const paymentDetails = JSON.stringify(session);
      const paymentType = "card"; 
      const createdDate = new Date(session.created * 1000).toLocaleDateString();
      const currency = session.currency || undefined;

      const metadata = session.metadata || {};
      const productId = metadata.productId;
      console.log("Product ID:", productId);

      if (!productId) {
        console.error("Product ID not found in metadata");
        return NextResponse.json({ status: "Failed", error: "Product ID not found in metadata" });
      }

      await registerPayment(
        userId,
        productId,
        userEmail,
        amount,
        paymentDetails,
        paymentType,
        createdDate,
        currency
      );

      return NextResponse.json({ status: "Success", event: event.type });
    }

    return NextResponse.json({ status: "Success", event: event.type });
  } catch (error) {
    console.error("Error processing webhook event:", error);
    return NextResponse.json({ status: "Failed", error: error || "Unknown error" });
  }
}
