import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { ICartProduct } from "../firebase/types";
import { userAtom } from "../libs/atoms";

import { IProductWithId } from "../routes/Cart";
import Button from "./elements/Button";
import AddedToCartMessage from "./toasts/AddedToCartMessage";

interface IAddToCartButtonProps {
  product: IProductWithId;
}

export default function AddToCartButton({ product }: IAddToCartButtonProps) {
  const [me, setMe] = useRecoilState(userAtom);

  const onAddToCartClick = async () => {
    if (!me) return;

    let matched = false;
    const cartProduct: ICartProduct = {
      id: product.id,
      quantity: 1,
    };

    const cartProductsCopy = me.cart.products.map((product) => {
      return { ...product };
    });

    const newCartProducts = cartProductsCopy.map((product) => {
      if (product.id === cartProduct.id) {
        product.quantity += cartProduct.quantity;
        matched = true;
      }

      return product;
    });

    if (!matched) {
      newCartProducts.push(cartProduct);
    }

    setMe((prev) => {
      if (!prev) return prev;
      const newMe = { ...prev, cart: { ...prev.cart } };

      newMe.cart.products = newCartProducts;
      return newMe;
    });

    toast.info(<AddedToCartMessage product={product} />);
  };

  return <Button onClick={onAddToCartClick}>Add to Cart</Button>;
}
