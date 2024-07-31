import React, { useEffect, useState } from 'react'
import MapContainerCanvas from './components/MapContainerCanvas'
import EntitiesContainerCanvas from './components/EntitiesContainerCanvas'

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


  return (
    <div className='w-3/4 md:w-2/5 m-auto relative'>
    <MapContainerCanvas tileMap={tileMap} />
    <EntitiesContainerCanvas tileMap={tileMap} playerCoord={{"x" : 1, "y" : 0 }} />
    </div>
  )
}
