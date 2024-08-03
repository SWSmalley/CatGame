import React from 'react'
import fish from '../assets/fish.png'

export default function ({variant,posInitial,className}) {
    console.log(posInitial)
    let variants = {
        "fish" : {
            "sprite" : fish,
            //"movementTransition" : "transform 0.2s ease-in-out"
          }
        }
        
    const transformStyle = {
       transform: `translate(${posInitial.x}00%, ${posInitial.y}00%)`,
       "movementTransition" : "transform"   }

       /// very annoyingly if we just stick animate-bounce or something in the class or this style decleration it breaks
       ///  - the transform is not applied to the animation. errrrrgh. i think key frames might be how you have to do it.
    return (
        <img src = {variants[variant].sprite} style={transformStyle} className={`  z-10  pixelated w-1/6 pointer-events-none absolute ${className}`}/>
      )
  
}
