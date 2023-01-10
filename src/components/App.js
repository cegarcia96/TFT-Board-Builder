import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Board from './Board';
import ChampionBank from './ChampionBank';
import Traits from './Traits';
import Notes from './Notes';

const App = () => {

  const [champions, setChampions] = useState([]);
  const [userBoard, setUserBoard] = useState([]);
  const [notesText, setNotesText] = useState('');
  const [boardName, setBoardName] = useState('');

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
      .then(() => console.log('saved'))
      .catch((error) => console.log(error))
  }

  const loadBoard = (event) => {
    axios.get('/boards/Heroes')
      .then((response) => {
        setUserBoard(JSON.parse(response.data[0].board))
        setBoardName(response.data[0].boardName)
        setNotesText(response.data[0].notes)
      })
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    axios.get('/champs')
      .then((response) => {
        setChampions(response.data);
      })
      .catch((error) => console.log(error));
      fillBoard();
  }, []);

  return (
    <div className="app">
      <button id="clear" onClick={() => clearBoard()}>Clear Board</button>
      <DndProvider backend={HTML5Backend}>
        <div className="teambuilder-container">
          <Traits userBoard={userBoard}/>
          <Board userBoard={userBoard} setUserBoard={setUserBoard}/>
          <Notes notesText={notesText} setNotesText={setNotesText} boardName={boardName} setBoardName={setBoardName} handleSubmit={handleSubmit} loadBoard={loadBoard}/>
        </div>
        <ChampionBank champions={champions} userBoard={userBoard} setUserBoard={setUserBoard}/>
      </DndProvider>
    </div>
  );
}

export default App;
