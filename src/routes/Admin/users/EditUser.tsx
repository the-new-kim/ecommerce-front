import { useParams } from "react-router-dom";
import AdminHeader from "../../../components/AdminHeader";

export default function EditUser() {
  const { id } = useParams();
  return (
    <>
      <AdminHeader title={`Edit User ID: ${id}`} />
    </>
  );
}
