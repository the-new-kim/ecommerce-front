import { Heart, IconWeight } from "phosphor-react";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userAtom } from "../libs/atoms";
import { IProductWithId } from "../routes/Cart";

interface IAddToWishlistButtonProps {
  product: IProductWithId;
}

export default function AddToWishlistButton({
  product,
}: IAddToWishlistButtonProps) {
  const [me, setMe] = useRecoilState(userAtom);
  const [onList, setOnList] = useState(false);
  const [weight, setWeight] = useState<IconWeight>("thin");

  // INIT
  useEffect(() => {
    if (!me || !me.wishlist.length) return;

    const isOnList = me.wishlist.includes(product.id);
    setOnList(isOnList);
    setWeight(isOnList ? "fill" : "thin");
  }, []);

  useEffect(() => {
    setWeight(onList ? "fill" : "thin");
  }, [onList]);

  const onClick = async () => {
    if (!me) return;

    setMe((oldMe) => {
      if (!oldMe) return oldMe;
      const newMe = {
        ...oldMe,
      };

      if (onList) {
        // Delete from wishlist
        newMe.wishlist = oldMe.wishlist.filter(
          (productId) => productId !== product.id
        );
        setOnList(false);
      } else {
        // Add to wishlist
        newMe.wishlist = [product.id, ...oldMe.wishlist];
        setOnList(true);
      }

      return newMe;
    });
  };

  const onMouseEnter = () => {
    if (onList) return;
    setWeight("fill");
  };

  const onMouseLeave = () => {
    if (onList) return;
    setWeight("thin");
  };

  return (
    <Heart
      className="cursor-pointer"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      weight={weight}
    />
  );
}
