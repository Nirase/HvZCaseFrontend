import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import { initialize } from "./keycloak";
import AdminPage from "./pages/AdminPage";
import LandingPage from "./pages/LandingPage";
import { ROLES } from "./roles/roles";
import KeycloakRoute from "./routes/KeyCloakRoute.jsx";
import KeyCloakRoute from "./routes/KeyCloakRoute.jsx";

// const root = ReactDOM.createRoot(
//   document.getElementById("root") as HTMLElement
// );

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <LandingPage />
  </React.StrictMode>
);

initialize()
  .then(() => {
    // If No Keycloak Error occurred - Display the App
    root.render(
      <React.StrictMode>
        <BrowserRouter>
          <Routes>
            <Route path="" element={<LandingPage />} />
            <Route
              path="/profile"
              element={
                <KeycloakRoute role={ROLES.Admin}>
                  <AdminPage />
                </KeycloakRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </React.StrictMode>
    );
  })
  .catch(() => {
    root.render(
      <React.StrictMode>
        <p>Could Not Connect To Keycloak.</p>
      </React.StrictMode>
    );
  });
