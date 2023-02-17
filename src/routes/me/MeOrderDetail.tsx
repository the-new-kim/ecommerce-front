import { useRecoilValue } from "recoil";
import { userAtom } from "../../libs/atoms";

export default function MeOrderDetail() {
  const me = useRecoilValue(userAtom);

  return <div></div>;
}
