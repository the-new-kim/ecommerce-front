import { IProductWithId } from "../routes/Cart";
import ProductCard from "./ProductCard";

interface IGridProductsProps {
  products: IProductWithId[];
}

export default function GridProducts({ products }: IGridProductsProps) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-7xl gap-5 w-full">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
}
