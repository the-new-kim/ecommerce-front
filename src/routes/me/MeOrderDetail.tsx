import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userAtom } from "../../libs/atoms";

export default function MeOrderDetail() {
  const { orderId } = useParams();
  const me = useRecoilValue(userAtom);

  return <div>ID: {orderId}</div>;
}
