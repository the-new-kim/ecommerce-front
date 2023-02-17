import { useRecoilValue } from "recoil";
import { userAtom } from "../../libs/atoms";
import ContainerWithRoundedBorder from "../ContainerWithRoundedBorder";
import InformationRow from "./InformationRow";

export default function ShippingInformation() {
  const me = useRecoilValue(userAtom);

  return (
    <>
      {me && me.shipping && (
        <ContainerWithRoundedBorder className="[&>*]:flex [&>*]:justify-between [&>*]:items-center">
          <InformationRow
            title="Contact"
            linkTo="/checkout/information"
            linkText="change"
          >
            {me.shipping.phone}
          </InformationRow>
          <hr className="my-2" />
          <InformationRow
            title="Ship to"
            linkTo="/checkout/information"
            linkText="change"
          >
            {me.shipping.address.line1}, {me.shipping.address.line2},{" "}
            {me.shipping.address.postal_code}, {me.shipping.address.city},{" "}
            {me.shipping.address.state}, {me.shipping.address.country}
          </InformationRow>
        </ContainerWithRoundedBorder>
      )}
    </>
  );
}
