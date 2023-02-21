import { orderBy } from "firebase/firestore";
import GridProducts from "../components/GridProducts";
import { productCollection } from "../firebase/config";
import useFirebaseDocs from "../firebase/hooks/useFirebaseDocs";

import { getFirebaseDocs } from "../firebase/utils";

export default function Home() {
  const [products] = useFirebaseDocs(() =>
    getFirebaseDocs(productCollection, orderBy("createdAt", "desc"))
  );

  return (
    <div className="p-5 w-full flex flex-col justify-center items-center">
      {products && !!products.length && <GridProducts products={products} />}
    </div>
  );
}
