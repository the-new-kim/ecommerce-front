import { Trash } from "phosphor-react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { productCollection } from "../firebase/config";
import useFirebaseDocs from "../firebase/hooks/useFirebaseDocs";
import { getFirebaseDoc } from "../firebase/utils";

import { userAtom } from "../libs/atoms";
import { centToDollor } from "../libs/utils";

import TBodyRow from "./table/TBodyRow";
import { IProductWithId } from "../routes/Cart";

interface ICartProductProps {
  cartProduct: IProductWithId;
}

export default function CartProduct({ cartProduct }: ICartProductProps) {
  const [me, setMe] = useRecoilState(userAtom);
  const productDoc = useFirebaseDocs(() =>
    getFirebaseDoc(productCollection, cartProduct.id)
  );

  const deleteFromCart = async (id: string) => {
    //1️⃣ Filter cart items
    const filteredCartProducts = me!.cart.products.filter(
      (product) => product.id !== id
    );

    //2️⃣ update recoil state
    setMe((oldMe) => {
      if (!oldMe) return oldMe;
      const newMe = {
        ...oldMe,
        cart: { ...oldMe.cart },
      };

      newMe.cart.products = filteredCartProducts;
      return newMe;
    });
  };

  const increaseQuantity = async (id: string, increament: number) => {
    if (!productDoc || !me) return;

    const currentCartProducts = me.cart.products.map((product) => {
      return { ...product };
    });

    const updatedCartProducts = currentCartProducts.map((product) => {
      if (product.id === id) {
        const newQuantity = product.quantity + increament;

        if (newQuantity < 1 || newQuantity > productDoc.quantity) {
          console.log(
            "NEW QUANTITY CAN NOT BE BIGGER THAN PRODUCT QUANTITY OR LESS THAN 1 ❌❌❌"
          );

          return product;
        } else {
          product.quantity = newQuantity;
          return product;
        }
      } else {
        return product;
      }
    });

    setMe((oldMe) => {
      if (!oldMe) return oldMe;
      const newMe = { ...oldMe, cart: { ...oldMe.cart } };

      newMe.cart.products = updatedCartProducts;
      return newMe;
    });
  };

  return (
    <TBodyRow>
      <td className="flex justify-start items-center group">
        <span className="relative w-20 max-w-[40%] aspect-square mr-3 overflow-hidden">
          <img
            className="object-cover w-full h-full"
            src={cartProduct.imageUrls[0]}
          />
          <button
            onClick={() => deleteFromCart(cartProduct.id)}
            className="absolute top-1 left-1 w-7 h-7 rounded-full bg-white flex justify-center items-center drop-shadow-lg
            opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-100 duration-300"
          >
            <Trash />
          </button>
        </span>
        <span className="hover:underline">
          <Link to={`/products/${cartProduct.id}`}>{cartProduct.title}</Link>
        </span>
      </td>
      <td className="text-center">
        <button onClick={() => increaseQuantity(cartProduct.id, 1)}>+</button>
        {cartProduct.quantity}
        <button onClick={() => increaseQuantity(cartProduct.id, -1)}>-</button>
      </td>
      <td className="text-right">
        {centToDollor(cartProduct.quantity * cartProduct.price)}
      </td>
    </TBodyRow>
  );
}
