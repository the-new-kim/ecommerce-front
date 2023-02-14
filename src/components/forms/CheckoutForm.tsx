import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { addDoc, increment } from "firebase/firestore";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { orderCollection, productCollection } from "../../firebase/config";
import { updateFirebaseDoc } from "../../firebase/utils";
import { userAtom } from "../../libs/atoms";

export default function CheckoutForm() {
  const [me, setUser] = useRecoilState(userAtom);
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState<string>();

  const stripe = useStripe();
  const elements = useElements();

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
      return setMessage(`Error: ${error.message}`);
    }

    if (paymentIntent.status === "succeeded") {
      //1️⃣ Create new doc "order" on firestore

      const orderDocRef = await addDoc(orderCollection, {
        orderer: me.id,
        products: me.cart.products,
        shipping: me.shipping,
        paymentIntent: me.cart.paymentIntent,
        // shipping: {address:{}},
        // amount: paymentIntent.amount,
      });

      //2️⃣Upadate product doc
      for (let i = 0; i < me!.cart.products.length; i++) {
        const { id, quantity } = me!.cart.products[i];

        await updateFirebaseDoc(productCollection, id, {
          quantity: increment(-quantity),
          sold: increment(quantity),
        });
      }

      //3️⃣ Empty cart & set order from user
      const orders = [orderDocRef.id, ...me!.orders];

      setUser({ ...me!, cart: { paymentIntent: null, products: [] }, orders });

      setMessage(`Status: ${paymentIntent.status}`);
    }

    setMessage(`Status: ${paymentIntent.status}`);

    setIsProcessing(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        <button disabled={isProcessing} className="p-3 bg-blue-200">
          {isProcessing ? "Processing..." : "Pay now"}
        </button>
      </form>
      {message && <div>{message}</div>}
    </>
  );
}
