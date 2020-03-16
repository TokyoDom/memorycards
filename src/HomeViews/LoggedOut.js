import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import CreateIcon from "@material-ui/icons/Create";
import Flashcard from "../components/Flashcard";

class LoggedOut extends Component {

  state = {
    set: [
      {
        front: "What is Memory Cards?",
        back: `A place to make simple online flashcards to study with. Click create
        set to start or login if you already have an account!`
      }
    ]
  }

  render() {
    return (
      <section className="home-logged-out">
        <h3>Welcome to Memory Cards</h3>
        <Flashcard
          set={this.state.set}
        />
        <ButtonGroup style={{ marginTop: 6 }}>
          <Button
            component={Link}
            to="/create"
            variant="contained"
            color="primary"
          >
            <CreateIcon />
            Create Set
          </Button>
          <Button component={Link} to="/login" variant="contained">
            Login
          </Button>
        </ButtonGroup>
      </section>
    );
  }
}

export default LoggedOut;
