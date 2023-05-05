import React from "react";
import {IconButton, Snackbar} from "@mui/material";
import {Close} from "@mui/icons-material";
import {EditorPlugin} from "./EditorPlugin";


let _showError: (error: Error) => void;

export const showError = (error: Error) => {
  if (_showError) {
    _showError(error);
  }
}

export interface MessageSnackbarProps {

}

// export function MessageSnackbarPlugin(): IEditorPlugin {
//   return {
//     name: "MessageSnackbar",
//     getGlobalItem: () => {
//       return <MessageSnackbar/>
//     }
//   }
// }
export class MessageSnackbarPlugin extends EditorPlugin {
  getGlobalItem() {
    return <MessageSnackbar/>
  }
}

function MessageSnackbar(props: MessageSnackbarProps) {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");

  function __showMessage(error: Error) {
    // setMessage(message);
    setMessage(error.message)
    setOpen(true);
  }

  _showError = __showMessage;


  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      message={message}
      action={
        <React.Fragment>
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
            <Close fontSize="small"/>
          </IconButton>
        </React.Fragment>
      }
    />
  );
}