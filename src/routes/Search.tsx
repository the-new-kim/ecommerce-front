import { useQuery } from "@tanstack/react-query";
import { where } from "firebase/firestore";
import { AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import Heading from "../components/elements/typos/Heading";
import Empty from "../components/Empty";

import GridSection from "../components/GridSection";
import ProductCard from "../components/ProductCard";
import ProductSkeleton from "../components/ProductSkeleton";
import { productCollection } from "../firebase/config";
import { getFirebaseDocs } from "../firebase/utils";

export default function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");

  const {
    data: products,
    isLoading,
    error,
  } = useQuery(["products", keyword], () =>
    getFirebaseDocs(productCollection, where("title", "==", keyword))
  );

  if (error) return <Empty>{`${error}`}</Empty>;

  return (
    <div className="p-5 h-full flex flex-col w-full">
      <Heading tagName="h3" className="mb-5">
        Search results for '{keyword}'
      </Heading>
      <div className="w-full h-full flex flex-col justify-start items-center flex-grow">
        <>
          {isLoading || !products ? (
            <GridSection>
              {Array.from(Array(12)).map((_, index) => (
                <ProductSkeleton key={"skeleton" + index} />
              ))}
            </GridSection>
          ) : (
            <>
              {!products.length ? (
                <>
                  <Empty>No matches found</Empty>
                </>
              ) : (
                <GridSection>
                  <AnimatePresence>
                    {products.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </AnimatePresence>
                </GridSection>
              )}
            </>
          )}
        </>
      </div>
    </div>
  );
}
