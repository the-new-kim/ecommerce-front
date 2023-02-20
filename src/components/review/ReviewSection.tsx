import { PencilSimple, Star } from "phosphor-react";
import Button from "../elements/Button";
import Heading from "../elements/typos/Heading";
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
  rating?: number;
}

export default function ReviewSection({ rating = 4 }: IReviewSectionProps) {
  return (
    <section className="p-5 [&>*]:mb-5">
      <Heading tagName="h3">Reviews</Heading>
      <div className="relative flex flex-col md:flex-row justify-between items-start p-5 border-[1px] border-black">
        {/* HEADER */}

        <div
          className="flex flex-col w-full md:w-auto [&>*]:mb-3 items-center
        border-b-[1px] border-black
        "
        >
          <div className="flex justify-start items-center">
            <div className="bg-orange-400 py-1 px-3 text-white mr-3">
              {rating}
            </div>
            <ReviewStars rating={rating} />
          </div>
          <small>Based on 62 reviews</small>
          <table className="text-sm !mb-10">
            <tbody>
              {Array.from(Array(5).keys())
                .reverse()
                .map((arrKey, index) => (
                  <tr
                    key={"rating_snapshot" + index}
                    className="[&>*]:text-center"
                    // className="flex justify-start items-center"
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
                            width: `${Math.round(Math.random() * 100)}%`,
                          }}
                        />
                      </div>
                    </td>
                    <td>{Math.floor(Math.random() * 50)}</td>
                  </tr>
                ))}
            </tbody>
          </table>

          <Button className="flex justify-start items-center text-sm">
            <PencilSimple /> <span className="ml-3">Write a review</span>
          </Button>
        </div>

        {/* MAIN */}

        <div
          className="flex-grow flex flex-col justify-start items-start min-h-full  mt-10
        md:ml-5 md:border-l-[1px] md:border-black md:mt-0 md:pl-5
        "
        >
          {fakeUserReviews.map((userReview, index) => (
            <UserReview key={"user_review" + index} {...userReview} />
          ))}
          {/* {Array.from(Array(10)).map((_, index) => (
            <div
              key={"review" + index}
              className="flex justify-start items-start mb-5"
            >
              <div className="mr-3 flex flex-col justify-center items-center">
                <div className="w-16 h-16 rounded-full overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src="https://images.unsplash.com/photo-1502323777036-f29e3972d82f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80"
                  />
                </div>
                <div>Username</div>
              </div>
              <div className="flex flex-col">
                <ReviewStars rating={rating} />
                <Heading tagName="h5" className="mb-1">
                  Lorem ipsum
                </Heading>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam
                </p>
              </div>
            </div>
          ))} */}
        </div>
      </div>
    </section>
  );
}
