import { useNavigate } from "react-router-dom";
import AdminHeader from "../../../components/AdminHeader";
import CreateButton from "../../../components/CreateButton";
import Table from "../../../components/table/Table";
import THead from "../../../components/table/THead";
import THeadRow from "../../../components/table/THeadRow";
import useFirebaseDocs from "../../../firebase/hooks/useFirebaseDocs";
import { IProductDoc } from "../../../firebase/types";
import { getFirebaseDocs } from "../../../firebase/utils";
import { centToDollor } from "../../../libs/utils";

export default function ProductsHome() {
  const products = useFirebaseDocs<IProductDoc[]>(() =>
    getFirebaseDocs("products")
  );

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
            <th className="text-start">Image</th>
            <th className="text-start">Title</th>
            <th className="text-start">Price</th>
            <th className="text-start">Quantity</th>
            <th className="text-start">Sold</th>
            <th className="text-start">Active</th>
          </THeadRow>
        </THead>
        <tbody>
          {products?.map((product) => (
            <tr
              key={product.id}
              className="[&>*]:p-3 border-b-[1px] border-black cursor-pointer group"
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
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
