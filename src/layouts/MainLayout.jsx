import { Outlet } from "react-router-dom";
import { Navbar, OnlineUsers, Sidebar } from "../components";

function MainLayout() {
  return (
    <div className="grid h-screen grid-cols-12">
      <Sidebar />
      <main className="col-span-8 pb-10">
        <Navbar />
        <div className="align-elements">
          <Outlet />
        </div>
      </main>
      <OnlineUsers />
    </div>
  );
}

export default MainLayout;
