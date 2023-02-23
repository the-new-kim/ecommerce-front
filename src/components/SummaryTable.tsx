import { centToDollor } from "../libs/utils";
import { IProductWithId } from "../routes/Cart";
import Heading from "./elements/typos/Heading";
import SquareImage from "./SquareImage";
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
              <div className="relative">
                <SquareImage
                  src={product.imageUrls[0]}
                  alt={product.title}
                  className="rounded-md overflow-hidden shadow-md"
                />
                <small className="absolute -top-1 -right-1 bg-black text-white p-2 w-3 h-3 flex justify-center items-center rounded-full">
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
        <TBodyRow className="!border-b-0 border-t-[1px]">
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
