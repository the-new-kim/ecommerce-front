import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminHeader from "../../../components/AdminHeader";

import ProductForm from "../../../components/forms/product/ProductForm";
import { productCollection } from "../../../firebase/config";

import { getFirebaseDoc } from "../../../firebase/utils";
import { IProductWithId } from "../../Cart";

export default function EditProduct() {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [product, setProduct] = useState<IProductWithId>();

  useEffect(() => {
    if (!id) return;
    (async () => {
      const productDoc = await getFirebaseDoc(productCollection, id);
      if (!productDoc) return;
      setProduct(productDoc);
    })();
    setLoading(false);
  }, [id]);

  if (loading) return <div className="bg-red-500 p-10">Loading...</div>;

  if (!id || !product) return <>Nothing found...</>;

  return (
    <>
      <AdminHeader title={`Edit Product: ${product.title}`} />
      <ProductForm defaultValue={product} />
    </>
  );
}
