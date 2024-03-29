import { AnimatePresence, motion } from "framer-motion";
import {
  Gear,
  Heart,
  MagnifyingGlass,
  ShoppingCart,
  User,
} from "phosphor-react";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { headerHeightAtom, userAtom } from "../libs/atoms";
import useElementSize from "../libs/hooks/useElementSize";
import useNavToggler from "../libs/hooks/useNavToggler";

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

  const { btnRef, menuRef, showing, setShowing } = useNavToggler<
    HTMLSpanElement,
    HTMLDivElement
  >();

  useEffect(() => {
    if (clientHeight === 0) return;
    setHeaderHeight(clientHeight);
    console.log(clientHeight);
  }, [clientHeight, setHeaderHeight]);

  const onValid = ({ keyword }: ISearchForm) => {
    navigate(`/search?keyword=${keyword}`);
    setValue("keyword", "");
    setShowing(false);
  };

  useEffect(() => {
    setFocus("keyword", { shouldSelect: !showing });
  }, [showing, setFocus]);

  return (
    <header
      ref={ref}
      className="fixed inset-x-0 w-full z-50 bg-white shadow-md h-fit [&>*]:p-5"
    >
      <div className="flex justify-between items-center ">
        <Link to="/" className="font-gloock">
          Toy shop
        </Link>

        <nav>
          <ul className="flex [&>*]:ml-3 justify-end items-center text-2xl">
            <li>
              <span ref={btnRef}>
                <MagnifyingGlass className="cursor-pointer" />
              </span>
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
      </div>
      <AnimatePresence mode="wait">
        {showing && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0 }}
            style={{ originY: 0 }}
            className="absolute top-full left-0 w-full flex items-center justify-center bg-white shadow-md !pt-0"
          >
            <form
              className="flex justify-center items-center w-full max-w-2xl px-3"
              onSubmit={handleSubmit(onValid)}
            >
              <input
                {...register("keyword")}
                placeholder="Search"
                type="text"
                className="text-center w-full text-sm px-3 border-b-[1px] border-black py-1 focus:outline-none rounded-none"
              />
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TO HIDE THE BACKGROUND OF ABOVE HEADER WHEN SCROLLING UP */}
      <div className="absolute w-full h-[200%] bg-white bottom-full" />
    </header>
  );
}
