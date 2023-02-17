import { useNavigate } from "react-router-dom";
import AdminHeader from "../../../components/AdminHeader";
import CreateButton from "../../../components/CreateButton";
import Table from "../../../components/table/Table";
import TBodyRow from "../../../components/table/TBodyRow";
import THead from "../../../components/table/THead";
import THeadRow from "../../../components/table/THeadRow";
import { productCollection } from "../../../firebase/config";
import useFirebaseDocs from "../../../firebase/hooks/useFirebaseDocs";

import { getFirebaseDocs } from "../../../firebase/utils";
import { centToDollor } from "../../../libs/utils";

export default function ProductsHome() {
  const products = useFirebaseDocs(() => getFirebaseDocs(productCollection));

  const navigate = useNavigate();

  const onClick = (id: string) => {
    navigate(`/admin/products/${id}`);
  };

  return (
    <>
      <AdminHeader title="Products">
        <CreateButton href="/admin/products/create" text="Create" />
      </AdminHeader>

      <Table>
        <THead>
          <THeadRow>
            <td className="text-start">Image</td>
            <td className="text-start">Title</td>
            <td className="text-start">Price</td>
            <td className="text-start">Quantity</td>
            <td className="text-start">Sold</td>
            <td className="text-start">Active</td>
          </THeadRow>
        </THead>

        <tbody>
          {products?.map((product) => (
            <TBodyRow
              key={product.id}
              className="cursor-pointer group"
              onClick={() => onClick(product.id)}
            >
              <td className="flex justify-start items-center">
                <span className="relative w-20 max-w-[40%] aspect-square mr-3 overflow-hidden">
                  <img
                    className="object-cover w-full h-full"
                    src={product.imageUrls[0]}
                  />
                </span>
              </td>
              <td className="group-hover:underline">{product.title}</td>
              <td>{centToDollor(product.price)}</td>
              <td>{product.quantity}</td>
              <td>{product.sold}</td>
              <td>{product.active ? "true" : "no"}</td>
            </TBodyRow>
          ))}
        </tbody>
      </Table>
    </>
  );
}
