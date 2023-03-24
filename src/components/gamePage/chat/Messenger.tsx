import { Container, Grid, makeStyles } from "@mui/material";
import MessageBox from "./MessageBox";
import { getAnything, addMessage, getUsers } from "../../../api/apiCalls";
import { useEffect, useState } from "react";
import { IPlayer } from "../../../interfaces/player";
import { IGame } from "../../../interfaces/game";
import ChatForm from "./ChatForm";
import { IChannel } from "../../../interfaces/channel";
import ChannelList from "./ChannelList";
import ChatBox from "./ChatBox";

type Props = {
  game: IGame;
  player: IPlayer | undefined;
};

const Messenger = ({ game, player }: Props) => {
  let gameId = game.id;
  const [channels, setOptions] = useState<IChannel[]>([]);
  const [chosenChannel, setChosenChannel] = useState<IChannel | undefined>(undefined);

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

  useEffect(() => {
    if(channels)
    {
      setChosenChannel(channels[0]);
    }
  }, [channels])

  const handleSubmit = async(event: any) => 
  {
    console.log("event", event);
    if (!player) return;
    event.preventDefault();
    await addMessage(game.id, {
      gameId: game.id,
      channelId: chosenChannel?.id,
      playerId: player?.id,
      contents: event.target.msg.value,
    });
  }

  
  const handleSubmitClick = async(message: string) => 
  {
    if (!player) return;
    await addMessage(game.id, {
      gameId: game.id,
      channelId: chosenChannel?.id,
      playerId: player?.id,
      contents: message,
    });
  }

  // Load the channels from the API
  // On form submit -> Make api call to post a new message using the gameId, channelId, playerId and contents.
  return (
    <>
    {channels.length > 0 ? 
    
    <Grid container sx={{height: "250px"}}>
      <Grid item xs={2} sx={{height: "100%"}} bgcolor="#C0C0F2">
        <ChannelList channels={channels} setChosenChannel={setChosenChannel}/>  
      </Grid>
      <Grid item xs={4}>
        <ChatBox game={game} handleSubmit={handleSubmit} handleSubmitClick={handleSubmitClick} channels={channels}></ChatBox>
      </Grid>
    </Grid> : 
    <></>
    }
    </>
    );
};

export default Messenger;
