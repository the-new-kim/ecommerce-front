import { useRecoilValue } from "recoil";
import { userAtom } from "../libs/atoms";

export default function ShippingInformation() {
  const me = useRecoilValue(userAtom);

  return (
    <>
      {me && me.shipping && (
        <address>
          {me.shipping.address.line1}
          <br />
          {me.shipping.address.line2}
          <br />
          {me.shipping.address.postal_code}
          <br />
          {me.shipping.address.city}
          <br />
          {me.shipping.address.state}
          <br />
          {me.shipping.address.country}
          <br />
        </address>
      )}
    </>
  );
}
