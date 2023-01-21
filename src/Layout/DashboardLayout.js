import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

import DashboardNav from "../Pages/Shared/DashboardNav";

export default function DashboardLayout() {
  const [navHeader, setNavHeader] = useState("Booking List");
  const adminNavItems = [
    {
      path: "/dashboard/",
      text: "Order List",
    },
    {
      path: "/dashboard/addService",
      text: "Add Service",
    },
    {
      path: "/dashboard/serviceList",
      text: "Service List",
    },
    {
      path: "/dashboard/customers",
      text: "All Customers",
    },
  ];
  return (
    <div className="max-w-[1440px] mx-auto">
      <DashboardNav navHeader={navHeader} />
      <div className="drawer drawer-mobile">
        <input id="parlour-drawer" type="checkbox" className="drawer-toggle" />
        <div className="rounded drawer-content bg-blue-50/50 pt-11">
          {<Outlet />}
        </div>
        <div className="pt-2 drawer-side">
          <label htmlFor="parlour-drawer" className="drawer-overlay"></label>
          <ul className=" pr-4 menu w-80 bg-base-100 text-base-content">
            {adminNavItems.map((item, i) => (
              <NavLink
                onClick={() => setNavHeader(`${item.text}`)}
                key={i}
                className={({ isActive }) =>
                  isActive
                    ? "text-white bg-pink-500 px-3 py-2 transition duration-300 rounded font-semibold shadow-md shadow-pink-400"
                    : "text-black px-3 py-2 transition duration-300 rounded font-semibold"
                }
                to={item.path}
              >
                {item.text}
              </NavLink>
            ))}
            {/* 
            <li>
              <Link to="/dashboard" onClick={() => setNavHeader("Order List")}>
                Order List
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/addService"
                onClick={() => setNavHeader("Add Service")}
              >
                Add Service
              </Link>
            </li>

            <li>
              <Link
                to="/dashboard/serviceList"
                onClick={() => setNavHeader("All Services")}
              >
                Service List
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/customers"
                onClick={() => setNavHeader("All Customers")}
              >
                All Customers
              </Link>
            </li> */}
          </ul>
        </div>
      </div>
    </div>
  );
}
