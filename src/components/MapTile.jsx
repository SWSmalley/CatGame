import React from 'react'
import desertSand from "../assets/desertSand.png"
import desertRock from "../assets/desertRock.png"

export default function MapTile({variant, children,className, onclick,...props}) {
    const variants = {
        "desertSand": desertSand,
        "desertRock": desertRock,
    }


  return (

        <img src = {`${variants[variant]}`} onClick={onclick} alt = {variant} className={` pixelated w-1/6 aspect-square p-0 ${className}`} />


  )
}
