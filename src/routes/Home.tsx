import { Link } from "react-router-dom";
import useFirebaseDocs from "../firebase/hooks/useFirebaseDocs";
import { IProductDoc } from "../firebase/types";
import { getFirebaseDocs } from "../firebase/utils";

export default function Home() {
  const products = useFirebaseDocs<IProductDoc[]>(() =>
    getFirebaseDocs("products")
  );

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
