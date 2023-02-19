import { Link, useMatch } from "react-router-dom";
import { cls } from "../../libs/utils";
import Heading from "../elements/typos/Heading";

export default function CheckoutHeader() {
  const informationMatch = useMatch("/checkout/information");
  const paymentMatch = useMatch("/checkout/payment");

  return (
    <header className="mb-5">
      <Heading className="mb-3" tagName="h3">
        Checkout
      </Heading>
      <nav className="flex justify-start items-center [&>*]:mr-5">
        <Link
          to="/checkout/information"
          className={`${cls(informationMatch ? "underline" : "")}`}
        >
          Information
        </Link>
        <Link
          to="/checkout/payment"
          className={`${cls(paymentMatch ? "underline" : "")}`}
        >
          Payment
        </Link>
      </nav>
    </header>
  );
}
