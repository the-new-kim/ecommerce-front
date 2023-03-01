import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { reviewCollection } from "../../firebase/config";
import { IReview, IReviewWithId } from "../../firebase/types";
import { setFirebaseDoc, updateFirebaseDoc } from "../../firebase/utils";

import { userAtom } from "../../libs/atoms";
import { anyToNumber, cls } from "../../libs/utils";

import Form from "../elements/form/Form";
import Input from "../elements/form/Input";
import Label from "../elements/form/Label";
import TextArea from "../elements/form/TextArea";
import FieldErrorMessage from "../elements/form/FieldErrorMessage";
import Button from "../elements/Button";

import ReviewStars from "../review/ReviewStars";

interface IReviewFormProps {
  defaultValue?: IReviewWithId | null;
  setShowing?: React.Dispatch<React.SetStateAction<boolean>>;
  submitValue?: string;
  reviews: IReviewWithId[];
}

export default function ReviewForm({
  defaultValue,
  setShowing,
  submitValue,
  reviews,
}: IReviewFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IReview>();

  const { productId } = useParams();
  const me = useRecoilValue(userAtom);

  const [disabled, setDisabled] = useState(false);
  const [rating, setRating] = useState(defaultValue ? defaultValue.rating : 5);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (myReview: IReviewWithId) => {
      // console.log("myReview:::", myReview);

      const reviewIndex = reviews.findIndex(
        (oldReview) => oldReview.id === myReview.id
      );

      if (reviewIndex < 0) {
        console.log("review not exists in reviews...");
        return [myReview, ...reviews];
      }
      const newReviews = [...reviews];

      newReviews.splice(reviewIndex, 1, myReview);

      return newReviews;
    },
    onSuccess: (data, context) => {
      queryClient.setQueryData(["myReview", productId], context);
      queryClient.setQueryData(["reviews", productId], data);
    },
  });

  useEffect(() => {
    if (!me || !productId) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [me, productId]);

  const onCreateNewReview = async (validData: IReview) => {
    // await addFirebaseDoc(reviewCollection, {
    //   ...validData,
    //   rating: anyToNumber(validData.rating),
    // });
    const newId = `${productId}r${reviews.length}`;

    await setFirebaseDoc(reviewCollection, newId, {
      ...validData,
      rating: anyToNumber(validData.rating),
    });

    mutation.mutate({
      ...validData,
      rating: anyToNumber(validData.rating),
      id: newId,
    });

    if (setShowing) {
      setShowing(false);
    }
  };

  const onUpdateReview = async (validData: IReview, id: string) => {
    await updateFirebaseDoc(reviewCollection, id, {
      ...validData,
      rating: anyToNumber(validData.rating),
    });

    mutation.mutate({
      ...validData,
      rating: anyToNumber(validData.rating),
      id,
    });

    if (setShowing) {
      setShowing(false);
    }
  };

  return (
    <div className="w-full">
      <Form
        onSubmit={handleSubmit(
          !defaultValue
            ? onCreateNewReview
            : (e) => onUpdateReview(e, defaultValue.id)
        )}
        className={"w-full " + cls(disabled ? "opacity-30" : "opacity-100")}
      >
        <Label>
          Title
          <Input
            type="text"
            placeholder="Title"
            defaultValue={defaultValue?.title || ""}
            {...register("title", { required: "This field is required" })}
            hasError={errors.title}
            disabled={disabled}
          />
          {errors.title && (
            <FieldErrorMessage>{errors.title.message}</FieldErrorMessage>
          )}
        </Label>
        <Label>
          Text
          <TextArea
            placeholder="Text"
            defaultValue={defaultValue?.text || ""}
            {...register("text", { required: "This field is required" })}
            hasError={errors.text}
            disabled={disabled}
          />
          {errors.text && (
            <FieldErrorMessage>{errors.text.message}</FieldErrorMessage>
          )}
        </Label>
        <div className="hidden">
          <input
            defaultValue={productId}
            {...register("product", { required: true })}
          />

          <input
            defaultValue={me?.id}
            {...register("owner", { required: true })}
          />

          <input
            defaultValue={defaultValue?.createdAt || Date.now()}
            {...register("createdAt", { required: true })}
          />

          <input
            defaultValue={Date.now()}
            {...register("updatedAt", { required: true })}
          />
        </div>
        <label className="mb-2">
          <div>Rating</div>

          <div className="relative inline-block text-xl mt-1">
            <input
              className="absolute top-0 left-0 w-full opacity-0 cursor-ew-resize disabled:cursor-not-allowed"
              type="range"
              max="5"
              min="1"
              step="1"
              defaultValue={rating}
              {...register("rating", {
                //   required: "This field is required",
                onChange(event) {
                  setRating(event.target.value);
                },
              })}
              disabled={disabled}
            />
            <ReviewStars rating={rating} className="w-full" />
            {errors.rating && (
              <FieldErrorMessage>{errors.rating.message}</FieldErrorMessage>
            )}
          </div>
        </label>
        <div className="flex justify-end items-center">
          <Input
            type="submit"
            value={submitValue || "Submit review"}
            disabled={disabled}
          />
        </div>
      </Form>

      {disabled && (
        <div className="absolute inset-0 flex justify-center items-center w-full h-full">
          <Button link="/auth" className=" bg-black text-white p-5">
            Please Login first to leave a review
          </Button>
        </div>
      )}
    </div>
  );
}
