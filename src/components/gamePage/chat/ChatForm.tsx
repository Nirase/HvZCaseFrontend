import { Button, Grid, MenuItem, Paper, Select, TextField } from "@mui/material";
import { Container } from "@mui/system";
import { addMessage } from "../../../api/apiCalls";

const ChatForm = ({ player, game, options }) => {
    const sendMessage = async (event: any) => {
        if (!player)
            return;
        event.preventDefault();
        console.log(event.target.channelId.value);
        await addMessage(game.id, {
            gameId: game.id,
            channelId: event.target.channelId.value,
            playerId: player?.id,
            contents: event.target.msg.value
        });
    }


    return (
        <Paper sx={{bgcolor:"#4C443C"}}>
        <form onSubmit={sendMessage} style={{ margin: 0, padding: 0 }}>
            <Grid container alignItems="center">
                <Grid item xs={false} sm={2}>
                    <Select name="channelId" fullWidth defaultValue={1}>
                        {options?.map((x) => (
                            <MenuItem key={x.id} value={x.id}>
                                {x.name}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <TextField name="msg" fullWidth />
                </Grid>
                <Grid item xs={false} sm={2}>
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Send
                    </Button>
                </Grid>
            </Grid>
        </form>
        </Paper>
    );
}

export default ChatForm;