import React, { useEffect,useState } from 'react'
import EntityTile from './EntityTile'

export default function EntitiesContainerCanvas({tileMap,playerCoord}) {


    
    const [entitiesMap,setEntitiesMap] = useState([]) /// this is going to be a 2d array containing the name of the entities where they appear
    
    useEffect(() =>{
        let tempMap = []
        for (let y = 0 ; y < tileMap.length;y++){        
        tempMap.push([]) // adding a new row for every loop of the y coords
        for(let x = 0 ; x < tileMap[y].length;x++){
            if (x == playerCoord["x"] && y == playerCoord["y"]){
                tempMap[y].push("player")
            }
            else{
                tempMap[y].push("")
            }
        }
    }
    setEntitiesMap(tempMap)},[]) // this places the player in the right location at the start and then updates the map each time they move.
    


  return (
    <div className='flex flex-row flex-wrap absolute z-20'>
    {/*this is quite complicated but we essentially create 1 array from the tilemap by flattening and concatenating them
    we then map the flattened array*/}
   {([].concat(...entitiesMap)).map((entityType,index) => {return( <EntityTile key = {index} variant={entityType} /> )
   })}

   </div>
  )
}
