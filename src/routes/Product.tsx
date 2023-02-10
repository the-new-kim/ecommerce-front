import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { headerHeightAtom, ICartProduct, meAtom } from "../libs/atoms";
import { firebaseDB } from "../firebase/config";
import { IProduct } from "./Home";
import H1 from "../components/typos/H1";
import H3 from "../components/typos/H3";
import { centToDollor } from "../libs/utils";

export default function Product() {
  const navigate = useNavigate();
  const [me, setMe] = useRecoilState(meAtom);

  const { productId } = useParams();

  //if(!productId) {return navigate("/")}

  // const product = useFirebaseSingleDoc()

  const [product, setProduct] = useState<IProduct>();

  const [quantity, setQuantity] = useState(1);

  const getProduct = async () => {
    if (!productId) return;

    try {
      const docRef = doc(firebaseDB, "products", productId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProduct({ ...docSnap.data(), id: docSnap.id } as IProduct);
      } else {
        // redirect or show error message
      }
    } catch (error) {
      console.log("ERROR:::", error);
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

    const stringifiedCart = cartCopy.map((item) => {
      if (item.productId === cartProduct.productId) {
        item.quantity += cartProduct.quantity;
        matched = true;
      }

      return JSON.stringify(item);
    });

    if (!matched) {
      stringifiedCart.push(JSON.stringify(cartProduct));
    }

    setMe((prev) => {
      if (!prev) return prev;
      const newMe = { ...prev };
      const parsedCart = stringifiedCart.map((item) => JSON.parse(item));
      newMe.cart = parsedCart;

      return newMe;
    });

    const docRef = doc(firebaseDB, "users", me.uid);
    await updateDoc(docRef, {
      cart: stringifiedCart,
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

          {me?.isAdmin && (
            <button
              className="mt-5 cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              // onClick={onDeleteClick}
            >
              {product.active ? "Deactivate Product" : "Activate Product"}
            </button>
          )}
        </div>
      </div>
    </>
  );
}
