import { createBrowserRouter, RouteObject } from "react-router-dom";

import { IUserAtom } from "./libs/atoms";

import Layout from "./Layout";
import NotFound from "./routes/NotFound";
import Home from "./routes/Home";
import User from "./routes/User";
import Auth from "./routes/Auth";
import Cart from "./routes/Cart";
import Wishlist from "./routes/Wishlist";
import Search from "./routes/Search";
import Product from "./routes/Product";
import AdminHome from "./routes/admin/AdminHome";
import ProductsHome from "./routes/admin/products/ProductsHome";
import AdminLayout from "./routes/admin/AdminLayout";
import Settings from "./routes/admin/Settings";
import Completion from "./routes/Completion";
import CreateProduct from "./routes/admin/products/CreateProduct";
import UsersHome from "./routes/admin/users/UsersHome";
import OrdersHome from "./routes/admin/orders/OrdersHome";
import EditProduct from "./routes/admin/products/EditProduct";
import EditOrder from "./routes/admin/orders/EditOrder";
import EditUser from "./routes/admin/users/EditUser";
import CheckoutLayout from "./routes/checkout/CheckoutLayout";
import CheckoutInformation from "./routes/checkout/CheckoutInformation";
import CheckoutShipping from "./routes/checkout/CheckoutShipping";
import CheckoutPayment from "./routes/checkout/CheckoutPayment";
import MeHome from "./routes/me/MeHome";
import MeLayout from "./routes/me/MeLayout";
import MeEdit from "./routes/me/MeEdit";
import MeOrders from "./routes/me/MeOrders";
import MeOrderDetail from "./routes/me/MeOrderDetail";

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

const meRoutes: RouteObject[] = [
  {
    path: "me",
    element: <MeLayout />,
    children: [
      { path: "", element: <MeHome />, index: true },

      { path: "edit", element: <MeEdit /> },
      {
        path: "orders",
        element: <MeOrders />,
        // children: [{ path: ":orderId", element: <MeOrderDetail /> }],
      },
      { path: "orders/:orderId", element: <MeOrderDetail /> },
    ],
  },
];

const checkoutRout: RouteObject = {
  path: "checkout",
  element: <CheckoutLayout />,
  children: [
    { path: "information", element: <CheckoutInformation />, index: true },
    {
      path: "shipping",
      element: <CheckoutShipping />,
    },
    {
      path: "payment",
      element: <CheckoutPayment />,
    },
  ],
};

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

  { path: "completion", element: <Completion /> },

  { path: "auth", element: <Auth /> },
  ...meRoutes,
  // ...checkoutRoutes,
];

const router = (me: IUserAtom | null) => {
  return createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <NotFound />,
      children: [
        ...globalRoutes,
        // ...(me ? protectedRoutes : publicOnlyRoutes),
        ...(me?.isAdmin ? adminOnlyRoutes : []),
      ],
    },
    checkoutRout,
  ]);
};

export default router;
