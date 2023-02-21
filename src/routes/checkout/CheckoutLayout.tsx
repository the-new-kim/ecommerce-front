import { Outlet } from "react-router-dom";
import CheckoutHeader from "../../components/checkout/CheckoutHeader";
import Summary from "../../components/checkout/Summary";

export default function CheckoutLayout() {
  return (
    // <div className="flex flex-col w-full h-full p-5">
    <div
      className="flex flex-col md:grid md:grid-cols-12 h-full min-h-screen 
    [&>*]:col-span-6 [&>*]:p-5 [&>*]:flex-grow"
    >
      <div className="flex flex-col">
        <CheckoutHeader />
        <Outlet />
      </div>
      <div className="bg-slate-200 h-full">
        <Summary />
      </div>
    </div>
    // </div>
  );
}
