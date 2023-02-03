import useFirebaseDocs from "../../firebase/hooks/useFirebaseDocs";
import { getProducts } from "../../firebase/utils";
import { IProduct } from "../Home";

export default function Products() {
  const products = useFirebaseDocs<IProduct[]>(getProducts);

  return (
    <div className="p-5 flex flex-col justify-start items-center w-full">
      <div className="flex items-center justify-between w-full">
        <h1>Products</h1>
        <button>Create</button>
      </div>
      <div>
        {products?.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </div>
    </div>
  );
}
