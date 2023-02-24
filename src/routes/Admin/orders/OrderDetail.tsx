import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import AdminHeader from "../../../components/AdminHeader";
import Empty from "../../../components/Empty";
import OrderForm from "../../../components/forms/OrderForm";
import Spinner from "../../../components/loaders/Spinner";
import OrderCard from "../../../components/OrderCard";
import { orderCollection } from "../../../firebase/config";

import { getFirebaseDoc } from "../../../firebase/utils";

export default function OrderDetail() {
  const { id } = useParams();

  const {
    data: order,
    isLoading,
    error,
  } = useQuery(["order", id], () => getFirebaseDoc(orderCollection, id));

  if (error) return <Empty>{`${error}`}</Empty>;
  if (!order || isLoading)
    return (
      <Empty>
        <Spinner />
      </Empty>
    );

  return (
    <>
      <AdminHeader title="Order detail" />
      <OrderCard order={order} />
      <OrderForm defaultValue={order} />
    </>
  );
}
