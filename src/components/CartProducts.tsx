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
  return (
    <>
      <Table>
        <THead>
          <THeadRow>
            <th className="w-[60%] text-start">Item</th>
            <th className="text-center">Quantity</th>
            <th className="text-right">Subtotal</th>
          </THeadRow>
        </THead>
        <tbody>
          {cartProducts.map((cartProduct, index) => (
            <CartProduct
              key={`cart-product${index}`}
              cartProduct={cartProduct}
            />
          ))}
          <tr className="[&>*]:p-3">
            <td>Subtotal includes:</td>
            <td></td>
            <td className="text-right">{centToDollor(totalAmount)}</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}
