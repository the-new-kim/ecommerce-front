import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { headerHeightAtom, userAtom } from "../libs/atoms";
import { productCollection, userCollection } from "../firebase/config";

import { centToDollor } from "../libs/utils";
import { ICartProduct, IProduct } from "../firebase/types";
import { getFirebaseDoc } from "../firebase/utils";
import Heading from "../components/typos/Heading";

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
  };

  if (!product) return <div>No Product..</div>;

  return (
    <>
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
          className="sticky flex flex-col justify-center items-center p-5"
        >
          <Heading>{product.title}</Heading>

          <div>
            <span>Price: {centToDollor(product.price)}</span>
            <hr />
            <span>Quantity: {product.quantity}</span>
          </div>

          <p>Description: {product.description}</p>

          <button
            onClick={onAddToCartClick}
            className="mt-5 cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
}
