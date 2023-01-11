import React, {useState, useEffect} from 'react';
import ChampionCard from './ChampionCard'

const ChampionBank = ({ champions, userBoard, setUserBoard }) => {

  const [searchText, setSearchText] = useState('');

  return (
    <div className="championBank-container">
      <input value={searchText} onChange={(event) => setSearchText(event.target.value)}/>
      <button onClick={() => setSearchText('')}>Clear Search</button>
      <div className="championBank">
        {champions.filter((champion) => {
          let lowerTraits = champion.traits.join(' ').toLowerCase()
          if (champion.name.toLowerCase().includes(searchText.toLowerCase()) || lowerTraits.includes(searchText.toLowerCase()) || champion.cost.toString() === searchText) {
            return champion;
          }
        }).sort((a, b) => {
          return a.cost - b.cost;
        }).map((champion, index) => (
          <ChampionCard key={champion._id}champion={champion} userBoard={userBoard} setUserBoard={setUserBoard}/>
        ))}
      </div>
    </div>
  );
}

export default ChampionBank;