import { useRecoilState } from "recoil";
import Heading from "../components/elements/typos/Heading";
import Empty from "../components/Empty";
import { userAtom } from "../libs/atoms";

export default function Wishlist() {
  const [me, setMe] = useRecoilState(userAtom);

  return (
    <div className="p-5 h-full flex flex-col">
      <Heading tagName="h3">Wishlist</Heading>
      {me?.wishlist.length ? (
        me.wishlist.map((product) => <div>{product}</div>)
      ) : (
        <Empty>You currently don't have any favorites</Empty>
      )}
    </div>
  );
}
