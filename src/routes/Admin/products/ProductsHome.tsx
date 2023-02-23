import { useQuery } from "@tanstack/react-query";
import { orderBy } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import AdminHeader from "../../../components/AdminHeader";
import Button from "../../../components/elements/Button";
import SquareImage from "../../../components/SquareImage";
import Table from "../../../components/table/Table";
import TBodyRow from "../../../components/table/TBodyRow";
import THead from "../../../components/table/THead";
import THeadRow from "../../../components/table/THeadRow";
import { productCollection } from "../../../firebase/config";

import { getFirebaseDocs } from "../../../firebase/utils";
import { headerHeightAtom } from "../../../libs/atoms";
import { centToDollor } from "../../../libs/utils";

export default function ProductsHome() {
  const headerHeight = useRecoilValue(headerHeightAtom);

  const { data: products } = useQuery(["products"], () =>
    getFirebaseDocs(productCollection, orderBy("createdAt", "desc"))
  );

  const navigate = useNavigate();

  const onClick = (id: string) => {
    navigate(`/admin/products/${id}`);
  };

  return (
    <>
      <AdminHeader title="Products">
        <Button link="/admin/products/create">Create</Button>
      </AdminHeader>

      {products && products.length ? (
        <Table className="border-[1px] border-black">
          <THead
            className="bg-black text-white sticky z-10"
            style={{ top: headerHeight }}
          >
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
            {products.map((product) => (
              <TBodyRow
                key={product.id}
                className="cursor-pointer group"
                onClick={() => onClick(product.id)}
              >
                <td>
                  <SquareImage src={product.imageUrls[0]} alt={product.title} />
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
      ) : (
        <div>No products</div>
      )}
    </>
  );
}
