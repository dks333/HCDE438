import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function PopupForm(props) {
  const [open, setOpen] = React.useState(false);
  const [text, setText] = React.useState("");

  function addComment() {
    setOpen(false);
    if (text === "") return; // skip the function
    props.send(text);
    setText("");
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Comment
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Comment</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Comment on this file that will be viewed by others
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Comment"
            onChange={(e) => setText(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={addComment} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
