import React from "react";
import { useDrag, useDrop } from "react-dnd";
import { makeStyles } from "@material-ui/core/styles";
import Flashcard from "./Flashcard";
import IconButton from "@material-ui/core/IconButton";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";

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
  }
}));

function Minicard({
  id,
  card,
  moveCard,
  findCard,
  handleEdit,
  handleDelCard,
  cardStyles
}) {
  const classes = useStyles();
  const originalIndex = findCard(id).index;

  const [{ isDragging }, drag] = useDrag({
    item: { type: "card", id, originalIndex },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    }),
    end: (dropResult, monitor) => {
      const { id: droppedId, originalIndex } = monitor.getItem();
      const didDrop = monitor.didDrop();
      if (!didDrop) {
        moveCard(droppedId, originalIndex);
      }
    }
  });

  const [, drop] = useDrop({
    accept: "card",
    canDrop: () => false,
    hover({ id: draggedId }) {
      if (draggedId !== id) {
        const { index: overIndex } = findCard(id);
        moveCard(draggedId, overIndex);
      }
    }
  });

  return (
    <div ref={node => drag(drop(node))} style={{ opacity: isDragging ? 0 : 1 }}>
      <Flashcard
        set={[card]}
        cardStyles={{ ...cardStyles, width: "150px", height: "150px" }}
        indexStyles={{ display: "none" }}
        arrowStyles={{ display: "none" }}
      />
      <IconButton
        size="small"
        className={classes.edit}
        onClick={e => handleEdit(card)}
      >
        <CreateIcon />
      </IconButton>
      <IconButton
        size="small"
        className={classes.delete}
        onClick={e => handleDelCard(card)}
      >
        <DeleteIcon />
      </IconButton>
    </div>
  );
}

export default Minicard;
