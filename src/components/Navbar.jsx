import { Link } from "react-router-dom";

import Logo from "../assets/noysi.svg";

function Navbar() {
  return (
    <div className="align-elements">
      <Link to="/" className="flex gap-1 items-center">
        <img src={Logo} alt="Site logo" width={40} />
        <span className="font-medium text-xl">Noysi</span>
      </Link>
    </div>
  );
}

export default Navbar;
