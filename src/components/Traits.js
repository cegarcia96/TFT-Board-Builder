import React, {useState, useEffect} from 'react';

const Traits = ({ userBoard }) => {

  const traitBreakpoints = {
    'A.D.M.I.N': [2, 4, 6],
    'Anima Squad': [3, 5, 7],
    'Civilian': [1, 2, 3],
    'Corrupted': [1],
    'Gadgeteen': [3, 5],
    'Laser Corps': [3, 6, 9],
    'Mecha: Prime': [3, 5],
    'Ox Force': [2, 4, 6, 8],
    'Star Guardian': [3, 5, 7, 9],
    'Supers': [3],
    'Threat': [1],
    'Underground': [3, 5],
    'Ace': [1, 4],
    'Aegis': [2, 3, 4, 5],
    'Arsenal': [1],
    'Brawler': [2, 4, 6, 8],
    'Defender': [2, 4, 6],
    'Duelist': [2, 4, 6, 8],
    'Forecaster': [1],
    'Hacker': [2, 3, 4],
    'Heart': [2, 4, 6],
    'Mascot': [2, 4, 6, 8],
    'Prankster': [2, 3],
    'Recon': [2, 3, 4],
    'Renegade': [3, 6],
    'Spellslinger': [2, 4, 6, 8],
    'Sureshot': [2, 4]
  }

  const [activeTraits, setActiveTraits] = useState({});

  const countTraits = (championsObject) => {
    let newTraits = {}
    Object.values(championsObject).forEach((traitArray) => {
      traitArray.forEach((trait) => {
        if (!newTraits[trait]) {
          newTraits[trait] = 1
        } else {
          newTraits[trait]++;
        }
      })
    })
    setActiveTraits(newTraits)
  }

  useEffect(() => {
    let newChampions = {}
    for (let i = 0; i < userBoard.length; i++) {
      if (userBoard[i].champion) {
        newChampions[userBoard[i].champion.name] = userBoard[i].champion.traits
      }
    }
    countTraits(newChampions)
  }, [userBoard])

  if (!Object.keys(activeTraits).length) {
    return (
      <div className="flex justify-center w-1/5 h-full overflow-auto border border-slate-600">
        <div>No Traits Active</div>
      </div>
    )
  }
  return (
    <div className="w-1/5 h-full overflow-auto">
      {Object.keys(activeTraits).sort((a, b) => {
        if (traitBreakpoints[a].includes(activeTraits[a]) && !traitBreakpoints[b].includes(activeTraits[b])) {
          return -1;
        }
        if (traitBreakpoints[a].includes(activeTraits[a]) && traitBreakpoints[b].includes(activeTraits[b])) {
          if (activeTraits[a] > activeTraits[b]) {
            return -1;
          }
        }
        if (!traitBreakpoints[a].includes(activeTraits[a]) && !traitBreakpoints[b].includes(activeTraits[b])) {
          if (a < b) {
            return -1;
          }
        }
        return activeTraits[b] - activeTraits[a];
      }).map((trait, index) => {
        let highlight = false;
        if (traitBreakpoints[trait].includes(activeTraits[trait]) || activeTraits[trait] > traitBreakpoints[trait][0]) {
          highlight = true;
        }
        return (
          <div key={index} className="flex flex-col mb-2 border border-slate-700">
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg"
                version="1.0" viewBox="100 47 55 170" width="50px" height="50px">
                <clipPath id="overlay">
                <polygon points="184 24 226 -3.16413562e-15 268 24 268 72 226 96 184 72" transform="translate(-184, 0)"></polygon>
                </clipPath>
                <path d="m197.928 172.13-70.102 40.474-70.102-40.473V91.184l70.102-40.474 70.102 40.474z"
                fill={highlight ? '#eab308' : 'black'}
                stroke="#000"
                strokeWidth="3"
                strokeMiterlimit="4"
                strokeDasharray="none"/>
                <image xlinkHref={require(`../assets/trait-icons/${trait.toLowerCase()}.png`)} width="100" height="60" clipPath="url(#overlay)" x="-4" y="2" transform="translate(59,82) scale(1.50)"/>
              </svg>
              <div className="flex items-center justify-center border border-slate-700 bg-slate-600 text-lg w-8">{activeTraits[trait]}</div>
              <div className="flex flex-col">
                  <span>{`${trait}`}</span>
                  <span>{traitBreakpoints[trait].map((breakpoint, index) => {
                  if (index === traitBreakpoints[trait].length - 1) {
                    if (activeTraits[trait] === breakpoint) {
                      return <span key={index} style={{fontWeight: 'bold'}}>{` ${breakpoint}`}</span>
                    }
                    return <span key={index} className="opacity-50">{` ${breakpoint}`}</span>
                  }
                  if (activeTraits[trait] === breakpoint || (activeTraits[trait] > breakpoint && activeTraits[trait] < traitBreakpoints[trait][index + 1])) {
                    return (
                      <span key={index}>
                        <span style={{fontWeight: 'bold'}}>{` ${breakpoint} ` }</span>
                        <span className="opacity-50"> > </span>
                      </span>
                    )
                  }
                    return <span key={index} className="opacity-50">{` ${breakpoint} >`}</span>
                })}</span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  );
}

export default Traits;