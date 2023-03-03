import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";

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

interface IForm {
  review: IReview;
  username: string;
}

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
  } = useForm<IForm>();

  const { productId } = useParams();
  const [me, setMe] = useRecoilState(userAtom);

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

  const onCreateNewReview = async (validData: IForm) => {
    if (!me?.displayName) {
      setMe((prev) => {
        if (!prev) return prev;
        return { ...prev, displayName: validData.username };
      });
    }

    const newId = `${productId}${me?.id}`;

    await setFirebaseDoc(reviewCollection, newId, {
      ...validData.review,
      rating: anyToNumber(validData.review.rating),
    });

    mutation.mutate({
      ...validData.review,
      rating: anyToNumber(validData.review.rating),
      id: newId,
    });

    if (setShowing) {
      setShowing(false);
    }
  };

  const onUpdateReview = async (validData: IForm, id: string) => {
    await updateFirebaseDoc(reviewCollection, id, {
      ...validData.review,
      rating: anyToNumber(validData.review.rating),
    });

    mutation.mutate({
      ...validData.review,
      rating: anyToNumber(validData.review.rating),
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
            {...register("review.title", {
              required: "This field is required",
            })}
            hasError={errors.review?.title}
            disabled={disabled}
          />
          {errors.review?.title && (
            <FieldErrorMessage>{errors.review.title.message}</FieldErrorMessage>
          )}
        </Label>
        <Label>
          Text
          <TextArea
            placeholder="Text"
            defaultValue={defaultValue?.text || ""}
            {...register("review.text", { required: "This field is required" })}
            hasError={errors.review?.text}
            disabled={disabled}
          />
          {errors.review?.text && (
            <FieldErrorMessage>{errors.review.text.message}</FieldErrorMessage>
          )}
        </Label>

        <>
          <input
            type="hidden"
            defaultValue={productId}
            {...register("review.product", { required: true })}
          />

          <input
            type="hidden"
            defaultValue={me?.id}
            {...register("review.owner", { required: true })}
          />

          <input
            type="hidden"
            defaultValue={defaultValue?.createdAt || Date.now()}
            {...register("review.createdAt", { required: true })}
          />

          <input
            type="hidden"
            defaultValue={Date.now()}
            {...register("review.updatedAt", { required: true })}
          />
        </>

        {!me?.displayName && (
          <Label>
            Username
            <Input
              hasError={errors.username}
              {...register("username", {
                required: me?.displayName ? false : "This field is required",
              })}
              placeholder="Username"
            />
            {errors.username && (
              <FieldErrorMessage>{errors.username.message}</FieldErrorMessage>
            )}
          </Label>
        )}

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
              {...register("review.rating", {
                //   required: "This field is required",
                onChange(event) {
                  setRating(event.target.value);
                },
              })}
              disabled={disabled}
            />
            <ReviewStars rating={rating} className="w-full" />
            {errors.review?.rating && (
              <FieldErrorMessage>
                {errors.review.rating.message}
              </FieldErrorMessage>
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
