import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import H1 from "../components/typos/H1";
import { getProductsByMultiplIds } from "../firebase/utils";
import { meAtom } from "../libs/atoms";
import { IProduct } from "./Home";

export default function Cart() {
  const me = useRecoilValue(meAtom);
  const [cartItems, setCartItems] = useState<IProduct[]>([]);

  useEffect(() => {
    if (!me?.cart.length) return;

    (async () => {
      const results = await getProductsByMultiplIds(
        me.cart.map((item) => item.productId)
      );

      if (!results) return;
      setCartItems(results.reverse());
    })();
  }, [me]);

  // console.log(
  //   cartItems.map((item) => item.price).reduce((acc, cur) => acc + cur)
  // );

  return (
    <div className="p-5 ">
      <H1>Cart</H1>
      {!!cartItems.length && (
        <table className="text-start mt-5 w-full">
          <thead>
            <tr className="[&>*]:p-3 border-b-2 border-black">
              <th className="w-[60%] text-start">Item</th>
              <th className="text-center">Quantity</th>
              <th className="text-right">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr
                key={"cartItem" + index}
                className="[&>*]:p-3 border-b-[1px] border-black"
              >
                <td className="flex justify-start items-center">
                  <span className="w-20 max-w-[40%] aspect-square mr-3 overflow-hidden">
                    <img
                      className="object-cover w-full h-full"
                      src={item.imageUrls[0]}
                    />
                  </span>
                  <span>{item.title}</span>
                </td>
                <td className="text-center">
                  <button>+</button>
                  {item.quantity}
                  <button>-</button>
                </td>
                <td className="text-right">
                  $ {Number(item.quantity) * Number(item.price)}
                </td>
              </tr>
            ))}

            <tr className="[&>*]:p-3">
              <td>Subtotal includes:</td>
              <td></td>

              <td className="text-right">
                ${" "}
                {cartItems
                  .map((item) => Number(item.price) * Number(item.quantity))
                  .reduce(
                    (accumulator, currentValue) => accumulator + currentValue
                  )}
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}
