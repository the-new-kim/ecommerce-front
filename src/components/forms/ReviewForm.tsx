import { useMutation, useQueryClient } from "@tanstack/react-query";
import { where } from "firebase/firestore";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { reviewCollection } from "../../firebase/config";
import { IReview, IReviewWithId } from "../../firebase/types";
import {
  addFirebaseDoc,
  getFirebaseDocs,
  updateFirebaseDoc,
} from "../../firebase/utils";
import { userAtom } from "../../libs/atoms";
import { getNumber } from "../../libs/utils";
import FieldErrorMessage from "../elements/form/FieldErrorMessage";

import Form from "../elements/form/Form";
import Input from "../elements/form/Input";
import Label from "../elements/form/Label";
import TextArea from "../elements/form/TextArea";
import Spinner from "../loaders/Spinner";
import ReviewStars from "../review/ReviewStars";

interface IReviewFormProps {
  defaultValue?: IReviewWithId;
  setShowing?: React.Dispatch<React.SetStateAction<boolean>>;
  submitValue?: string;
}

export default function ReviewForm({
  defaultValue,
  setShowing,
  submitValue,
}: IReviewFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IReview>();

  const { productId } = useParams();
  const me = useRecoilValue(userAtom);
  const queryClient = useQueryClient();

  const [rating, setRating] = useState(3);

  //   const mutation = useMutation({
  //     mutationFn: async ({ status, trackingCode }: IReviewWithId) => {
  //       const updateData = {
  //         ...defaultValue,
  //         delivery: {
  //           status,
  //           trackingCode,
  //         },
  //       };
  //       await updateFirebaseDoc(orderCollection, defaultValue.id, updateData);
  //       return updateData;
  //     },
  //     onSuccess: (data) => {
  //       queryClient.setQueryData(["order", data.id], data);
  //     },
  //   });

  const onValid = async (validData: IReview) => {
    // console.log(title, text, rating);

    console.log(validData);
    if (!defaultValue) {
      //1️⃣ Check if user already wrote a review about this product

      const foundDoc = await getFirebaseDocs(
        reviewCollection,
        where("owner", "==", validData.owner)
      );

      if (foundDoc && foundDoc.length) {
        if (setShowing) setShowing(false);
        return;
      }

      //create new

      await addFirebaseDoc(reviewCollection, {
        ...validData,
        rating: getNumber(validData.rating),
      });
    } else {
      // update
      await updateFirebaseDoc(reviewCollection, defaultValue.id, {
        ...validData,
        rating: getNumber(validData.rating),
      });
    }
    // mutation.mutate({ status, trackingCode });

    if (setShowing) setShowing(false);
    return;
  };

  // if (!productId || !me) return <Spinner />;

  return (
    <Form onSubmit={handleSubmit(onValid)} className="w-full">
      <Label>
        Title
        <Input
          type="text"
          placeholder="Title"
          defaultValue={defaultValue?.title || ""}
          {...register("title", { required: "This field is required" })}
          hasError={errors.title}
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
        />
        {errors.text && (
          <FieldErrorMessage>{errors.text.message}</FieldErrorMessage>
        )}
      </Label>

      <input
        className="hidden"
        defaultValue={productId}
        {...register("product", { required: true })}
      />

      <input
        className="hidden"
        // defaultValue={me.id}
        {...register("owner", { required: true })}
      />

      <label className="mb-2">
        <div>Rating</div>

        <div className="relative inline-block text-xl mt-1">
          <input
            className="absolute top-0 left-0 w-full opacity-0"
            type="range"
            max="5"
            step="1"
            defaultValue={defaultValue?.rating || 3}
            {...register("rating", {
              //   required: "This field is required",
              onChange(event) {
                setRating(event.target.value);
              },
            })}
          />
          <ReviewStars rating={rating} className="w-full" />
        </div>
      </label>
      <div className="flex justify-end items-center">
        <Input type="submit" value={submitValue || "Submit review"} />
      </div>
    </Form>
  );
}
