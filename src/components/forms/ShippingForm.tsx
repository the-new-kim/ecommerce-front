import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { IShipping } from "../../firebase/types";
import { userAtom } from "../../libs/atoms";

interface IShippingFormProps {
  onCheckoutClick: () => Promise<void>;
}

export default function ShippingForm({ onCheckoutClick }: IShippingFormProps) {
  const [me, setMe] = useRecoilState(userAtom);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<IShipping>();

  useEffect(() => {}, []);

  const onSubmit = async ({ name, phone, address }: IShipping) => {
    // 1️⃣ check if user has already

    onCheckoutClick();
  };

  return (
    <>
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Name
          <input
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            type="text"
            placeholder="Name"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <small className="text-red-300 font-medium">
              * {errors.name.message}
            </small>
          )}
        </label>

        <label className="block text-gray-700 text-sm font-bold mb-2">
          Telephone number
          <input
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            type="text"
            placeholder="Telephone number"
            {...register("phone", {
              required: true,
            })}
          />
          {errors.phone && (
            <small className="text-red-300 font-medium">
              * {errors.phone.message}
            </small>
          )}
        </label>
        {/* ADDRESS */}
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Address
          <input
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            type="text"
            placeholder="Address"
            {...register("address.line1", {
              required: true,
            })}
          />
          {errors.address?.line1 && (
            <small className="text-red-300 font-medium">
              * {errors.address?.line1.message}
            </small>
          )}
        </label>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Additional address field
          <input
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            type="text"
            placeholder="Additional address field"
            {...register("address.line2", {
              required: true,
            })}
          />
          {errors.address?.line2 && (
            <small className="text-red-300 font-medium">
              * {errors.address?.line2.message}
            </small>
          )}
        </label>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Postal code
          <input
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            type="text"
            placeholder="Postal code"
            {...register("address.postal_code", {
              required: true,
            })}
          />
          {errors.address?.postal_code && (
            <small className="text-red-300 font-medium">
              * {errors.address?.postal_code.message}
            </small>
          )}
        </label>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          City
          <input
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            type="text"
            placeholder="City"
            {...register("address.city", {
              required: true,
            })}
          />
          {errors.address?.city && (
            <small className="text-red-300 font-medium">
              * {errors.address?.city.message}
            </small>
          )}
        </label>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Country
          <input
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            type="text"
            placeholder="Country"
            {...register("address.country", {
              required: true,
            })}
          />
          {errors.address?.country && (
            <small className="text-red-300 font-medium">
              * {errors.address?.country.message}
            </small>
          )}
        </label>

        <input
          className="mt-5 cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          value="Continue to payment"
        />
      </form>
    </>
  );
}