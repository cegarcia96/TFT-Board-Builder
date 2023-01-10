import React, {useState, useEffect} from 'react';
import BoardTile from './BoardTile'

const Board = ( { userBoard, setUserBoard }) => {

  const generateRow = (row) => {
    let start;
    let stop;
    if (row === 1) {
      start = 0;
      stop = 7;
    } else if (row === 2) {
      start = 7;
      stop = 14;
    } else if (row === 3) {
      start = 14;
      stop = 21;
    } else if (row === 4) {
      start = 21;
      stop = 28;
    } else {
      return 'out of bounds'
    }
    return userBoard.slice(start, stop)
  }

  return (
    <div className="board">
      <div className="row">
        {generateRow(1).map((tile) => (
          <BoardTile key={tile.position} tile={tile} userBoard={userBoard} setUserBoard={setUserBoard} />
        ))}
      </div>
      <div className="row">
        {generateRow(2).map((tile) => (
          <BoardTile key={tile.position} tile={tile} userBoard={userBoard} setUserBoard={setUserBoard} />
        ))}
      </div>
      <div className="row">
        {generateRow(3).map((tile) => (
          <BoardTile key={tile.position} tile={tile} userBoard={userBoard} setUserBoard={setUserBoard} />
        ))}
      </div>
      <div className="row">
        {generateRow(4).map((tile) => (
          <BoardTile key={tile.position} tile={tile} userBoard={userBoard} setUserBoard={setUserBoard} />
        ))}
      </div>
    </div>
  );
}

export default Board;