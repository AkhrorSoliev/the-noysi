import { Link, NavLink } from "react-router-dom";
import Logo from "../assets/noysi.svg";

import { useLogout } from "../hooks/useLogout";
import { useGlobalContext } from "../hooks/useGlobalContext";
import Button from "./Button";

function Navbar() {
  const { user } = useGlobalContext();
  const { logout, isPending } = useLogout();
  return (
    <div className="align-elements">
      <div className="flex justify-between">
        <Link to="/" className="flex items-center gap-1">
          <img src={Logo} alt="Site logo" width={40} />
          <span className="text-xl font-medium">Noysi</span>
        </Link>

        {user ? (
          <Button onClick={logout} size="sm" outline loading={isPending}>
            Logout
          </Button>
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
