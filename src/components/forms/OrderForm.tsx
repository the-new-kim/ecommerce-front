import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { orderCollection } from "../../firebase/config";
import { EDeliveryStatus, IDelivery } from "../../firebase/types";
import { updateFirebaseDoc } from "../../firebase/utils";
import { makeFirstLetterBig } from "../../libs/utils";
import Form from "../elements/form/Form";
import Input from "../elements/form/Input";
import Label from "../elements/form/Label";
import { IOrderWithId } from "../OrderCard";

interface IOrderFormProps {
  defaultValue: IOrderWithId;
}

export default function OrderForm({ defaultValue }: IOrderFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IDelivery>();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ status, trackingCode }: IDelivery) => {
      const updateData = {
        ...defaultValue,
        delivery: {
          status,
          trackingCode,
        },
      };
      await updateFirebaseDoc(orderCollection, defaultValue.id, updateData);
      return updateData;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["order", data.id], data);
    },
  });

  const onValid = async ({ status, trackingCode }: IDelivery) => {
    mutation.mutate({ status, trackingCode });
  };

  return (
    <Form onSubmit={handleSubmit(onValid)}>
      <Label>
        Delivery status
        {/* <Input {...register("status")} /> */}
        <select
          className="border-[1px] border-black py-2 px-4"
          {...register("status")}
          defaultValue={defaultValue.delivery.status}
        >
          {Object.values(EDeliveryStatus).map((value) => (
            <option key={value} value={value}>
              {makeFirstLetterBig(value)}
            </option>
          ))}
        </select>
      </Label>
      <Label>
        Tracking code
        <Input
          type="text"
          placeholder="Tracking code"
          defaultValue={defaultValue.delivery.trackingCode || ""}
          {...register("trackingCode")}
        />
      </Label>
      <Input type="submit" value="Save" />
    </Form>
  );
}
