import React, {useState, useEffect} from 'react';
import ChampionCard from './ChampionCard'
import { ReactComponent as SearchIcon } from '../assets/search.svg'
import { ReactComponent as Clear } from '../assets/clear.svg'

const ChampionBank = ({ champions, userBoard, setUserBoard }) => {

  const [searchText, setSearchText] = useState('');

  return (
    <div className="mt-8 w-full flex flex-col">
      <div className="w-1/6 bg-slate-600 flex justify-start items-center gap-2 mb-2 pl-2 h-8">
        <SearchIcon width="20px" height="20px"/>
        <input className="w-full bg-slate-600 self-center focus:outline-none" placeholder="Search by name or trait..." value={searchText} onChange={(event) => setSearchText(event.target.value)}/>
        {searchText ? <div className="cursor-pointer pr-4" onClick={() => setSearchText('')}><Clear /></div> : null}
      </div>
      <div className="flex flex-wrap gap-2">
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