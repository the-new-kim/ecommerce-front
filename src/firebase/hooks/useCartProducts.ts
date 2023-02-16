import { useEffect, useState } from "react";
import { IUserAtom } from "../../libs/atoms";
import { IProductWithId } from "../../routes/Cart";
import { productCollection } from "../config";
import { getFirebaseDoc } from "../utils";

export default function useCartProducts(me: IUserAtom | null) {
  const [cartProducts, setCartProducts] = useState<IProductWithId[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>();

  useEffect(() => {
    if (!me) return;
    (async () => {
      let myCart: IProductWithId[] = [];

      for (let i = 0; i < me.cart.products.length; i++) {
        try {
          const foundProduct = await getFirebaseDoc(
            productCollection,
            me.cart.products[i].id
          );

          if (foundProduct) {
            const cartProduct = {
              ...foundProduct,
              quantity: me.cart.products[i].quantity,
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
  }, []);

  return { cartProducts, totalAmount };
}
