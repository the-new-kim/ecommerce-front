import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { headerHeightAtom } from "../libs/atoms";
import { productCollection } from "../firebase/config";
import { centToDollor } from "../libs/utils";
import { getFirebaseDoc } from "../firebase/utils";
import Heading from "../components/elements/typos/Heading";
import ReviewSection from "../components/review/ReviewSection";
import ReviewStars from "../components/review/ReviewStars";
import useViewportSize from "../libs/hooks/useViewportSize";
import Empty from "../components/Empty";
import AddToCartButton from "../components/AddToCartButton";

import AddToWishlistButton from "../components/AddToWishlistButton";
import { useQuery } from "@tanstack/react-query";

export default function Product() {
  const { productId } = useParams();

  const {
    data: product,
    isLoading,
    error,
  } = useQuery(["product", productId], () =>
    getFirebaseDoc(productCollection, productId)
  );

  const {
    mediaQuery: { md },
  } = useViewportSize();

  const headerHeight = useRecoilValue(headerHeightAtom);

  if (error) return <Empty>{`${error}`}</Empty>;

  return (
    <>
      {isLoading || !product ? (
        <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center">
          Loading...
        </div>
      ) : (
        <>
          <section className="relative flex flex-col md:grid md:grid-cols-2">
            {/* IMAGE */}
            <div>
              {product.imageUrls.map((imageUrl, index) => (
                <img key={"img" + index} src={imageUrl} alt={product.title} />
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
                  <AddToCartButton product={product} />
                  <Heading tagName="h2">
                    <AddToWishlistButton product={product} />
                  </Heading>
                </div>

                <p>{product.description}</p>
              </div>
            </div>
          </section>
          <ReviewSection />
        </>
      )}
    </>
  );
}
