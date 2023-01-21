import { Outlet } from "react-router-dom";
import Nav from "../Pages/Shared/Nav";
// Rezaul*1
export default function Main() {
  return (
    <div className="max-w-[1440px] mx-auto">
      <Nav />
      <div className="mt-16">
        <Outlet />
      </div>
    </div>
  );
}
