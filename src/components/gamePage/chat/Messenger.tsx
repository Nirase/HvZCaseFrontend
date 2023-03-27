import { Grid } from "@mui/material";
import { getAnything, addMessage } from "../../../api/apiCalls";
import { useEffect, useState } from "react";
import { IPlayer } from "../../../interfaces/player";
import { IGame } from "../../../interfaces/game";
import { IChannel } from "../../../interfaces/channel";
import ChannelList from "./ChannelList";
import ChatBox from "./ChatBox";

type Props = {
  game: IGame;
  player: IPlayer | undefined;
};

const Messenger = ({ game, player }: Props) => {
  let gameId = game.id;
  const [channels, setChannels] = useState<IChannel[]>([]);
  const [chosenChannel, setChosenChannel] = useState<IChannel | undefined>(undefined);

  useEffect(() => {
    if (gameId) {
      const fetchChannels = async () => {
        const data = await getAnything(`api/v1/game/${gameId}/channel`);
        const channels: IChannel[] = Object.values(data);
        setChannels(channels);
      };

      fetchChannels();
    }
  }, []);


  useEffect(() => {
    if (gameId) {
      const fetchOptions = async () => {
        const data = await getAnything(`api/v1/game/${gameId}/channel`);
        const channels: IChannel[] = Object.values(data);
        setChannels(channels);
      };

      fetchOptions();
    }
  }, [player]);

  useEffect(() => {
    if(channels)
    {
      setChosenChannel(channels[0]);
    }
  }, [channels])

  const handleSubmit = async(event: any) => 
  {
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
    
    <Grid container sx={{height: "250px"}} minWidth="250px">
      <Grid item xs={4} sx={{height: "100%"}} bgcolor="#C0C0F2">
        <ChannelList channels={channels} setChosenChannel={setChosenChannel}/>  
      </Grid>
      <Grid item xs={8}>
        <ChatBox game={game} handleSubmit={handleSubmit} handleSubmitClick={handleSubmitClick} channels={channels}></ChatBox>
      </Grid>
    </Grid> : 
    <></>
    }
    </>
    );
};

export default Messenger;
