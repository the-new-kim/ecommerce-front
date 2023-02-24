import { useQuery } from "@tanstack/react-query";
import { orderBy } from "firebase/firestore";
import { ArrowRight } from "phosphor-react";
import { Link, useNavigate } from "react-router-dom";

import AdminHeader from "../../../components/AdminHeader";
import Button from "../../../components/elements/Button";
import Empty from "../../../components/Empty";
import Spinner from "../../../components/loaders/Spinner";
import SquareImage from "../../../components/SquareImage";
import Table from "../../../components/table/Table";
import TBodyRow from "../../../components/table/TBodyRow";
import THead from "../../../components/table/THead";
import THeadRow from "../../../components/table/THeadRow";
import { productCollection } from "../../../firebase/config";

import { getFirebaseDocs } from "../../../firebase/utils";
import { centToDollor, cls } from "../../../libs/utils";

export default function ProductsHome() {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery(["products"], () =>
    getFirebaseDocs(productCollection, orderBy("createdAt", "desc"))
  );

  const navigate = useNavigate();

  const onClick = (id: string) => {
    navigate(`/admin/products/${id}`);
  };

  if (error) return <Empty>{`${error}`}</Empty>;

  if (isLoading || !products)
    return (
      <Empty>
        <Spinner />
      </Empty>
    );

  if (!products.length)
    return (
      <Empty>
        <div className="flex justify-center items-center flex-col">
          No products yet <br />
          <Link
            to="/admin/products/create"
            className="flex justify-center items-center"
          >
            Create new one <ArrowRight />
          </Link>
        </div>
      </Empty>
    );

  return (
    <>
      <AdminHeader title="Products">
        <Button link="/admin/products/create">Create</Button>
      </AdminHeader>

      <figure className="w-full overflow-x-scroll border-[1px] border-black">
        <Table>
          <THead className="bg-black text-white">
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
            {products.map((product, index) => (
              <TBodyRow
                key={product.id}
                className={
                  "cursor-pointer group " +
                  cls(index === products.length - 1 ? "!border-b-0" : "")
                }
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
      </figure>
    </>
  );
}
