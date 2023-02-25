import { useQuery } from "@tanstack/react-query";
import { PencilSimple, Star } from "phosphor-react";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { IReviewWithId } from "../../firebase/types";
import { userAtom } from "../../libs/atoms";
import Button from "../elements/Button";
import Heading from "../elements/typos/Heading";
import ReviewForm from "../forms/ReviewForm";
import Modal from "../Modal";
import ReviewStars from "./ReviewStars";
import UserReview from "./UserReview";

interface IReviewSectionProps {
  reviews: IReviewWithId[];
  averageRating?: number;
  productId: string;
}

export default function ReviewSection({
  reviews,
  averageRating,
  productId,
}: IReviewSectionProps) {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const me = useRecoilValue(userAtom);
  // const [myReview, setMyReview] = useState<IReviewWithId>();

  const { data: myReview } = useQuery(["myReview", productId], () => {
    const foundReview = reviews.find((review) => review.owner === me?.id);

    return foundReview || null;
  });

  // useEffect(() => {
  //   if (!me) return;
  //   setMyReview(reviews.find((review) => review.owner === me.id));
  // }, [me]);

  const toggleShowReviewForm = () => {
    setShowReviewForm((prev) => !prev);
  };

  return (
    <section className="p-5 [&>*]:mb-5">
      <Heading tagName="h3">Reviews</Heading>
      <div className="relative flex flex-col md:flex-row justify-between items-start p-5 border-[1px] border-black">
        {!!reviews.length ? (
          <>
            {/* HEADER */}
            <div
              className="flex flex-col w-full md:w-auto [&>*]:mb-3 items-center
        border-b-[1px] border-black md:border-none
        "
            >
              <div className="flex justify-start items-center">
                {typeof averageRating !== "undefined" && (
                  <div className="bg-orange-400 py-1 px-3 text-white mr-3">
                    {averageRating} adfsaf
                  </div>
                )}
                <ReviewStars rating={averageRating} />
              </div>
              <small>{`Based on ${reviews.length} review${
                reviews.length > 1 ? "s" : ""
              }`}</small>
              <table className="text-sm !mb-10">
                <tbody>
                  {Array.from(Array(5).keys())
                    .reverse()
                    .map((arrKey, index) => (
                      <tr
                        key={"rating_snapshot" + index}
                        className="[&>*]:text-center"
                      >
                        <td>{arrKey + 1}</td>
                        <td>
                          <Star weight="fill" color="orange" />
                        </td>
                        <td className="h-full px-2">
                          <div className="h-3 min-w-[100px] bg-slate-200 relative">
                            <div
                              className="absolute top-0 left-0 h-full bg-orange-400"
                              style={{
                                width: `${
                                  (reviews.filter(
                                    (review) => review.rating === arrKey + 1
                                  ).length /
                                    reviews.length) *
                                  100
                                }%`,
                              }}
                            />
                          </div>
                        </td>
                        <td>
                          {
                            reviews.filter(
                              (review) => review.rating === arrKey + 1
                            ).length
                          }
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>

              <Button
                className="flex justify-start items-center text-sm"
                link={toggleShowReviewForm}
              >
                <PencilSimple />
                <span className="ml-3">
                  {myReview ? "Edit my review" : "Write a review"}
                </span>
              </Button>
            </div>
            {/* MAIN */}
            <div
              className="flex-grow flex flex-col justify-start items-start min-h-full mt-10 w-full
        md:ml-5 md:border-l-[1px] md:border-black md:mt-0 md:pl-5
        "
            >
              {reviews.map((review) => (
                <UserReview key={review.id + "userReview"} {...review} />
              ))}
            </div>
          </>
        ) : (
          <div className="w-full flex flex-col justify-center items-center">
            <ReviewForm reviews={reviews} defaultValue={myReview} />
          </div>
        )}
      </div>

      <Modal setShowing={setShowReviewForm} showing={showReviewForm}>
        <ReviewForm
          defaultValue={myReview}
          reviews={reviews}
          setShowing={setShowReviewForm}
        />
      </Modal>
    </section>
  );
}
