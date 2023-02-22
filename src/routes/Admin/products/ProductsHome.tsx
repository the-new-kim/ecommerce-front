import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import AdminHeader from "../../../components/AdminHeader";
import Button from "../../../components/elements/Button";
import Table from "../../../components/table/Table";
import TBodyRow from "../../../components/table/TBodyRow";
import THead from "../../../components/table/THead";
import THeadRow from "../../../components/table/THeadRow";
import { productCollection } from "../../../firebase/config";
import useFirebaseDocs from "../../../firebase/hooks/useFirebaseDocs";

import { getFirebaseDocs } from "../../../firebase/utils";
import { headerHeightAtom } from "../../../libs/atoms";
import { centToDollor } from "../../../libs/utils";

export default function ProductsHome() {
  const headerHeight = useRecoilValue(headerHeightAtom);
  const { docs: products } = useFirebaseDocs(() =>
    getFirebaseDocs(productCollection)
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
                  <div
                    className="relative w-20 h-full flex justify-center items-center"
                    // className="relative w-20 max-w-[40%] aspect-square mr-3 overflow-hidden"
                  >
                    <img
                      className="object-cover aspect-square"
                      // className="object-cover w-full h-full"
                      src={product.imageUrls[0]}
                      alt={product.title}
                    />
                  </div>
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
