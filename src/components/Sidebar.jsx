import { NavLink } from "react-router-dom";
import { Avatar } from "./";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { IoMdAdd, IoMdSettings } from "react-icons/io";
import { useGlobalContext } from "../hooks/useGlobalContext";

function Sidebar() {
  const { user } = useGlobalContext();
  return (
    <div className="col-span-2 bg-accent">
      <Avatar user={user} />
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
        <li>
          <NavLink className="nav-item" to="/profile">
            <IoMdSettings /> Profile
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
