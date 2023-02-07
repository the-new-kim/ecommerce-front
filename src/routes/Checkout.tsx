import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { checkoutOptionAtom } from "../libs/atoms";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY!);

export default function Checkout() {
  const options = useRecoilValue(checkoutOptionAtom);

  useEffect(() => {
    (async () => {})();
  }, []);

  return (
    <div className="p-5">
      Checkout
      {options && (
        <Elements stripe={stripePromise} options={options}>
          <form>
            <PaymentElement />
            <button className="p-3 bg-blue-200">Submit</button>
          </form>
        </Elements>
      )}
    </div>
  );
}
