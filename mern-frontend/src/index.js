import { createRoot } from "react-dom/client";
import { AuthContextProvider } from "./context/AuthContext";
import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
);
