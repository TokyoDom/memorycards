import React from "react";
import { useDrag, useDrop } from 'react-dnd';
import Flashcard from "./Flashcard";

function Minicard({ id, card, moveCard, findCard }) {
  const originalIndex = findCard(id).index;

  const [{ isDragging }, drag] = useDrag({
    item: {type: 'card', id, originalIndex },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    }),
    end: (dropResult, monitor) => {
      const { id: droppedId, originalIndex } = monitor.getItem();
      const didDrop = monitor.didDrop();
      if(!didDrop) {
        moveCard(droppedId, originalIndex)
      }
    }
  });

  const [, drop] = useDrop({
    accept: 'card',
    canDrop: () => false,
    hover({ id: draggedId }) {
      if(draggedId !== id) {
        const { index: overIndex} = findCard(id);
        moveCard(draggedId, overIndex);
      }
    }
  });

  return (
    <div ref={node => drag(drop(node))} style={{opacity: isDragging ? 0 : 1}}>
    <Flashcard
      set={[card]}
      cardStyles={{ width: "150px", height: "150px" }}
      indexStyles={{ display: "none" }}
      arrowStyles={{ display: "none" }}
    />
    </div>
  );
}

export default Minicard;
