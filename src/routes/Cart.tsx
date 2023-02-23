import { useRecoilValue } from "recoil";
import { userAtom } from "../libs/atoms";
import { IProduct } from "../firebase/types";
import CartProducts from "../components/CartProducts";
import Button from "../components/elements/Button";
import Heading from "../components/elements/typos/Heading";
import Empty from "../components/Empty";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCartProducts, getProductsTotalAmount } from "../firebase/utils";
import { useEffect } from "react";

export interface IProductWithId extends IProduct {
  id: string;
}

export enum EPaymentProcess {
  INFORMATION = "information",
  PAYMENT = "payment",
  CONFIRMATION = "confirmation",
}

export default function Cart() {
  const me = useRecoilValue(userAtom);

  const {
    data: cartProducts,
    isLoading,
    error,
    refetch,
  } = useQuery(["cartProducts", me?.id], () =>
    getCartProducts(me?.cart.products)
  );

  const queryClient = useQueryClient();

  const mutation = useMutation({
    // mutationFn:  () => {
    // },
    // onSuccess: (data) => {
    //   queryClient.setQueryData(["order", data.id], data);
    // },
  });

  useEffect(() => {
    refetch();
  }, [me]);

  if (error) return <Empty>{`${error}`}</Empty>;

  return (
    <div className="p-5 h-full flex flex-col w-full">
      <Heading tagName="h3" className="mb-5">
        Cart
      </Heading>
      {isLoading || !cartProducts ? (
        <div>laoding</div>
      ) : (
        <>
          <CartProducts
            cartProducts={cartProducts}
            totalAmount={getProductsTotalAmount(cartProducts)}
          />

          <div className="flex justify-end mt-5">
            <Button link="/checkout/information">Checkout</Button>
          </div>
        </>
      )}
    </div>
  );
}
