import { useRecoilValue } from "recoil";
import Heading from "../components/elements/typos/Heading";
import Empty from "../components/Empty";

import { getFirebaseDoc } from "../firebase/utils";
import { userAtom } from "../libs/atoms";

import { useEffect, useState } from "react";
import { IProductWithId } from "./Cart";
import { productCollection } from "../firebase/config";
import GridProducts from "../components/GridProducts";

export default function Wishlist() {
  const me = useRecoilValue(userAtom);

  const [products, setProducts] = useState<IProductWithId[]>([]);

  useEffect(() => {
    if (!me) return;

    (async () => {
      const foundProducts = [];

      for (let i = 0; i < me.wishlist.length; i++) {
        const id = me.wishlist[i];
        const foundProduct = await getFirebaseDoc(productCollection, id);
        if (!foundProduct) return;

        foundProducts.push(foundProduct);
      }

      setProducts(foundProducts);
    })();
  }, [me]);

  return (
    <div className="p-5 h-full flex flex-col w-full">
      <Heading tagName="h3" className="mb-5">
        Wishlist
      </Heading>
      {products && !!products.length ? (
        <GridProducts products={products} />
      ) : (
        <Empty>You currently don't have any favorites</Empty>
      )}
    </div>
  );
}
