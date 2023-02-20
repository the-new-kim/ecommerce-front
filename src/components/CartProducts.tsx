import useViewportSize from "../libs/hooks/useViewportSize";
import { centToDollor } from "../libs/utils";
import { IProductWithId } from "../routes/Cart";
import CartProduct from "./CartProduct";
import Table from "./table/Table";
import THead from "./table/THead";
import THeadRow from "./table/THeadRow";

interface ICartProductsProps {
  cartProducts: IProductWithId[];
  totalAmount: number;
}

export default function CartProducts({
  cartProducts,
  totalAmount,
}: ICartProductsProps) {
  const {
    mediaQuery: { md },
  } = useViewportSize();
  return (
    <>
      <Table>
        {md && (
          <THead>
            <THeadRow>
              <td className="w-[60%] text-start">Product</td>
              <td className="text-center">Quantity</td>
              <td className="text-right">Total</td>
            </THeadRow>
          </THead>
        )}
        <tbody>
          {cartProducts.map((cartProduct, index) => (
            <CartProduct
              key={`cart-product${index}`}
              cartProduct={cartProduct}
            />
          ))}
          {md && (
            <tr className="[&>*]:p-3">
              <td></td>
              <td></td>
              <td className="text-right min-w-max">
                <span className="mr-10">Subtotal</span>{" "}
                {centToDollor(totalAmount)}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      {!md && (
        <div className="flex justify-center items-center my-5">
          <div>Subtotal</div>
          <div className="ml-3">{centToDollor(totalAmount)}</div>
        </div>
      )}
    </>
  );
}
