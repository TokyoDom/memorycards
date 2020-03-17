import React, { Component } from "react";
import { DndProvider } from 'react-dnd';
import Backend from "react-dnd-multi-backend";
import HTML5toTouch from 'react-dnd-multi-backend/dist/esm/HTML5toTouch';
import SingleCard from "./CreationViews/SingleCard";
import MultiCard from "./CreationViews/MultiCard";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import BorderAllIcon from "@material-ui/icons/BorderAll";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";

const testSet = [
  {front: 'Card 1 Front', back: 'Card 1 Back'},
  {front: 'Card 2 Front', back: 'Card 2 Back'},
  {front: 'Card 3 Front', back: 'Card 3 Back'},
  {front: 'Card 4 Front', back: 'Card 4 Back'},
  {front: 'Card 5 Front', back: 'Card 5 Back'},
  {front: 'Card 6 Front', back: 'Card 6 Back'},
  {front: 'Card 7 Front', back: 'Card 7 Back'},
  {front: 'Card 8 Front', back: 'Card 8 Back'},
]


class Creation extends Component {
  state = {
    set: testSet,
    modCard: { front: "", back: "" },
    singView: true
  };

  addNewCard = () => {
    const newSet = [...this.state.set, this.state.modCard];
    this.updateSet(newSet);
  };

  editCard = () => {
    if(this.state.set.length > 0) {
      const index = this.getIndex();
      let newSet = [...this.state.set];
      newSet[index] = this.state.modCard;
      this.updateSet(newSet);
    }
  }

  delCard = () => {
    if(this.state.set.length > 0) {
      let newSet = [...this.state.set];
      newSet.splice(this.getIndex(), 1);
      this.updateSet(newSet);
    }
  }

  changeModCard = (card) => {
    this.setState({modCard: card});
  }

  //Helper
  updateSet = set => {
    this.setState({ set });
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
            addNewCard={this.addNewCard}
            editCard={this.editCard}
            delCard={this.delCard}
            changeModCard={this.changeModCard}
            setText={this.setText}
            getIndex={this.getIndex}
          />
        ) : (
          <MultiCard 
            set={this.state.set}
            updateSet={this.updateSet}
          />
        )}
      </section>
      </DndProvider>
    );
  }
}

export default Creation;
