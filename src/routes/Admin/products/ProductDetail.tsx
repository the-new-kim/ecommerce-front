// import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import AdminHeader from "../../../components/AdminHeader";
import Empty from "../../../components/Empty";

import ProductForm from "../../../components/forms/product/ProductForm";
import Spinner from "../../../components/loaders/Spinner";
import { productCollection } from "../../../firebase/config";

import { getFirebaseDoc } from "../../../firebase/utils";

export default function ProductDetail() {
  const { id } = useParams();

  const {
    data: product,
    isLoading,
    error,
  } = useQuery(["product", id], () => getFirebaseDoc(productCollection, id!));

  if (error) return <Empty>{`${error}`}</Empty>;

  if (isLoading)
    return (
      <Empty>
        <Spinner />
      </Empty>
    );

  return (
    <>
      <div className="w-full flex flex-col">
        <AdminHeader title={`Edit Product: ${product?.title}`} />
        <ProductForm defaultValue={product} />
      </div>
    </>
  );
}
