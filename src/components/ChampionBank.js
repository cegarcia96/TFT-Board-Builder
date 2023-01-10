import React, {useState, useEffect} from 'react';
import ChampionCard from './ChampionCard'

const ChampionBank = ({ champions, userBoard, setUserBoard }) => {

  return (
    <div className="championBank">
      {champions.map((champion, index) => (
        <ChampionCard key={champion._id}champion={champion} userBoard={userBoard} setUserBoard={setUserBoard}/>
      ))}
    </div>
  );
}

export default ChampionBank;