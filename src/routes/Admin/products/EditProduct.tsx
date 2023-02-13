import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminHeader from "../../../components/AdminHeader";

import ProductForm from "../../../components/forms/product/ProductForm";
import { IProductDoc } from "../../../firebase/types";
import { getFirebaseDoc } from "../../../firebase/utils";

export default function EditProduct() {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [product, setProduct] = useState<IProductDoc>();

  useEffect(() => {
    if (!id) return;
    (async () => {
      const productDoc = await getFirebaseDoc<IProductDoc>("products", id);
      if (!productDoc) return;
      setProduct(productDoc);
    })();
    setLoading(false);
  }, [id]);

  console.log(product);

  if (loading) return <div className="bg-red-500 p-10">Loading...</div>;

  if (!id || !product) return <>Nothing found...</>;

  return (
    <>
      <AdminHeader title={`Edit Product: ${product.title}`} />
      <ProductForm defaultValue={product} />
    </>
  );
}
