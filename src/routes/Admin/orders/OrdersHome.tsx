import { orderBy } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../../../components/AdminHeader";
import { IOrderWithId } from "../../../components/OrderCard";
import Table from "../../../components/table/Table";
import THead from "../../../components/table/THead";
import THeadRow from "../../../components/table/THeadRow";
import { orderCollection } from "../../../firebase/config";
import useFirebaseDocs from "../../../firebase/hooks/useFirebaseDocs";

import { getFirebaseDocs } from "../../../firebase/utils";
import { centToDollor } from "../../../libs/utils";

export default function OrdersHome() {
  const [orders] = useFirebaseDocs<IOrderWithId[]>(() =>
    getFirebaseDocs(orderCollection, orderBy("createdAt", "desc"))
  );
  const navigate = useNavigate();

  const onClick = (id: string) => {
    navigate(`/admin/orders/${id}`);
  };

  return (
    <>
      <AdminHeader title="Orders" />
      <Table>
        <THead>
          <THeadRow>
            <td className="text-start">Order placed</td>
            <td className="text-start">Order Id</td>
            <td className="text-start">Total</td>
            <td className="text-start">Payment Status</td>
          </THeadRow>
        </THead>
        <tbody>
          {orders?.map((order) => (
            <tr
              key={order.id}
              className="[&>*]:p-3 border-b-[1px] border-black cursor-pointer group"
              onClick={() => onClick(order.id)}
            >
              <td>{new Date(order.createdAt).toDateString()}</td>
              <td>{order.id}</td>
              <td>{centToDollor(order.paymentIntent.amount)}</td>
              <td>{order.paymentIntent.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
