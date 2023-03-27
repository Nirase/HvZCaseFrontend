import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  InputAdornment,
  TextField,
} from "@mui/material";
import { faReply } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

type Props = {
  handleSubmit: any;
  handleSubmitClick: any;
};

const ChatForm = ({handleSubmit, handleSubmitClick} : Props) => {

  const [message, setMessage] = useState("");

  const onTextChange = (event: any) => 
  {
    setMessage(event.target.value)
  }

  return (
    <form onSubmit={handleSubmit}>
        <TextField onChange={onTextChange} name="msg" placeholder="Enter message..." InputProps={{endAdornment:(
          <InputAdornment position="end">
          <FontAwesomeIcon
          icon={faReply}
          onClick={() => handleSubmitClick(message)}
          className="cross"
        />
          </InputAdornment>
        ), sx: {height: "50px"}}} fullWidth />
    </form>
  );
};

export default ChatForm;
