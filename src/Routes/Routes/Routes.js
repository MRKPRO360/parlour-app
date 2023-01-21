import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../Layout/DashboardLayout";
import Main from "../../Layout/Main";
import AddService from "../../Pages/Dashboard/AddService/AddService";
import Book from "../../Pages/Dashboard/Book/Book";
import BookingList from "../../Pages/Dashboard/BookingList/BookingList";
import MakeAdmin from "../../Pages/Dashboard/MakeAdmin/MakeAdmin";
import ManageServices from "../../Pages/Dashboard/ServiceList/ManageServices";
import OrderList from "../../Pages/Dashboard/OrderList/OrderList";
import Home from "../../Pages/Home/Home/Home/Home";
import Services from "../../Pages/Home/Home/Services/Services/Services";
import Login from "../../Pages/Login/Login";
import Signup from "../../Pages/Signup/Signup";
import AdminRoute from "../AdminRoute/AdminRoute";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import AllCustomers from "../../Pages/Dashboard/AllCustomers/AllCustomers";

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
        path: "/dashboard/serviceList",
        element: (
          <AdminRoute>
            <ManageServices />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/customers",
        element: (
          <AdminRoute>
            <AllCustomers />
          </AdminRoute>
        ),
      },
    ],
  },
]);
export default router;
