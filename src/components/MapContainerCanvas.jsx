import React from 'react'
import MapTile from './MapTile'
//import Player from "./Player"

export default function MapContainerCanvas({tileMap}) {

    
    let tileDict = {
        0 : "desertSand",
        1 : "desertRock",
    }




  return (
    <div className='flex flex-row flex-wrap absolute'>
     {/*this is quite complicated but we essentially create 1 array from the tilemap by flattening and concatenating them
     we then map the flattened array*/}
    {([].concat(...tileMap)).map((tileType,index) => {return( <MapTile key = {index} variant={tileDict[tileType]} /> )
    })}
 
    </div>
  )
}
