import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// global context
import GlobalContextProvider from "./context/GlobalContext.jsx";

// toasts
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <GlobalContextProvider>
    <Toaster />
    <App />
  </GlobalContextProvider>,
);
