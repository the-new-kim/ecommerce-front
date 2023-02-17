import { Link, Outlet } from "react-router-dom";
import Summary from "../../components/checkout/Summary";
import Heading from "../../components/typos/Heading";

export default function CheckoutLayout() {
  return (
    <div className="flex flex-col w-full py-5">
      <div className="p-5">
        <Heading tagName="h3">Checkout</Heading>
        <nav>
          <Link to="/checkout/information">Information</Link>
          <Link to="/checkout/payment">Payment</Link>
        </nav>
      </div>
      <div className="grid grid-cols-12 [&>*]:col-span-6 gap-5">
        <div>
          <Outlet />
        </div>
        <div>
          <Summary />
        </div>
      </div>
    </div>
  );
}
