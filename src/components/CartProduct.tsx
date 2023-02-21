import { Minus, Plus, Trash } from "phosphor-react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { productCollection } from "../firebase/config";
import useFirebaseDocs from "../firebase/hooks/useFirebaseDocs";
import { getFirebaseDoc } from "../firebase/utils";

import { userAtom } from "../libs/atoms";
import { centToDollor } from "../libs/utils";

import TBodyRow from "./table/TBodyRow";
import { IProductWithId } from "../routes/Cart";
import useViewportSize from "../libs/hooks/useViewportSize";

interface ICartProductProps {
  cartProduct: IProductWithId;
}

function CartProductTitle({ cartProduct }: ICartProductProps) {
  return (
    <span className="hover:underline ">
      <Link to={`/products/${cartProduct.id}`}>{cartProduct.title}</Link>
    </span>
  );
}

interface ICartProductIncreamentButtonsProps extends ICartProductProps {
  increaseQuantity: (id: string, increament: number) => Promise<void>;
  className: string;
}

function CartProductIncreamentButtons({
  cartProduct,
  increaseQuantity,
  className,
}: ICartProductIncreamentButtonsProps) {
  return (
    <div className={className}>
      {/* <button onClick={() => deleteFromCart(cartProduct.id)}>
        <Trash />
      </button> */}
      <button onClick={() => increaseQuantity(cartProduct.id, -1)}>
        <Minus />
      </button>
      <span>{cartProduct.quantity}</span>
      <button onClick={() => increaseQuantity(cartProduct.id, 1)}>
        <Plus />
      </button>
    </div>
  );
}

export default function CartProduct({ cartProduct }: ICartProductProps) {
  const {
    mediaQuery: { md },
  } = useViewportSize();
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
    <TBodyRow className="group">
      <td>
        <div className="flex justify-start items-center">
          <span className="relative w-24 max-w-[40%] mr-5 overflow-hidden">
            <img
              className="object-contain w-full h-full"
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
          {md && <CartProductTitle cartProduct={cartProduct} />}
        </div>
      </td>
      {md ? (
        <>
          <td>
            <CartProductIncreamentButtons
              className="[&>*]:mx-2 flex justify-center items-center"
              cartProduct={cartProduct}
              increaseQuantity={increaseQuantity}
            />
          </td>
          <td className="text-right">
            {centToDollor(cartProduct.quantity * cartProduct.price)}
          </td>
        </>
      ) : (
        <>
          <td className="text-right">
            <div className="mb-3 font-semibold">
              <CartProductTitle cartProduct={cartProduct} />
            </div>

            <div>{centToDollor(cartProduct.quantity * cartProduct.price)}</div>

            <CartProductIncreamentButtons
              className="flex justify-end items-center [&>*]:ml-3"
              cartProduct={cartProduct}
              increaseQuantity={increaseQuantity}
            />
          </td>
        </>
      )}
    </TBodyRow>
  );
}
