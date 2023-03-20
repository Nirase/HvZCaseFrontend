import { Container } from "@mui/material";
import MessageBox from "./MessageBox";
import { getAnything, addMessage, getUsers } from "../../../api/apiCalls";
import { useEffect, useState } from "react";
import { Player } from "../../../interfaces/player";
import { Game } from "../../../interfaces/game";
import ChatForm from "./ChatForm";

type Props = {
  game: Game;
  player: Player | undefined;
};

const ChatBox = ({ game, player }: Props) => 
{
    let gameId = game.id;
    const [options, setOptions] = useState<any>([]);

    
    useEffect(() => {
        if (gameId) {
          const fetchOptions = async () => {
            const data = await getAnything(`api/v1/game/${gameId}/channel`);
            setOptions(data);
          };

          fetchOptions();
      }}, []);

    

    // Load the options from the API 
    // On form submit -> Make api call to post a new message using the gameId, channelId, playerId and contents.
    return (
        <Container maxWidth="sm" >
          {options ?  <MessageBox game={game} options={options}></MessageBox> : <></>}
          {options ? <ChatForm player={player} options={options} game={game}></ChatForm> : <></>}
        </Container>
    );

}

export default ChatBox;