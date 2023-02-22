import { centToDollor } from "../libs/utils";
import { IProductWithId } from "../routes/Cart";
import Heading from "./elements/typos/Heading";
import Table from "./table/Table";
import TBodyRow from "./table/TBodyRow";

interface ISummaryTable {
  products: IProductWithId[];
  totalAmount: number;
}

export default function SummaryTable({ products, totalAmount }: ISummaryTable) {
  return (
    <Table>
      <tbody>
        {products.map((product) => (
          <TBodyRow key={product.id} className="border-none">
            <td className="w-20">
              <div className="relative w-full aspect-square">
                <div className="overflow-hidden rounded-md max-w-full max-h-full shadow-md">
                  <img className="object-cover" src={product.imageUrls[0]} />
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
  );
}
