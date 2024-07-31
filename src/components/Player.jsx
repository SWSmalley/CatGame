import React from 'react'
import catSprite from "../assets/cat.png"

export default function Player({className}) {

    ///this will contain a sprite
    /// will hold position data
    ///will call a function to determine its next possible moves.
  return (
    <div >
        <img src = {catSprite} className={`pixelated ${className}`}/>
    </div>
  )
}
