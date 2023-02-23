import { useQuery } from "@tanstack/react-query";
import { where } from "firebase/firestore";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Heading from "../components/elements/typos/Heading";
import Empty from "../components/Empty";
import GridProducts from "../components/GridProducts";
import { productCollection } from "../firebase/config";
import { getFirebaseDocs } from "../firebase/utils";

export default function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");

  const { data: products } = useQuery(["products", keyword], () =>
    getFirebaseDocs(productCollection, where("title", "==", keyword))
  );

  return (
    <div className="p-5 h-full flex flex-col w-full">
      <Heading tagName="h3" className="mb-5">
        Search results for '{keyword}'
      </Heading>
      {products && !!products.length ? (
        <GridProducts products={products} />
      ) : (
        <Empty>Nothing found</Empty>
      )}
    </div>
  );
}
