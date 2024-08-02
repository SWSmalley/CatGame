import React from 'react'
import catSprite from "../assets/cat.png"

export default function Enemy({enemyPosInitial,enemyPos}) {

    let xOffset = 0
    let yOffset = 0
    if (enemyPos!=enemyPosInitial){
    xOffset = playerPos.x - playerPosInitial.x
    yOffset = playerPos.y - playerPosInitial.y
    }
    const transformStyle = {
        transform: `translate(${xOffset+enemyPosInitial.x}00%, ${yOffset+enemyPosInitial.y}00%)`,
        transition: "transform 0.3s ease-in-out"
      };


  return (
    <img src = {catSprite} style = {transformStyle} className={className}/>
  )
}
