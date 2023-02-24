import { PencilSimple, Star } from "phosphor-react";
import { useState } from "react";
import { IReviewWithId } from "../../firebase/types";
import Button from "../elements/Button";
import Heading from "../elements/typos/Heading";
import ReviewForm from "../forms/ReviewForm";
import Spinner from "../loaders/Spinner";
import Modal from "../Modal";
import ReviewStars from "./ReviewStars";
import UserReview from "./UserReview";

// const titles = ["Lorem ipsum","Sed ut perspiciatis","Ut enim ad minima","Nemo enim ipsam"]
const names = [
  "Sumati Tudur",
  "Jocky Shon",
  "Enn Gavrail",
  "Tsvetanka Hùng",
  "Florus Bret",
];
const avatars = [
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDh8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
];

const getRandomInt = (min: number, max: number) => {
  return Math.round(Math.random() * (max - min)) + min;
};

const fakeUserReviews = [
  {
    name: names[getRandomInt(0, names.length - 1)],
    avatar: avatars[getRandomInt(0, avatars.length - 1)],
    rating: getRandomInt(1, 5),
    title: "Lorem ipsum",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
  },
  {
    name: names[getRandomInt(0, names.length - 1)],
    avatar: avatars[getRandomInt(0, avatars.length - 1)],
    rating: getRandomInt(1, 5),
    title: "Lorem ipsum",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
  },
  {
    name: names[getRandomInt(0, names.length - 1)],
    avatar: avatars[getRandomInt(0, avatars.length - 1)],
    rating: getRandomInt(1, 5),
    title: "Lorem ipsum",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
  },
  {
    name: names[getRandomInt(0, names.length - 1)],
    avatar: avatars[getRandomInt(0, avatars.length - 1)],
    rating: getRandomInt(1, 5),
    title: "Lorem ipsum",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
  },
  {
    name: names[getRandomInt(0, names.length - 1)],
    avatar: avatars[getRandomInt(0, avatars.length - 1)],
    rating: getRandomInt(1, 5),
    title: "Lorem ipsum",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
  },
  {
    name: names[getRandomInt(0, names.length - 1)],
    avatar: avatars[getRandomInt(0, avatars.length - 1)],
    rating: getRandomInt(1, 5),
    title: "Lorem ipsum",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
  },
];

interface IReviewSectionProps {
  reviews: IReviewWithId[];
  averageRating?: number;
}

export default function ReviewSection({
  reviews,
  averageRating,
}: IReviewSectionProps) {
  const [showReviewForm, setShowReviewForm] = useState(false);

  const toggleShowReviewForm = () => {
    setShowReviewForm((prev) => !prev);
  };

  // if (error) return <div>{`${error}`}</div>;

  // if (isLoading)
  //   return (
  //     <div>
  //       <Spinner />
  //     </div>
  //   );

  return (
    <section className="p-5 [&>*]:mb-5">
      <Heading tagName="h3">Reviews</Heading>
      <div className="relative flex flex-col md:flex-row justify-between items-start p-5 border-[1px] border-black">
        {!!reviews.length ? (
          <>
            {/* HEADER */}
            <div
              className="flex flex-col w-full md:w-auto [&>*]:mb-3 items-center
        border-b-[1px] border-black
        "
            >
              <div className="flex justify-start items-center">
                {typeof averageRating !== "undefined" && (
                  <div className="bg-orange-400 py-1 px-3 text-white mr-3">
                    {averageRating}
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
                <PencilSimple /> <span className="ml-3">Write a review</span>
              </Button>
            </div>
            {/* MAIN */}
            <div
              className="flex-grow flex flex-col justify-start items-start min-h-full mt-10 w-full
        md:ml-5 md:border-l-[1px] md:border-black md:mt-0 md:pl-5
        "
            >
              {/* {fakeUserReviews.map((userReview, index) => (
                <UserReview key={"user_review" + index} {...userReview} />
              ))} */}

              {reviews.map((review) => (
                <UserReview key={review.id + "userReview"} {...review} />
              ))}
            </div>
          </>
        ) : (
          <div className="w-full flex flex-col justify-center items-center">
            <ReviewForm />
          </div>
        )}
      </div>

      <Modal setShowing={setShowReviewForm} showing={showReviewForm}>
        <ReviewForm setShowing={setShowReviewForm} />
      </Modal>
    </section>
  );
}
