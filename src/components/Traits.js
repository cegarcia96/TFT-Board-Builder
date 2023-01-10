import React, {useState, useEffect} from 'react';

const Traits = ({ userBoard }) => {

  const [activeTraits, setActiveTraits] = useState({})

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
    return <div className="traits">Add some champions</div>
  }
  return (
    <div className="traits">
      {Object.keys(activeTraits).sort().map((trait, index) => {
        return (
          <div key={index} className="trait-container">
            <img className="trait-icon" src={require(`../assets/trait-icons/${trait.toLowerCase()}.png`)} alt="champion"></img>
            <span>{`${trait}: ${activeTraits[trait]}`}</span>
          </div>
        )
      })}
    </div>
  );
}

export default Traits;