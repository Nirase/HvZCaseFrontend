import { Container } from "@mui/material";
import MessageBox from "./MessageBox";
import { getAnything, addMessage, getUsers } from "../../../api/apiCalls";
import { useEffect, useState } from "react";
import { User } from "../../../interfaces/user";
import keycloak from "../../../keycloak";
import { Player } from "../../../interfaces/player";
import { Game } from "../../../interfaces/game";

type Props = {
  game: Game;
};

const ChatBox = ({ game }: Props) => 
{
    let gameId = game.id;
    const [options, setOptions] = useState([]);

    const [playerString, setPlayerString] = useState<any>();
    const [player, setPlayer] = useState<Player>();
    
    useEffect(() => {
        if (gameId) {
          const fetchOptions = async () => {
            const data = await getAnything(`api/v1/game/${gameId}/channel`);
            setOptions(data);
          };

          fetchOptions();
          const fetchUser = async () => {
            const data = await getUsers();
            const theUser: User = data.find(
              (user: User) =>
              user.firstName === keycloak.tokenParsed?.name.split(" ")[0] // change to sub value to check id insted
            );

            console.log(theUser);
    
            const player = theUser.players.find(
              (player: string) =>  +player.split("/")[3] === gameId
            );
            console.log(player);
            setPlayerString(player);
          };
          fetchUser();
      }}, []);

      
  useEffect(() => {
    if (playerString) {
      const fetchPlayer = async () => {
        const data = await getAnything(playerString);
        setPlayer(data);
      };

      fetchPlayer();
    }
  }, [playerString]);
    
  const sendMessage = async (event) => 
  {
    if(!player)
      return;
    event.preventDefault();
    await addMessage(gameId, {
        gameId: gameId,
        channelId: event.target.channelId.value,
        playerId: player?.id,
        contents: event.target.msg.value
    });
  }

    // Load the options from the API 
    // On form submit -> Make api call to post a new message using the gameId, channelId, playerId and contents.
    return (
        <Container maxWidth="sm">
        
        <MessageBox game={game}></MessageBox>
        <form onSubmit={sendMessage}>
            <select name="channelId">
                {options?.map(x => {
                    return <option key={x.id} value={x.id}>{x.name}</option>
                })}
            </select>
            <input type="text" name="msg" />
            <button type="submit" >Submit</button>
        </form>
        </Container>
    );

}

export default ChatBox;