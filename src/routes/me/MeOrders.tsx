import { orderBy, where } from "firebase/firestore";

import { useRecoilValue } from "recoil";
import Heading from "../../components/elements/typos/Heading";
import Empty from "../../components/Empty";
import OrderCard from "../../components/OrderCard";
import { orderCollection } from "../../firebase/config";
import useFirebaseDocs from "../../firebase/hooks/useFirebaseDocs";

import { getFirebaseDocs } from "../../firebase/utils";
import { userAtom } from "../../libs/atoms";

export default function MeOrders() {
  const me = useRecoilValue(userAtom);

  const myOrders = useFirebaseDocs(() =>
    getFirebaseDocs(
      orderCollection,
      where("orderer", "==", me!.id),
      orderBy("createdAt", "desc")
    )
  );

  return (
    <div className="w-full h-full flex flex-col">
      <Heading tagName="h3" className="mb-5">
        Order history
      </Heading>
      {myOrders && !!myOrders.length ? (
        myOrders.map((order) => <OrderCard key={order.id} order={order} />)
      ) : (
        <Empty>You haven't placed any orders yet</Empty>
      )}
    </div>
  );
}
