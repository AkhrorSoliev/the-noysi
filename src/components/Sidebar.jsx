import { NavLink } from "react-router-dom";
import { Avatar } from "./";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";

function Sidebar() {
  return (
    <div className="col-span-2 bg-accent">
      <Avatar />
      <ul className="flex flex-col gap-4 pl-10">
        <li>
          <NavLink className="nav-item" to="/">
            <MdOutlineSpaceDashboard /> Projects
          </NavLink>
        </li>
        <li>
          <NavLink className="nav-item" to="/create">
            <IoMdAdd /> Create
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
