import ProductForm from "../../components/forms/product/ProductForm";

import useFirebaseDocs from "../../firebase/hooks/useFirebaseDocs";
import { getFirebaseDocs } from "../../firebase/utils";

export default function AdminHome() {
  const orders = useFirebaseDocs<any[]>(() => getFirebaseDocs("orders"));

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
