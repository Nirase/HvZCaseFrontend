import { Container } from "@mui/material"
import Pusher from "pusher-js";
import { useEffect, useRef, useState } from "react"
import { getAnything } from "../../../api/apiCalls";
import { Game } from "../../../interfaces/game";

type Props = {
    game: Game;
    options: any;
  };
  

const MessageBox = ({ game, options }: Props) => 
{

    const [messages, setMessages] = useState([["", "",""]])
    const bottomRef = useRef<null | HTMLDivElement>(null); 
    
    useEffect(() => {
      // 👇️ scroll to bottom every time messages change
      console.log(bottomRef.current);
      bottomRef.current?.scrollTo({top: bottomRef.current.scrollHeight, behavior: 'smooth'})
    }, [messages]);


    useEffect(() => {
		const pusher = new Pusher("e346b81befca052d8721", {
			cluster: 'eu'
		})

        options.forEach(({x} : any) => {
            pusher.unsubscribe(x.name);
        })

        options.forEach(({x} : any) => {
            let channel = pusher.subscribe(x.name);
            console.log(x.name);
            channel.bind('MessageRecieved', function(data: any) {
                setMessages(messages => [...messages, [data.channel, data.sender, data.message]])
            })
        })

		
		return (() => {
            options.forEach(({x} : any) => {
                pusher.unsubscribe(x.name);
            })
		})
	}, [options]);
    

    useEffect(() => {
        const fetchOldMessages = async () =>
        {
            let result = await getAnything("api/v1/game/1/channel/withdetails");
            result.forEach(async (value: any) => {
                console.log(value);
                value.messages.forEach(async (msg: any) => {
                    setMessages(messages => [...messages, [msg.channel ,msg.sender, msg.contents]]);
                })
            })
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