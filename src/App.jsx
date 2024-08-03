import React, { useEffect, useState } from 'react'
import MapContainerCanvas from './components/MapContainerCanvas'
//import EntitiesContainerCanvas from './components/EntitiesContainerCanvas'
import Agent from './components/Agent'
import DeathScreen from './components/DeathScreen'

/// actually i think the structure is going to be a map container that holds the tiles,
/// and similarly an entity container that holds player tiles, enemies objects and importantly blank tiles.
/// this would prevent animation of objects moving... but thats kinda rogue style?? nice.
/// this would allow us to avoid offset bugs moving sprites around.


export default function App() {
  let tileMap = 
  [   [1,0,0,0,1,0],
      [0,0,1,0,0,0],
      [0,1,1,0,1,0],
      [0,0,0,0,0,0],
      [1,1,0,1,1,0],
      [0,0,0,1,0,0],
  ]

  //const [turn,setTurn] = useState()
  //const animationSpeed = 250
  const enemyRandomness = 0.15


  const [entityList,setEntityList] = useState({
    "playerCat": {
      
      "type": "player",
      "pos" : {"x" : 1, "y" : 0 },
      "posInitial" : {"x" : 1, "y" : 0 },
      "previousPos":{"x" : 1, "y" : 0 },
      "possibleMoves": [],
      "alive" : true
    },
    "cat1": {
      "type": "enemy",
      "pos" : {"x": 2, "y":3},
      "posInitial" : {"x" : 2, "y" : 3 },
      "previousPos": {"x": 2, "y":3},
      "possibleMoves": [],
      "alive" : true
    } ,
    "cat2": {
      "type": "enemy",
      "pos" : {"x": 4, "y":1},
      "posInitial" : {"x" : 4, "y" : 1 },
      "previousPos": {"x": 4, "y":1},
      "possibleMoves": [],
      "alive" : true
    } 
  })
function checkIfEnemyTouching(playerPos){
  for(let key in entityList){if (entityList[key].type == "enemy" && entityList[key].pos.x == playerPos.x && entityList[key].pos.y == playerPos.y){entityList.playerCat.alive = false}}
}


function findPossibleMoves(entityPos){
  let neighbours = []
  if(entityPos["x"]-1 >= 0){// is there a tile to the left 
    neighbours.push({"x" : (entityPos["x"]-1), "y" : entityPos["y"]}) 
  }
  if(entityPos["y"]-1 >= 0){// is there a tile above
    neighbours.push({"y" : (entityPos["y"]-1), "x" : entityPos["x"]})
  }
  if(entityPos["y"]+1 < tileMap.length){// is there a tile below
    neighbours.push({"y" : (entityPos["y"]+1), "x" : entityPos["x"]}) 
  }
  if(entityPos["x"]+1 < tileMap[0].length){// is there a tile right
    neighbours.push({"x" : (entityPos["x"]+1), "y" : entityPos["y"]}) 
  }
  return (neighbours.filter((tileCoords)=>{return(tileMap[tileCoords.y][tileCoords.x]<1)}))// checks if the tilemap value is < 1 and therefore navigable
}
function checkIfPossible(possibleMoves,movementToCheck){
  for(let move of possibleMoves){ if(move.x == movementToCheck.x && move.y == movementToCheck.y){console.log("match found");return true}}
}

function selectMoveForAi(enemy){
  ///checks if the cat is going to behave erratically and pick a random direction
  if(Math.random()<enemyRandomness){return(enemy.possibleMoves[Math.floor(Math.random()*enemy.possibleMoves.length)])}
  // this is a very ugly way but i cant think of something more elegant....
  /// we check which direction the enemy moved last AND can it be continued.. if so do it. if not go random.
  if (enemy.previousPos.x - enemy.pos.x >0 && checkIfPossible(enemy.possibleMoves,{"x" : enemy.pos.x - 1,"y" : enemy.pos.y}) ){console.log("enemy moving left"); return({"x" : enemy.pos.x - 1,"y" : enemy.pos.y})}
  else if (enemy.previousPos.x - enemy.pos.x <0 && checkIfPossible(enemy.possibleMoves,{"x" : enemy.pos.x + 1,"y" : enemy.pos.y}) ){console.log("enemy moving right"); return({"x" : enemy.pos.x + 1,"y" : enemy.pos.y})}
  else if (enemy.previousPos.y - enemy.pos.y >0 && checkIfPossible(enemy.possibleMoves,{"x" : enemy.pos.x,"y" : enemy.pos.y - 1}) ){console.log("enemy moving up"); return({"x" : enemy.pos.x,"y" : enemy.pos.y  - 1})}
  else if (enemy.previousPos.y - enemy.pos.y <0 && checkIfPossible(enemy.possibleMoves,{"x" : enemy.pos.x,"y" : enemy.pos.y + 1}) ){console.log("enemy moving down"); return({"x" : enemy.pos.x,"y" : enemy.pos.y + 1})}
  else{return(enemy.possibleMoves[Math.floor(Math.random()*enemy.possibleMoves.length)])}
  }

function playerTakesTurn(nextPlayerPos){  
  checkIfEnemyTouching(nextPlayerPos)
  let tempEntityList = structuredClone(entityList)
  console.log("tempList = ", tempEntityList)
  tempEntityList.playerCat.pos = nextPlayerPos // updating the temp data with the new player position they picked
  
  for( let key in tempEntityList){ // calculate moves for all entities for their new positions
    tempEntityList[key].possibleMoves = findPossibleMoves(tempEntityList[key].pos)
    if (tempEntityList[key].type == "enemy"){ // if its an enemy we store its previous location and then make its move to one of its options
      let oldPos = tempEntityList[key].pos
      tempEntityList[key].pos = selectMoveForAi(tempEntityList[key])
      tempEntityList[key].previousPos = oldPos}
    console.log(tempEntityList[key], "enemy updated")
  }
////////////here the Ai needs to pick a new position of the possible
  checkIfEnemyTouching(nextPlayerPos) //  called twice to handle us moving into them or arriving at the same tile as them
  setEntityList(tempEntityList)
}

useEffect(() =>{  playerTakesTurn(entityList.playerCat.posInitial)} ,[]) //runs the turn script once at run time.
  

/// enemy cats have a startingPos, CurrentPos a way of recording the direction they continue in, maybe a valid moves list.


  return (
    <div className='w-3/4 md:w-2/5 m-auto relative mt-5'>
    <MapContainerCanvas tileMap={tileMap} validMoves = {entityList.playerCat.possibleMoves} turnOver={playerTakesTurn} />
    {/*converting the values of our entityList dict to a list so we can map it to generate the player / enemy agents. */}
    
    {Object.values(entityList).map((entity) =>{return(<Agent pos = {entity.pos} posInitial = {entity.posInitial} variant = {entity.type} />)} )}

    {!entityList.playerCat.alive ? <DeathScreen/> :<></>}
    </div>
  )
}
