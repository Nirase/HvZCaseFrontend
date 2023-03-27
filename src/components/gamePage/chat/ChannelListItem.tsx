import { ListItemButton, ListItemText } from "@mui/material";
import IChannel from "../../../interfaces/channel";

type Props = {
    channel: IChannel;
    handleClick: any;
    selectedIndex: number;
    
}
const ChannelListItem = ({channel, handleClick, selectedIndex}: Props) =>
{
    return (
        <ListItemButton
        selected={selectedIndex === channel.id}
        
        onClick={() => handleClick(channel.id)}
        >
            <ListItemText primary={channel.name} />
        </ListItemButton>
    )
}

export default ChannelListItem;