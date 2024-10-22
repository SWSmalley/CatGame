import React, { useEffect, useState } from 'react'
import MapContainerCanvas from './components/MapContainerCanvas'
//import EntitiesContainerCanvas from './components/EntitiesContainerCanvas'
import Agent from './components/Agent'
import GameOverScreen from './components/GameOverScreen'
import ScoreBoard from './components/ScoreBoard'
import Collectible from './components/collectible'
import StartScreen from './components/StartScreen'
import level1 from './assets/LevelData/level1.json'
import level2 from './assets/LevelData/level2.json'
import level3 from './assets/LevelData/level3.json'
import level4 from './assets/LevelData/level4.json'
import level5 from './assets/LevelData/level5.json'
import TextContainer from './components/TextContainer'
import Title from './components/Title'
import cat from "./assets/cat.png"


export default function App() {
  const levelList = [level1,level2,level3,level4,level5] // list of all level file data
  const [level,setLevel] = useState (0) // what is the current level
  const [attempts,setAttempts] = useState(0) // we use this so we can trigger the level use effect if we want to reload the same level
  const [tileMap,setTileMap] = useState(structuredClone(levelList[level].tileMap))
  const enemyRandomness = 0.15 // proabability enemy cat will pick a random option despite continuing motion being an option.
  const [score,setScore] = useState(0) /// currently doesnt work / not used properly... i think i need to use a callback
  const [isGameStarted,setIsGameStarted] = useState(false) // on true we dont return the main menu and return the game instead.

  const [entityDict,setentityDict] = useState(structuredClone(levelList[level].entitiesDict)) //copy the entity dict from the current level data 

  useEffect (() => { // use effect to load level this feels inelegant but should work when player hit next level button on game over screen.
    setTileMap(structuredClone(levelList[level].tileMap))
    let tempEntityDict = structuredClone(levelList[level].entitiesDict)
    tempEntityDict = findEntitiesPossibleMoves(tempEntityDict)
    setentityDict(tempEntityDict)
  },[level,attempts])

  ///checks if enemies / players are overlapping or if player / collectibles are overlapping
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
  // checks the possible moves for a given entitty on the current tilemap
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
// called as part of selectmoveforAI to see if its desired move (based on previous move or other factors that may be implemented) is an option in ints possible moves.
function checkIfPossible(possibleMoves,movementToCheck){
  for(let move of possibleMoves){ if(move.x == movementToCheck.x && move.y == movementToCheck.y){return true}}
}
//decision behaviour that picks a move out of the possible moves for an AI.
function selectMoveForAi(enemy){
  ///checks if the cat is going to behave erratically and pick a random direction
  if(Math.random()<enemyRandomness){return(enemy.possibleMoves[Math.floor(Math.random()*enemy.possibleMoves.length)])}
  /// we check which direction the enemy moved last AND can it be continued.. if so do it. if not go random.
  if (enemy.previousPos.x - enemy.pos.x >0 && checkIfPossible(enemy.possibleMoves,{"x" : enemy.pos.x - 1,"y" : enemy.pos.y}) ){ return({"x" : enemy.pos.x - 1,"y" : enemy.pos.y})}
  else if (enemy.previousPos.x - enemy.pos.x <0 && checkIfPossible(enemy.possibleMoves,{"x" : enemy.pos.x + 1,"y" : enemy.pos.y}) ){ return({"x" : enemy.pos.x + 1,"y" : enemy.pos.y})}
  else if (enemy.previousPos.y - enemy.pos.y >0 && checkIfPossible(enemy.possibleMoves,{"x" : enemy.pos.x,"y" : enemy.pos.y - 1}) ){ return({"x" : enemy.pos.x,"y" : enemy.pos.y  - 1})}
  else if (enemy.previousPos.y - enemy.pos.y <0 && checkIfPossible(enemy.possibleMoves,{"x" : enemy.pos.x,"y" : enemy.pos.y + 1}) ){ return({"x" : enemy.pos.x,"y" : enemy.pos.y + 1})}
  else{return(enemy.possibleMoves[Math.floor(Math.random()*enemy.possibleMoves.length)])}
  }
  //calls find possible moves for enemys / players in the entity dict and makes the enemys pick one with selectmoveforai
function findEntitiesPossibleMoves(tempEntityDict){
  for( let key in tempEntityDict){ // calculate moves for all entities for their new positions
    tempEntityDict[key].possibleMoves = findPossibleMoves(tempEntityDict[key].pos)
    if (tempEntityDict[key].type == "enemy"){ // if its an enemy we store its previous location and then make its move to one of its options
      let oldPos = tempEntityDict[key].pos
      tempEntityDict[key].pos = selectMoveForAi(tempEntityDict[key])
      tempEntityDict[key].previousPos = oldPos}
  }
  return tempEntityDict
}
//called when a player picks a move.
function playerTakesTurn(nextPlayerPos){  
  
  let tempEntityDict = structuredClone(entityDict)
  tempEntityDict = checkIfEntityTouching(nextPlayerPos,tempEntityDict) // are we moving into an occupied space
  tempEntityDict.playerCat.pos = nextPlayerPos // updating the temp data with the new player position they picked
  tempEntityDict = findEntitiesPossibleMoves(tempEntityDict)
 
////////////here the Ai needs to pick a new position of the possible
  tempEntityDict = checkIfEntityTouching(nextPlayerPos, tempEntityDict) //  called twice to handle us moving into them or arriving at the same tile as them simultaneously
  setentityDict(tempEntityDict)
}

useEffect(() =>{  playerTakesTurn(entityDict.playerCat.posInitial)} ,[]) //runs the turn script once at run time.
  
/// this section 
let collectibleList = Object.values(entityDict).filter((entity) =>{return entity.type == "collectible" && entity.alive == true})
let agentList = Object.values(entityDict).filter((entity) =>{return entity.type == "enemy" || entity.type == "player" })
console.log(agentList, " = agent list")



  return (
    <div className='flex flex-row flex-wrap m-5  justify-center  gap-5'>
    
    <div className='w-3/4 aspect-square md:w-2/5  relative border-black border-8'>
    
    {!isGameStarted ? (<StartScreen startGame = {()=>setIsGameStarted(true)} />) :(<>
      <ScoreBoard score = {9-attempts}/>
      <MapContainerCanvas tileMap={tileMap} validMoves = {entityDict.playerCat.possibleMoves} turnOver={playerTakesTurn} />
            
      {agentList.map((agent,index) =>{return(<Agent key = {index} pos = {agent.pos} posInitial = {agent.posInitial} variant = {agent.type} />)} )}
      {collectibleList.map((collectible,index) =>{return(<Collectible key = {index} posInitial = {collectible.pos} variant = {"fish"} />)} )}
      {!entityDict.playerCat.alive ? <GameOverScreen variant = {"lose"} buttonFunction={() =>{setAttempts(attempts+1)}} level = {level} returnToMainMenu={() => {setIsGameStarted(false)}}/> :<></>}
      {collectibleList.length < 1 ? <GameOverScreen variant = {"win"} buttonFunction={() =>{setLevel(level+1)}} level = {level} returnToMainMenu={() => {setIsGameStarted(false)}}/> :<></>}
      </> )}
    </div>
    <TextContainer><Title content={"Instructions"}/> <a className='m-2'>You are a grey cat and it has been minutes since you last ate. Navigate the map by clicking on the highlighted tiles. Collect fish to quiet your endless hunger and avoid being caught by the other cats.</a> <img src = {cat} className='w-0 lg:w-1/2 m-1 pixelated' /></TextContainer>

    </div>
  )
}
