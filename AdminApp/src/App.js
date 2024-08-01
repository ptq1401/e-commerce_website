import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import SideBar from "./Component/Sidebar/SideBar";
import AddProduct from "./Component/AddProduct/AddProduct";
// import DashBoard from "./Component/Dashboard/DashBoard";
// import Products from "./Component/Products/Products";
// import LiveChat from "./Component/LiveChat/LiveChat";
import Login from "./Component/Login/Login";
import Logout from "./Component/Logout/Logout";
import Error from "./Component/Error";
// import EditProduct from "./Component/Edit/EditProduct";
const DashBoard = lazy(() => import("./Component/Dashboard/DashBoard"));
const Products = lazy(() => import("./Component/Products/Products"));
const EditProduct = lazy(() => import("./Component/EditProduct/EditProduct"));
const LiveChat = lazy(() => import("./Component/LiveChat/LiveChat"));

//------------------------
const router = createBrowserRouter([
  {
    path: "/",
    element: <SideBar></SideBar>,
    errorElement: <Error></Error>,
    children: [
      { path: "/", element: <Login></Login> },
      { path: "/add-product", element: <AddProduct></AddProduct> },
      {
        path: "/dashboard",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <DashBoard></DashBoard>{" "}
          </Suspense>
        ),
        loader: () =>
          import("./Component/Dashboard/DashBoard").then((module) =>
            module.loader()
          ),
      },
      {
        path: "/products",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <Products></Products>
          </Suspense>
        ),
        loader: () =>
          import("./Component/Products/Products").then((module) =>
            module.loader()
          ),
      },
      {
        path: "/products/:productID",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <EditProduct></EditProduct>{" "}
          </Suspense>
        ),
        loader: (params) =>
          import("./Component/EditProduct/EditProduct").then((module) =>
            module.loader(params)
          ),
      },
      {
        path: "/livechat",
        element: <LiveChat></LiveChat>,
        loader: () =>
          import("./Component/LiveChat/LiveChat").then((module) =>
            module.loader()
          ),
      },
      { path: "/logout", element: <Logout></Logout> },
    ],
  },
]);
function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
