import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import ContainerWithRoundedBorder from "../../components/ContainerWithRoundedBorder";
import ListRow from "../../components/ListRow";
import Heading from "../../components/elements/typos/Heading";
import { userAtom } from "../../libs/atoms";
import { addressToText } from "../../libs/utils";

export default function MeHome() {
  const me = useRecoilValue(userAtom);

  useEffect(() => {
    if (!me || !me.shipping?.address) return;
    addressToText(me.shipping?.address);
  }, [me]);
  return (
    <div className="flex flex-col [&>*]:flex [&>*]:w-fit [&>*]:mb-5">
      {/*       
      <ContainerWithRoundedBorder className="flex flex-col">
        <Heading tagName="h4">Information</Heading>
        <ListRow title="Name" text={me?.displayName || ""} />
        <ListRow
          title="Shipping Address"
          text={
            me?.shipping?.address ? addressToText(me.shipping.address) : "-"
          }
        />
      </ContainerWithRoundedBorder>
      <ContainerWithRoundedBorder>
        <Heading tagName="h4">Orders</Heading>
        <div></div>
      </ContainerWithRoundedBorder> */}
      <Link to="/me/edit">Edit</Link>
      <Link to="/me/orders">Orders</Link>
    </div>
  );
}
