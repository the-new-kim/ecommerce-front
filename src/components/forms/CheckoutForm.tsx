import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import {
  addDoc,
  collection,
  doc,
  increment,
  updateDoc,
} from "firebase/firestore";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { firebaseDB } from "../../firebase/config";
import { userAtom } from "../../libs/atoms";

export default function CheckoutForm() {
  const [me, setUser] = useRecoilState(userAtom);
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setUserssage] = useState<string>();

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) return;
    setIsProcessing(true);

    console.log("STRIPE:::", stripe);
    console.log("ELEMENTS:::", elements);

    setUserssage("Processing...");
    // isProcessing.....

    const { error } = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/completion`,
      },
    });
    if (error) {
      return setUserssage(`Status: ${error.message}`);
    }

    // if (paymentIntent.status === "succeeded") {
    //   //1️⃣ Create new doc "order" on firestore

    //   const orderDocRef = await addDoc(collection(firebaseDB, "orders"), {
    //     orderer: me!.uid,
    //     products: me!.cart.map((product) => JSON.stringify(product)),
    //     shipping: false,
    //     amount: paymentIntent.amount,
    //   });

    //   //2️⃣Upadate product doc
    //   for (let i = 0; i < me!.cart.length; i++) {
    //     const { productId, quantity } = me!.cart[i];

    //     const productDocRef = doc(firebaseDB, "products", productId);
    //     await updateDoc(productDocRef, {
    //       quantity: increment(-quantity),
    //       sold: increment(quantity),
    //     });
    //   }

    //   //3️⃣ Empty cart & set order from user
    //   const cart: string[] = [];
    //   const orders = [orderDocRef.id, ...me!.orders];

    //   const userDocRef = doc(firebaseDB, "users", me!.uid);
    //   await updateDoc(userDocRef, {
    //     cart,
    //     orders,
    //   });

    //   setUser({ ...me!, cart: [], orders });

    //   setUserssage(`Status: ${paymentIntent?.status}`);
    // }

    // setUserssage(`Status: ${paymentIntent?.status}`);

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
