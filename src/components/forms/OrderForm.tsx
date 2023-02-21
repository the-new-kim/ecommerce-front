import { useForm } from "react-hook-form";
import { orderCollection } from "../../firebase/config";
import { EDeliveryStatus, IDelivery } from "../../firebase/types";
import { updateFirebaseDoc } from "../../firebase/utils";
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
    watch,
    setError,
    formState: { errors },
  } = useForm<IDelivery>();

  const onValid = async ({ status, trackingCode }: IDelivery) => {
    let trackingCodeRequired = false;

    switch (status) {
      case EDeliveryStatus.ORDERED:
        break;
      case EDeliveryStatus.SHIPPED:
        trackingCodeRequired = true;
        break;
      case EDeliveryStatus.DELIVERED:
        break;
    }

    if (trackingCodeRequired && !trackingCode) {
      console.log("set errors and do something");
      // set errors
      // stop
    } else {
      // update
      console.log("alles ok goahead");

      await updateFirebaseDoc(orderCollection, defaultValue.id, {
        ...defaultValue,
        delivery: {
          status,
          trackingCode,
        },
      });
    }
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
              {value.charAt(0).toLocaleUpperCase() + value.slice(1)}
            </option>
          ))}
        </select>
      </Label>
      <Label>
        Tracking code
        <Input
          type="text"
          placeholder="Tracking code"
          {...register("trackingCode")}
        />
      </Label>
      <Input type="submit" />
    </Form>
  );
}
