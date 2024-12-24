import { Link, NavLink } from "react-router-dom";
import Logo from "../assets/noysi.svg";

import { useGlobalContext } from "../hooks/useGlobalContext";

function Navbar() {
  const { user } = useGlobalContext();
  return (
    <div className="align-elements">
      <div className="flex justify-between">
        <Link to="/" className="flex items-center gap-1">
          <img src={Logo} alt="Site logo" width={40} />
          <span className="text-xl font-medium">Noysi</span>
        </Link>

        {user ? (
          <button className="btn btn-outline btn-primary btn-sm">Logout</button>
        ) : (
          <div className="navlinks">
            <NavLink to="/signup">Signup</NavLink>
            {" / "}
            <NavLink to="/login">Login</NavLink>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
