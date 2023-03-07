import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import "./index.css";
import { Game } from "./interfaces/game";

import GamePage from "./pages/GamePage";

const game: Game = {
  Name: "Game 1",
  Description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum quam fuga, minus voluptas repellendus voluptatem!",
  id: 1,
  players: [],
  kill: [],
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Header />
    <GamePage game={game} />
  </React.StrictMode>
);
