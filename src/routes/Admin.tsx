import AdminNav from "../components/AdminNav";
import ProductForm from "../components/forms/product/ProductForm";

export default function Admin() {
  return (
    <div className="flex h-full bg-red-200">
      <AdminNav />
      <div className="p-5">
        <h1>Admin</h1>

        <h3>Add New Product</h3>
        <ProductForm />
      </div>
    </div>
  );
}
