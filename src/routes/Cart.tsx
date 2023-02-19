import { useRecoilValue } from "recoil";
import { userAtom } from "../libs/atoms";

import { IProduct } from "../firebase/types";

import CartProducts from "../components/CartProducts";

import useCartProducts from "../firebase/hooks/useCartProducts";
import Button from "../components/elements/Button";
import Heading from "../components/elements/typos/Heading";

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
  const me = useRecoilValue(userAtom);

  const { products: cartProducts, totalAmount } = useCartProducts(
    me?.cart.products
  );

  return (
    <div className="p-5 h-full flex flex-col w-full">
      <Heading tagName="h3" className="mb-5">
        Cart
      </Heading>
      {!!cartProducts.length && totalAmount ? (
        <>
          <CartProducts cartProducts={cartProducts} totalAmount={totalAmount} />

          <div className="flex justify-end mt-5">
            <Button link="/checkout/information">Checkout</Button>
          </div>
        </>
      ) : (
        <div className="w-full h-full flex-grow flex justify-center items-center">
          <Heading tagName="h5" className="mb-10">
            Your cart is empty
          </Heading>
        </div>
      )}
    </div>
  );
}
