import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Board from './Board';
import ChampionBank from './ChampionBank';
import Traits from './Traits';
import Notes from './Notes';
import SavedBoards from './SavedBoards';

const App = () => {

  const [champions, setChampions] = useState([]);
  const [userBoard, setUserBoard] = useState([]);
  const [notesText, setNotesText] = useState('');
  const [boardName, setBoardName] = useState('');
  const [collection, setCollection] = useState([]);

  const clearBoard = () => {
    setNotesText('');
    setBoardName('');
    fillBoard();
  }

  const fillBoard = () => {
    let newBoard = [];
    for (let i = 1; i < 29; i++) {
      let tile = {
        position: i,
        champion: false
      }
      newBoard.push(tile)
    }
    setUserBoard(newBoard)
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('/boards', {
      boardName: boardName,
      board: JSON.stringify(userBoard),
      notes: notesText
    })
      .then(() => getBoards())
      .catch((error) => console.log(error))
  }

  const loadBoard = (boardName) => {
    axios.get(`/boards/${boardName}`)
      .then((response) => {
        setUserBoard(JSON.parse(response.data[0].board))
        setBoardName(response.data[0].boardName)
        setNotesText(response.data[0].notes)
      })
      .catch((error) => console.log(error))
  }

  const getBoards = () => {
    axios.get('/boards')
      .then((response) => {
        setCollection(response.data)
      })
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    axios.get('/champs')
      .then((response) => {
        setChampions(response.data);
        getBoards();
      })
      .catch((error) => console.log(error));
      fillBoard();
  }, []);

  return (
    <div className="flex flex-col mx-[10%] w-4/5 mt-6 items-center justify-center border border-black">
      <button className="w-32 hover:bg-slate-500 mb-4" onClick={() => clearBoard()}>Clear Board</button>
      <DndProvider backend={HTML5Backend}>
        <div className="flex h-[32rem] w-full">
          <Traits userBoard={userBoard}/>
          <Board userBoard={userBoard} setUserBoard={setUserBoard}/>
          <div className="w-1/5">
            <Notes notesText={notesText} setNotesText={setNotesText} boardName={boardName} setBoardName={setBoardName} handleSubmit={handleSubmit} />
            <SavedBoards collection={collection} setCollection={setCollection} loadBoard={loadBoard}/>
          </div>
        </div>
        <ChampionBank champions={champions} userBoard={userBoard} setUserBoard={setUserBoard}/>
      </DndProvider>
    </div>
  );
}

export default App;
