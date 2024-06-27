import { loadStripe, Stripe } from "@stripe/stripe-js";

let stripePromise: Promise<Stripe | null> | null = null;

const getStripe = (): Promise<Stripe | null> => {
    if (!stripePromise) {
        stripePromise = loadStripe(process.env.NEXT_PUBLIC_API_KEY as string);
    }
    return stripePromise;
};

export async function checkout({ lineItems }: { lineItems: { price: string, quantity: number }[] }) {
    const stripe = await getStripe();

    if (stripe) {
        const { error } = await stripe.redirectToCheckout({
            mode: 'payment',
            lineItems,
            successUrl: `${window.location.origin}?session_id={CHECKOUT_SESSION_ID}`,
            cancelUrl: window.location.origin
        });

        if (error) {
            console.error("Error redirecting to checkout:", error);
            // Optionally, handle the error in your UI
        }
    } else {
        console.error("Stripe failed to initialize");
        // Optionally, handle the failure in your UI
    }
}
