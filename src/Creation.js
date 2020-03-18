import React, { Component } from "react";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-multi-backend";
import HTML5toTouch from "react-dnd-multi-backend/dist/esm/HTML5toTouch";
import SingleCard from "./CreationViews/SingleCard";
import MultiCard from "./CreationViews/MultiCard";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import BorderAllIcon from "@material-ui/icons/BorderAll";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";

const testSet = [
  { front: "Card 1 Front", back: "Card 1 Back" },
  { front: "Card 2 Front", back: "Card 2 Back" },
  { front: "Card 3 Front", back: "Card 3 Back" },
  { front: "Card 4 Front", back: "Card 4 Back" },
  { front: "Card 5 Front", back: "Card 5 Back" },
  { front: "Card 6 Front", back: "Card 6 Back" },
  { front: "Card 7 Front", back: "Card 7 Back" },
  { front: "Card 8 Front", back: "Card 8 Back" }
];

class Creation extends Component {
  state = {
    set: [],
    modCard: { front: "", back: "", id: null },
    singView: true
  };

  componentDidMount() {
    this.setState({ set: testSet.map((card, i) => ({ ...card, id: i })) });
  }

  changeModCard = card => {
    this.setState({ modCard: card });
  };

  //Helper
  updateSet = set => {
    const newSet = set.map((card, i) => ({ ...card, id: i }));
    this.setState({ set: newSet });
  };

  //for modCard modal text
  setText = e => {
    if (e.target.id === "front") {
      this.setState({
        modCard: {
          front: e.target.value,
          back: this.state.modCard.back,
          id: this.state.modCard.id
        }
      });
    } else {
      this.setState({
        modCard: {
          front: this.state.modCard.front,
          back: e.target.value,
          id: this.state.modCard.id
        }
      });
    }
  };

  render() {
    return (
      <DndProvider backend={Backend} options={HTML5toTouch}>
        <section className="creation-page">
          <ButtonGroup style={{ marginBottom: 6 }}>
            <Button
              variant={this.state.singView ? "contained" : null}
              color={this.state.singView ? "primary" : null}
              onClick={e => this.setState({ singView: true })}
            >
              <CheckBoxOutlineBlankIcon />
            </Button>
            <Button
              variant={this.state.singView ? null : "contained"}
              color={this.state.singView ? null : "primary"}
              onClick={e => this.setState({ singView: false })}
            >
              <BorderAllIcon />
            </Button>
          </ButtonGroup>
          {this.state.singView ? (
            <SingleCard
              set={this.state.set}
              modCard={this.state.modCard}
              updateSet={this.updateSet}
              changeModCard={this.changeModCard}
              setText={this.setText}
            />
          ) : (
            <MultiCard
              set={this.state.set}
              modCard={this.state.modCard}
              updateSet={this.updateSet}
              changeModCard={this.changeModCard}
              setText={this.setText}
            />
          )}
        </section>
      </DndProvider>
    );
  }
}

export default Creation;
