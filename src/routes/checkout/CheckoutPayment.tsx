import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, Stripe, StripeElementsOptions } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import PaymentForm from "../../components/forms/PaymentForm";

import { userAtom } from "../../libs/atoms";
import {
  cancelPaymentIntent,
  createStripePaymentIntent,
  getStripePaymentIntentDetail,
} from "../../api/paymentIntents";
import useCartProducts from "../../firebase/hooks/useCartProducts";
import ShippingInformation from "../../components/checkout/ShippingInformation";
import ContainerWithRoundedBorder from "../../components/ContainerWithRoundedBorder";

import Heading from "../../components/elements/typos/Heading";

export default function CheckoutPayment() {
  const [me, setMe] = useRecoilState(userAtom);
  const { totalAmount } = useCartProducts(me?.cart.products);
  const [stripePromise, setStripePromise] = useState<Promise<Stripe | null>>();
  const [options, setOptions] = useState<StripeElementsOptions>();

  const createPaymentIntent = async () => {
    if (!me || !totalAmount || !me.cart.products.length) return;

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
    if (!me || !totalAmount || !me.cart.products.length) return;

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
    <div className="[&>*]:mb-5">
      <ShippingInformation />

      {stripePromise && options && (
        <ContainerWithRoundedBorder>
          <Heading tagName="h4" className="mb-5">
            Payment
          </Heading>
          <Elements stripe={stripePromise} options={options}>
            <PaymentForm />
          </Elements>
        </ContainerWithRoundedBorder>
      )}
    </div>
  );
}
