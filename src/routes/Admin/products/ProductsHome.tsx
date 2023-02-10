import { Link } from "react-router-dom";
import CreateButton from "../../../components/CreateButton";
import Table from "../../../components/table/Table";
import TBodyRow from "../../../components/table/TBodyRow";
import THead from "../../../components/table/THead";
import THeadRow from "../../../components/table/THeadRow";
import H3 from "../../../components/typos/H3";
import useFirebaseDocs from "../../../firebase/hooks/useFirebaseDocs";
import { getFirebaseDocs } from "../../../firebase/utils";
import { centToDollor } from "../../../libs/utils";
import { IProduct } from "../../Home";

export default function ProductsHome() {
  const products = useFirebaseDocs<IProduct[]>(() =>
    getFirebaseDocs("products")
  );

  return (
    <>
      <div className="flex items-center justify-between w-full">
        <H3>Products</H3>
        {/* <Link to="/admin/products/create">Create</Link>
         */}
        <CreateButton href="/admin/products/create" text="Create" />
      </div>

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
            <TBodyRow key={product.id}>
              {
                <>
                  <td className="flex justify-start items-center group">
                    <span className="relative w-20 max-w-[40%] aspect-square mr-3 overflow-hidden">
                      <img
                        className="object-cover w-full h-full"
                        src={product.imageUrls[0]}
                      />
                    </span>
                  </td>
                  <td>
                    <span className="hover:underline">
                      <Link to={`/admin/products/${product.id}`}>
                        {product.title}
                      </Link>
                    </span>
                  </td>
                  <td>{centToDollor(product.price)}</td>
                  <td>{product.quantity}</td>
                  <td>{product.sold}</td>
                  <td>{product.active ? "true" : "no"}</td>
                </>
              }
            </TBodyRow>
          ))}
        </tbody>
      </Table>
    </>
  );
}
