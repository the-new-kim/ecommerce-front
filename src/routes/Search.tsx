import { where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Heading from "../components/elements/typos/Heading";
import GridProducts from "../components/GridProducts";
import { productCollection } from "../firebase/config";
import { getFirebaseDocs } from "../firebase/utils";
import { IProductWithId } from "./Cart";

export default function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  const [products, setProducts] = useState<IProductWithId[]>([]);

  useEffect(() => {
    (async () => {
      const foundProducts = await getFirebaseDocs(
        productCollection,
        where("title", "==", keyword)
      );

      setProducts(foundProducts);
    })();
  }, [keyword]);

  return (
    <div className="p-5">
      <Heading tagName="h3" className="mb-5">
        Search results for '{keyword}'
      </Heading>
      {!!products.length && <GridProducts products={products} />}
    </div>
  );
}
