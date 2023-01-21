import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../Layout/DashboardLayout";
import Main from "../../Layout/Main";
import AddService from "../../Pages/Dashboard/AddService/AddService";
import Book from "../../Pages/Dashboard/Book/Book";
import BookingList from "../../Pages/Dashboard/BookingList/BookingList";
import MakeAdmin from "../../Pages/Dashboard/MakeAdmin/MakeAdmin";
import ManageServices from "../../Pages/Dashboard/ManageServices/ManageServices";
import OrderList from "../../Pages/Dashboard/OrderList/OrderList";
import Home from "../../Pages/Home/Home/Home/Home";
import Services from "../../Pages/Home/Home/Services/Services/Services";
import Login from "../../Pages/Login/Login";
import Signup from "../../Pages/Signup/Signup";
import AdminRoute from "../AdminRoute/AdminRoute";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/myCart",
        element: <BookingList />,
      },
      {
        path: "/book/:id",
        element: <Book />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      // {
      //   path: "/dashboard",
      //   element: <BookingList />,
      // },

      // {
      //   path: "/dashboard/book/:id",
      //   element: <Book />,
      // },
      // need to be converted into Admin route
      {
        path: "/dashboard",
        element: (
          <AdminRoute>
            <OrderList />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/addService",
        element: (
          <AdminRoute>
            <AddService />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/makeAdmin",
        element: (
          <AdminRoute>
            <MakeAdmin />
          </AdminRoute>
        ),
      },

      {
        path: "/dashboard/manageServices",
        element: (
          <AdminRoute>
            <ManageServices />
          </AdminRoute>
        ),
      },
    ],
  },
]);
export default router;
