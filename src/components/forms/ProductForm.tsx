import { v4 as uuidv4 } from "uuid";

import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { firebaseDB, firebaseStorage } from "../../firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { IProduct } from "../../routes/Home";

export default function ProductForm() {
  const navigate = useNavigate();
  //   const [attachment, setAttachment] = useState<string | null>(null);

  const [attachments, setAttachments] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<IProduct>();

  const onSubmit = async ({
    title,
    label,
    description,
    price,
    quantity,
  }: IProduct) => {
    let addedDoc = null;
    let attachmentUrls = [];

    if (!!attachments.length) {
      const fileRefs = attachments.map((_) =>
        ref(firebaseStorage, `products/${uuidv4()}`)
      );

      try {
        for (let i = 0; i < attachments.length; i++) {
          const response = await uploadString(
            fileRefs[i],
            attachments[i],
            "data_url"
          );
          const attachmentUrl = await getDownloadURL(response.ref);
          attachmentUrls.push(attachmentUrl);
        }
      } catch (error) {
        console.log("ERROR:::", error);
      }

      setValue("imageUrls", attachmentUrls);
    }

    try {
      console.log("ADD NEW PRODUCT");
      addedDoc = await addDoc(collection(firebaseDB, "products"), {
        createdAt: Date.now(),
        title,
        label,
        description,
        imageUrls: attachmentUrls,
        price,
        quantity,
      });
    } catch (error) {
      console.log("ERROR:::", error);
    }

    if (addedDoc) {
      navigate(`/products/${addedDoc.id}`);
    }
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

  const onClearAttachment = (index: number) => {
    setAttachments((prev) => {
      const newArray = prev;

      newArray.splice(index, 1);

      return newArray;
    });
  };

  return (
    <>
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="text-gray-700 text-sm font-bold mb-2">
          Title
          <input
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 w-full rounded-md sm:text-sm focus:ring-1"
            type="text"
            {...register("title", { required: "This field is required" })}
          />
          {errors.title && (
            <small className="text-red-300 font-medium">
              * {errors.title.message}
            </small>
          )}
        </label>

        <label className="text-gray-700 text-sm font-bold mb-2">
          Label
          <input
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 w-full rounded-md sm:text-sm focus:ring-1"
            type="text"
            {...register("label", { required: "This field is required" })}
          />
          {errors.label && (
            <small className="text-red-300 font-medium">
              * {errors.label.message}
            </small>
          )}
        </label>

        <label className="text-gray-700 text-sm font-bold mb-2">
          Description
          <textarea
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 w-full rounded-md sm:text-sm focus:ring-1"
            placeholder="Description"
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

        <div className="flex">
          <label className="text-gray-700 text-sm font-bold mb-2 mr-2">
            Price
            <input
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 w-full rounded-md sm:text-sm focus:ring-1"
              type="number"
              placeholder="Price"
              {...register("price", {
                required: "This field is required",
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
              placeholder="Quantity"
              {...register("quantity", {
                required: "This field is required",
              })}
            />
            {errors.quantity && (
              <small className="text-red-300 font-medium">
                * {errors.quantity.message}
              </small>
            )}
          </label>
        </div>

        <label className="text-gray-700 text-sm font-bold mb-2">
          Images
          <input
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 w-full rounded-md sm:text-sm focus:ring-1"
            type="file"
            accept="image/*"
            // onChange={onFileChange}

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

        {/* {attachment && (
          <div>
            <img width={100} src={attachment} />
            <button onClick={onClearAttachment}>Clear</button>
          </div>
        )} */}

        {!!attachments.length &&
          attachments.map((attachment, index) => (
            <div key={"attachment" + index}>
              <img width={100} src={attachment} />
              <button onClick={() => onClearAttachment(index)}>Clear</button>
            </div>
          ))}

        <input
          className="mt-5 cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          value="Create"
        />
      </form>
    </>
  );
}
