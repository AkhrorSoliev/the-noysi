import { Link } from "react-router-dom";
import Logo from "../assets/noysi.svg";

function Navbar() {
  return (
    <div className="align-elements">
      <div className="flex justify-between">
        <Link to="/" className="flex items-center gap-1">
          <img src={Logo} alt="Site logo" width={40} />
          <span className="text-xl font-medium">Noysi</span>
        </Link>
        <button className="btn btn-outline btn-primary btn-sm">Logout</button>
      </div>
    </div>
  );
}

export default Navbar;
