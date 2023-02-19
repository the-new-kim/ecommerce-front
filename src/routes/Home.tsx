import { orderBy } from "firebase/firestore";
import { Link } from "react-router-dom";
import Heading from "../components/elements/typos/Heading";
import { productCollection } from "../firebase/config";
import useFirebaseDocs from "../firebase/hooks/useFirebaseDocs";

import { getFirebaseDocs } from "../firebase/utils";
import { centToDollor } from "../libs/utils";

export default function Home() {
  const products = useFirebaseDocs(() =>
    getFirebaseDocs(productCollection, orderBy("createdAt", "desc"))
  );

  return (
    <div className="p-5 w-full flex justify-center items-center flex-col">
      {products && !!products.length && (
        <div className="grid grid-cols-3 gap-5 max-w-5xl">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex justify-center items-center group"
            >
              <Link to={`/products/${product.id}`} className="[&>*]:mb-3">
                <div className="aspect-square w-full h-full overflow-hidden">
                  <img
                    src={product.imageUrls[0]}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex flex-col justify-center items-center">
                  <div className="group-hover:underline">{product.title}</div>
                  <div>{centToDollor(product.price)}</div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
