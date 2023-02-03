import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import { useRecoilValue } from "recoil";
import { IMe, meAtom } from "./libs/atoms";

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
import AdminHome from "./routes/Admin/AdminHome";
import Users from "./routes/Admin/Users";
import Products from "./routes/Admin/Products";
import AdminLayout from "./routes/Admin/AdminLayout";
import Settings from "./routes/Admin/Settings";

const adminOnlyRoutes: RouteObject[] = [
  {
    path: "admin",
    element: <AdminLayout />,
    children: [
      { element: <AdminHome />, index: true },
      { path: "products", element: <Products /> },
      { path: "users", element: <Users /> },
      { path: "settings", element: <Settings /> },
    ],
  },
  { path: "users/:id", element: <User /> },
];

const publicOnlyRoutes: RouteObject[] = [{ path: "auth", element: <Auth /> }];

const protectedRoutes: RouteObject[] = [{ path: "users/me", element: <Me /> }];

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
  // { path: "/products/:category", element: <Category /> },
  // { path: "/products/:category/:productId", element: <Product /> },
];

const router = (me: IMe | null) => {
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
  const me = useRecoilValue(meAtom);

  console.log("ME::", me);

  return (
    <>
      <RouterProvider router={router(me)} />
    </>
  );
}
