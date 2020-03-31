import React, { Component } from "react";
import "firebase/firestore";
import "firebase/auth";
import LoggedOut from "./HomeViews/LoggedOut";
import LoggedIn from "./HomeViews/LoggedIn";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      loggedIn: props.loggedIn,
      userInfo: props.userInfo
    };
  }

  render() {
    return (
      <div>
        {this.state.loading ? null : this.props.loggedIn ? (
          <div>
            <LoggedIn
              userInfo={this.props.userInfo}
              cardSets={this.props.cardSets}
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
