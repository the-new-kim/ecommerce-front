import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { headerHeightAtom, userAtom } from "../libs/atoms";
import { firebaseDB } from "../firebase/config";

import H1 from "../components/typos/H1";
import H3 from "../components/typos/H3";
import { centToDollor } from "../libs/utils";
import { ICartProduct, IProductDoc } from "../firebase/types";

export default function Product() {
  const navigate = useNavigate();
  const [me, setUser] = useRecoilState(userAtom);

  const { productId } = useParams();

  //if(!productId) {return navigate("/")}

  // const product = useFirebaseSingleDoc()

  const [product, setProduct] = useState<IProductDoc>();

  const [quantity, setQuantity] = useState(1);

  const getProduct = async () => {
    if (productId) {
      try {
        const docRef = doc(firebaseDB, "products", productId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct({ ...docSnap.data(), id: docSnap.id } as IProductDoc);
        } else {
          // redirect or show error message
        }
      } catch (error) {
        console.log("ERROR:::", error);
      }
    } else {
      // redirect or show error message
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  const headerHeight = useRecoilValue(headerHeightAtom);

  // const onDeleteClick = async () => {
  //   const ok = window.confirm("Sure?");
  //   if (!ok) return;

  //   //1️⃣ Remove product on stripe with its Price
  //   const stripeDetailResult = await getStripeProductDetail(productId!);

  //   const priceId = stripeDetailResult.data?.default_price;

  //   //4️⃣ Finally delete product document on firestore & image files
  //   await deleteDoc(doc(firebaseDB, "products", productId!));
  //   for (let i = 0; i < product!.imageUrls.length; i++) {
  //     const attachmentRef = ref(firebaseStorage, product!.imageUrls[i]);
  //     await deleteObject(attachmentRef);
  //   }

  //   navigate("/");
  // };

  const onDeactivate = async () => {
    // Use this instead Delete product...
  };
  const onAddToCartClick = async () => {
    if (!me || !product || !productId) return;

    let matched = false;
    const cartProduct: ICartProduct = {
      productId,
      quantity,
    };

    const cartCopy = me.cart.map((item) => {
      return { ...item };
    });

    const newCart = cartCopy.map((item) => {
      if (item.productId === cartProduct.productId) {
        item.quantity += cartProduct.quantity;
        matched = true;
      }

      return item;
    });

    if (!matched) {
      newCart.push(cartProduct);
    }

    setUser((prev) => {
      if (!prev) return prev;
      const newMe = { ...prev };

      newMe.cart = newCart;
      return newMe;
    });

    const docRef = doc(firebaseDB, "users", me.id);
    await updateDoc(docRef, {
      cart: newCart,
    });

    // ON SUCCESS MESSAGE
  };

  if (!product) return <div>No Product..</div>;

  return (
    <>
      {/* {<Message>Deleting...</Message>} */}
      <div className="relative grid grid-cols-2">
        <div>
          {product.imageUrls.map((imageUrl, index) => (
            <img key={"img" + index} src={imageUrl}></img>
          ))}
        </div>
        <div
          style={{
            top: headerHeight,
            height: `calc(100vh - ${headerHeight}px)`,
          }}
          className="sticky flex flex-col justify-center items-center p-5"
        >
          <H1>{product.title}</H1>
          <H3>{product.label}</H3>
          <div>
            <span>{centToDollor(product.price)}</span>
            <hr />
            <span>{quantity}</span>
          </div>
          <button
            onClick={onAddToCartClick}
            className="mt-5 cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add to Cart
          </button>
          <p>{product.description}</p>
        </div>
      </div>
    </>
  );
}
