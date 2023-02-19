import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, Stripe, StripeElementsOptions } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import PaymentForm from "./forms/PaymentForm";
import Heading from "./elements/typos/Heading";

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
          <Heading>Checkout</Heading>
          <Elements stripe={stripePromise} options={checkoutOptions}>
            <PaymentForm />
          </Elements>
        </>
      )}
    </>
  );
}
