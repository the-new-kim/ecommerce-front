import { Star } from "phosphor-react";
import { cls } from "../../libs/utils";

interface IReviewStarsProps {
  rating?: number;
  className?: string;
}

export default function ReviewStars({ rating, className }: IReviewStarsProps) {
  return (
    <div
      className={
        "flex justify-start items-center " +
        cls(
          typeof rating === "undefined" ? "text-slate-200 " : "text-red-500 "
        ) +
        className
      }
    >
      {Array.from(Array(5)).map((_, index) => (
        <Star
          key={"star" + index}
          weight={
            (rating && index <= rating - 1) || !rating ? "fill" : "regular"
          }
        />
      ))}
    </div>
  );
}
