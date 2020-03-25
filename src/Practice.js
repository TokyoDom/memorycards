import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import firebase from "./firebase/firebase";
import "firebase/firestore";
import PracticeHome from "./PracticePages/PracticeHome";
import Standard from "./PracticePages/Standard";
import Typing from "./PracticePages/Typing";
import Quiz from "./PracticePages/Quiz";
import CircularProgress from "@material-ui/core/CircularProgress";

class Practice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      userInfo: props.userInfo,
      cardSets: []
    };

    this.db = firebase.firestore();
  }

  async componentDidMount() {
    //get data from firestore
    this.setState({ loading: true });
    if (this.props.userInfo) {
      const cardSets = await this.db
        .collection("stacks")
        .where("uid", "==", this.state.userInfo.uid)
        .get();
      this.setState({
        cardSets: cardSets.docs.map(doc => doc.data()),
        loading: false
      });
    }
  }

  render() {
    return (
      <section className="practice-routes">
        {!this.state.loading ? (
          <Switch>
            <Route
              exact
              path="/practice"
              render={props => (
                <PracticeHome {...props} key={window.location.pathname} />
              )}
            />
            <Route
              path="/practice/standard"
              render={props => (
                <Standard
                  {...props}
                  userInfo={this.state.userInfo}
                  cardSets={this.state.cardSets}
                  key={window.location.pathname}
                />
              )}
            />
            <Route
              path="/practice/typing"
              render={props => (
                <Typing
                  {...props}
                  userInfo={this.state.userInfo}
                  cardSets={this.state.cardSets}
                  key={window.location.pathname}
                />
              )}
            />
            <Route
              path="/practice/quiz"
              render={props => (
                <Quiz
                  {...props}
                  userInfo={this.state.userInfo}
                  cardSets={this.state.cardSets}
                  key={window.location.pathname}
                />
              )}
            />
          </Switch>
        ) : (
          <CircularProgress className="spinner" />
        )}
      </section>
    );
  }
}

export default Practice;
