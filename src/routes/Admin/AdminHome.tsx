import ProductForm from "../../components/forms/ProductForm";

export default function AdminHome() {
  return (
    <div className="p-5">
      <h1>Admin</h1>

      <h3>Add New Product</h3>
      <ProductForm />
    </div>
  );
}
