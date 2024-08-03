import React from 'react'
import catSprite from "../assets/cat.png"
import catSpriteEnemy from "../assets/cat2.png"

export default function Agent({variant,posInitial,pos,className}) {


  const variants = {
    "player" : {
      "sprite" : catSprite,
      "movementTransition" : "transform 0.2s ease-in-out"
    },
    "enemy" : {
      "sprite" : catSpriteEnemy,
      "movementTransition" : "transform 0.2s ease-in-out 0.2s"
    }
  }
    let xOffset = 0
    let yOffset = 0
    if (pos!=posInitial){
    xOffset = pos.x - posInitial.x
    yOffset = pos.y - posInitial.y
    }
    const transformStyle = {
        transform: `translate(${xOffset+posInitial.x}00%, ${yOffset+posInitial.y}00%)`,
        transition: variants[variant].movementTransition
      };

      console.log(variants[variant].sprite,)

  return (
    <img src = {variants[variant].sprite} style = {transformStyle} className={` z-10 absolute pixelated w-1/6 pointer-events-none ${className}`}/>
  )
}
