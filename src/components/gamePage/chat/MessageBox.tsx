import { Container } from "@mui/material"
import Pusher from "pusher-js";
import { useEffect, useRef, useState } from "react"
import { getAnything } from "../../../api/apiCalls";
import { Game } from "../../../interfaces/game";

type Props = {
    game: Game;
  };
  

const MessageBox = ({ game }: Props) => 
{

    const [messages, setMessages] = useState([["",""]])
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
		const channel1 = pusher.subscribe('Global');

		channel1.bind('MessageRecieved',function(data: any) {
            setMessages(messages => [...messages, [data.sender, data.message]])
		})
		
		return (() => {
			pusher.unsubscribe('Global')
		})
	}, []);
    

    useEffect(() => {
        const fetchOldMessages = async () =>
        {
            let result = await getAnything("api/v1/game/1/channel");
            console.log(result);
            result.forEach(async (value) => {
                value.messages.forEach(async (msg) => {
                    let message = await getAnything(msg);
                    setMessages(messages => [...messages, [message.sender, msg.message]]);

                })
            })
        }

        fetchOldMessages();
    }, []);



      

    return (
        <Container ref={bottomRef} sx={{border: 1, minHeight: "250px", maxHeight:"250px", maxWidth:"sm", overflow:'auto'}}>
            {messages.slice(1).map((msg, index) => (
                <p>{msg[0]}: {msg[1]}</p>
            ))}
        </Container>
    )
}


export default MessageBox;