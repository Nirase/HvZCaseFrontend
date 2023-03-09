import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import "./index.css";
import { Game } from "./interfaces/game";

import GamePage from "./pages/GamePage";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Header />
    <GamePage />
  </React.StrictMode>
);
