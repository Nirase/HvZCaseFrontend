import { Container } from "@mui/material";
import Pusher from "pusher-js";
import { useEffect, useRef, useState } from "react";
import { getAnything } from "../../../api/apiCalls";
import { IGame } from "../../../interfaces/game";
import { IChannel } from "../../../interfaces/channel";

type Props = {
  game: IGame;
  options: IChannel[];
};

const MessageBox = ({ game, options: channels }: Props) => {
  const [messages, setMessages] = useState([["", "", ""]]);
  const bottomRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollTo({
      top: bottomRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  useEffect(() => {
    const pusher = new Pusher("e346b81befca052d8721", {
      cluster: "eu",
    });

    channels.forEach((x: IChannel) => {
      pusher.unsubscribe(x.id.toString());
    });

    channels.forEach((x: IChannel) => {
      let channel = pusher.subscribe(x.id.toString());
      channel.bind("MessageRecieved", function (data: any) {
        setMessages((messages) => [
          ...messages,
          [data.channel, data.sender, data.message],
        ]);
      });
    });

    return () => {
      channels.forEach((x: IChannel) => {
        pusher.unsubscribe(x.id.toString());
      });
    };
  }, [channels]);

  useEffect(() => {
    const fetchOldMessages = async () => {
      let result = await getAnything(
        `api/v1/game/${game.id}/channel/withdetails`
      );
      let allMessages: any = [];
      result.forEach(async (value: any) => {
        value.messages.forEach(async (msg: any) => {
          allMessages.push([msg.channel, msg.sender, msg.contents]);
        });
      });
      setMessages(allMessages);
    };

    fetchOldMessages();
  }, []);

  return (
    <Container
      ref={bottomRef}
      sx={{
        border: 1,
        minHeight: "200px",
        maxHeight: "200px",
        maxWidth: "sm",
        overflow: "auto",
        bgcolor: "#C0C0F2",
      }}
    >
      {messages.slice(1).map((msg, index) => (
        <p key={index}>
          [{msg[0]}] {msg[1]}: {msg[2]}
        </p>
      ))}
    </Container>
  );
};

export default MessageBox;
