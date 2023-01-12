import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { ReactComponent as Trash } from '../assets/delete.svg'

const SavedBoards = ({ collection, setCollection, loadBoard, deleteBoard }) => {

  return (
    <div className="flex flex-col border border-slate-500 bg-slate-600 mt-4 text-center overflow-auto h-32">
      <div className="self-center border-b w-3/4 mb-2">Saved Boards</div>
      <ul className="text-left h-full">
        {collection.map((boardName, index) => {
          return <li className="flex justify-between w-full pb-2" key={index}>
          <div className="cursor-pointer hover:bg-slate-500 w-2/3 pl-2" onClick={(event) => loadBoard(event.target.innerText)}>{boardName}</div>
          <button className="flex justify-center cursor-pointer hover:bg-slate-500 w-1/3">
            <Trash onClick={() => deleteBoard(boardName)}/>
          </button>
          </li>
        })}
      </ul>
    </div>
  )

};

export default SavedBoards;