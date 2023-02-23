import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import AdminHeader from "../../../components/AdminHeader";
import Empty from "../../../components/Empty";
import OrderForm from "../../../components/forms/OrderForm";
import OrderCard from "../../../components/OrderCard";
import { orderCollection } from "../../../firebase/config";

import { getFirebaseDoc } from "../../../firebase/utils";

export default function OrderDetail() {
  const { id } = useParams();

  const { data: order, refetch } = useQuery(["order", id], () =>
    getFirebaseDoc(orderCollection, id)
  );

  return (
    <>
      {!order ? (
        <Empty>Order with ID "{id}" does not exist</Empty>
      ) : (
        <>
          <AdminHeader title="Order detail" />
          <OrderCard order={order} />
          <OrderForm defaultValue={order} refetch={refetch} />
        </>
      )}
    </>
  );
}
