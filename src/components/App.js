import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Board from './Board';
import ChampionBank from './ChampionBank';
import Traits from './Traits';
import Notes from './Notes';
import SavedBoards from './SavedBoards';
import Navbar from './Navbar';

const App = () => {

  const [user, setUser] = useState({});
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
    if (!user.email) {
      alert("Please log in to save a board.")
      return;
    }
    if (boardName.length < 1) {
      return;
    }
    axios.post('/boards', {
      boardName: boardName,
      board: JSON.stringify(userBoard),
      notes: notesText,
      email: user.email
    })
      .then(() => getBoards(user))
      .catch((error) => console.log(error))
  }

  const loadBoard = (boardName) => {
    axios.get(`/boards/${boardName}`, {
      params: {
        email: user.email
      }
    })
      .then((response) => {
        setUserBoard(JSON.parse(response.data[0].board))
        setBoardName(response.data[0].boardName)
        setNotesText(response.data[0].notes)
      })
      .catch((error) => console.log(error))
  }

  const deleteBoard = (board) => {
    if (board === boardName) {
      axios.delete(`/boards/${board}`, {
        params: {
          email: user.email
        }
      })
      .then(() => getBoards(user))
      .then(() => clearBoard())
      .catch((error) => console.log(error))
    } else {
      axios.delete(`/boards/${board}`)
      .then(() => getBoards(user))
      .catch((error) => console.log(error))
    }
  }

  const getBoards = (user) => {
    axios.get(`/boards/user/${user.email}`)
      .then((response) => {
        setCollection(response.data)
      })
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        getBoards(user);
      } else {
        setUser({})
        setCollection([]);
        clearBoard();
      }
    });
  }, [])

  useEffect(() => {
    axios.get('/champs')
    .then((response) => {
      setChampions(response.data);
      fillBoard();
    })
    .catch((error) => console.log(error));
  }, []);

  return (
    <div className="flex flex-col mx-[10%] w-4/5 mt-6 items-center justify-center">
      <Navbar user={user} setUser={setUser}/>
      <button className="w-32 hover:bg-slate-500 mb-4 bg-slate-700 h-10" onClick={() => clearBoard()}>Clear Board</button>
      <DndProvider backend={HTML5Backend}>
        <div className="flex h-[32rem] w-full justify-between">
          <Traits userBoard={userBoard}/>
          <Board userBoard={userBoard} setUserBoard={setUserBoard}/>
          <div className="w-1/5">
            <Notes notesText={notesText} setNotesText={setNotesText} boardName={boardName} setBoardName={setBoardName} handleSubmit={handleSubmit} />
            <SavedBoards collection={collection} setCollection={setCollection} loadBoard={loadBoard} deleteBoard={deleteBoard}/>
          </div>
        </div>
        <ChampionBank champions={champions} userBoard={userBoard} setUserBoard={setUserBoard}/>
      </DndProvider>
    </div>
  );
}

export default App;
