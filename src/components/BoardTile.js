import React, {useState, useEffect} from 'react';
import { useDrop } from 'react-dnd';
import { useDrag } from 'react-dnd';

const BoardTile = ({ tile, userBoard, setUserBoard }) => {

  const removeChampion = (position) => {
    let newBoard = [...userBoard];
    newBoard[position - 1].champion = false;
    setUserBoard(newBoard);
  }

  const dropChampion = (position, champion) => {
    let newBoard = [...userBoard];
    newBoard[position - 1].champion = champion;
    setUserBoard(newBoard);
  }

  const [{ isDragging }, dragRef] = useDrag({
    type: 'champion',
    item: tile.champion,
    end: (item) => removeChampion(tile.position),
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  })

  const [{ isOver }, dropRef] = useDrop({
    accept: 'champion',
    drop: (item) => dropChampion(tile.position, item),
    collect: (monitor) => ({
      isOver: monitor.isOver()
    })
  })

  if (!tile.champion) {
    return (
      <div className="boardTile" ref={dropRef}>
      {tile.position}
      </div>
    )
  }
  return (
    <div className="boardTile" ref={dropRef} onClick={() => removeChampion(tile.position)}>
      <img ref={dragRef} src={require(`../assets/champ-splashes/${tile.champion.name}.png`)} alt="champion"></img>
    </div>
  );
}

export default BoardTile;