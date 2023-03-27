import { useQuery } from "@tanstack/react-query";
import { userCollection } from "../../firebase/config";
import { getFirebaseDoc } from "../../firebase/utils";
import Heading from "../elements/typos/Heading";
import Spinner from "../loaders/Spinner";
import ReviewStars from "./ReviewStars";

interface IUserReviewProps {
  owner: string;
  rating: number;
  title: string;
  text: string;
}

export default function UserReview({
  owner,
  rating,
  title,
  text,
}: IUserReviewProps) {
  const { data, isLoading, error } = useQuery(["user", owner], () =>
    getFirebaseDoc(userCollection, owner)
  );

  if (!data || isLoading)
    return (
      <div className="w-full flex justify-center items-center">
        <Spinner />
      </div>
    );

  return (
    <div className="flex flex-col justify-center items-center w-full md:grid md:grid-cols-12 mb-10">
      {/* AVATAR & NAME */}
      <div className="md:col-span-2 md:mr-3 mb-3 md:mb-0 flex flex-col justify-center items-center">
        <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-200">
          {data.photoURL && (
            <img className="w-full h-full object-cover" src={data.photoURL} />
          )}
        </div>
        <div>{data.displayName}</div>
      </div>
      {/* TITLE & TEXT */}
      <div className="md:col-span-10 flex flex-col items-center md:items-start">
        <ReviewStars rating={rating} />
        <Heading tagName="h5" className="mb-1">
          {title}
        </Heading>
        <p className="text-center md:text-start">{text}</p>
      </div>
    </div>
  );
}
