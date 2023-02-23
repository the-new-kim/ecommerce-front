// import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import AdminHeader from "../../../components/AdminHeader";
import Empty from "../../../components/Empty";

import ProductForm from "../../../components/forms/product/ProductForm";
import { productCollection } from "../../../firebase/config";

import { getFirebaseDoc } from "../../../firebase/utils";

export default function ProductDetail() {
  const { id } = useParams();

  const {
    data: product,
    isLoading,
    error,
  } = useQuery(["product", id], () => getFirebaseDoc(productCollection, id!));

  console.log("Loading", isLoading);
  console.log("ERROR", error);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <Empty>{`${error}`}</Empty>;

  return (
    <>
      <div className="w-full flex flex-col">
        <AdminHeader title={`Edit Product: ${product?.title}`} />
        <ProductForm defaultValue={product} />
      </div>
    </>
  );
}
