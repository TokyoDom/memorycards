import React, { Component } from "react";
import { Link } from "react-router-dom";
import firebase from "../firebase/firebase";
import "firebase/firestore";
import Flashcard from "../components/Flashcard";
import quotes from "./quotes/quotes";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import CircularProgress from "@material-ui/core/CircularProgress";

class LoggedIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      userInfo: props.userInfo,
      cardSets: [],
      set: [],
      type: null
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
        .orderBy("date", "desc")
        .limit(3)
        .get();
      this.setState({
        cardSets: cardSets.docs.map(doc => doc.data()),
        loading: false
      });
    }
  }

  showQuote = () => {
    const day = new Date().getDate();
    const quote = quotes.filter(quote => quote.id === day)[0];

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "75vw",
          margin: "auto"
        }}
      >
        <h1 style={{ fontFamily: "Dancing Script, cursive", marginBottom: 6 }}>
          {quote.quote}
        </h1>
        <small>- {quote.author}</small>
      </div>
    );
  };

  render() {
    return (
      <div>
        {this.state.loading ? (
          <CircularProgress className="spinner" />
        ) : (
          <div>
            {this.showQuote()}
            <div className="loggedIn-sets" style={{ marginTop: "5vh" }}>
              <h4>Recent Sets</h4>
              {this.state.cardSets.map((set, i) => (
                <div
                  style={{ display: "flex", flexDirection: "column" }}
                  key={i}
                >
                  <Flashcard
                    set={set.set}
                    setName={set.name}
                    cardStyles={this.state.userInfo.styles}
                  />
                  <ButtonGroup style={{ margin: "auto" }}>
                    <Button
                      component={Link}
                      to={{ pathname: "/create", state: { set } }}
                    >
                      Edit
                    </Button>
                    <Button
                      component={Link}
                      to={{ pathname: "/practice/typing", state: { set } }}
                    >
                      Practice
                    </Button>
                    <Button
                      component={Link}
                      to={{ pathname: "/practice/quiz", state: { set } }}
                    >
                      Quiz
                    </Button>
                  </ButtonGroup>
                  <hr />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default LoggedIn;
