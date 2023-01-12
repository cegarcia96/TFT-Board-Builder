import React, {useState, useEffect} from 'react';
import Signup from './Signup'
import Login from './Login'
import {  signOut } from "firebase/auth";
import {auth} from '../firebase';

const Navbar = ({ user, setUser }) => {

  const [showModal, setShowModal] = useState(false);

  const logUserOut = () => {
    signOut(auth)
      .then(() => {
      })
      .catch((error) => console.log(error))
}

  return (
    <div className="flex justify-between items-center bg-slate-700 w-full h-12 px-2 mb-4">
      <div className="flex items-center gap-2">
        <img className="w-10 h-10" src={require('../assets/tft-icon.png')} alt="tft-icon"></img>
        <div className="text-lg">TFT Board Builder</div>
      </div>
      {user.email ?
        <div className="flex items-center gap-2">
          <div className="bg-slate-800 h-10 w-10 text-xl rounded-[50%] border border-slate-600 flex items-center justify-center">
            <div>{user.email.slice(0,1).toUpperCase()}</div>
          </div>
          <button className="hover:bg-slate-600 p-2 text-lg" onClick={() => logUserOut()}>
            Log Out
          </button>
        </div>
          :
      <div>
        <button onClick={() => setShowModal(true)} className="hover:bg-slate-600 p-2 text-lg">Log In</button>
        {showModal ?
        <div className="z-index-2 fixed left-0 top-0 right-0 bottom-0 bg-black/50 flex flex-col items-center justify-center h-screen" onClick={() => setShowModal(false)}>
          <div className="relative bottom-20 bg-slate-500 border border-slate-600 rounded w-96 h-96 items-center justify-center" onClick={(event) => event.stopPropagation()}>
            <Login setShowModal={setShowModal} setUser={setUser}/>
          </div>
        </div> : null}
      </div>}
    </div>
  )
}

export default Navbar;