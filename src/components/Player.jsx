import React from 'react'
import catSprite from "../assets/cat.png"

export default function Player({playerPos,playerPosInitial,className}) {

    ///this will contain a sprite
    /// will hold position data
    ///will call a function to determine its next possible moves.
  let xOffset = 0
  let yOffset = 0
  if (playerPos!=playerPosInitial){
    xOffset = playerPos.x - playerPosInitial.x
    yOffset = playerPos.y - playerPosInitial.y

    console.log("offsets x,y = ", xOffset, " ", yOffset )
   // xOffset = Math.abs(xOffset)
   // yOffset = Math.abs(yOffset)
  }
// tailwind cant handle us updating the classname attribute dynamically via list comprehension
// it wont make the new classes in time... maybe its possible to work aroundn some how??? not elegant though. 
// HOWEVER  we can actually still do it the old fashioned way by using the style attribute and updating the css we pass for that manually here
  const transformStyle = {
    transform: `translate(${xOffset+playerPosInitial.x}00%, ${yOffset+playerPosInitial.y}00%)`,
    transition: "transform 0.3s ease-in-out"
  };


  return (
        <img src = {catSprite} style = {transformStyle} className={className}/>
  )
}
