import React, {useState, useEffect} from 'react';
import { useDrag } from 'react-dnd';
import { ReactComponent as Coin } from '../assets/icon-gold.svg'

const ChampionCard = ({ champion, userBoard, setUserBoard }) => {

  const [showInfo, setShowInfo] = useState(false);

  const [{ isDragging }, dragRef] = useDrag({
    type: 'champion',
    item: champion,
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  const fillEmptySlot = (champion) => {
    let newBoard = [...userBoard]
    for (let i = 0; i < newBoard.length; i++) {
      if (!newBoard[i].champion) {
        newBoard[i].champion = champion;
        break;
      }
    }
    setUserBoard(newBoard)
  };

  return (
    <div onMouseEnter={(event) => setShowInfo(true)} onMouseLeave={(event) => setShowInfo(false)} onClick={() => fillEmptySlot(champion)}className="relative" >
      {showInfo ?
        <div className="absolute -top-28 -left-20 bg-slate-700 z-10 w-80 h-24 border border-slate-600">
          <div className="flex w-full items-center justify-center h-full">
            <div className="w-1/3 flex flex-col items-center justify-center">
              <img className="flex w-[60px] h-[60px]" src={require(`../assets/champ-splashes/${champion.name}.png`)} alt="champion"></img>
              {champion.name}
            </div>
            <div className="flex flex-col items-start justify-center">
              {champion.traits.map((trait) => {
                return (
                  <div key={trait} className="flex gap-2">
                    <img className="flex w-[20px] h-[20px]" src={require(`../assets/trait-icons/${trait.toLowerCase()}.png`)} alt="trait-icons"></img>
                    <div>{trait}</div>
                  </div>
                )
              })}
            </div>
            <div className="w-1/4 flex items-center justify-center gap-2">
              <Coin width="20" height="20"/>
              <div>{champion.cost}</div>
            </div>
          </div>
        </div>
        : null}
      <img className="flex w-[80px] h-[80px]"ref={dragRef} src={require(`../assets/champ-splashes/${champion.name}.png`)} alt="champion"></img>
    </div>
  );
};

export default ChampionCard;