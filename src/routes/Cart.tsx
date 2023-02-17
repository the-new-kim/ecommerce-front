import { useRecoilState } from "recoil";
import { userAtom } from "../libs/atoms";

import { IProduct } from "../firebase/types";

import CartProducts from "../components/CartProducts";

import { Link } from "react-router-dom";
import useCartProducts from "../firebase/hooks/useCartProducts";
import Button from "../components/Button";

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

  const { cartProducts, totalAmount } = useCartProducts(me);

  return (
    <div className="p-5 ">
      {!!cartProducts.length && totalAmount ? (
        <>
          <CartProducts cartProducts={cartProducts} totalAmount={totalAmount} />

          <div className="flex justify-end mt-5">
            <Button link="/checkout/information">Checkout</Button>
          </div>
        </>
      ) : (
        <div>Your cart is empty</div>
      )}
    </div>
  );
}
