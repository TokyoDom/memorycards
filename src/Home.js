import React, { Component } from "react";
import firebase from "./firebase/firebase";
import "firebase/firestore";
import "firebase/auth";
import LoggedOut from "./HomeViews/LoggedOut";
import LoggedIn from "./HomeViews/LoggedIn";
import Navbar from "./components/Navbar";

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
    this.unsub = this.auth.onAuthStateChanged(async user => {
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
        this.setState({
          loggedIn: false,
          loading: false
        });
      }
    });
  }

  componentWillUnmount() {
    this.unsub();
  }

  render() {
    return (
      <div>
        {this.state.loading ? null : this.state.loggedIn ? (
          <div>
            <Navbar userInfo={this.userInfo.data()} />
            <LoggedIn
              userInfo={this.userInfo.data()}
              cardSets={this.cardSets.docs.map(doc => doc.data())}
            />
          </div>
        ) : (
          <LoggedOut />
        )}
      </div>
    );
  }
}

export default Home;
