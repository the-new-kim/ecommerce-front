import { AddressBook, Phone } from "phosphor-react";
import useCartProducts from "../firebase/hooks/useCartProducts";
import { EDeliveryStatus, IOrder, IShipping } from "../firebase/types";
import { getKeyByValue, getKeyIndex, makeFirstLetterBig } from "../libs/utils";

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

interface IShippingInformationProps {
  shipping: IShipping;
  // email: string;
}

function ShippingInformation({ shipping }: IShippingInformationProps) {
  return (
    <div className="[&>*]:flex [&>*]:justify-start [&>*]:items-center">
      <div>
        <AddressBook className="mr-2 hidden md:block" />
        {shipping.address.line1}, {shipping.address.line2},{" "}
        {shipping.address.postal_code}, {shipping.address.city},{" "}
        {shipping.address.state}, {shipping.address.country}
      </div>
      <div>
        <Phone className="mr-2 hidden md:block" /> {shipping.phone}
      </div>
      {/* <div>
        <EnvelopeSimple className="mr-2" /> {email}
      </div> */}
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
          text={makeFirstLetterBig(order.delivery.status)}
        />
        <HeaderItem title="Ship to" text={order.shipping.name} />
        <HeaderItem title="Order ID" text={order.id} />
      </header>
      <div className="flex flex-col justify-start items-start">
        {/* TRACKING CODE */}
        {order.delivery.trackingCode && (
          <div className="mb-3">
            Tracking code: {order.delivery.trackingCode}
          </div>
        )}

        {/* SHIPPING INFORMATION */}
        {/* <div className="p-5"> */}
        <ShippingInformation shipping={order.shipping} />
        {/* </div> */}

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
                  <small>{makeFirstLetterBig(value)}</small>
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

        {/* PRODUCTS */}
        {!!products.length && totalAmount && (
          <SummaryTable products={products} totalAmount={totalAmount} />
        )}
      </div>
    </div>
  );
}
