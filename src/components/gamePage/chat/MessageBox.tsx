import { Container } from "@mui/material"
import Pusher from "pusher-js";
import { useEffect, useRef, useState } from "react"
import { getAnything } from "../../../api/apiCalls";
import { Game } from "../../../interfaces/game";
import { Channel } from "../../../interfaces/channel";

type Props = {
    game: Game;
    options: Channel[];
  };
  

const MessageBox = ({ game, options }: Props) => 
{

    const [messages, setMessages] = useState([["", "",""]])
    const bottomRef = useRef<null | HTMLDivElement>(null); 
    
    useEffect(() => {
      bottomRef.current?.scrollTo({top: bottomRef.current.scrollHeight, behavior: 'smooth'})
    }, [messages]);


    useEffect(() => {
		const pusher = new Pusher("e346b81befca052d8721", {
			cluster: 'eu'
		})

        options.forEach((x : Channel) => {
            pusher.unsubscribe(x.name);
        })

        options.forEach((x : Channel) => {
            let channel = pusher.subscribe(x.name);
            channel.bind('MessageRecieved', function(data: any) {
                setMessages(messages => [...messages, [data.channel, data.sender, data.message]])
            })
        })

		
		return (() => {
            options.forEach((x : Channel) => {
                pusher.unsubscribe(x.name);
            })
		})
	}, [options]);
    

    useEffect(() => {
        const fetchOldMessages = async () =>
        {
            let result = await getAnything("api/v1/game/1/channel/withdetails");
            let allMessages: any = []
            result.forEach(async (value: any) => {
                value.messages.forEach(async (msg: any) => {
                    allMessages.push([msg.channel ,msg.sender, msg.contents]);
                })
            })
            setMessages(allMessages);
        }

        fetchOldMessages();
    }, []);


    return (
        <Container ref={bottomRef} sx={{border: 1, minHeight: "250px", maxHeight:"250px", maxWidth:"sm", overflow:'auto', bgcolor:"#4C443C"}}>
            {messages.slice(1).map((msg, index) => (
                <p key={index}>[{msg[0]}] {msg[1]}: {msg[2]}</p>
            ))}
        </Container>
    )
}

export default MessageBox;