import useCartProducts from "../firebase/hooks/useCartProducts";
import { EDeliveryStatus, IOrder } from "../firebase/types";
import { getKeyByValue, getKeyIndex } from "../libs/utils";

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
          <div>Tracking code: {order.delivery.trackingCode}</div>
        )}
        {/* DELIVERY STATUS */}
        <div className="flex flex-col justify-center items-center w-full py-5 px-10">
          <div className="flex justify-between items-center w-full relative">
            {Object.values(EDeliveryStatus).map((value, index) => (
              <div
                key={value}
                className="flex flex-col justify-center items-center"
              >
                {/* CIRCLE */}
                <div
                  style={{
                    // width: 30,
                    width: 60,
                    height: 60,
                    aspectRatio: "1/1",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 10,
                    background:
                      getKeyIndex(
                        EDeliveryStatus,
                        getKeyByValue(EDeliveryStatus, order.delivery.status)
                      ) >= index
                        ? "rgb(34 197 94)"
                        : "rgb(226 232 240)",
                    zIndex: 10,
                    borderRadius: "50%",
                    transform:
                      index === 0
                        ? "translateX(-50%)"
                        : index === Object.values(EDeliveryStatus).length - 1
                        ? "translateX(50%)"
                        : "translateX(0%)",
                    // overflow: "hidden",
                  }}
                >
                  <small>
                    {value.charAt(0).toUpperCase() + value.slice(1)}
                  </small>
                </div>

                {/* BAR */}
                {index !== 0 && (
                  <div
                    style={{
                      position: "absolute",
                      top: "calc(50%-10px)",
                      left: `${
                        (100 / (Object.values(EDeliveryStatus).length - 1)) *
                        (index - 1)
                      }%`,
                      width: `${
                        100 / (Object.values(EDeliveryStatus).length - 1)
                      }%`,
                      height: 10,
                      background:
                        getKeyIndex(
                          EDeliveryStatus,
                          getKeyByValue(EDeliveryStatus, order.delivery.status)
                        ) >= index
                          ? "rgb(34 197 94)"
                          : "rgb(226 232 240)",
                    }}
                  ></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {!!products.length && totalAmount && (
          <SummaryTable products={products} totalAmount={totalAmount} />
        )}
      </div>
    </div>
  );
}
