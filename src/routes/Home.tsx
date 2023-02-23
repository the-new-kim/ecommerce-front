import { useQuery } from "@tanstack/react-query";
import { orderBy } from "firebase/firestore";
import Empty from "../components/Empty";
import GridSection from "../components/GridSection";
import ProductCard from "../components/ProductCard";
import ProductSkeleton from "../components/ProductSkeleton";
import { productCollection } from "../firebase/config";
import { getFirebaseDocs } from "../firebase/utils";

export default function Home() {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery(["products"], () =>
    getFirebaseDocs(productCollection, orderBy("createdAt", "desc"))
  );

  if (error) return <Empty>{`${error}`}</Empty>;

  return (
    <div className="p-5 w-full flex flex-col justify-center items-center">
      <GridSection>
        {isLoading || !products ? (
          <>
            {Array.from(Array(12)).map((_, index) => (
              <ProductSkeleton key={"skeleton" + index} />
            ))}
          </>
        ) : (
          <>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </>
        )}
      </GridSection>
    </div>
  );
}
