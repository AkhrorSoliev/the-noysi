import { createBrowserRouter, RouterProvider } from "react-router-dom";

// layouts
import MainLayout from "./layouts/MainLayout";

// pages
import { Create, Dashboard, Login, Project, Signup } from "./pages";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: "/create",
          element: <Create />,
        },
        {
          path: "/project/:id",
          element: <Project />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
  ]);
  return <RouterProvider router={routes} />;
}

export default App;