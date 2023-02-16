import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, Stripe, StripeElementsOptions } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import CheckoutForm from "../components/forms/CheckoutForm";
import H1 from "../components/typos/H1";
import { userAtom } from "../libs/atoms";
import {
  cancelPaymentIntent,
  createStripePaymentIntent,
  getStripePaymentIntentDetail,
} from "../api/paymentIntents";
import useCartProducts from "../firebase/hooks/useCartProducts";

export default function Checkout() {
  const [me, setMe] = useRecoilState(userAtom);
  const { cartProducts, totalAmount } = useCartProducts(me);
  const [stripePromise, setStripePromise] = useState<Promise<Stripe | null>>();
  const [options, setOptions] = useState<StripeElementsOptions>();

  console.log("USE CART PRODUCTS:::", cartProducts, totalAmount);

  const createPaymentIntent = async () => {
    if (!me || !totalAmount) return;
    const stripePaymentIntentResult = await createStripePaymentIntent({
      amount: totalAmount,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });

    if (!stripePaymentIntentResult.data) return;

    const newCart = {
      ...me.cart,
      paymentIntent: stripePaymentIntentResult.data.id,
    };

    setMe((oldMe) => {
      if (!oldMe) return oldMe;

      const newMe = { ...oldMe, cart: newCart };
      return newMe;
    });

    setOptions({
      clientSecret: stripePaymentIntentResult.data.client_secret,
    });
  };

  useEffect(() => {
    if (!me || !totalAmount) return;
    (async () => {
      if (me.cart.paymentIntent) {
        const stripePaymentIntentResult = await getStripePaymentIntentDetail(
          me.cart.paymentIntent
        );

        if (
          !stripePaymentIntentResult.data ||
          stripePaymentIntentResult.data.status === "canceled"
        ) {
          createPaymentIntent();
          return;
        }

        if (stripePaymentIntentResult.data.amount !== totalAmount) {
          await cancelPaymentIntent(stripePaymentIntentResult.data.id);

          createPaymentIntent();
          return;
        }

        setOptions({
          clientSecret: stripePaymentIntentResult.data.client_secret,
        });
      } else {
        createPaymentIntent();
      }
    })();
  }, [me, totalAmount]);

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
