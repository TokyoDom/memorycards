import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDrop } from "react-dnd";
import update from "immutability-helper";
import Minicard from "../components/Minicard";
import CreationModal from "../components/CreationModal";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import AddIcon from "@material-ui/icons/Add";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const useStyles = makeStyles(theme => ({
  root: {
    position: "relative"
  },
  edit: {
    position: "absolute",
    bottom: 0,
    left: 0,
    zIndex: 3
  },
  delete: {
    position: "absolute",
    bottom: 0,
    right: 0,
    zIndex: 3
  },
  btnGroup: {
    display: "flex",
    justifyContent: "center",
    margin: "6px 0"
  }
}));

function MultiCard({
  set,
  updateSet,
  saveSet,
  delSet,
  changeModCard,
  setText,
  modCard,
  cardStyles
}) {
  const classes = useStyles();

  const [cards, setCards] = useState(set);

  //Modals
  const [addModal, addModalOpen] = useState(false);
  const [editModal, editModalOpen] = useState(false);

  //componentdidupdate, updates parent set with child cards(cards doesnt change)
  useEffect(() => {
    updateSet(cards);
  }, [cards, updateSet]);

  //updates state when card moves
  const moveCard = (id, atIndex) => {
    const { card, index } = findCard(id);
    setCards(
      update(cards, {
        $splice: [
          [index, 1],
          [atIndex, 0, card]
        ]
      })
    );
  };

  //called for everycard onLoad and on an action, used to get order
  const findCard = id => {
    const card = cards.filter(card => `${card.id}` === id)[0];
    return {
      card,
      index: cards.indexOf(card)
    };
  };

  //accept drop of type card
  const [, drop] = useDrop({ accept: "card" });

  //for add button
  const handleAdd = () => {
    let id = null;
    //get unique id
    if (cards.length !== 0) {
      let num = 0;
      while (!id) {
        // eslint-disable-next-line no-loop-func
        const result = cards.filter(card => card.id === num);
        if (result.length === 0) {
          id = num;
        } else {
          num++;
        }
      }
    } else {
      id = 0;
    }
    changeModCard({ front: "", back: "", id });
    addModalOpen(true);
  };

  //for modal add button
  const saveAdd = card => {
    setCards([...cards, card]);
  };

  //for edit button
  const handleEdit = card => {
    const index = cards.indexOf(card);
    changeModCard(cards[index]);
    editModalOpen(true);
  };

  //for modal edit button
  const saveEdit = card => {
    let newSet = [...cards];
    const oldCard = newSet.filter(el => el.id === card.id)[0];
    newSet[newSet.indexOf(oldCard)] = card;
    setCards(newSet);
  };

  //for del card button
  const handleDelCard = card => {
    let newSet = [...cards];
    newSet.splice(newSet.indexOf(card), 1);
    setCards(newSet);
  };

  return (
    <section className="multi-card-view">
      <div>
        <ButtonGroup className={classes.btnGroup}>
          <Button variant="contained" onClick={e => handleAdd()}>
            <AddIcon /> New Card
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={e => saveSet(cards)}
          >
            <SaveAltIcon /> Save Set
          </Button>
          <Button variant="contained" color="secondary" onClick={e => delSet()}>
            <DeleteForeverIcon /> Delete Set
          </Button>
        </ButtonGroup>
      </div>
      <div className="multi-card-dnd" ref={drop}>
        {cards.map(card => (
          <div className={classes.root} key={card.id}>
            <Minicard
              id={`${card.id}`}
              card={card}
              moveCard={moveCard}
              findCard={findCard}
              handleEdit={handleEdit}
              handleDelCard={handleDelCard}
              cardStyles={cardStyles}
            />
          </div>
        ))}
      </div>
      {/* Add Modal */}
      <CreationModal
        isOpen={addModal}
        modalOpen={addModalOpen}
        setText={setText}
        saveChanges={saveAdd}
        modCard={modCard}
      />
      {/* Edit Modal */}
      <CreationModal
        isOpen={editModal}
        modalOpen={editModalOpen}
        setText={setText}
        saveChanges={saveEdit}
        modCard={modCard}
      />
    </section>
  );
}

export default MultiCard;
