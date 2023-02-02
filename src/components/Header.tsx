import {
  Gear,
  MagnifyingGlass,
  ShoppingCart,
  Star,
  User,
  UserCircle,
} from "phosphor-react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { meAtom } from "../atoms";

export default function Header() {
  const me = useRecoilValue(meAtom);

  return (
    <header className="flex justify-between items-center ">
      <Link to="/">Home</Link>

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
            <Link to={me ? "/users/me" : "/auth"}>
              <User />
            </Link>
          </li>
          <li>
            <Link to="/cart">
              <ShoppingCart />
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
