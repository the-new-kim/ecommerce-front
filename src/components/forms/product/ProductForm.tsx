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
import Form from "../../elements/form/Form";
import Label from "../../elements/form/Label";
import Input from "../../elements/form/Input";
import FieldErrorMessage from "../../elements/form/FieldErrorMessage";
import TextArea from "../../elements/form/TextArea";
import { UploadSimple } from "phosphor-react";
import Heading from "../../elements/typos/Heading";
import ReactPlayer from "react-player";

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

  const [isDragEnter, setIsDragEnter] = useState(false);

  const {
    register,
    handleSubmit,
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
        createdAt: Date.now(),
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

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    // console.log("DRAG OVER");
    event.preventDefault(); // Prevent default behavior (Prevent file from being opened)
  };

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault(); // Prevent default behavior (Prevent file from being opened)
    event.stopPropagation();

    if (event.dataTransfer.files) {
      for (let i = 0; i < event.dataTransfer.items.length; i++) {
        const item = event.dataTransfer.items[i];
        // If dropped items aren't files, reject them
        if (item.kind !== "file" || !item.type.includes("image")) return;

        let file = item.getAsFile();
        if (!file) return;

        const reader = new FileReader();

        reader.onloadend = (finishedEvent) => {
          if (!finishedEvent.target || !finishedEvent.target.result) return;

          setAttachments((prev) => {
            const newArray = [...prev, finishedEvent.target!.result as string];

            return newArray;
          });
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const onDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    console.log("DRAG ENTER");
    if (isDragEnter) return;
    setIsDragEnter(true);
  };

  return (
    <>
      {isUploading && <Message>Uploading...</Message>}
      <Form
        ref={formRef}
        onSubmit={
          defaultValue ? handleSubmit(onUpdate) : handleSubmit(onCreate)
        }
      >
        {/* TITLE */}
        <Label>
          Title
          <Input
            hasError={errors.title ? true : false}
            type="text"
            placeholder="Title"
            defaultValue={defaultValue?.title || undefined}
            {...register("title", { required: "This field is required" })}
          />
          {errors.title && (
            <FieldErrorMessage>{errors.title.message}</FieldErrorMessage>
          )}
        </Label>

        {/* DESCRIPTION */}
        <Label>
          Description
          <TextArea
            rows="10"
            hasError={errors.description ? true : false}
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
            <FieldErrorMessage>{errors.description.message}</FieldErrorMessage>
          )}
        </Label>

        {/* PRICE & QUANTITY & ACTIVE */}
        <div className="flex [&>*]:mr-3">
          <Label>
            Price
            <Input
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
          </Label>

          <Label>
            Quantity
            <Input
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
          </Label>

          <Label>
            Active
            <div className="w-full h-full flex justify-center items-center">
              <Input
                type="checkbox"
                defaultChecked={defaultValue?.active === false ? false : true}
                {...register("active")}
              />
            </div>
          </Label>
        </div>

        {/* IMAGES */}
        <div className="mb-2 flex flex-col">
          Images
          <div
            onDragOver={onDragOver}
            onDrop={onDrop}
            onDragEnter={onDragEnter}
            // onDragLeave={onDragLeave}
            className="relative border-[1px] border-black"
          >
            {/* <div className="absolute top-0 left-0 w-full h-full -z-10 flex justify-center items-center overflow-hidden">
              Drop file here
              <div className="absolute top-0 left-0 w-[400%] h-full -z-10 bg-gradient-to-tr from-slate-200 to-orange-300" />
            </div> */}

            <label>
              <div className="px-3 py-2 flex justify-center items-center">
                <div
                  className="flex justify-center items-center px-3 py-2 border-[1px] border-black cursor-pointer
                bg-black text-white hover:bg-white hover:text-black duration-300 transition-colors
                "
                >
                  <UploadSimple className="mr-2" />
                  <span>Upload image</span>
                </div>
              </div>
              <input
                className="hidden"
                type="file"
                accept="image/*"
                {...register("imageUrls", {
                  onChange: onFileChange,
                  validate: () =>
                    attachments.length > 0 || "Add at least 1 Image",
                })}
              />
            </label>
            <div className="min-h-[15rem] h-full">
              {!!attachments.length && (
                <AttachmentDND
                  attachments={attachments}
                  setAttachments={setAttachments}
                />
              )}

              <div className="absolute top-0 left-0 w-full h-full -z-10 flex justify-center items-center overflow-hidden">
                {!attachments.length && (
                  <Heading tagName="h2">🔥 Drop it like it's hot 🔥</Heading>
                )}

                <div
                  style={{
                    opacity: isDragEnter ? 100 : 0,
                    transition: "opacity ease-out 300ms",
                  }}
                  className="absolute -top-[50%] -left-[50%] w-full min-w-[200%] h-full min-h-[200%] flex justify-center items-center -z-10"
                >
                  <ReactPlayer
                    url="https://www.youtube.com/watch?v=GtUVQei3nX4&ab_channel=SnoopDoggVEVO"
                    controls={false}
                    playing
                    muted
                    loop
                    style={{
                      minWidth: "100%",
                      minHeight: "100%",
                      zIndex: -100,
                      pointerEvents: "none",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          {errors.imageUrls && (
            <FieldErrorMessage>{errors.imageUrls.message}</FieldErrorMessage>
          )}
        </div>

        <Input
          type="submit"
          value={defaultValue ? "Save" : "Create"}
          disabled={disabled || isUploading}
        />
      </Form>
    </>
  );
}
