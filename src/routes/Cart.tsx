import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import CartProduct from "../components/CartProduct";
import Table from "../components/table/Table";

import THead from "../components/table/THead";
import THeadRow from "../components/table/THeadRow";

import H1 from "../components/typos/H1";
import { firebaseDB } from "../firebase/config";
import { createStripePaymentIntent } from "../libs/api";

import { checkoutOptionAtom, meAtom } from "../libs/atoms";
import { centToDollor } from "../libs/utils";
import { IProduct } from "./Home";

export default function Cart() {
  const navgate = useNavigate();

  const me = useRecoilValue(meAtom);
  const [cartProducts, setCartProducts] = useState<IProduct[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const setCheckoutOptions = useSetRecoilState(checkoutOptionAtom);

  useEffect(() => {
    console.log(cartProducts);
  }, [cartProducts]);

  useEffect(() => {
    if (!me || !me.cart.length) return;

    (async () => {
      let myCart: IProduct[] = [];

      for (let i = 0; i < me.cart.length; i++) {
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
          .map((product) => product.price * product.quantity)
          .reduce((accumulator, currentValue) => accumulator + currentValue)
      );
      setCartProducts(myCart);
    })();
  }, [me]);

  const onCheckoutClick = async () => {
    // 1️⃣ Create payment intent

    const stripePaymentIntentResult = await createStripePaymentIntent({
      amount: totalAmount,
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
      {!!cartProducts.length && (
        <>
          <Table>
            <THead>
              <THeadRow>
                <th className="w-[60%] text-start">Item</th>
                <th className="text-center">Quantity</th>
                <th className="text-right">Subtotal</th>
              </THeadRow>
            </THead>
            <tbody>
              {cartProducts.map((cartProduct, index) => (
                <CartProduct
                  key={`cart-product${index}`}
                  cartProduct={cartProduct}
                />
              ))}
              <tr className="[&>*]:p-3">
                <td>Subtotal includes:</td>
                <td></td>
                <td className="text-right">{centToDollor(totalAmount)}</td>
              </tr>
            </tbody>
          </Table>

          <button className="p-3 bg-blue-200" onClick={onCheckoutClick}>
            Checkout
          </button>
        </>
      )}
    </div>
  );
}
