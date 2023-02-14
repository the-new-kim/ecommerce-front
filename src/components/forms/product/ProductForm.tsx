import { v4 as uuidv4 } from "uuid";
import { addDoc } from "firebase/firestore";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { firebaseStorage, productCollection } from "../../../firebase/config";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadString,
} from "firebase/storage";

import { fixPrice } from "../../../libs/utils";

import Message from "../../Message";

import AttachmentDND from "./AttachmentDND";

import { IProductWithId } from "../../../routes/Cart";
import { updateFirebaseDoc } from "../../../firebase/utils";

interface IProductFormProps {
  defaultValue?: IProductWithId;
}

export default function ProductForm({ defaultValue }: IProductFormProps) {
  const navigate = useNavigate();
  const [attachments, setAttachments] = useState<string[]>(
    defaultValue?.imageUrls || []
  );

  const formRef = useRef<HTMLFormElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty, dirtyFields },
  } = useForm<IProductWithId>();

  const onCreate = async ({
    title,
    description,
    price,
    quantity,
    active,
  }: IProductWithId) => {
    setIsUploading(true);

    const fixedPrice = fixPrice(price);

    let imageUrls: string[] = [];

    if (!!attachments.length) {
      try {
        for (let i = 0; i < attachments.length; i++) {
          const fileRef = ref(firebaseStorage, `products/${uuidv4()}`);
          const response = await uploadString(
            fileRef,
            attachments[i],
            "data_url"
          );
          const downloadUrl = await getDownloadURL(response.ref);
          imageUrls.push(downloadUrl);
        }
      } catch (error) {
        console.log("ERROR:::", error);
      }
    }

    try {
      const newProduct = await addDoc(productCollection, {
        title,
        description,
        imageUrls,
        price: parseFloat(fixedPrice) * 100,
        quantity: typeof quantity === "string" ? parseInt(quantity) : quantity,
        active,
        sold: 0,
      });

      navigate(`/products/${newProduct.id}`);
    } catch (error) {
      console.log("ERROR:::", error);
    }

    setIsUploading(false);
  };

  const onUpdate = async ({
    title,
    description,
    price,
    quantity,
    active,
  }: IProductWithId) => {
    if (!defaultValue) return;
    setIsUploading(true);

    // ⭐️ Handle Attachment

    // 1️⃣ Compare defaultValue.imageUrls & attachments
    const imageUrlsToDelete = defaultValue?.imageUrls.filter(
      (imageUrl) => !attachments.includes(imageUrl)
    );

    // console.log("To Delete:::", imageUrlsToDelete);

    // 2️⃣ Delete Image from FireStorage
    if (imageUrlsToDelete && !!imageUrlsToDelete.length) {
      for (let i = 0; i < imageUrlsToDelete.length; i++) {
        // console.log("ITEM TO DEL:::", imageUrlsToDelete[i]);
        const imageUrl = imageUrlsToDelete[i];
        const imageRef = ref(firebaseStorage, imageUrl);
        try {
          await deleteObject(imageRef);
        } catch (error) {
          console.log("ERROR:::", error);
        }
      }
    }

    // 3️⃣ Upload Image to FireStorage
    let imageUrls: string[] = [];

    for (let i = 0; i < attachments.length; i++) {
      let attachment = attachments[i];
      if (!attachment.includes("firebase")) {
        try {
          const fileRef = ref(firebaseStorage, `products/${uuidv4()}`);
          const response = await uploadString(fileRef, attachment, "data_url");
          attachment = await getDownloadURL(response.ref);
          imageUrls.push(attachment);
        } catch (error) {
          console.log("ERROR:::", error);
        }
      } else {
        imageUrls.push(attachment);
      }
    }

    // ⭐️ Handle update Firestore & Stripe Product

    //1️⃣ Update Firebase Doc
    const fixedPrice = Math.round(parseFloat(fixPrice(price)) * 100);

    // Compare old and new prices...

    try {
      await updateFirebaseDoc(productCollection, defaultValue.id, {
        title,
        description,
        imageUrls,
        price: fixedPrice,
        quantity: typeof quantity === "string" ? parseInt(quantity) : quantity,
        active,
      });
    } catch (error) {
      console.log("ERROR:::", error);
    }

    setIsUploading(false);
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;

    if (!files) return;

    const file = files[0];
    const reader = new FileReader();

    reader.onloadend = (finishedEvent) => {
      if (!finishedEvent.target || !finishedEvent.target.result) return;

      setAttachments((prev) => {
        const newArray = [...prev, finishedEvent.target!.result as string];

        return newArray;
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      {isUploading && <Message>Uploading...</Message>}
      <form
        ref={formRef}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col"
        onSubmit={
          defaultValue ? handleSubmit(onUpdate) : handleSubmit(onCreate)
        }
      >
        {/* TITLE */}
        <label className="text-gray-700 text-sm font-bold mb-2">
          Title
          <input
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 w-full rounded-md sm:text-sm focus:ring-1"
            type="text"
            defaultValue={defaultValue?.title || undefined}
            {...register("title", { required: "This field is required" })}
          />
          {errors.title && (
            <small className="text-red-300 font-medium">
              * {errors.title.message}
            </small>
          )}
        </label>

        {/* DESCRIPTION */}
        <label className="text-gray-700 text-sm font-bold mb-2">
          Description
          <textarea
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 w-full rounded-md sm:text-sm focus:ring-1"
            placeholder="Description"
            defaultValue={defaultValue?.description || undefined}
            {...register("description", {
              required: "This field is required",
              minLength: {
                value: 8,
                message: "Password must be 8 or more characters in length.",
              },
            })}
          />
          {errors.description && (
            <small className="text-red-300 font-medium">
              * {errors.description.message}
            </small>
          )}
        </label>

        {/* CATEGORY */}
        {/* <label className="text-gray-700 text-sm font-bold mb-2">
          Category
          <input
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 w-full rounded-md sm:text-sm focus:ring-1"
            type="text"
            {...register("categoryId", { required: "This field is required" })}
          />
          {errors.categoryId && (
            <small className="text-red-300 font-medium">
              * {errors.categoryId.message}
            </small>
          )}
        </label> */}

        {/* PRICE & QUANTITY & ACTIVE */}
        <div className="flex">
          <label className="text-gray-700 text-sm font-bold mb-2 mr-2">
            Price
            <input
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 w-full rounded-md sm:text-sm focus:ring-1"
              type="number"
              step="0.01"
              defaultValue={
                defaultValue?.price
                  ? fixPrice(defaultValue?.price! * 0.01)
                  : 9.99
              }
              placeholder="Price"
              {...register("price", {
                required: "This field is required",
                onBlur(event) {
                  event.target.value = fixPrice(event.target.value);
                },
              })}
            />
            {errors.price && (
              <small className="text-red-300 font-medium">
                * {errors.price.message}
              </small>
            )}
          </label>

          <label className="text-gray-700 text-sm font-bold mb-2">
            Quantity
            <input
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 w-full rounded-md sm:text-sm focus:ring-1"
              type="number"
              min={1}
              defaultValue={defaultValue?.quantity || 100}
              placeholder="Quantity"
              {...register("quantity", {
                required: "This field is required",
                min: { value: 1, message: "The value should be bigger than 1" },
              })}
            />
            {errors.quantity && (
              <small className="text-red-300 font-medium">
                * {errors.quantity.message}
              </small>
            )}
          </label>

          <label className="text-gray-700 text-sm font-bold mb-2 flex flex-col">
            Active
            <div className="w-full h-full flex justify-center items-center">
              <input
                className="mt-1 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 rounded-md sm:text-sm focus:ring-1"
                type="checkbox"
                defaultChecked={defaultValue?.active === false ? false : true}
                {...register("active")}
              />
            </div>
          </label>
        </div>

        {/* IMAGES */}
        <label className="text-gray-700 text-sm font-bold mb-2">
          Images
          <input
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 w-full rounded-md sm:text-sm focus:ring-1"
            type="file"
            accept="image/*"
            {...register("imageUrls", {
              onChange: onFileChange,
              validate: () => attachments.length > 0 || "No Images",
            })}
          />
          {errors.imageUrls && (
            <small className="text-red-300 font-medium">
              * {errors.imageUrls.message}
            </small>
          )}
        </label>

        {!!attachments.length && (
          <AttachmentDND
            attachments={attachments}
            setAttachments={setAttachments}
          />
        )}

        <input
          className="mt-5 cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline
          disabled:bg-blue-200 disabled:cursor-default"
          type="submit"
          value={defaultValue ? "Save" : "Create"}
          disabled={disabled || isUploading}
        />
      </form>
    </>
  );
}
