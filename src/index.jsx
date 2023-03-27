import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { initialize } from "./keycloak";
import Loading from "./components/Loading";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import KeycloakRoute from "./routes/KeyCloakRoute";
import { ROLES } from "./roles/roles";
import AdminPage from "./pages/AdminPage";
import LandingPage from "./pages/LandingPage";
import Header from "./components/Header";
import GamePage from "./pages/GamePage";
import SquadPage from "./pages/SquadPage";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<Loading message="Connecting to Keycloak..." />);

initialize()
  .then(() => {
    // If No Keycloak Error occurred - Display the App
    root.render(
      <BrowserRouter>
        <Header />
        {/* for the datePicker */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <main className="container">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route
                path="/admin"
                element={
                  <KeycloakRoute role={ROLES.Admin}>
                    <AdminPage />
                  </KeycloakRoute>
                }
              />
              <Route
                path="/game/:gameId"
                element={
                  <KeycloakRoute role={ROLES.User}>
                    <GamePage />
                  </KeycloakRoute>
                }
              />
              <Route
                path="/game/:gameId/squad/:squadId"
                element={
                  <KeycloakRoute role={ROLES.User}>
                    <SquadPage />
                  </KeycloakRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </LocalizationProvider>
      </BrowserRouter>
    );
  })
  .catch(() => {
    root.render(
      <React.StrictMode>
        <p>Could Not Connect To Keycloak.</p>
      </React.StrictMode>
    );
  });
