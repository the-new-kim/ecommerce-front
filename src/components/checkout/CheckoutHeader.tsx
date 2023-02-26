import { useLocation, useNavigate } from "react-router-dom";

import Heading from "../elements/typos/Heading";
import { motion } from "framer-motion";
import { useRecoilValue } from "recoil";
import { userAtom } from "../../libs/atoms";
import { CaretRight } from "phosphor-react";

interface INavLinkProps {
  to: string;
  text: string;
  pathname: string;
  disabled?: boolean;
}
function NavLink({ to, text, pathname, disabled = false }: INavLinkProps) {
  const navigate = useNavigate();

  const onClick = () => {
    if (disabled) return;
    navigate(to);
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="relative disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {text}
      {to === pathname && (
        <motion.div
          layoutId="selected"
          className="absolute bottom-0 left-0 w-full h-[1px] bg-black"
        />
      )}
    </button>
  );
}

export default function CheckoutHeader() {
  const { pathname } = useLocation();
  const me = useRecoilValue(userAtom);

  return (
    <header className="mb-5">
      <Heading className="mb-3" tagName="h3">
        Checkout
      </Heading>
      <nav className="flex justify-start items-center [&>*]:mr-5 bg-white text-sm md:text-base">
        <NavLink to="/cart" text="Cart" pathname={pathname} />
        <CaretRight />
        <NavLink
          to="/checkout/information"
          text="Information"
          pathname={pathname}
        />
        <CaretRight />
        <NavLink
          to="/checkout/payment"
          text="Payment"
          pathname={pathname}
          disabled={!me?.shipping}
        />
      </nav>
    </header>
  );
}
