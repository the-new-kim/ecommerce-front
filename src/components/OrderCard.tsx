import useCartProducts from "../firebase/hooks/useCartProducts";
import { IOrder } from "../firebase/types";
import { centToDollor } from "../libs/utils";
import ContainerWithRoundedBorder from "./ContainerWithRoundedBorder";

export interface IOrderWithId extends IOrder {
  id: string;
}

interface IOrderCardProps {
  order: IOrderWithId;
}

export default function OrderCard({ order }: IOrderCardProps) {
  const { products, totalAmount } = useCartProducts(order.products);

  return (
    <ContainerWithRoundedBorder className="mb-5 p-0 [&>*]:p-5">
      <header className="bg-slate-200 flex justify-between items-center">
        <div className="flex flex-col">
          <span>Order placed</span>
          <span>{new Date(order.createdAt).toDateString()}</span>
        </div>
        <div className="flex flex-col">
          <span>Total</span>
          <span>{centToDollor(order.paymentIntent.amount)}</span>
        </div>
        <div className="flex flex-col">
          <span>Ship to</span>
          <span>{order.shipping.name}</span>
        </div>
        <div>
          <span>Order ID: </span>
          <span>{order.id}</span>
        </div>
      </header>
      <div>
        {products.map((product) => (
          <div key={product.id}>
            <div>{product.title}</div>
            <div>{centToDollor(product.price)}</div>
            <div>{product.quantity}</div>
          </div>
        ))}
      </div>
    </ContainerWithRoundedBorder>
  );
}
