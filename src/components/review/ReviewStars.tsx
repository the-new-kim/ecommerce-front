import { Star } from "phosphor-react";

interface IReviewStarsProps {
  rating: number;
}

export default function ReviewStars({ rating }: IReviewStarsProps) {
  return (
    <div className="flex justify-start items-center">
      {Array.from(Array(5)).map((_, index) => (
        <Star
          key={"star" + index}
          weight={index <= rating - 1 ? "fill" : "regular"}
        />
      ))}
    </div>
  );
}
