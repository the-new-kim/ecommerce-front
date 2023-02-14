import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, Stripe, StripeElementsOptions } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import CheckoutForm from "./forms/CheckoutForm";
import H1 from "./typos/H1";

interface ICheckoutProps {
  checkoutOptions: StripeElementsOptions;
}

export default function Checkout({ checkoutOptions }: ICheckoutProps) {
  const [stripePromise, setStripePromise] = useState<Promise<Stripe | null>>();

  useEffect(() => {
    (async () => {
      setStripePromise(
        loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY!)
      );
    })();
  }, [checkoutOptions]);

  return (
    <>
      {stripePromise && (
        <>
          <H1>Checkout</H1>
          <Elements stripe={stripePromise} options={checkoutOptions}>
            <CheckoutForm />
          </Elements>
        </>
      )}
    </>
  );
}
