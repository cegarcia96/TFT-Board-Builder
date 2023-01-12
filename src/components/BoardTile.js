import React, {useState, useEffect, useRef} from 'react';
import { useDrop, useDrag, DragPreviewImage } from 'react-dnd';

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
      <div ref={dropRef} className="flex items-center justify-center w-28 h-28" >
        <svg  xmlns="http://www.w3.org/2000/svg" version="1.0" viewBox="100 47 55 170" width="100px" height="100px">
          <clipPath id="overlay">
          <polygon points="184 24 226 -3.16413562e-15 268 24 268 72 226 96 184 72" transform="translate(-184, 0)"></polygon>
          </clipPath>
          <path d="m197.928 172.13-70.102 40.474-70.102-40.473V91.184l70.102-40.474 70.102 40.474z"
          fill="none"
          stroke="#64748b"
          strokeWidth="3"
          strokeMiterlimit="4"
          strokeDasharray="none"/>
        </svg>
      </div>
    )
  }
  return (
    <div ref={dragRef} className="flex items-center justify-center w-28 h-28 cursor-pointer" >
      <svg ref={dropRef} onClick={() => removeChampion(tile.position)}xmlns="http://www.w3.org/2000/svg" version="1.0" viewBox="100 47 55 170" width="100px" height="100px">
        <clipPath id="overlay">
        <polygon points="184 24 226 -3.16413562e-15 268 24 268 72 226 96 184 72" transform="translate(-184, 0)"></polygon>
        </clipPath>
        <path d="m197.928 172.13-70.102 40.474-70.102-40.473V91.184l70.102-40.474 70.102 40.474z"
        fill="none"
        stroke="#000"
        strokeWidth="3"
        strokeMiterlimit="4"
        strokeDasharray="none"/>
        <image xlinkHref={require(`../assets/champ-splashes/${tile.champion.name}.png`)} width="100" height="100" clipPath="url(#overlay)" x="-4" y="-2" transform="translate(57,49) scale(1.70)"/>
      </svg>
    </div>
  );
}

export default BoardTile;