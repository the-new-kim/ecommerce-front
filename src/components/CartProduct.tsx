import { doc, updateDoc } from "firebase/firestore";
import { Trash } from "phosphor-react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { firebaseDB } from "../firebase/config";
import useFirebaseDocs from "../firebase/hooks/useFirebaseDocs";
import { IProductDoc } from "../firebase/types";
import { getFirebaseDoc } from "../firebase/utils";
import { userAtom } from "../libs/atoms";
import { centToDollor } from "../libs/utils";

import TBodyRow from "./table/TBodyRow";

interface ICartProductProps {
  cartProduct: IProductDoc;
}

export default function CartProduct({ cartProduct }: ICartProductProps) {
  const [me, setUser] = useRecoilState(userAtom);
  const productDoc = useFirebaseDocs<IProductDoc>(() =>
    getFirebaseDoc("products", cartProduct.id)
  );

  const deleteFromCart = async (id: string) => {
    //1️⃣ Filter cart items

    const filteredCart = me!.cart.filter((product) => product.productId !== id);

    //2️⃣ Stringify before update firestore document
    const stringifiedCart = filteredCart.map((product) => {
      return JSON.stringify(product);
    });

    //3️⃣ Update document
    const docRef = doc(firebaseDB, "users", me!.id);
    await updateDoc(docRef, {
      cart: stringifiedCart,
    });

    //2️⃣ update recoil state
    setUser((oldMe) => {
      if (!oldMe) return oldMe;
      const newMe = { ...oldMe, cart: filteredCart };
      return newMe;
    });
  };

  const increasQuantity = async (id: string, increament: number) => {
    if (!productDoc) return;
    setUser((oldMe) => {
      if (!oldMe) return oldMe;
      const newMe = { ...oldMe };
      const newCart = newMe.cart.map((product) => {
        return { ...product };
      });
      newMe.cart = newCart.map((product) => {
        if (product.productId === id) {
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
        <button onClick={() => increasQuantity(cartProduct.id, 1)}>+</button>
        {cartProduct.quantity}
        <button onClick={() => increasQuantity(cartProduct.id, -1)}>-</button>
      </td>
      <td className="text-right">
        {centToDollor(cartProduct.quantity * cartProduct.price)}
      </td>
    </TBodyRow>
  );
}
