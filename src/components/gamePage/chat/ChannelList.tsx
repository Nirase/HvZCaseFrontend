import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useState } from "react";
import IChannel from "../../../interfaces/channel";
import ChannelListItem from "./ChannelListItem";

type Props =
{
    channels: IChannel[];
    setChosenChannel: any;
}
const ChannelList = ({channels, setChosenChannel} : Props) => {
    const [selectedIndex, setSelectedIndex] = useState(1);

    const handleListItemClick = (
      event: React.MouseEvent<HTMLDivElement, MouseEvent>,
      index: number,
    ) => {
      setSelectedIndex(index);
      setChosenChannel(index);
    };

    return (
        <>
         <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
         <List component="nav" aria-label="main mailbox folders" sx={{backgroundColor:"#C0C0F2"}}>

        {channels.map((x) => {
            return (
                <ChannelListItem key={x.id} channel={x} handleClick={handleListItemClick} selectedIndex={selectedIndex}></ChannelListItem>
            );
        })}
        </List>
        </Box>
        
        </>

       
    )
}


export default ChannelList;