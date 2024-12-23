import { Outlet } from "react-router-dom";
import { Navbar, OnlineUsers, Sidebar } from "../components";

function MainLayout() {
  return (
    <div className="grid grid-cols-12 h-screen">
      <Sidebar />
      <main className="col-span-8 bg-red-50">
        <Navbar />
        <Outlet />
      </main>
      <OnlineUsers />
    </div>
  );
}

export default MainLayout;
