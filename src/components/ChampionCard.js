import React, {useState, useEffect} from 'react';
import { useDrag } from 'react-dnd';

const ChampionCard = ({ champion, userBoard, setUserBoard }) => {

  const [{ isDragging }, dragRef] = useDrag({
    type: 'champion',
    item: champion,
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  const fillEmptySlot = (champion) => {
    let newBoard = [...userBoard]
    for (let i = 0; i < newBoard.length; i++) {
      if (!newBoard[i].champion) {
        newBoard[i].champion = champion;
        break;
      }
    }
    setUserBoard(newBoard)
  };

  return (
    <div onClick={() => fillEmptySlot(champion)}className="ChampionCard" ref={dragRef}>
      <img src={require(`../assets/champ-splashes/${champion.name}.png`)} alt="champion"></img>
    </div>
  );
};

export default ChampionCard;