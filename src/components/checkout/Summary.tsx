import { useRecoilValue } from "recoil";
import useCartProducts from "../../firebase/hooks/useCartProducts";
import { userAtom } from "../../libs/atoms";
import SummaryTable from "../SummaryTable";

export default function Summary() {
  const me = useRecoilValue(userAtom);
  const { products, totalAmount } = useCartProducts(me?.cart.products);
  return (
    <>
      {!!products.length && totalAmount && (
        <SummaryTable products={products} totalAmount={totalAmount} />
      )}
    </>
  );
}
