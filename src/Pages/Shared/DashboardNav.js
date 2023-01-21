import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

export default function DashboardNav({ navHeader }) {
  return (
    <div className="flex items-center justify-between px-3 2xl:px-0 lg:justify-start gap-5 lg:gap-0">
      <div className="lg:w-80">
        <Link to="/">
          <img className="w-32 h-12" src={logo} alt="parlour logo" />
        </Link>
      </div>

      <h2 className="sm:text-lg font-semibold mr-auto">{navHeader}</h2>

      <label
        tabIndex={0}
        htmlFor="parlour-drawer"
        className="btn btn-ghost lg:hidden"
      >
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
    </div>
  );
}
