import { Link } from "react-router-dom";
import useFirebaseDocs from "../firebase/hooks/useFirebaseDocs";

import { getProducts } from "../firebase/utils";

export interface IProduct {
  title: string;
  label: string;
  description: string;
  quantity: number;
  price: number;
  categoryId: string;
  imageUrls: string[];
  id: string;
  active: boolean;
}

export default function Home() {
  const products = useFirebaseDocs<IProduct[]>(getProducts);

  return (
    <div className="p-5">
      <h1>Home</h1>

      {products &&
        !!products.length &&
        products.map((product) => (
          <li key={product.id}>
            <Link to={`/products/${product.id}`}>
              {product.title}
              {product.price}
              <img width={100} src={product.imageUrls[0]} />
            </Link>
          </li>
        ))}
    </div>
  );
}
