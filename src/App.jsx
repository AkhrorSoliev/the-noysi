import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { ProtectedRoutes } from "./components";

// layouts
import MainLayout from "./layouts/MainLayout";

// pages
import { Create, Dashboard, Login, Project, Signup, Profile } from "./pages";

// action
import { action as CreateAction } from "./pages/Create";
import { action as LoginAction } from "./pages/Login";
import { action as SignupAction } from "./pages/Signup";

// hooks
import { useGlobalContext } from "./hooks/useGlobalContext";

function App() {
  const { user, authReady } = useGlobalContext();
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoutes user={user}>
          <MainLayout />
        </ProtectedRoutes>
      ),
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: "/create",
          element: <Create />,
          action: CreateAction,
        },
        {
          path: "/project/:id",
          element: <Project />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
      ],
    },
    {
      path: "/login",
      element: user ? <Navigate to="/" /> : <Login />,
      action: LoginAction,
    },
    {
      path: "/signup",
      element: user ? <Navigate to="/" /> : <Signup />,
      action: SignupAction,
    },
  ]);
  return <>{authReady && <RouterProvider router={routes} />}</>;
}

export default App;
