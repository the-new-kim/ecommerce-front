import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import { useRecoilValue } from "recoil";
import { IUserAtom, userAtom } from "./libs/atoms";

import Layout from "./Layout";
import NotFound from "./routes/NotFound";
import Home from "./routes/Home";
import User from "./routes/User";
import Auth from "./routes/Auth";
import Cart from "./routes/Cart";
import Wishlist from "./routes/Wishlist";
import Search from "./routes/Search";
import Category from "./routes/Category";
import Product from "./routes/Product";
import Me from "./routes/Me";
import AdminHome from "./routes/admin/AdminHome";
import ProductsHome from "./routes/admin/products/ProductsHome";
import AdminLayout from "./routes/admin/AdminLayout";
import Settings from "./routes/admin/Settings";
import Checkout from "./routes/Checkout";
import Completion from "./routes/Completion";
import CreateProduct from "./routes/admin/products/CreateProduct";
import UsersHome from "./routes/admin/users/UsersHome";
import OrdersHome from "./routes/admin/orders/OrdersHome";
import EditProduct from "./routes/admin/products/EditProduct";
import EditOrder from "./routes/admin/orders/EditOrder";
import EditUser from "./routes/admin/users/EditUser";

const adminOnlyRoutes: RouteObject[] = [
  {
    path: "admin",
    element: <AdminLayout />,
    children: [
      { element: <AdminHome />, index: true },
      {
        path: "products",
        children: [
          { element: <ProductsHome />, index: true },
          { path: "create", element: <CreateProduct /> },
          { path: ":id", element: <EditProduct /> },
        ],
      },
      {
        path: "users",
        children: [
          { element: <UsersHome />, index: true },
          { path: ":id", element: <EditUser /> },
        ],
      },
      {
        path: "orders",
        children: [
          { element: <OrdersHome />, index: true },
          { path: ":id", element: <EditOrder /> },
        ],
      },
      { path: "settings", element: <Settings /> },
    ],
  },
  { path: "users/:id", element: <User /> },
];

const publicOnlyRoutes: RouteObject[] = [{ path: "auth", element: <Auth /> }];

const protectedRoutes: RouteObject[] = [{ path: "me", element: <Me /> }];

const globalRoutes: RouteObject[] = [
  { element: <Home />, index: true },
  {
    path: "cart",
    element: <Cart />,
  },
  { path: "wishlist", element: <Wishlist /> },
  { path: "search", element: <Search /> },
  {
    path: "products",
    children: [{ path: ":productId", element: <Product /> }],
  },
  { path: "checkout", element: <Checkout /> },
  { path: "completion", element: <Completion /> },

  // { path: "/products/:category", element: <Category /> },
  // { path: "/products/:category/:productId", element: <Product /> },
];

const router = (me: IUserAtom | null) => {
  return createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <NotFound />,
      children: [
        ...globalRoutes,
        ...(me ? protectedRoutes : publicOnlyRoutes),
        ...(me?.isAdmin ? adminOnlyRoutes : []),
      ],
    },
  ]);
};

export default function Router() {
  const me = useRecoilValue(userAtom);

  console.log("ME::", me);

  return (
    <>
      <RouterProvider router={router(me)} />
    </>
  );
}
