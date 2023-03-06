import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import "./index.css";

import GamePage from "./pages/GamePage";

const game = {
  name: "hej",
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum quam fuga, minus voluptas repellendus voluptatem!",
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Header />
    <GamePage Game={game} />
  </React.StrictMode>
);
