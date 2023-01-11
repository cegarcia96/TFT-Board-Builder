import React, {useState, useEffect} from 'react';

const SavedBoards = ({ collection, setCollection, loadBoard }) => {

  return (
    <div>
      Saved Boards
      <ul>
        {collection.map((boardName, index) => {
          return <li key={index} onClick={(event) => loadBoard(event.target.innerText)}>{boardName}</li>
        })}
      </ul>
    </div>
  )

};

export default SavedBoards;