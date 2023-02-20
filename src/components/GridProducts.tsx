import { Link } from "react-router-dom";
import { centToDollor } from "../libs/utils";
import { IProductWithId } from "../routes/Cart";
import Button from "./elements/Button";

interface IGridProductsProps {
  products: IProductWithId[];
}

export default function GridProducts({ products }: IGridProductsProps) {
  return (
    <div className="grid grid-cols-3 gap-5 max-w-5xl">
      {products.map((product) => (
        <div
          key={product.id}
          className="flex flex-col justify-center items-center [&>*]:mb-3"
        >
          <Link to={`/products/${product.id}`}>
            <div className="aspect-[2/3] w-full h-full overflow-hidden">
              <img
                src={product.imageUrls[0]}
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
    </div>
  );
}
