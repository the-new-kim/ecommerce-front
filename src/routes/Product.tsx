import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { firebaseDB } from "../firebase";
import { IProduct } from "./Home";

export default function Product() {
  const { productId } = useParams();
  const [product, setProduct] = useState<IProduct>();

  const getProduct = async () => {
    if (!productId) return;

    try {
      const docRef = doc(firebaseDB, "products", productId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProduct(docSnap.data() as IProduct);
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

  return <div>{product?.title}</div>;
}
