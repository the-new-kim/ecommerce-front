import { useParams } from "react-router-dom";
import AdminHeader from "../../../components/AdminHeader";
import Empty from "../../../components/Empty";
import OrderForm from "../../../components/forms/OrderForm";
import OrderCard, { IOrderWithId } from "../../../components/OrderCard";
import { orderCollection } from "../../../firebase/config";
import useFirebaseDocs from "../../../firebase/hooks/useFirebaseDocs";
import { getFirebaseDoc } from "../../../firebase/utils";

export default function OrderDetail() {
  const { id } = useParams();
  const [order, orderFetcher] = useFirebaseDocs<IOrderWithId>(() =>
    getFirebaseDoc(orderCollection, id!)
  );

  return (
    <>
      {!order ? (
        <Empty>Order with ID "{id}" does not exist</Empty>
      ) : (
        <>
          <AdminHeader title="Order detail" />
          <OrderCard order={order} />
          <OrderForm defaultValue={order} fetcher={orderFetcher} />
        </>
      )}
    </>
  );
}
