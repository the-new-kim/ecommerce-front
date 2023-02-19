import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { IShipping } from "../../firebase/types";
import { userAtom } from "../../libs/atoms";
import ErrorMessage from "../elements/form/ErrorMessage";
import Form from "../elements/form/Form";
import Input from "../elements/form/Input";
import Label from "../elements/form/Label";

interface ICheckoutInfromationFormProps {
  actionUrl?: string;
  submitValue?: string;
}

export default function ShippingInformationForm({
  actionUrl,
  submitValue = "Save",
}: ICheckoutInfromationFormProps) {
  const [me, setMe] = useRecoilState(userAtom);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isDirty },
  } = useForm<IShipping>();

  useEffect(() => {}, []);

  const onSubmit = async ({ name, phone, address }: IShipping) => {
    if (isDirty) {
      setMe((oldMe) => {
        if (!oldMe) return oldMe;

        const newMe = { ...oldMe };
        newMe.shipping = {
          name,
          address,
          phone,
        };

        return newMe;
      });
    }

    if (actionUrl) {
      navigate(actionUrl);
    }
  };

  return (
    <>
      {/* <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit(onSubmit)}
      > */}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Label>
          Name
          <Input
            type="text"
            placeholder="Name"
            defaultValue={me?.shipping?.name || undefined}
            hasError={errors.name ? true : false}
            {...register("name", { required: "This field is required" })}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </Label>

        <Label>
          Telephone number
          <Input
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            type="text"
            placeholder="Telephone number"
            defaultValue={me?.shipping?.phone || undefined}
            hasError={errors.phone ? true : false}
            {...register("phone", {
              required: "This field is required",
            })}
          />
          {errors.phone && <ErrorMessage>{errors.phone.message}</ErrorMessage>}
        </Label>
        {/* ADDRESS */}
        <Label>
          Address
          <Input
            hasError={errors.address?.line1 ? true : false}
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            type="text"
            placeholder="Address"
            defaultValue={me?.shipping?.address.line1 || undefined}
            {...register("address.line1", {
              required: "This field is required",
            })}
          />
          {errors.address?.line1 && (
            <ErrorMessage>{errors.address.line1.message}</ErrorMessage>
          )}
        </Label>
        <Label>
          Additional address field
          <Input
            hasError={errors.address?.line2 ? true : false}
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            type="text"
            placeholder="Additional address field"
            defaultValue={me?.shipping?.address.line2 || undefined}
            {...register("address.line2", {
              required: "This field is required",
            })}
          />
          {errors.address?.line2 && (
            <ErrorMessage>{errors.address.line2.message}</ErrorMessage>
          )}
        </Label>
        <Label>
          Postal code
          <Input
            hasError={errors.address?.postal_code ? true : false}
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            type="text"
            placeholder="Postal code"
            defaultValue={me?.shipping?.address.postal_code || undefined}
            {...register("address.postal_code", {
              required: "This field is required",
            })}
          />
          {errors.address?.postal_code && (
            <ErrorMessage>{errors.address.postal_code.message}</ErrorMessage>
          )}
        </Label>
        <Label>
          City
          <Input
            hasError={errors.address?.city ? true : false}
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            type="text"
            placeholder="City"
            defaultValue={me?.shipping?.address.city || undefined}
            {...register("address.city", {
              required: "This field is required",
            })}
          />
          {errors.address?.city && (
            <ErrorMessage>{errors.address.city.message}</ErrorMessage>
          )}
        </Label>
        <Label>
          State
          <Input
            hasError={errors.address?.state ? true : false}
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            type="text"
            placeholder="State"
            defaultValue={me?.shipping?.address.state || undefined}
            {...register("address.state", {
              required: "This field is required",
            })}
          />
          {errors.address?.state && (
            <ErrorMessage>{errors.address.state.message}</ErrorMessage>
          )}
        </Label>
        <Label>
          Country
          <Input
            hasError={errors.address?.country ? true : false}
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            type="text"
            placeholder="Country"
            defaultValue={me?.shipping?.address.country || undefined}
            {...register("address.country", {
              required: "This field is required",
            })}
          />
          {errors.address?.country && (
            <ErrorMessage>{errors.address.country.message}</ErrorMessage>
          )}
        </Label>

        <input
          className="bg-black hover:bg-white text-white hover:text-black border-black border-[1px] py-2 px-4 duration-300 cursor-pointer mt-5"
          type="submit"
          value={submitValue}
        />
      </Form>
      {/* </form> */}
    </>
  );
}
