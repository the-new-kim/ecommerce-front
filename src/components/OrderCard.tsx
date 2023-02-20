import useCartProducts from "../firebase/hooks/useCartProducts";
import { IOrder } from "../firebase/types";
import { centToDollor } from "../libs/utils";
import Heading from "./elements/typos/Heading";

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
          title="Total"
          text={centToDollor(order.paymentIntent.amount)}
        />
        <HeaderItem title="Ship to" text={order.shipping.name} />
        <HeaderItem title="Order ID" text={order.id} />
      </header>
      <div className="flex flex-col justify-start items-start">
        <Heading tagName="h5" className="font-roboto font-semibold mb-3">
          Delivery status
        </Heading>
        {products.map((product) => (
          <div
            key={product.id}
            className="flex justify-start items-center mb-3 [&>*]:mr-3"
          >
            <div className="w-16 h-16 flex justify-center items-center overflow-hidden">
              <img
                src={product.imageUrls[0]}
                className="w-full h-full object-cover"
              />
            </div>
            <div>{product.title}</div>
            <div>{centToDollor(product.price)}</div>
            <div>{product.quantity}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
