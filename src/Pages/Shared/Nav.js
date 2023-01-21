import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useAuth } from "../../Context/AuthContext";
import useAdmin from "../../Hooks/useAdmin";

export default function Nav() {
  const { currentuser, logout } = useAuth();
  const email = currentuser?.email;
  const navigate = useNavigate();
  const [isAdmin] = useAdmin(email);

  const handleLogout = async function () {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  const items = [
    {
      text: "Home",
      path: "/",
    },
    {
      text: "Services",
      path: "/services",
    },
  ];

  const userNavItems = items.map((el, i) => (
    <NavLink
      className={({ isActive }) =>
        isActive
          ? "font-semibold block bg-pink-600 text-white py-1 px-3 transition duration-300 rounded shadow-md shadow-pink-600"
          : "block py-1 px-3 transition text-black duration-300 rounded font-semibold"
      }
      key={i}
      to={el.path}
    >
      {el.text}
    </NavLink>
  ));

  const conditionalItems = currentuser?.uid ? (
    <>
      {isAdmin ? (
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "font-semibold block bg-pink-600 text-white py-1 px-3 transition duration-300 rounded shadow-md shadow-pink-600"
              : "block py-1 px-3 transition text-black duration-300 rounded font-semibold"
          }
          to="/dashboard"
        >
          Dashboard
        </NavLink>
      ) : (
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "font-semibold block bg-pink-600 text-white py-1 px-3 transition duration-300 rounded shadow-md shadow-pink-600"
              : "block py-1 px-3 transition text-black duration-300 rounded font-semibold"
          }
          to="/myCart"
        >
          My Cart
        </NavLink>
      )}
      <span
        onClick={handleLogout}
        className="block px-3 py-1 font-semibold text-black transition duration-300 rounded cursor-pointer"
      >
        Logout
      </span>
    </>
  ) : (
    <NavLink
      className={({ isActive }) =>
        isActive
          ? "font-semibold block bg-pink-600 text-white py-1 px-3 transition duration-300 rounded shadow-md shadow-pink-600"
          : "block py-1 px-3 transition text-black duration-300 rounded font-semibold"
      }
      to="/login"
    >
      Login
    </NavLink>
  );

  return (
    <div className="justify-between navbar bg-base-100">
      <div className=" navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="gap-3 p-2 mt-3 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
          >
            {userNavItems}
            {conditionalItems}
          </ul>
        </div>
        <div>
          <Link to="/">
            <img className="w-32 h-12" src={logo} alt="parlour logo" />
          </Link>
        </div>
      </div>
      <div className="hidden navbar-center lg:flex">
        <ul className="gap-10 p-0 menu menu-horizontal">
          {userNavItems} {conditionalItems}
        </ul>
      </div>
    </div>
  );
}
