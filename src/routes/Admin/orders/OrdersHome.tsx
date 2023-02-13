import { useNavigate } from "react-router-dom";
import AdminHeader from "../../../components/AdminHeader";
import Table from "../../../components/table/Table";
import THead from "../../../components/table/THead";
import THeadRow from "../../../components/table/THeadRow";
import H3 from "../../../components/typos/H3";
import useFirebaseDocs from "../../../firebase/hooks/useFirebaseDocs";
import { getFirebaseDocs } from "../../../firebase/utils";

export default function OrdersHome() {
  const orders = useFirebaseDocs<any[]>(() => getFirebaseDocs("orders"));
  const navigate = useNavigate();

  const onClick = (id: string) => {
    navigate(`/admin/orders/${id}`);
  };

  console.log(orders);

  return (
    <>
      <AdminHeader title="Orders" />
      <Table>
        <THead>
          <THeadRow>
            <th className="text-start">ID</th>
          </THeadRow>
        </THead>
        <tbody>
          {orders?.map((order) => (
            <tr
              key={order.id}
              className="[&>*]:p-3 border-b-[1px] border-black cursor-pointer group"
              onClick={() => onClick(order.id)}
            >
              <td className="group-hover:underline">{order.id}</td>
            </tr>
          ))}
          {/* {orders?.map((order) => (
            <tr
              key={order.id}
              className="[&>*]:p-3 border-b-[1px] border-black cursor-pointer group"
              onClick={() => onorderClick(order.id)}
            >
      
                  <td className="flex justify-start items-center">
                    <span className="relative w-20 max-w-[40%] aspect-square mr-3 overflow-hidden">
                      <img
                        className="object-cover w-full h-full"
                        src={order.imageUrls[0]}
                      />
                    </span>
                  </td>
                  <td className="group-hover:underline">{order.title}</td>
                  <td>{centToDollor(order.price)}</td>
                  <td>{order.quantity}</td>
                  <td>{order.sold}</td>
                  <td>{order.active ? "true" : "no"}</td>
      
            </tr>
          ))} */}
        </tbody>
      </Table>
    </>
  );
}
