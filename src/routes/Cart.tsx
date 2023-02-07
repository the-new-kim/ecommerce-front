import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";

import H1 from "../components/typos/H1";
import { firebaseDB } from "../firebase/config";
import { createStripePaymentIntent } from "../libs/api";

import { checkoutOptionAtom, meAtom } from "../libs/atoms";
import { IProduct } from "./Home";

export default function Cart() {
  const navgate = useNavigate();
  const [me, setMe] = useRecoilState(meAtom);
  const [cartItems, setCartItems] = useState<IProduct[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const setCheckoutOptions = useSetRecoilState(checkoutOptionAtom);

  useEffect(() => {
    (async () => {
      let myCart: IProduct[] = [];

      if (!me?.cart.length) return setCartItems(myCart);

      for (let i = 0; i <= me.cart.map.length; i++) {
        try {
          const docRef = doc(firebaseDB, "products", me.cart[i].productId);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const foundItem = {
              ...docSnap.data(),
              quantity: me.cart[i].quantity,
              id: docSnap.id,
            } as IProduct;

            myCart.push(foundItem);
          } else {
            return;
          }
        } catch (error) {
          console.log("ERROR:::", error);
        }
      }
      setTotalAmount(
        myCart
          .map((item) => Number(item.price) * Number(item.quantity))
          .reduce((accumulator, currentValue) => accumulator + currentValue)
      );
      setCartItems(myCart);
    })();
  }, [me, me?.cart]);

  const onRemoveClick = async (id: string) => {
    //1️⃣ Filter cart items

    const filteredCart = me!.cart.filter((item) => item.productId !== id);

    //2️⃣ Stringify before update firestore document
    const stringifiedCart = filteredCart.map((item) => {
      return JSON.stringify(item);
    });

    //3️⃣ Update document
    const docRef = doc(firebaseDB, "users", me!.uid);
    await updateDoc(docRef, {
      cart: stringifiedCart,
    });

    //2️⃣ update recoil state

    setMe((oldMe) => {
      if (!oldMe) return oldMe;

      const newMe = { ...oldMe, cart: filteredCart };

      return newMe;
    });
  };

  const onProductClick = (id: string) => {
    navgate(`/products/${id}`);
  };

  const onCheckoutClick = async () => {
    // 1️⃣ Create payment intent

    const stripePaymentIntentResult = await createStripePaymentIntent({
      amount: totalAmount * 100,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });

    console.log("PAYMENT INTENT RESULT::: ", stripePaymentIntentResult);
    // 2️⃣ Set checkout options using recoil

    setCheckoutOptions({
      clientSecret: stripePaymentIntentResult.data.client_secret,
    });

    // 3️⃣ Finally redirect to checkout page
    navgate("/checkout");
  };

  return (
    <div className="p-5 ">
      <H1>Cart</H1>
      {!!cartItems.length && (
        <>
          <table className="text-start mt-5 w-full">
            <thead>
              <tr className="[&>*]:p-3 border-b-2 border-black">
                <th className="w-[60%] text-start">Item</th>
                <th className="text-center">Quantity</th>
                <th className="text-right">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr
                  key={"cartItem" + index}
                  className="[&>*]:p-3 border-b-[1px] border-black"
                >
                  <td className="flex justify-start items-center group">
                    <span className="relative w-20 max-w-[40%] aspect-square mr-3 overflow-hidden">
                      <img
                        className="object-cover w-full h-full"
                        src={item.imageUrls[0]}
                      />
                      <button
                        onClick={() => onRemoveClick(item.id)}
                        className="absolute top-1 left-1 w-5 h-5 rounded-full bg-red-400 flex justify-center items-center opacity-0 group-hover:opacity-100"
                      >
                        X
                      </button>
                    </span>
                    <span className="hover:underline">
                      <Link to={`/products/${item.id}`}>{item.title}</Link>
                    </span>
                  </td>
                  <td className="text-center">
                    <button>+</button>
                    {item.quantity}
                    <button>-</button>
                  </td>
                  <td className="text-right">
                    $ {Number(item.quantity) * Number(item.price)}
                  </td>
                </tr>
              ))}

              <tr className="[&>*]:p-3">
                <td>Subtotal includes:</td>
                <td></td>
                <td className="text-right">$ {totalAmount}</td>
              </tr>
            </tbody>
          </table>

          {/* <Link to="/checkout" className="p-3 bg-blue-200">
            Checkout
          </Link> */}
          <button className="p-3 bg-blue-200" onClick={onCheckoutClick}>
            Checkout
          </button>
        </>
      )}
    </div>
  );
}
