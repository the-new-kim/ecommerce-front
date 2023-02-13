import { useParams } from "react-router-dom";
import AdminHeader from "../../../components/AdminHeader";

export default function EditOrder() {
  const { id } = useParams();

  return (
    <>
      <AdminHeader title={`Edit Order ID: ${id}`} />
    </>
  );
}
