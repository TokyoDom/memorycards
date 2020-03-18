import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Flashcard from "../components/Flashcard";
import Modal from "../components/Modal";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import AddIcon from "@material-ui/icons/Add";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const useStyles = makeStyles(theme => ({
  btnGroup: {
    display: "flex",
    justifyContent: "center",
    margin: "6px 0"
  }
}));

function SingleCard({ set, modCard, changeModCard, updateSet, setText }) {
  const classes = useStyles();

  const [addModal, addModalOpen] = useState(false);
  const [editModal, editModalOpen] = useState(false);

  //for add card modal
  const addNewCard = card => {
    const newSet = [...set, card];
    updateSet(newSet);
  };

  //for edit card modal
  const editCard = card => {
    if (set.length > 0) {
      let newSet = [...set];
      newSet[card.id] = card;
      updateSet(newSet);
    }
  };

  //for del card button
  const delCard = card => {
    if (set.length > 0) {
      let newSet = [...set];
      newSet.splice(newSet.indexOf(card), 1);
      updateSet(newSet);
    }
  };

  //get index from flashcard view??
  const getIndex = () => {
    let index = document.getElementById("index").textContent;
    index = parseInt(index.substring(0, index.indexOf("/")));
    return index - 1;
  };

  return (
    <section className="single-card-view">
      <div>
        <ButtonGroup className={classes.btnGroup}>
          <Button variant="contained" color="primary">
            <SaveAltIcon /> Save Set
          </Button>
          <Button variant="contained" color="secondary">
            <DeleteForeverIcon /> Delete Set
          </Button>
        </ButtonGroup>
      </div>
      <div>
        <ButtonGroup className={classes.btnGroup}>
          <Button
            onClick={e => {
              changeModCard({ front: "", back: "", id: null });
              addModalOpen(true);
            }}
          >
            <AddIcon /> New Card
          </Button>
          <Button
            onClick={e => {
              if (set.length > 0) {
                changeModCard(set[getIndex()]);
                editModalOpen(true);
              }
            }}
          >
            <CreateIcon /> Edit Card
          </Button>
          <Button
            onClick={e => {
              delCard(set[getIndex()]);
            }}
          >
            <DeleteIcon /> Delete Card
          </Button>
        </ButtonGroup>
      </div>
      <Flashcard set={set} />
      {/* Add Modal */}
      <Modal
        isOpen={addModal}
        modalOpen={addModalOpen}
        setText={setText}
        saveChanges={addNewCard}
        modCard={modCard}
      />
      {/* Edit Modal */}
      <Modal
        isOpen={editModal}
        modalOpen={editModalOpen}
        setText={setText}
        saveChanges={editCard}
        modCard={modCard}
      />
    </section>
  );
}

export default SingleCard;