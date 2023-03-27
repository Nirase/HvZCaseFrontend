import { Grid, Paper, TextField } from "@mui/material";
import IChannel from "../../../interfaces/channel";
import { IGame } from "../../../interfaces/game";
import ChatForm from "./ChatForm";
import MessageBox from "./MessageBox";

type Props =
    {
        game: IGame;
        channels: IChannel[];
        handleSubmit: any;
        handleSubmitClick: any;
    }

const ChatBox = ({ game, channels, handleSubmit, handleSubmitClick }: Props) => {
    return (
        <Grid container sx={{maxHeight:"250px"}} margin="0" padding="0">
            <Grid item xs={12} sx={{maxHeight:"200px"}}>
                <MessageBox game={game} options={channels}></MessageBox>
            </Grid>
            <Grid item xs={12} bgcolor="#9A9AEB">
                <ChatForm handleSubmit={handleSubmit} handleSubmitClick={handleSubmitClick} />
            </Grid>
        </Grid>
    )
}

export default ChatBox;