import { NavLink } from "react-router-dom";
import { Avatar } from "./";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { IoMdAdd, IoMdSettings, IoMdMoon, IoMdSunny } from "react-icons/io";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { useEffect, useState } from "react";

function themeToggler() {
  return localStorage.getItem("theme") || "winter";
}

function Sidebar() {
  const [theme, setTheme] = useState(themeToggler());

  const toggleTheme = () => {
    setTheme((curr) => (curr === "winter" ? "night" : "winter"));
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.body.setAttribute("class", theme == "night" ? "dark" : "");
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const { user } = useGlobalContext();
  return (
    <div className="col-span-2 flex flex-col bg-base-200">
      <Avatar user={user} />
      <ul className="menu mb-auto flex flex-col gap-4 pl-10 pr-0">
        <li>
          <NavLink
            className="menu-item rounded-r-none text-xl active:bg-base-100"
            to="/"
          >
            <MdOutlineSpaceDashboard /> Projects
          </NavLink>
        </li>
        <li>
          <NavLink
            className="rounded-r-none text-xl active:bg-base-100"
            to="/create"
          >
            <IoMdAdd /> Create
          </NavLink>
        </li>
        <li>
          <NavLink
            className="rounded-r-none text-xl active:bg-base-100"
            to="/profile"
          >
            <IoMdSettings /> Profile
          </NavLink>
        </li>
      </ul>
      <div className="flex justify-center py-10">
        <label className="swap swap-rotate">
          {/* this hidden checkbox controls the state */}
          <input
            type="checkbox"
            onClick={toggleTheme}
            defaultChecked={theme === "winter"}
          />

          {/* sun icon */}
          <IoMdMoon className="swap-on h-7 w-7 fill-current text-black" />

          {/* moon icon */}
          <IoMdSunny className="swap-off h-7 w-7 fill-current text-white" />
        </label>
      </div>
    </div>
  );
}

export default Sidebar;
