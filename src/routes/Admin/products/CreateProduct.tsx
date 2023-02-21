import ProductForm from "../../../components/forms/product/ProductForm";
import Heading from "../../../components/elements/typos/Heading";

export default function CreateProduct() {
  return (
    <div className="w-full flex flex-col">
      <Heading tagName="h3" className="mb-5">
        Add New Product
      </Heading>
      <ProductForm />
    </div>
  );
}
