import React from 'react'
import MapTile from './MapTile'
//import Player from "./Player"


////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
/////currently the tilemaps are broken for new levels
///// this is because on newlevel / level reset we dont
///// currently  recalculate valid moves for the player
///// need to identify a way of triggering that without it
//// getting even more messy
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////

export default function MapContainerCanvas({tileMap,validMoves,turnOver}) {
  console.log({tileMap}, " = tilemap received by canvas valid moves = ", validMoves )

///valid moves is a list of dictionaries containing xy coords

    let tileDict = {
        "-2": "grassGrass",
        "-1": "dirtDirt",
        "0" : "desertSand",
        "1" : "desertRock",
        "2" : "dirtWater",
        "3" : "dirtRocks",
        "4" : "grassBush",
        "5" : "grassTall",
        "6" : "desertPlant"
    }
    let maptiles = []
 /// this assembles the tile map and assigns clickable properties to the tiles that are valid moves for the player.
    for (let y = 0 ; y < tileMap.length;y++){        
      maptiles.push([]) // adding a new row for every loop of the y coords
    for(let x = 0 ; x < tileMap[y].length;x++){
      let tileToPush = null
      for(let i = 0; i<validMoves.length;i++){
        if (validMoves[i].x === x && validMoves[i].y ===y){
          tileToPush = ( <MapTile key = {(x*10)+y} variant={tileDict[tileMap[y][x]]} onclick ={() => {turnOver(validMoves[i])}} className={"animate-pulse"}/>)
           break}
        else{
          tileToPush = (<MapTile key = {(x*10)+y} variant={tileDict[tileMap[y][x]]} />)
        }
        
      }
      console.log("pushing this tile: ", tileToPush, " taken from tilemap : ",tileMap)
      maptiles.push(tileToPush)
    }

  }
/*this is quite complicated but we essentially create 1 array from the tilemap by flattening and concatenating them
     we then map the flattened array
    {([].concat(...tileMap)).map((tileType,index) => {return( <MapTile key = {index} variant={tileDict[tileType]} /> )
    })}
    
    
    THis has been abandoned and remade as above because its too unwieldly to assign props when the tile map is just a 2d array of intergers
    if we made the tilemap data type a dictionary this would be suitable so im keeping it for future reference*/


  return (
    <div className='flex flex-row flex-wrap absolute'>
      {maptiles}
     
    </div>
    
  )
}





