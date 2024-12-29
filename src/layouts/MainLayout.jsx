import { Outlet } from "react-router-dom";
import { Navbar, OnlineUsers, Sidebar } from "../components";

function MainLayout() {
  return (
    <div className="grid min-h-screen grid-cols-12">
      <Sidebar />
      <main className="col-span-8 overflow-y-auto bg-base-200 pb-10">
        <Navbar />
        <div className="align-elements pt-0">
          <Outlet />
        </div>
      </main>
      <OnlineUsers />
    </div>
  );
}

export default MainLayout;
