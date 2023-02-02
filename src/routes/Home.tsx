import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { meAtom } from "../atoms";
import { firebaseDB } from "../firebase";

export interface IProduct {
  title: string;
  label: string;
  description: string;
  quantity: number;
  price: number;
  imageUrls: string[];
  id: string;
}

export default function Home() {
  const [products, setProducts] = useState<IProduct[]>([]);

  const getProducts = async () => {
    const q = query(
      collection(firebaseDB, "products")
      // orderBy("createdAt", "desc")
    );

    try {
      const querySnapshot = await getDocs(q);

      const allProducts = querySnapshot.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
        } as IProduct;
      });
      setProducts(allProducts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <h1>Home</h1>

      {!!products.length &&
        products.map((product) => (
          <li key={product.id}>
            <Link to={`/products/${product.id}`}>
              {product.title}
              {product.price}
              <img width={100} src={product.imageUrls[0]} />
            </Link>
          </li>
        ))}
    </div>
  );
}
