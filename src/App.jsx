import React, { useEffect, useState } from 'react'
import MapContainerCanvas from './components/MapContainerCanvas'
//import EntitiesContainerCanvas from './components/EntitiesContainerCanvas'
import Player from "./components/Player"
import Enemy from './components/Enemy'

/// actually i think the structure is going to be a map container that holds the tiles,
/// and similarly an entity container that holds player tiles, enemies objects and importantly blank tiles.
/// this would prevent animation of objects moving... but thats kinda rogue style?? nice.
/// this would allow us to avoid offset bugs moving sprites around.


export default function App() {
  let tileMap = 
  [   [1,0,0,0,1,0],
      [0,0,1,0,0,0],
      [0,1,1,1,1,0],
      [0,0,0,0,0,0],
      [1,1,0,1,1,0],
      [0,0,0,1,0,0],
  ]
  const playerPosInitial = {"x" : 1, "y" : 1 }
  const [turn,setTurn] = useState()
  const animationSpeed = 250
  const [playerPos,setPlayerPos] = useState(playerPosInitial)
  const [validMoves,setValidMoves] = useState([])

  const entityList = [
    {
      "name": "playerCat",
      "type": "player",
      "Pos" : {"x": 1, "y":0} 
    },
    {
      "name": "cat1",
      "type": "enemy",
      "Pos" : {"x": 2, "y":2} 
    }
  ]


useEffect(() =>{
  let neighbours = []
  console.log("use effect triggered checking possible moves")

  
 
  if(playerPos["x"]-1 >= 0){// is there a tile to the left 
    neighbours.push({"x" : (playerPos["x"]-1), "y" : playerPos["y"]}) 
  }
  if(playerPos["y"]-1 >= 0){// is there a tile above
    neighbours.push({"y" : (playerPos["y"]-1), "x" : playerPos["x"]})
  }
  if(playerPos["y"]+1 < tileMap.length){// is there a tile below
    neighbours.push({"y" : (playerPos["y"]+1), "x" : playerPos["x"]}) 
  }
  if(playerPos["x"]+1 < tileMap[0].length){// is there a tile right
    neighbours.push({"x" : (playerPos["x"]+1), "y" : playerPos["y"]}) 
  }

let possibleMoves =  neighbours.filter((tileCoords,index)=>{return(tileMap[tileCoords.y][tileCoords.x]<1)}) // checks if the tilemap value is < 1 and therefore navigable
setValidMoves(possibleMoves)} //// i dont think this actually has to be a state??? worth investigateing it'd stop a rerender.
  
  ,[playerPos])
  

/// enemy cats have a startingPos, CurrentPos a way of recording the direction they continue in, maybe a valid moves list.


  return (
    <div className='w-3/4 md:w-2/5 m-auto relative'>
    <MapContainerCanvas tileMap={tileMap} validMoves = {validMoves} setPlayerPos={setPlayerPos} />
    {/*<EntitiesContainerCanvas tileMap={tileMap} playerCoord={{"x" : 1, "y" : 0 }} />*/}
    <Player  playerPos = {playerPos} playerPosInitial = {playerPosInitial} className={`z-10 absolute pixelated w-1/6 `}/>
    <Enemy  />
    </div>
  )
}
