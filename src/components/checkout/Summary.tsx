import { useRecoilValue } from "recoil";
import useCartProducts from "../../firebase/hooks/useCartProducts";
import { userAtom } from "../../libs/atoms";
import { centToDollor, cls } from "../../libs/utils";
import ContainerWithRoundedBorder from "../ContainerWithRoundedBorder";
import Table from "../table/Table";
import TBodyRow from "../table/TBodyRow";
import Heading from "../elements/typos/Heading";

export default function Summary() {
  const me = useRecoilValue(userAtom);
  const { products: cartProducts, totalAmount } = useCartProducts(
    me?.cart.products
  );
  return (
    <>
      {!!cartProducts.length && totalAmount && (
        <>
          {/* <Heading tagName="h4" className="mb-5">
            Summary
          </Heading> */}

          <Table>
            <tbody>
              {cartProducts.map((product, index) => (
                <TBodyRow
                  key={product.id}
                  className="border-none"
                  // className="flex justify-between items-center mb-2"
                >
                  <td className="w-20">
                    <div className="relative w-full aspect-square">
                      <div className="overflow-hidden rounded-md w-full h-full shadow-md">
                        <img
                          className="object-cover w-full h-full"
                          src={product.imageUrls[0]}
                        />
                      </div>
                      <small className="absolute -top-1 -right-1 bg-white shadow-md p-2 w-3 h-3 flex justify-center items-center rounded-full">
                        {product.quantity}
                      </small>
                    </div>
                  </td>
                  <td className="text-start">{product.title}</td>
                  <td className="text-end">
                    {centToDollor(product.price * product.quantity)}
                  </td>
                </TBodyRow>
              ))}
              <TBodyRow className="border-b-0 border-t-[1px]">
                <td>
                  <Heading tagName="h5">Total</Heading>
                </td>
                <td></td>
                <td className="text-end">{centToDollor(totalAmount)}</td>
              </TBodyRow>
            </tbody>
          </Table>
        </>
      )}
    </>
  );
}
