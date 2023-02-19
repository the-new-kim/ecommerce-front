import {
  Gear,
  MagnifyingGlass,
  ShoppingCart,
  Star,
  User,
} from "phosphor-react";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { headerHeightAtom, userAtom } from "../libs/atoms";
import useElementSize from "../libs/hooks/useElementSize";

export default function Header() {
  const me = useRecoilValue(userAtom);
  const setHeaderHeight = useSetRecoilState(headerHeightAtom);

  const ref = useRef<HTMLElement>(null);
  const { clientHeight } = useElementSize(ref);

  useEffect(() => {
    if (clientHeight === 0) return;
    setHeaderHeight(clientHeight);
  }, [clientHeight]);

  return (
    <header
      ref={ref}
      className="fixed top-0 left-0 z-50 bg-white flex justify-between items-center p-5 shadow-sm"
    >
      <Link to="/">Toy shop</Link>

      <nav>
        <ul className="flex [&>*]:ml-3 justify-end items-center text-2xl">
          <li>
            <Link to="/search">
              <MagnifyingGlass />
            </Link>
          </li>

          <li>
            <Link to="/wishlist">
              <Star />
            </Link>
          </li>
          <li>
            <Link to={me ? "/me" : "/auth"}>
              <User />
            </Link>
          </li>
          <li>
            <Link to="/cart" className="relative">
              <ShoppingCart />
              {me && !!me.cart.products.length && (
                <small className="absolute text-xs -top-1 -right-1 bg-black text-white shadow-md p-2 w-3 h-3 flex justify-center items-center rounded-full">
                  {me.cart.products.length}
                </small>
              )}
            </Link>
          </li>
          {me?.isAdmin && (
            <li>
              <Link to="/admin">
                <Gear />
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
