import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import firebase from "../firebase/firebase";
import "firebase/auth";
import "firebase/firestore";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";

function SignUpModal({ set, setName, isOpen, closeModal, loggedIn }) {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passConfirm, setPassConfirm] = useState("");

  const resetText = () => {
    setUserName("");
    setEmail("");
    setPassword("");
    setPassConfirm("");
  };

  const signUpUser = async () => {
    if (password === passConfirm) {
      try {
        const userCredentials = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);
        await firebase
          .firestore()
          .collection("users")
          .doc(userCredentials.user.uid)
          .set({
            name: userName,
            uid: userCredentials.user.uid
          });
        if (set) {
          await firebase.firestore().collection("stacks").add({
            name: setName,
            uid: userCredentials.user.uid,
            set
          });
        }
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  const renderRedirect = () => {
    if (loggedIn && !set) {
      return <Redirect to="/" />;
    } else {
      return null;
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
      <DialogTitle>Create Account</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          type="text"
          label="Username"
          fullWidth
          variant="outlined"
          value={userName}
          onChange={e => setUserName(e.target.value)}
        />
        <TextField
          margin="dense"
          type="email"
          label="E-Mail"
          fullWidth
          variant="outlined"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <TextField
          margin="dense"
          type="password"
          label="Password"
          fullWidth
          variant="outlined"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <TextField
          margin="dense"
          type="password"
          label="Repeat Password"
          fullWidth
          variant="outlined"
          value={passConfirm}
          onChange={e => setPassConfirm(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          onClick={e => {
            signUpUser();
          }}
        >
          Sign Up
        </Button>
        {renderRedirect()}
      </DialogActions>
    </Dialog>
  );
}

export default SignUpModal;
