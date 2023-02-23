import { useRecoilValue } from "recoil";
import Heading from "../components/elements/typos/Heading";

import { getWishlistProducts } from "../firebase/utils";
import { userAtom } from "../libs/atoms";

import GridSection from "../components/GridSection";
import { useQuery } from "@tanstack/react-query";
import ProductSkeleton from "../components/ProductSkeleton";
import ProductCard from "../components/ProductCard";
import Empty from "../components/Empty";
import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";

export default function Wishlist() {
  const me = useRecoilValue(userAtom);

  const {
    data: products,
    isLoading,
    error,
    refetch,
  } = useQuery(["wishlistProducts"], () => getWishlistProducts(me?.wishlist));

  useEffect(() => {
    refetch();
  }, [me]);

  if (error) return <Empty>{`${error}`}</Empty>;

  return (
    <div className="p-5 h-full flex flex-col w-full">
      {/* TITLE */}

      <Heading tagName="h3" className="mb-5">
        Wishlist
      </Heading>

      {/* BODY */}
      <div className="p-5 w-full h-full flex flex-col justify-start items-center flex-grow">
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
                  <Empty>You currently don't have any favorites</Empty>
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
