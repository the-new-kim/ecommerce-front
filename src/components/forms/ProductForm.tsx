import { v4 as uuidv4 } from "uuid";

import { addDoc, collection } from "firebase/firestore";
import { useRef, useState } from "react";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { firebaseDB, firebaseStorage } from "../../firebase/config";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";

import { IProduct } from "../../routes/Home";
import { cls, fixPrice } from "../../libs/utils";
import { ArrowsHorizontal, Trash } from "phosphor-react";

import { createStripeProduct } from "../../libs/api";
import Message from "../Message";

export default function ProductForm() {
  const navigate = useNavigate();
  const [attachments, setAttachments] = useState<string[]>([]);

  const formRef = useRef<HTMLFormElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IProduct>();

  const onSubmit = async ({
    title,
    label,
    description,
    price,
    quantity,
    active,
  }: IProduct) => {
    setIsUploading(true);

    const fixedPrice = fixPrice(price);

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
    }

    try {
      const newProduct = await addDoc(collection(firebaseDB, "products"), {
        createdAt: Date.now(),
        title,
        label,
        description,
        imageUrls: attachmentUrls,
        price: fixedPrice,
        quantity,
        active,
      });

      const default_price_data = {
        unit_amount: Number(fixedPrice) * 100,
        currency: "usd",
      };

      const stripeProductResult = await createStripeProduct({
        name: title,
        id: newProduct.id,
        images: [],
        default_price_data,
        active,
      });

      console.log("STRIPE PRODUCT::", stripeProductResult);

      navigate(`/products/${newProduct.id}`);
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

  const onClearAttachment = (index: number) => {
    setAttachments((prev) => {
      const newArray = prev;
      newArray.splice(index, 1);

      return newArray;
    });
  };

  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination || destination.index === source.index) return;

    setAttachments((prev) => {
      const newArray = [...prev];
      const draggingItem = newArray[source.index];

      newArray.splice(source.index, 1);
      newArray.splice(destination.index, 0, draggingItem);

      return newArray;
    });
  };

  return (
    <>
      {isUploading && <Message>Uploading...</Message>}
      <form
        ref={formRef}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* TITLE */}
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

        {/* LABEL */}
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

        {/* DESCRIPTION */}
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
              defaultValue={9.99}
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
              defaultValue={100}
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

          <label className="text-gray-700 text-sm font-bold mb-2">
            Active
            <input
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 w-full rounded-md sm:text-sm focus:ring-1"
              type="checkbox"
              defaultChecked
              {...register("active")}
            />
            {errors.active && (
              <small className="text-red-300 font-medium">
                * {errors.active.message}
              </small>
            )}
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
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="images" direction="horizontal">
              {(magic) => (
                <div
                  className="flex justify-start items-center bg-white border shadow-sm border-slate-300 rounded-md p-3 overflow-x-scroll"
                  ref={magic.innerRef}
                  {...magic.droppableProps}
                >
                  {attachments.map((attachment, index) => (
                    <Draggable
                      draggableId={"attachment" + index}
                      key={"attachment" + index}
                      index={index}
                    >
                      {(magic) => (
                        <div
                          className={`${cls(index === 0 ? "ml-0" : "ml-3")}
                          flex flex-col h-full w-60 bg-white border shadow-sm border-slate-300 rounded-md aspect-square overflow-hidden`}
                          ref={magic.innerRef}
                          {...magic.draggableProps}
                          {...magic.dragHandleProps}
                        >
                          <div className="text-xl p-2 flex justify-between items-center">
                            <ArrowsHorizontal />
                            <Trash
                              className="cursor-pointer"
                              onClick={() => onClearAttachment(index)}
                            />
                          </div>
                          <img
                            className="w-full h-full object-cover"
                            src={attachment}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {magic.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        )}

        <input
          className="mt-5 cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          value="Create"
        />
      </form>
    </>
  );
}
