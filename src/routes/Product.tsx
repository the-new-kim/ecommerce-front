import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { headerHeightAtom } from "../libs/atoms";
import { productCollection, reviewCollection } from "../firebase/config";
import { calculateReviewsAverageRating, centToDollor } from "../libs/utils";
import { getFirebaseDoc, getFirebaseDocs } from "../firebase/utils";
import Heading from "../components/elements/typos/Heading";
import ReviewSection from "../components/review/ReviewSection";
import ReviewStars from "../components/review/ReviewStars";
import useViewportSize from "../libs/hooks/useViewportSize";
import Empty from "../components/Empty";
import AddToCartButton from "../components/AddToCartButton";

import AddToWishlistButton from "../components/AddToWishlistButton";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/loaders/Spinner";
import { where } from "firebase/firestore";
import { useEffect, useState } from "react";

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
    data: reviews,
    isLoading: reviewsLoading,
    error: reviewsError,
  } = useQuery(["reviews", productId], () =>
    getFirebaseDocs(reviewCollection, where("product", "==", productId))
  );

  // const [averageRating, setAverageRating] = useState<number>();

  const {
    mediaQuery: { md },
  } = useViewportSize();

  const headerHeight = useRecoilValue(headerHeightAtom);

  // useEffect(() => {
  //   if (!reviews || !reviews.length) return;
  //   console.log("REVIEWS CHANGED", reviews);
  //   const ratings = reviews.map((review) => review.rating);

  //   const total = ratings.reduce(
  //     (accumulator, currentValue) => accumulator + currentValue
  //   );
  //   setAverageRating(total / reviews.length);

  //   console.log(total / reviews.length);
  // }, [reviews]);

  if (error || reviewsError) return <Empty>{`${error}`}</Empty>;

  if (isLoading || !product || !productId || reviewsLoading || !reviews)
    return (
      <Empty>
        <Spinner />
      </Empty>
    );

  return (
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
                <ReviewStars rating={calculateReviewsAverageRating(reviews)} />
                {!!reviews?.length && (
                  <span>
                    {reviews.length +
                      " Review" +
                      (reviews.length > 1 ? "s" : "")}
                  </span>
                )}
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
      <ReviewSection
        reviews={reviews}
        productId={productId}
        averageRating={calculateReviewsAverageRating(reviews)}
      />
    </>
  );
}
