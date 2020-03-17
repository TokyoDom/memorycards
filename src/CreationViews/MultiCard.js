import React, { useState, useEffect } from "react";
import { useDrop } from 'react-dnd';
import update from "immutability-helper";
import Minicard from '../components/Minicard';

function MultiCard({ set, updateSet }) {
  const setIDs = set.map((card, i) => {return {...card, id: i}});

  const [cards, setCards] = useState(setIDs);

  useEffect(() => {
    const newSet = cards.map(card => {
      const { front, back } = card;
      return { front, back };
    });
    updateSet(newSet);
    console.log(cards);
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

  const findCard = id => {
    //called for everycard onLoad and on an action, used to get order
    const card = cards.filter(card => `${card.id}` === id)[0];
    return {
      card,
      index: cards.indexOf(card)
    };
  };

  const [, drop] = useDrop({ accept: 'card' });

  return (
    <section className="multi-card-view" ref={drop}>
        {cards.map(card => (
          <Minicard 
            key={card.id}
            id={`${card.id}`}
            card={card}
            moveCard={moveCard}
            findCard={findCard}
          />
        ))}
    </section>
  );
}

export default MultiCard;
