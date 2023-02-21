import useCartProducts from "../firebase/hooks/useCartProducts";
import { IOrder } from "../firebase/types";
import { centToDollor } from "../libs/utils";
import Heading from "./elements/typos/Heading";
import SummaryTable from "./SummaryTable";

export interface IOrderWithId extends IOrder {
  id: string;
}

interface IOrderCardProps {
  order: IOrderWithId;
}

interface IHeaderItemProps {
  title: string;
  text: string;
}

function HeaderItem({ title, text }: IHeaderItemProps) {
  return (
    <div className="flex md:flex-col">
      <span>{title}</span>
      <span className="mx-1 md:hidden">:</span>
      <span>{text}</span>
    </div>
  );
}

export default function OrderCard({ order }: IOrderCardProps) {
  const { products, totalAmount } = useCartProducts(order.products);

  return (
    <div className="mb-5 p-0 [&>*]:p-5 border-[1px] border-black w-full flex flex-col">
      <header
        className="bg-slate-200 flex flex-col 
      md:flex-row md:justify-between  md:items-center
      "
      >
        <HeaderItem
          title="Order placed"
          text={new Date(order.createdAt).toDateString()}
        />
        <HeaderItem
          title="Delivery status"
          text={
            order.delivery.status.charAt(0).toUpperCase() +
            order.delivery.status.slice(1)
          }
        />
        <HeaderItem title="Ship to" text={order.shipping.name} />
        <HeaderItem title="Order ID" text={order.id} />
      </header>
      <div className="flex flex-col justify-start items-start">
        {order.delivery.trackingCode && (
          <div>{order.delivery.trackingCode}</div>
        )}

        {!!products.length && totalAmount && (
          <SummaryTable products={products} totalAmount={totalAmount} />
        )}
      </div>
    </div>
  );
}
