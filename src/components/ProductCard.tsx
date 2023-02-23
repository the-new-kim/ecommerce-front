import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { centToDollor } from "../libs/utils";
import { IProductWithId } from "../routes/Cart";
import AddToCartButton from "./AddToCartButton";
import AddToWishlistButton from "./AddToWishlistButton";

interface IProductCardProps {
  product: IProductWithId;
}

export default function ProductCard({ product }: IProductCardProps) {
  return (
    <motion.div
      key={product.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      layout
      className="flex flex-col justify-center items-center [&>*]:mb-3 w-full relative group"
    >
      <div className="absolute z-10 top-3 right-3 text-3xl cursor-pointer">
        <AddToWishlistButton product={product} />
      </div>
      <Link to={`/products/${product.id}`} className="w-full">
        <div className="relative aspect-[2/3] w-full h-full overflow-hidden bg-slate-200">
          <img
            src={product.imageUrls[0]}
            alt={product.title}
            className="w-full h-full object-cover hover:scale-105 duration-300 transition-transform"
          />
        </div>
      </Link>
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-col justify-center items-start">
          <div>{product.title}</div>
          <div>{centToDollor(product.price)}</div>
        </div>

        <AddToCartButton product={product} />
      </div>
    </motion.div>
  );
}
