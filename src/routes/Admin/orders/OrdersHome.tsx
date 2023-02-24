import { useQuery } from "@tanstack/react-query";
import { orderBy } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../../../components/AdminHeader";
import Figure from "../../../components/elements/Figure";
import Empty from "../../../components/Empty";
import Spinner from "../../../components/loaders/Spinner";
import Table from "../../../components/table/Table";
import THead from "../../../components/table/THead";
import THeadRow from "../../../components/table/THeadRow";
import { orderCollection } from "../../../firebase/config";

import { getFirebaseDocs } from "../../../firebase/utils";
import { centToDollor, cls, makeFirstLetterBig } from "../../../libs/utils";

export default function OrdersHome() {
  const {
    data: orders,
    isLoading,
    error,
  } = useQuery(["orders"], () =>
    getFirebaseDocs(orderCollection, orderBy("createdAt", "desc"))
  );

  const navigate = useNavigate();

  const onClick = (id: string) => {
    navigate(`/admin/orders/${id}`);
  };

  if (error) return <Empty>{`${error}`}</Empty>;

  if (isLoading || !orders)
    return (
      <Empty>
        <Spinner />
      </Empty>
    );

  if (!orders.length) return <Empty>No orders</Empty>;

  return (
    <>
      <AdminHeader title="Orders" />
      <Figure>
        <Table>
          <THead className="bg-black text-white">
            <THeadRow>
              <td className="text-start">Order placed</td>
              <td className="text-start">Order Id</td>
              <td className="text-start">Total</td>
              <td className="text-start">Payment</td>
              <td className="text-start">Delivery</td>
            </THeadRow>
          </THead>
          <tbody>
            {orders?.map((order, index) => (
              <tr
                key={order.id}
                className={
                  "[&>*]:p-3 border-b-[1px] border-black cursor-pointer group " +
                  cls(index === orders.length - 1 ? "!border-b-0" : "")
                }
                onClick={() => onClick(order.id)}
              >
                <td>{new Date(order.createdAt).toDateString()}</td>
                <td>{order.id}</td>
                <td>{centToDollor(order.paymentIntent.amount)}</td>
                <td>{makeFirstLetterBig(order.paymentIntent.status)}</td>
                <td>{makeFirstLetterBig(order.delivery.status)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Figure>
    </>
  );
}
