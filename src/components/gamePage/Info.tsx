import { IGame } from "../../interfaces/game";
import "../../styles/gamepage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

type Props = {
  game: IGame;
};

const Info = ({ game }: Props) => {
  return (
    <div className="infoContainer">
      <div>
        <h1>{game.name}</h1>
        <p>{game.description}</p>
        <p>Total players in game: {game.players.length}</p>
        <p>
          Number of <span className="zombieWord">Zombies</span> :{" "}
          {game.kills.length + 1}
        </p>
        <p>
          Start date for the game:
          <span style={{ fontWeight: "bold" }}> {game.startDate}</span>
        </p>
        <p>
          The end date for the game:
          <span style={{ fontWeight: "bold" }}> {game.endDate}</span>
        </p>
        <p>
          GameStatus:
          <span style={{ fontWeight: "bold" }}> {game.gameState}</span>
        </p>
      </div>
      <Divider orientation="vertical" flexItem />
      <div className="rules">
        <h2>Rules</h2>
        <List>
          <ListItem disablePadding>
            <ListItemIcon>
              <FontAwesomeIcon
                icon={faTriangleExclamation}
                style={{ color: "#c1761f" }}
              />
            </ListItemIcon>
            <ListItemText>
              Once tagged, a human becomes a
              <span className="zombieWord"> zombie </span> for the remainder of
              the game
            </ListItemText>
          </ListItem>
          <ListItem disablePadding>
            <ListItemIcon>
              <FontAwesomeIcon
                icon={faTriangleExclamation}
                style={{ color: "#c1761f" }}
              />
            </ListItemIcon>
            <ListItemText>
              Human players are able to defend themselves against the
              <span className="zombieWord"> zombie </span>
              horde using Nerf weapons and clean, rolled-up socks which may be
              thrown to
              <span style={{ fontWeight: "bold" }}> stun</span> an unsuspecting
              <span className="zombieWord"> zombie </span>.
            </ListItemText>
          </ListItem>
          <ListItem disablePadding>
            <ListItemIcon>
              <FontAwesomeIcon
                icon={faTriangleExclamation}
                style={{ color: "#c1761f" }}
              />
            </ListItemIcon>
            <ListItemText>
              When tagged, human players are required to provide a unique,
              secret bite code to the{" "}
              <span className="zombieWord"> zombie </span>. The bite codes
              should be randomly generated and appropriate for manual text entry
            </ListItemText>
          </ListItem>
          <ListItem disablePadding>
            <ListItemIcon>
              <FontAwesomeIcon
                icon={faTriangleExclamation}
                style={{ color: "#c1761f" }}
              />
            </ListItemIcon>
            <ListItemText>
              <span className="zombieWord">Zombies </span> that collect the bite
              code of a human must log their kill in the system to turn the
              human player into a <span className="zombieWord"> zombie </span>.
              Optionally the killer may specify location and a text description
              of their kill to create a kill marker on the map.
            </ListItemText>
          </ListItem>
        </List>
      </div>
    </div>
  );
};
export default Info;
