import { useRecoilValue } from "recoil";
import useCartProducts from "../../firebase/hooks/useCartProducts";
import { userAtom } from "../../libs/atoms";
import { centToDollor } from "../../libs/utils";
import ContainerWithRoundedBorder from "../ContainerWithRoundedBorder";
import Table from "../table/Table";
import TBodyRow from "../table/TBodyRow";
import Heading from "../typos/Heading";

export default function Summary() {
  const me = useRecoilValue(userAtom);
  const { cartProducts, totalAmount } = useCartProducts(me);
  return (
    <>
      {!!cartProducts.length && totalAmount && (
        <ContainerWithRoundedBorder>
          <Heading tagName="h5">Summary</Heading>
          <hr />
          <Table>
            <tbody>
              {cartProducts.map((product) => (
                <TBodyRow
                  key={product.id}
                  // className="flex justify-between items-center mb-2"
                >
                  <td className="w-20">
                    <div className="relative w-full aspect-square">
                      <div className="overflow-hidden rounded-md w-full h-full">
                        <img
                          className="object-cover w-full h-full"
                          src={product.imageUrls[0]}
                        />
                      </div>
                      <small className="absolute -top-1 -right-1 bg-gray-300 p-2 w-3 h-3 flex justify-center items-center rounded-full">
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
              <TBodyRow className="border-none">
                <td>
                  <Heading tagName="h5">Total</Heading>
                </td>
                <td></td>
                <td className="text-end">{centToDollor(totalAmount)}</td>
              </TBodyRow>
            </tbody>
          </Table>

          {/* <hr />
          <div className="flex justify-between items-center mt-5">
            <Heading tagName="h4">Total</Heading>
            <Heading tagName="h5">{centToDollor(totalAmount)}</Heading>
          </div> */}
        </ContainerWithRoundedBorder>
      )}
    </>
  );
}
