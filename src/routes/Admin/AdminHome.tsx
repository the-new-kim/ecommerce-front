import { limit, orderBy } from "firebase/firestore";
import { Package, ShoppingBag, Users } from "phosphor-react";
import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RevenueChart from "../../components/charts/RevenueChart";
import Heading from "../../components/elements/typos/Heading";
import { IOrderWithId } from "../../components/OrderCard";
import Table from "../../components/table/Table";
import TBodyRow from "../../components/table/TBodyRow";
import THead from "../../components/table/THead";
import THeadRow from "../../components/table/THeadRow";
import {
  orderCollection,
  productCollection,
  userCollection,
} from "../../firebase/config";
import useFirebaseDocs from "../../firebase/hooks/useFirebaseDocs";
import { IUser } from "../../firebase/types";
import { getFirebaseDocs } from "../../firebase/utils";
import { centToDollor } from "../../libs/utils";
import { IProductWithId } from "../Cart";

interface ICardProps {
  children: ReactNode;
  className?: string;
}

function Card({ children, className = "" }: ICardProps) {
  return (
    <div className={"p-5 border-[1px] border-black " + className}>
      {children}
    </div>
  );
}

export default function AdminHome() {
  const [topProducts] = useFirebaseDocs<IProductWithId[]>(() =>
    getFirebaseDocs(productCollection, orderBy("sold", "desc"), limit(5))
  );

  const [orders] = useFirebaseDocs<IOrderWithId[]>(() =>
    getFirebaseDocs(orderCollection, orderBy("createdAt", "desc"))
  );

  const [users] = useFirebaseDocs<(IUser & { id: string })[]>(() =>
    getFirebaseDocs(userCollection)
  );

  const [totalSales, setTotalSeles] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    if (!orders || !orders.length) return;

    setTotalSeles(
      orders
        .map((order) => order.paymentIntent.amount)
        .reduce((accumulator, currentValue) => accumulator + currentValue)
    );
  }, [orders]);

  const onTopProductClick = (id: string) => {
    navigate(`/admin/products/${id}`);
  };

  return (
    <>
      <Heading tagName="h3" className="mb-5">
        Overview
      </Heading>
      <div className="w-full grid grid-cols-3 bg-black border-black border-[1px] gap-[1px] [&>*]:bg-white [&>*]:p-5 mb-5">
        {/* TOTAL SALES */}
        <div className="flex flex-col">
          <div className="flex items-center mb-3">
            <ShoppingBag className="mr-2" />
            Total sales
          </div>
          <Heading tagName="h3" className="!font-roboto">
            {centToDollor(totalSales)}
          </Heading>
        </div>

        {/* TOTAL ORDERS */}
        <div className="flex flex-col">
          <div className="flex items-center mb-3">
            <Package className="mr-2" />
            Total orders
          </div>
          <Heading tagName="h3" className="!font-roboto">
            {orders?.length || 0}
          </Heading>
        </div>

        {/* USERS */}
        <div className="flex flex-col">
          <div className="flex items-center mb-3">
            <Users className="mr-2" />
            Users
          </div>
          <Heading tagName="h3" className="!font-roboto">
            {users?.length}
          </Heading>
        </div>
      </div>

      <Card className="mb-5 w-full flex flex-col">
        <Heading tagName="h5">Revenue</Heading>

        <RevenueChart />
      </Card>

      <Card className="w-full">
        <Heading tagName="h5">Top products</Heading>
        <Table>
          <THead>
            <THeadRow>
              <td>Product name</td>
              <td>Price</td>
              <td>Sold</td>
              <td>Sales</td>
            </THeadRow>
          </THead>
          <tbody>
            {topProducts?.map((product) => (
              <TBodyRow
                key={product.id + "top"}
                onClick={() => onTopProductClick(product.id)}
                className="cursor-pointer group"
              >
                <td className="group-hover:underline">{product.title}</td>
                <td>{centToDollor(product.price)}</td>
                <td>{product.sold}</td>
                <td>{centToDollor(product.price * product.sold)}</td>
              </TBodyRow>
            ))}
          </tbody>
        </Table>
      </Card>
    </>
  );
}
