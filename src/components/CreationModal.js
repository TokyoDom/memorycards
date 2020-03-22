import React from "react";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";

function CreationModal(props) {
  return (
    <Dialog open={props.isOpen} onClose={e => props.modalOpen(false)}>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="front"
          type="text"
          label="Front"
          fullWidth
          value={props.modCard.front}
          onChange={e => props.setText(e)}
        />
        <TextField
          margin="dense"
          id="back"
          type="text"
          label="Back"
          fullWidth
          value={props.modCard.back}
          onChange={e => props.setText(e)}
        />
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={e => {
              props.saveChanges(props.modCard);
              props.modalOpen(false);
            }}
          >
            OK
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}

export default CreationModal;
