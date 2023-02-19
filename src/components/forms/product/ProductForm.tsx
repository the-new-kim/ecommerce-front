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
import ErrorMessage from "../../elements/form/ErrorMessage";
import TextArea from "../../elements/form/TextArea";

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
            defaultValue={defaultValue?.title || undefined}
            {...register("title", { required: "This field is required" })}
          />
          {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
        </Label>

        {/* DESCRIPTION */}
        <Label>
          Description
          <TextArea
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
            <ErrorMessage>{errors.description.message}</ErrorMessage>
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
        <Label>
          Images
          <Input
            className="!border-none"
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
        </Label>

        {!!attachments.length && (
          <AttachmentDND
            attachments={attachments}
            setAttachments={setAttachments}
          />
        )}

        <Input
          type="submit"
          value={defaultValue ? "Save" : "Create"}
          disabled={disabled || isUploading}
        />
      </Form>
    </>
  );
}
