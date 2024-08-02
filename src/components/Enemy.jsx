import React from 'react'
import catSprite from "../assets/cat2.png"

export default function Enemy({posInitial,pos,className}) {

    let xOffset = 0
    let yOffset = 0
    if (pos!=posInitial){
    xOffset = pos.x - posInitial.x
    yOffset = pos.y - posInitial.y
    }
    const transformStyle = {
        transform: `translate(${xOffset+posInitial.x}00%, ${yOffset+posInitial.y}00%)`,
        transition: "transform 0.3s ease-in-out"
      };


  return (
    <img src = {catSprite} style = {transformStyle} className={className}/>
  )
}
