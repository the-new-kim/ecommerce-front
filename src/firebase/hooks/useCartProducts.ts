import { useEffect, useState } from "react";
import { IUserAtom } from "../../libs/atoms";
import { IProductWithId } from "../../routes/Cart";
import { productCollection } from "../config";
import { getFirebaseDoc } from "../utils";

export default function useCartProducts(me: IUserAtom | null) {
  const [cartProducts, setCartProducts] = useState<IProductWithId[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>();

  useEffect(() => {
    if (!me || !me.cart.products.length) return;
    (async () => {
      let myCart: IProductWithId[] = [];

      for (let i = 0; i < me.cart.products.length; i++) {
        try {
          const { id, quantity } = me.cart.products[i];

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
        myCart
          .map((product) => product.price * product.quantity)
          .reduce((accumulator, currentValue) => accumulator + currentValue)
      );
      setCartProducts(myCart);
    })();
  }, [me]);

  return { cartProducts, totalAmount };
}
