import React, { useEffect, useState } from 'react'
import MapContainerCanvas from './components/MapContainerCanvas'
//import EntitiesContainerCanvas from './components/EntitiesContainerCanvas'
import Agent from './components/Agent'
import GameOverScreen from './components/GameOverScreen'
import ScoreBoard from './components/ScoreBoard'
import Collectible from './components/collectible'

/// actually i think the structure is going to be a map container that holds the tiles,
/// and similarly an entity container that holds player tiles, enemies objects and importantly blank tiles.
/// this would prevent animation of objects moving... but thats kinda rogue style?? nice.
/// this would allow us to avoid offset bugs moving sprites around.


export default function App() {
  let tileMap = 
  [   [1,0,0,0,0,0],
      [0,0,1,0,1,0],
      [0,1,1,0,1,0],
      [0,0,0,0,0,0],
      [1,1,0,1,1,0],
      [0,0,0,1,0,0],
  ]

  //const [turn,setTurn] = useState()
  //const animationSpeed = 250
  const enemyRandomness = 0.15
const [score,setScore] = useState(0)

  const [entityDict,setentityDict] = useState({
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
    },
    "fish1":{
      "type": "collectible",
      "pos" : {"x": 5, "y":0},
      "alive" : true,
      "value" : 100
    },
    "fish2":{
      "type": "collectible",
      "pos" : {"x": 4, "y":5},
      "alive" : true,
      "value" : 100
    },
    "fish3":{
      "type": "collectible",
      "pos" : {"x": 0, "y":5},
      "alive" : true,
      "value" : 100
    }
    
  })
function checkIfEntityTouching(playerPos,tempEntityDict){
  let newscore = score
  for(let key in tempEntityDict)
    //if the player shares a position with an enemy, kill the player
    {if (tempEntityDict[key].type == "enemy" && tempEntityDict[key].pos.x == playerPos.x && tempEntityDict[key].pos.y == playerPos.y){tempEntityDict.playerCat.alive = false}
    // this line checks if we landed on an alive collectible and if so "kills" the collectible so it wont render anymore. it adds the value to the tempscore var... which we update at the end.
    else if(tempEntityDict[key].type == "collectible" && tempEntityDict[key].pos.x == playerPos.x && tempEntityDict[key].pos.y == playerPos.y && tempEntityDict[key].alive == true){ newscore = newscore+tempEntityDict[key].value; tempEntityDict[key].alive = false; console.log("entity killed")}}
    console.log(newscore)
    setScore(newscore) // update here incase for some reason we have multiple point values earned to save on rerenders.
    return(tempEntityDict)
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
  for(let move of possibleMoves){ if(move.x == movementToCheck.x && move.y == movementToCheck.y){return true}}
}

function selectMoveForAi(enemy){
  ///checks if the cat is going to behave erratically and pick a random direction
  if(Math.random()<enemyRandomness){return(enemy.possibleMoves[Math.floor(Math.random()*enemy.possibleMoves.length)])}
  // this is a very ugly way but i cant think of something more elegant....
  /// we check which direction the enemy moved last AND can it be continued.. if so do it. if not go random.
  if (enemy.previousPos.x - enemy.pos.x >0 && checkIfPossible(enemy.possibleMoves,{"x" : enemy.pos.x - 1,"y" : enemy.pos.y}) ){ return({"x" : enemy.pos.x - 1,"y" : enemy.pos.y})}
  else if (enemy.previousPos.x - enemy.pos.x <0 && checkIfPossible(enemy.possibleMoves,{"x" : enemy.pos.x + 1,"y" : enemy.pos.y}) ){ return({"x" : enemy.pos.x + 1,"y" : enemy.pos.y})}
  else if (enemy.previousPos.y - enemy.pos.y >0 && checkIfPossible(enemy.possibleMoves,{"x" : enemy.pos.x,"y" : enemy.pos.y - 1}) ){ return({"x" : enemy.pos.x,"y" : enemy.pos.y  - 1})}
  else if (enemy.previousPos.y - enemy.pos.y <0 && checkIfPossible(enemy.possibleMoves,{"x" : enemy.pos.x,"y" : enemy.pos.y + 1}) ){ return({"x" : enemy.pos.x,"y" : enemy.pos.y + 1})}
  else{return(enemy.possibleMoves[Math.floor(Math.random()*enemy.possibleMoves.length)])}
  }

function playerTakesTurn(nextPlayerPos){  
  
  let tempEntityDict = structuredClone(entityDict)
  tempEntityDict = checkIfEntityTouching(nextPlayerPos,tempEntityDict)
  tempEntityDict.playerCat.pos = nextPlayerPos // updating the temp data with the new player position they picked
  
  for( let key in tempEntityDict){ // calculate moves for all entities for their new positions
    tempEntityDict[key].possibleMoves = findPossibleMoves(tempEntityDict[key].pos)
    if (tempEntityDict[key].type == "enemy"){ // if its an enemy we store its previous location and then make its move to one of its options
      let oldPos = tempEntityDict[key].pos
      tempEntityDict[key].pos = selectMoveForAi(tempEntityDict[key])
      tempEntityDict[key].previousPos = oldPos}
  }
////////////here the Ai needs to pick a new position of the possible
  tempEntityDict = checkIfEntityTouching(nextPlayerPos, tempEntityDict) //  called twice to handle us moving into them or arriving at the same tile as them
  setentityDict(tempEntityDict)
}

useEffect(() =>{  playerTakesTurn(entityDict.playerCat.posInitial)} ,[]) //runs the turn script once at run time.
  

/// enemy cats have a startingPos, CurrentPos a way of recording the direction they continue in, maybe a valid moves list.
let collectibleList = Object.values(entityDict).filter((entity) =>{return entity.type == "collectible" && entity.alive == true})
let agentList = Object.values(entityDict).filter((entity) =>{return entity.type == "enemy" || entity.type == "player" })
console.log(agentList, " = agent list")
  return (
    <>
    <ScoreBoard score = {score}/>
    <div className='w-3/4 aspect-square md:w-2/5 m-auto relative mt-5 border-black border-8'>
    <MapContainerCanvas tileMap={tileMap} validMoves = {entityDict.playerCat.possibleMoves} turnOver={playerTakesTurn} />
    {/*converting the values of our entityDict dict to a list so we can map it to generate the player / enemy agents. */}
    
    {agentList.map((agent,index) =>{return(<Agent key = {index} pos = {agent.pos} posInitial = {agent.posInitial} variant = {agent.type} />)} )}
    {collectibleList.map((collectible,index) =>{return(<Collectible key = {index} posInitial = {collectible.pos} variant = {"fish"} />)} )}
    {!entityDict.playerCat.alive ? <GameOverScreen variant = {"lose"}/> :<></>}
    {collectibleList.length < 1 ? <GameOverScreen variant = {"win"}/> :<></>}
    </div>
    </>
  )
}
