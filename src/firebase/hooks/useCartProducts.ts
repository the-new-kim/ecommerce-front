import { useEffect, useState } from "react";
import { IProductWithId } from "../../routes/Cart";
import { productCollection } from "../config";
import { ICartProduct } from "../types";
import { getFirebaseDoc } from "../utils";

export default function useCartProducts(
  cartProducts: ICartProduct[] | undefined
) {
  const [products, setProducts] = useState<IProductWithId[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>();

  useEffect(() => {
    if (!cartProducts) return;
    (async () => {
      let myCart: IProductWithId[] = [];

      for (let i = 0; i < cartProducts.length; i++) {
        try {
          const { id, quantity } = cartProducts[i];

          const foundProduct = await getFirebaseDoc(productCollection, id);

          if (foundProduct) {
            const cartProduct = {
              ...foundProduct,
              quantity,
            };
            myCart.push(cartProduct);
          }
        } catch (error) {
          console.log("ERROR:::", error);
        }
      }

      setTotalAmount(
        cartProducts.length
          ? myCart
              .map((product) => product.price * product.quantity)
              .reduce((accumulator, currentValue) => accumulator + currentValue)
          : 0
      );
      setProducts(myCart);
    })();
  }, [cartProducts]);

  return { products, totalAmount };
}
