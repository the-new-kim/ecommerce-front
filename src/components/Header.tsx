import { AnimatePresence, motion } from "framer-motion";
import {
  Gear,
  Heart,
  MagnifyingGlass,
  ShoppingCart,
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
      <Link to="/" className="font-gloock">
        Toy shop
      </Link>

      <nav>
        <ul className="flex [&>*]:ml-3 justify-end items-center text-2xl">
          <li>
            <MagnifyingGlass
              className="cursor-pointer"
              onClick={toggleSearchOpen}
            />
          </li>

          <li>
            <Link to="/wishlist">
              <Heart />
            </Link>
          </li>
          <li>
            <Link to={me ? "/me" : "/auth"}>
              <User />
            </Link>
          </li>
          <li>
            <Link
              to="/cart"
              className="relative flex justify-center items-center"
            >
              <ShoppingCart />
              {me && !!me.cart.products.length && (
                <small className="absolute text-xs -top-1 -right-1 bg-black text-white p-2 w-3 h-3 flex justify-center items-center rounded-full">
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

      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ y: "-200%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-200%", opacity: 0 }}
            transition={{
              type: "tween",
            }}
            className="absolute top-full left-0 w-full flex items-center justify-center bg-white pb-3 shadow-md -z-10"
          >
            <form
              className="flex justify-center items-center w-full max-w-2xl px-3"
              onSubmit={handleSubmit(onValid)}
            >
              <input
                {...register("keyword")}
                placeholder="Search"
                type="text"
                className="text-center w-full text-sm px-3 border-b-[1px] border-black py-1 focus:outline-none"
              />
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
