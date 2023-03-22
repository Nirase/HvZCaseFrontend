import { Container } from "@mui/material";
import MessageBox from "./MessageBox";
import { getAnything, addMessage, getUsers } from "../../../api/apiCalls";
import { useEffect, useState } from "react";
import { IPlayer } from "../../../interfaces/player";
import { IGame } from "../../../interfaces/game";
import ChatForm from "./ChatForm";
import { IChannel } from "../../../interfaces/channel";

type Props = {
  game: IGame;
  player: IPlayer | undefined;
};

const ChatBox = ({ game, player }: Props) => {
  let gameId = game.id;
  const [options, setOptions] = useState<IChannel[]>([]);

  useEffect(() => {
    if (gameId) {
      const fetchOptions = async () => {
        const data = await getAnything(`api/v1/game/${gameId}/channel`);
        const channels: IChannel[] = Object.values(data);
        setOptions(channels);
      };

      fetchOptions();
    }
  }, []);

  // Load the options from the API
  // On form submit -> Make api call to post a new message using the gameId, channelId, playerId and contents.
  return (
    <Container maxWidth="sm">
      {options.length > 0 ? (
        <MessageBox game={game} options={options}></MessageBox>
      ) : (
        <></>
      )}
      {options.length > 0 ? (
        <ChatForm player={player} options={options} game={game}></ChatForm>
      ) : (
        <></>
      )}
    </Container>
  );
};

export default ChatBox;
