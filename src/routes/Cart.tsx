import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userAtom } from "../libs/atoms";

import { productCollection } from "../firebase/config";
import { getFirebaseDoc } from "../firebase/utils";
import { IProduct } from "../firebase/types";

import { StripeElementsOptions } from "@stripe/stripe-js";
import {
  cancelPaymentIntent,
  createStripePaymentIntent,
  getStripePaymentIntentDetail,
} from "../api/paymentIntents";

import Checkout from "../components/Checkout";
import ShippingForm from "../components/forms/ShippingForm";
import CartProducts from "../components/CartProducts";
import ShippingInformation from "../components/ShippingInformation";
import { Link } from "react-router-dom";

export interface IProductWithId extends IProduct {
  id: string;
}

export type TPaymentProcess = "information" | "payment" | "confirmation";
export enum EPaymentProcess {
  INFORMATION = "information",
  PAYMENT = "payment",
  CONFIRMATION = "confirmation",
}

export default function Cart() {
  const [me, setMe] = useRecoilState(userAtom);
  const [paymentProcess, setPaymentProcess] = useState<EPaymentProcess>(
    EPaymentProcess.INFORMATION
  );

  const [cartProducts, setCartProducts] = useState<IProductWithId[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const [checkoutOptions, setCheckoutOptions] =
    useState<StripeElementsOptions>();

  useEffect(() => {
    if (!me || !me.cart.products.length) return setCartProducts([]);

    (async () => {
      let myCart: IProductWithId[] = [];

      for (let i = 0; i < me.cart.products.length; i++) {
        try {
          const foundProduct = await getFirebaseDoc(
            productCollection,
            me.cart.products[i].id
          );

          if (foundProduct) {
            const cartProduct = {
              ...foundProduct,
              quantity: me.cart.products[i].quantity,
            };
            myCart.push(cartProduct);
          }
        } catch (error) {
          console.log("ERROR:::", error);
        }
      }

      setTotalAmount(
        myCart
          .map((product) => product.price * product.quantity)
          .reduce((accumulator, currentValue) => accumulator + currentValue)
      );
      setCartProducts(myCart);
    })();
  }, [me]);

  const createPaymentIntent = async () => {
    if (!me) return;
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

    setCheckoutOptions({
      clientSecret: stripePaymentIntentResult.data.client_secret,
    });
  };

  const onCheckoutClick = async () => {
    if (!me) return;
    if (me.cart.paymentIntent) {
      const stripePaymentIntentResult = await getStripePaymentIntentDetail(
        me.cart.paymentIntent
      );

      if (!stripePaymentIntentResult.data) {
        createPaymentIntent();
        return;
      }

      if (stripePaymentIntentResult.data.amount !== totalAmount) {
        const cancelPaymentIntentResult = await cancelPaymentIntent(
          stripePaymentIntentResult.data.id
        );
        console.log("CANCEL:::", cancelPaymentIntentResult);
        createPaymentIntent();
        return;
      }

      setCheckoutOptions({
        clientSecret: stripePaymentIntentResult.data.client_secret,
      });
    } else {
      // create new
      createPaymentIntent();
    }

    setPaymentProcess(EPaymentProcess.PAYMENT);
  };

  return (
    <div className="p-5 ">
      <div>{paymentProcess}</div>
      {!!cartProducts.length ? (
        <>
          <CartProducts cartProducts={cartProducts} totalAmount={totalAmount} />
          {/* <hr className="my-5" />

          {paymentProcess === EPaymentProcess.INFORMATION ? (
            <ShippingForm onCheckoutClick={onCheckoutClick} />
          ) : (
            <ShippingInformation />
          )}

          {checkoutOptions && <Checkout checkoutOptions={checkoutOptions} />} */}
          <Link
            className="mt-5 cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            to="/checkout"
          >
            Checkout
          </Link>
        </>
      ) : (
        <div>Your cart is empty</div>
      )}
    </div>
  );
}
