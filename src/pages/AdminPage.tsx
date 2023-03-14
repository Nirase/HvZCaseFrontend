import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getListOfGames } from "../api/apiCalls";
import AdminGameCard from "../components/adminPage/AdminGameCard";
import { Game } from "../interfaces/game";

const AdminPage = () => {
  const [games, setGames] = useState([]);
  //implement this in navbar
  useEffect(() => {
    const fetchGames = async () => {
      const data = await getListOfGames();
      setGames(data);
    };
    fetchGames();
  }, []);

  return (
    //isLogin ? <Protected /> : <Public />;
    <div>
      <h4>Admin Page </h4>
      {games.map((game: Game) => {
        return (
          <div key={game.id}>
            <AdminGameCard game={game} />
          </div>
        );
      })}
    </div>
  );
};

export default AdminPage;
