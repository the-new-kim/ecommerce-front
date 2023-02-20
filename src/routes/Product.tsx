import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { headerHeightAtom, userAtom } from "../libs/atoms";
import { productCollection } from "../firebase/config";

import { centToDollor } from "../libs/utils";
import { ICartProduct } from "../firebase/types";
import { getFirebaseDoc } from "../firebase/utils";
import Heading from "../components/elements/typos/Heading";
import Button from "../components/elements/Button";
import { toast } from "react-toastify";
import AddedToCartMessage from "../components/messages/AddedToCartMessage";
import { IProductWithId } from "./Cart";
import ReviewSection from "../components/review/ReviewSection";
import ReviewStars from "../components/review/ReviewStars";
import useViewportSize from "../libs/hooks/useViewportSize";

export default function Product() {
  const [me, setMe] = useRecoilState(userAtom);
  const { productId } = useParams();
  const [product, setProduct] = useState<IProductWithId>();
  const {
    size: { width },
    mediaQuery: { md },
  } = useViewportSize();

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

    setMe((prev) => {
      if (!prev) return prev;
      const newMe = { ...prev, cart: { ...prev.cart } };

      newMe.cart.products = newCartProducts;
      return newMe;
    });

    toast.info(<AddedToCartMessage product={product} />);
  };

  if (!product) return <div>No Product..</div>;

  return (
    <>
      <section className="relative flex flex-col md:grid md:grid-cols-2">
        {/* IMAGE */}
        <div>
          {product.imageUrls.map((imageUrl, index) => (
            <img key={"img" + index} src={imageUrl} />
          ))}
        </div>

        {/* PRODUCT INFO */}
        <div
          style={{
            top: md ? headerHeight : 0,
            height: md ? `calc(100vh - ${headerHeight}px)` : "100%",
          }}
          className="md:sticky flex flex-col justify-center items-center p-5"
        >
          <div className="[&>*]:mb-5 md:max-w-sm">
            <div>
              <Heading tagName="h3">{product.title}</Heading>
              <div className="flex justify-start items-center [&>*]:mr-3">
                <ReviewStars rating={Math.round(Math.random() * 5)} />
                <span>63 Reviews</span>
              </div>
            </div>

            <div>
              <div>{centToDollor(product.price)}</div>
              <div>
                Availability: {product.quantity ? "In Stock" : "Sold out"}{" "}
              </div>
            </div>

            <div className="flex justify-start items-center [&>*]:mr-3">
              <Button onClick={onAddToCartClick}>Add to Cart</Button>
            </div>

            <p>{product.description}</p>
          </div>
        </div>
      </section>
      <ReviewSection />
    </>
  );
}
