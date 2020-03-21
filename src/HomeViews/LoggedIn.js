import React from 'react';
import firebase from '../firebase/firebase';
import 'firebase/auth';
import Button from '@material-ui/core/Button';

function LoggedIn({ userInfo }) {

  const signOut = async () => {
    await firebase.auth().signOut();
  }

  return (
    <div style={{marginTop: '10vh'}}>
      Welcome User.
      <Button onClick={e => signOut()}>Sign Out</Button>
    </div>
  );
}

export default LoggedIn;