import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import Heading from "../../components/elements/typos/Heading";
import Empty from "../../components/Empty";
import OrderCard, { IOrderWithId } from "../../components/OrderCard";
import { orderCollection } from "../../firebase/config";

import { getFirebaseDoc } from "../../firebase/utils";
import { userAtom } from "../../libs/atoms";

export default function MeOrders() {
  const [me, setMe] = useRecoilState(userAtom);

  const [myOrders, setMyOrders] = useState<IOrderWithId[]>([]);

  useEffect(() => {
    if (!me) return;
    (async () => {
      let orderArray = [];

      for (let i = 0; i < me.orders.length; i++) {
        const orderId = me.orders[i];
        try {
          const foundOrder = await getFirebaseDoc(orderCollection, orderId);
          if (foundOrder) {
            orderArray.push(foundOrder);
          }
        } catch (error) {
          console.log("ERROR:::", error);
        }
      }

      setMyOrders(orderArray);
    })();
  }, []);

  console.log("MY ORDERS", myOrders);

  return (
    <div className="w-full h-full flex flex-col">
      <Heading tagName="h3" className="mb-5">
        Order history
      </Heading>
      {!!myOrders.length ? (
        myOrders.map((order) => <OrderCard key={order.id} order={order} />)
      ) : (
        <Empty>You haven't placed any orders yet</Empty>
      )}
    </div>
  );
}
