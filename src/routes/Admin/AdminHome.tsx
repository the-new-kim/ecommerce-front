import ProductForm from "../../components/forms/ProductForm";

import useFirebaseDocs from "../../firebase/hooks/useFirebaseDocs";
import { getFirebaseDocs } from "../../firebase/utils";
import { IOrder } from "../../libs/atoms";

export default function AdminHome() {
  const orders = useFirebaseDocs<IOrder[]>(() => getFirebaseDocs("orders"));

  console.log(
    "ORDERS:::",
    orders?.map((order) => order.orderer)
  );

  return (
    <div>
      <h1>Dash board</h1>
    </div>
  );
}
