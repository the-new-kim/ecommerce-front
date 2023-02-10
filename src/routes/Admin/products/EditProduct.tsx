import { useParams } from "react-router-dom";

export default function EditProduct() {
  const { id } = useParams();
  return <>Edit Product: {id}</>;
}
