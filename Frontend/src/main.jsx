// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import { AuthProvider } from "./context/AuthContext";
// import "./index.css";
// import App from "./App.jsx";

// const root = createRoot(document.getElementById("root"));

// root.render(
//   <StrictMode>
//     <AuthProvider>
//       <App />
//     </AuthProvider>
//   </StrictMode>
// );

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "./context/AuthContext";
import App from "./App.jsx";
import "./index.css";
import "./styles/auth.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);
