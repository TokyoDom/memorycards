import * as firebase from 'firebase/app';

var firebaseConfig = {
  apiKey: "AIzaSyAF9wDjZiPS8822QxVuR0xi-DZsu7uf8Pk",
  authDomain: "memorycards-8c2a4.firebaseapp.com",
  databaseURL: "https://memorycards-8c2a4.firebaseio.com",
  projectId: "memorycards-8c2a4",
  storageBucket: "memorycards-8c2a4.appspot.com",
  messagingSenderId: "713179064974",
  appId: "1:713179064974:web:445a28d620dd32af5eb7df"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;