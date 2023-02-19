import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { headerHeightAtom, userAtom } from "../libs/atoms";
import { productCollection } from "../firebase/config";

import { centToDollor } from "../libs/utils";
import { ICartProduct, IProduct } from "../firebase/types";
import { getFirebaseDoc } from "../firebase/utils";
import Heading from "../components/elements/typos/Heading";
import Button from "../components/elements/Button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddedMessage() {
  return (
    <div className="flex flex-col justify-center items-center [&>*]:mb-5">
      <div>Item Added!</div>
      <Button link="/cart"> Go to cart</Button>
    </div>
  );
}

export default function Product() {
  const [me, setUser] = useRecoilState(userAtom);
  const { productId } = useParams();
  const [product, setProduct] = useState<IProduct & { id: string }>();

  useEffect(() => {
    if (!productId) return;
    (async () => {
      try {
        const productDoc = await getFirebaseDoc(productCollection, productId);
        setProduct(productDoc);
      } catch (error) {
        console.log("ERROR:::", error);
      }
    })();
  }, []);

  const headerHeight = useRecoilValue(headerHeightAtom);

  const onAddToCartClick = async () => {
    if (!me || !product || !productId) return;

    let matched = false;
    const cartProduct: ICartProduct = {
      id: productId,
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

    setUser((prev) => {
      if (!prev) return prev;
      const newMe = { ...prev, cart: { ...prev.cart } };

      newMe.cart.products = newCartProducts;
      return newMe;
    });

    // ON SUCCESS MESSAGE
    // toast("Item added to your cart");
    toast.info(<AddedMessage />);
  };

  if (!product) return <div>No Product..</div>;

  return (
    <>
      <ToastContainer />
      <div className="relative grid grid-cols-2">
        <div>
          {product.imageUrls.map((imageUrl, index) => (
            <img key={"img" + index} src={imageUrl}></img>
          ))}
        </div>
        <div
          style={{
            top: headerHeight,
            height: `calc(100vh - ${headerHeight}px)`,
          }}
          className="sticky flex flex-col justify-center items-center"
        >
          <div className="[&>*]:mb-5 max-w-xs">
            <Heading tagName="h3">{product.title}</Heading>

            <div>
              <div>{centToDollor(product.price)}</div>
              <div>
                Availability: {product.quantity ? "In Stock" : "Sold out"}{" "}
              </div>
            </div>

            <Button onClick={onAddToCartClick}>Add to Cart</Button>

            <p>{product.description}</p>
          </div>
        </div>
      </div>
    </>
  );
}
