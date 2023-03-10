import { useQuery } from "@tanstack/react-query";
import { limit, orderBy } from "firebase/firestore";
import { Package, ShoppingBag, Users } from "phosphor-react";
import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RevenueChart from "../../components/charts/RevenueChart";
import Heading from "../../components/elements/typos/Heading";
import Spinner from "../../components/loaders/Spinner";
import Table from "../../components/table/Table";
import TBodyRow from "../../components/table/TBodyRow";
import THead from "../../components/table/THead";
import THeadRow from "../../components/table/THeadRow";
import {
  orderCollection,
  productCollection,
  userCollection,
} from "../../firebase/config";
import { getFirebaseDocs } from "../../firebase/utils";
import { centToDollor } from "../../libs/utils";

interface ICardProps {
  children: ReactNode;
  className?: string;
  isLoading: boolean;
  error?: unknown;
}

interface IGridCardProps {
  children: ReactNode;
  text: string | number;
  isLoading: boolean;
  error?: unknown;
}

function GridCard({ children, text, isLoading, error }: IGridCardProps) {
  return (
    <div className="flex flex-col justify-between">
      <div className="flex items-center mb-3">{children}</div>
      {isLoading ? (
        <Spinner />
      ) : (
        <Heading tagName="h3" className="!font-roboto">
          {error ? `${error}` : text}
        </Heading>
      )}
    </div>
  );
}

function Card({ children, className = "", isLoading, error }: ICardProps) {
  return (
    <div className={"p-5 border-[1px] border-black " + className}>
      {isLoading ? (
        <div className="w-full flex justify-center items-center">
          <Spinner />
        </div>
      ) : error ? (
        `${error}`
      ) : (
        children
      )}
    </div>
  );
}

export default function AdminHome() {
  const {
    data: topProducts,
    isLoading: topProductsLoading,
    error: topProductsError,
  } = useQuery(["topProducts"], () =>
    getFirebaseDocs(productCollection, orderBy("sold", "desc"), limit(5))
  );

  const {
    data: orders,
    isLoading: ordersLoading,
    error: ordersError,
  } = useQuery(["totalOrders"], () =>
    getFirebaseDocs(orderCollection, orderBy("createdAt", "desc"))
  );

  const {
    data: users,
    isLoading: usersLoading,
    error: usersError,
  } = useQuery(["users"], () => getFirebaseDocs(userCollection));

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
        <GridCard
          text={centToDollor(totalSales)}
          isLoading={ordersLoading}
          error={ordersError}
        >
          <ShoppingBag className="mr-2 hidden md:block" />
          Total sales
        </GridCard>

        {/* TOTAL ORDERS */}
        <GridCard
          text={orders?.length || 0}
          isLoading={ordersLoading}
          error={ordersError}
        >
          <Package className="mr-2 hidden md:block" />
          Total orders
        </GridCard>

        {/* USERS */}
        <GridCard
          text={users?.length || 0}
          isLoading={usersLoading}
          error={usersError}
        >
          <Users className="mr-2 hidden md:block" />
          Users
        </GridCard>
      </div>

      {/* REVENUE */}
      <Card
        className="mb-5 w-full flex flex-col"
        isLoading={ordersLoading}
        error={ordersError}
      >
        <Heading tagName="h5">Revenue</Heading>
        {orders && <RevenueChart orders={orders} />}
      </Card>

      {/* TOP PRODUCTS */}
      <Card
        className="w-full"
        isLoading={topProductsLoading}
        error={topProductsError}
      >
        <Heading tagName="h5">Top products</Heading>
        {topProducts && (
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
        )}
      </Card>
    </>
  );
}
