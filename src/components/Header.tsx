import {
  Gear,
  MagnifyingGlass,
  ShoppingCart,
  Star,
  User,
} from "phosphor-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { headerHeightAtom, userAtom } from "../libs/atoms";
import useElementSize from "../libs/hooks/useElementSize";

interface ISearchForm {
  keyword: string;
}

export default function Header() {
  const me = useRecoilValue(userAtom);
  const setHeaderHeight = useSetRecoilState(headerHeightAtom);
  const navigate = useNavigate();

  const ref = useRef<HTMLElement>(null);
  const { clientHeight } = useElementSize(ref);

  const { register, handleSubmit, setValue, setFocus } = useForm<ISearchForm>();
  const [searchOpen, setSearchOpen] = useState(false);
  useEffect(() => {
    if (clientHeight === 0) return;
    setHeaderHeight(clientHeight);
  }, [clientHeight]);

  const onValid = ({ keyword }: ISearchForm) => {
    navigate(`/search?keyword=${keyword}`);
    setValue("keyword", "");
    setSearchOpen(false);
  };

  const toggleSearchOpen = () => {
    setSearchOpen((prev) => !prev);
  };

  useEffect(() => {
    setFocus("keyword", { shouldSelect: !searchOpen });
  }, [searchOpen, setFocus]);

  return (
    <header
      ref={ref}
      className="fixed top-0 left-0 z-50 bg-white flex justify-between items-center p-5 shadow-sm"
    >
      <Link to="/" className="font-semibold">
        Toy shop
      </Link>

      <nav>
        <ul className="flex [&>*]:ml-3 justify-end items-center text-2xl">
          <li className="h-full flex items-center relative">
            <div className="h-full absolute top-0 right-0 flex items-center">
              {searchOpen && (
                <form
                  className="flex justify-center items-center"
                  onSubmit={handleSubmit(onValid)}
                >
                  <input
                    {...register("keyword")}
                    type="text"
                    className="text-right text-sm px-3 border-b-[1px] border-black py-1 focus:outline-none"
                  />
                </form>
              )}
            </div>
          </li>
          <li>
            <MagnifyingGlass
              className="cursor-pointer"
              onClick={toggleSearchOpen}
            />
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
