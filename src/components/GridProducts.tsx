import { Link } from "react-router-dom";
import { centToDollor } from "../libs/utils";
import { IProductWithId } from "../routes/Cart";
import Button from "./elements/Button";

interface IGridProductsProps {
  products: IProductWithId[];
}

export default function GridProducts({ products }: IGridProductsProps) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-7xl gap-5 w-full">
      {products.map((product) => (
        <div
          key={product.id}
          className="flex flex-col justify-center items-center [&>*]:mb-3 w-full"
        >
          <Link to={`/products/${product.id}`} className="w-full">
            <div className="aspect-[2/3] w-full h-full overflow-hidden bg-slate-200">
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
            <Button>Add to cart</Button>
          </div>
        </div>
      ))}
    </section>
  );
}
