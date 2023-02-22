// import { useState } from "react";
import { useParams } from "react-router-dom";
import AdminHeader from "../../../components/AdminHeader";
import Empty from "../../../components/Empty";

import ProductForm from "../../../components/forms/product/ProductForm";
import { productCollection } from "../../../firebase/config";
import useFirebaseDocs from "../../../firebase/hooks/useFirebaseDocs";

import { getFirebaseDoc } from "../../../firebase/utils";

export default function ProductDetail() {
  const { id } = useParams();

  const { docs: product } = useFirebaseDocs(() =>
    getFirebaseDoc(productCollection, id!)
  );

  // const [edit, setEdit] = useState(false);

  return (
    <>
      {!product ? (
        <Empty>No product found with ID "{id}"</Empty>
      ) : (
        <div className="w-full flex flex-col">
          <AdminHeader title={`Edit Product: ${product.title}`} />
          <ProductForm defaultValue={product} />
        </div>
      )}
    </>
  );
}
