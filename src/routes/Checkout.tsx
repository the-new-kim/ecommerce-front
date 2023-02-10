import { async } from "@firebase/util";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import CheckoutForm from "../components/forms/CheckoutForm";
import H1 from "../components/typos/H1";
import { checkoutOptionAtom } from "../libs/atoms";

export default function Checkout() {
  const [stripePromise, setStripePromise] = useState<Promise<Stripe | null>>();
  const options = useRecoilValue(checkoutOptionAtom);

  useEffect(() => {
    (async () => {
      setStripePromise(
        loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY!)
      );
    })();
  }, []);

  return (
    <div className="p-5">
      <H1>Checkout</H1>

      {stripePromise && options && (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
