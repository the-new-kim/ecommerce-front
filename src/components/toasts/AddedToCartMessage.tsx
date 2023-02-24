import { IProductWithId } from "../../routes/Cart";
import Button from "../elements/Button";
import Heading from "../elements/typos/Heading";

interface IAddedToCartMessageProps {
  product: IProductWithId;
}

export default function AddedToCartMessage({
  product,
}: IAddedToCartMessageProps) {
  return (
    <div className="flex flex-col justify-center items-center [&>*]:mb-5 text-black">
      <div>Item Added!</div>
      <img src={product.imageUrls[0]} />
      <Heading tagName="h5">{product.title}</Heading>
      <Button link="/cart"> Go to cart</Button>
    </div>
  );
}
