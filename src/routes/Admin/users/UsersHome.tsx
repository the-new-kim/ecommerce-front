import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../../../components/AdminHeader";
import Figure from "../../../components/elements/Figure";
import Empty from "../../../components/Empty";
import Spinner from "../../../components/loaders/Spinner";
import Table from "../../../components/table/Table";
import THead from "../../../components/table/THead";
import THeadRow from "../../../components/table/THeadRow";
import { userCollection } from "../../../firebase/config";
import { getFirebaseDocs } from "../../../firebase/utils";
import { cls } from "../../../libs/utils";

export default function UsersHome() {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery(["users"], () => getFirebaseDocs(userCollection));

  const navigate = useNavigate();
  const onClick = (id: string) => {
    navigate(`/admin/users/${id}`);
  };

  if (error) return <Empty>{`${error}`}</Empty>;

  if (isLoading || !users)
    return (
      <Empty>
        <Spinner />
      </Empty>
    );

  if (!users.length) return <Empty>No users</Empty>;

  return (
    <>
      <AdminHeader title="Users" />
      <Figure>
        <Table>
          <THead className="bg-black text-white">
            <THeadRow>
              <td className="text-start">ID</td>
              <td className="text-start">Admin</td>
            </THeadRow>
          </THead>
          <tbody>
            {users?.map((user, index) => (
              <tr
                key={user.id}
                className={
                  "[&>*]:p-3 border-b-[1px] border-black cursor-pointer group " +
                  cls(index === users.length - 1 ? "border-b-0" : "")
                }
                onClick={() => onClick(user.id)}
              >
                <td className="group-hover:underline">{user.id}</td>
                <td>{user.isAdmin ? "Admin User" : "User"}</td>
              </tr>
            ))}
            {/* {products?.map((product) => (
            <tr
              key={product.id}
              className="[&>*]:p-3 border-b-[1px] border-black cursor-pointer group"
              onClick={() => onProductClick(product.id)}
            >
              <td className="flex justify-start items-center">
                <span className="relative w-20 max-w-[40%] aspect-square mr-3 overflow-hidden">
                  <img
                    className="object-cover w-full h-full"
                    src={product.imageUrls[0]}
                  />
                </span>
              </td>
              <td className="group-hover:underline">{product.title}</td>
              <td>{centToDollor(product.price)}</td>
              <td>{product.quantity}</td>
              <td>{product.sold}</td>
              <td>{product.active ? "true" : "no"}</td>
            </tr>
          ))} */}
          </tbody>
        </Table>
      </Figure>
    </>
  );
}
