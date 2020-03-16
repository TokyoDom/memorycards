import React, { Component } from "react";
import SingleCard from "./CreationViews/SingleCard";
import MultiCard from "./CreationViews/MultiCard";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import BorderAllIcon from "@material-ui/icons/BorderAll";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";

class Creation extends Component {
  state = {
    set: [],
    modCard: { front: "", back: "" },
    singView: true
  };

  addNewCard = () => {
    const newSet = [...this.state.set, this.state.modCard];
    this.setState({
      set: newSet
    });
  };

  editCard = () => {
    if(this.state.set.length > 0) {
      const index = this.getIndex();
      let newSet = [...this.state.set];
      newSet[index] = this.state.modCard;
      this.setState({set: newSet});
    }
  }

  changeModCard = (card) => {
    this.setState({modCard: card});
  }
  //Use for all front/back
  setText = e => {
    if (e.target.id === "front") {
      this.setState({
        modCard: { front: e.target.value, back: this.state.modCard.back }
      });
    } else {
      this.setState({
        modCard: { front: this.state.modCard.front, back: e.target.value }
      });
    }
  };

  getIndex = () => {
    //get index from flashcard
    let index = document.getElementById('index').textContent;
    index = parseInt(index.substring(0, index.indexOf('/')));
    return index - 1;
  };

  render() {
    return (
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
            addNewCard={this.addNewCard}
            editCard={this.editCard}
            changeModCard={this.changeModCard}
            setText={this.setText}
            getIndex={this.getIndex}
          />
        ) : (
          <MultiCard />
        )}
      </section>
    );
  }
}

export default Creation;
