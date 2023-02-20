import Heading from "../elements/typos/Heading";
import ReviewStars from "./ReviewStars";

interface IUserReviewProps {
  name: string;
  avatar: string;
  rating: number;
  title: string;
  text: string;
}

export default function UserReview({
  name,
  avatar,
  rating,
  title,
  text,
}: IUserReviewProps) {
  return (
    <div className="grid grid-cols-12 mb-10">
      <div className="col-span-2 mr-3 flex flex-col justify-center items-center">
        <div className="w-16 h-16 rounded-full overflow-hidden">
          <img className="w-full h-full object-cover" src={avatar} />
        </div>
        <div className="whitespace-nowrap">{name}</div>
      </div>
      <div className="col-span-10 flex flex-col">
        <ReviewStars rating={rating} />
        <Heading tagName="h5" className="mb-1">
          {title}
        </Heading>
        <p>{text}</p>
      </div>
    </div>
  );
}
