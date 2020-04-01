import React, { useState } from "react";
import firebase from "../firebase/firebase";
import "firebase/auth";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

function ResetPassModal({ isOpen, closeModal }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState("");

  const resetText = () => {
    setEmail("");
    setError("");
    setSent("");
  };

  const resetPass = async () => {
    try {
      await firebase.auth().sendPasswordResetEmail(email);
      setSent("E-Mail sent.");
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={e => {
        resetText();
        closeModal(false);
      }}
    >
      <DialogContent>
        Reset Password
        <TextField
          type="email"
          margin="dense"
          label="Confirm E-Mail"
          variant="outlined"
          fullWidth
          onChange={e => setEmail(e.target.value)}
        />
        <Typography>{sent}</Typography>
        <Typography variant="caption">{error}</Typography>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={e => resetPass()}
          >
            Send Reset E-mail
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}

export default ResetPassModal;
