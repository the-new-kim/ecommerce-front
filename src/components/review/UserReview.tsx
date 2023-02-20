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
    <div className="flex flex-col justify-center items-center md:grid md:grid-cols-12 mb-10">
      {/* AVATAR & NAME */}
      <div className="md:col-span-2 md:mr-3 mb-3 md:mb-0 flex flex-col justify-center items-center">
        <div className="w-16 h-16 rounded-full overflow-hidden">
          <img className="w-full h-full object-cover" src={avatar} />
        </div>
        <div>{name}</div>
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
