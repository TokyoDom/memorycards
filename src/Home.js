import React, { Component } from "react";
import firebase from "./firebase/firebase";
import "firebase/firestore";
import "firebase/auth";
import LoggedOut from './HomePages/LoggedOut';
import LoggedIn from './HomePages/LoggedIn';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      loggedIn: false
    };
    this.db = firebase.firestore();
    this.auth = firebase.auth();
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.auth.onAuthStateChanged(async user => {
      if (user) {
        this.userInfo = await this.db
          .collection("users")
          .doc(user.uid)
          .get();
        this.cardSets = await this.db
          .collection("stacks")
          .where("uid", "==", user.uid)
          .get();
        this.setState({ 
          loggedIn: true,
          verified: user.emailVerified,
          loading: false 
        });
      } else {
        this.setState({ loading: false });
      }
    });
  }

  render() {
    return (
      <div>
        {this.state.loading ? null : this.state.loggedIn ? (
          <LoggedIn userInfo={this.userInfo} cardSets={this.cardSets}/>
        ) : (
          <LoggedOut />
        )}
      </div>
    );
  }
}

export default Home;
