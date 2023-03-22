import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertColor, AlertProps } from "@mui/material/Alert";
import { forwardRef, useEffect, useState } from "react";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type Props = {
  open: boolean;
  res: any;
  from: string | undefined;
  setClose: (show: boolean) => void;
};

const ResponseSnackBar = ({ open, res, from, setClose }: Props) => {
  const [show, setOpen] = useState(false);
  const [version, setVersion] = useState<AlertColor>();
  const [message, setMessage] = useState<string>();

  console.log(show);

  useEffect(() => {
    if (open) {
      setOpen(true);
    } else {
      setOpen(false);
    }

    if (res === undefined) {
      setVersion("error");
      setMessage("Oh, something went wrong with your request from " + from);
    } else if (res.status === 400) {
      setVersion("warning");
      setMessage("Oh, something went wrong with your request from " + from);
    } else if (res === "enter all fields") {
      setVersion("error");
      setMessage("You have to enter all fields");
    } else if (!res.status) {
      setVersion("success");
      setMessage("You have successfully " + from);
    }
  }, [open, res]);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setClose(false);
    setOpen(false);
  };
  return (
    <Snackbar open={show} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={version} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};
export default ResponseSnackBar;

// exemple of colors and varianter
/* <Alert severity="error">This is an error message!</Alert>
      <Alert severity="warning">This is a warning message!</Alert>
      <Alert severity="info">This is an information message!</Alert>
      <Alert severity="success">This is a success message!</Alert> */
