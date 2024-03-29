import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useQueryClient } from "@tanstack/react-query";
import { addDoc, increment } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useRecoilState, useSetRecoilState } from "recoil";
import { orderCollection, productCollection } from "../../firebase/config";
import { EDeliveryStatus } from "../../firebase/types";
import { updateFirebaseDoc } from "../../firebase/utils";
import { fireworksAtom, userAtom } from "../../libs/atoms";
import Button from "../elements/Button";
import PageLoader from "../loaders/PageLoader";

export default function PaymentForm() {
  const navigate = useNavigate();
  const [me, setMe] = useRecoilState(userAtom);
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState<string>();
  const setFireworksShowing = useSetRecoilState(fireworksAtom);

  const stripe = useStripe();
  const elements = useElements();

  const queryClient = useQueryClient();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements || !me || !me.cart.paymentIntent || !me.shipping)
      return;
    setIsProcessing(true);

    setMessage("Processing...");

    const { error, paymentIntent } = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      // confirmParams: {
      //   return_url: `${window.location.origin}/completion`,
      // },
      redirect: "if_required",
    });
    if (error) {
      setMessage(`Error: ${error.message}`);
      setIsProcessing(false);
      return;
    }

    if (paymentIntent.status !== "succeeded") {
      setMessage(`Status: ${paymentIntent.status}`);
      setIsProcessing(false);

      return;
    } else {
      //1️⃣ Create new doc "order" on firestore

      const orderDocRef = await addDoc(orderCollection, {
        createdAt: Date.now(),
        orderer: me.id,
        products: me.cart.products,
        shipping: me.shipping,
        paymentIntent: {
          id: me.cart.paymentIntent,
          status: paymentIntent.status,
          amount: paymentIntent.amount,
        },
        delivery: {
          status: EDeliveryStatus.ORDERED,
          trackingCode: null,
        },
      });

      //2️⃣Upadate product doc
      for (let i = 0; i < me!.cart.products.length; i++) {
        const { id, quantity } = me!.cart.products[i];

        await updateFirebaseDoc(productCollection, id, {
          quantity: increment(-quantity),
          sold: increment(quantity),
        });

        await queryClient.refetchQueries({ queryKey: ["product", id] });
      }
      await queryClient.refetchQueries({ queryKey: ["products"] });

      //3️⃣ Empty cart & set order from user
      const orders = [orderDocRef.id, ...me!.orders];

      toast("Thank you for your order!");
      setFireworksShowing(true);

      setMe({ ...me!, cart: { paymentIntent: null, products: [] }, orders });

      return navigate(`/me`);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <PaymentElement />

        <Button disabled={isProcessing} className="my-5">
          {isProcessing ? "Processing..." : "Pay now"}
        </Button>
      </form>
      {message && <div>{message}</div>}
      <PageLoader showing={isProcessing}>Processing...</PageLoader>
    </>
  );
}
