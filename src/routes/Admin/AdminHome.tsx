import { orderBy, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import Heading from "../../components/elements/typos/Heading";
import { productCollection } from "../../firebase/config";
import { getFirebaseDocs } from "../../firebase/utils";
import { IProductWithId } from "../Cart";

export default function AdminHome() {
  const [bestSellers, setBestSellers] = useState<IProductWithId[]>([]);

  useEffect(() => {
    (async () => {
      const bestSellersDocs = await getFirebaseDocs(
        productCollection,
        where("sold", ">", 0),
        orderBy("sold", "desc")
      );
      setBestSellers(bestSellersDocs);
    })();
  }, []);

  return (
    <div>
      <Heading tagName="h3">Dash board</Heading>
      <Heading tagName="h5">Best sellers</Heading>
      {bestSellers.map((product) => (
        <div key={product.id}>{product.title}</div>
      ))}
    </div>
  );
}
