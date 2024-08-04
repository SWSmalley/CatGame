import React from 'react'
import desertSand from "../assets/desertSand.png"
import desertRock from "../assets/desertRock.png"
import dirtDirt from "../assets/dirtDirt.png"
import dirtWater from "../assets/dirtWater.png"
import dirtRocks from "../assets/dirtRocks.png"
import grassGrass from "../assets/grassGrass.png"
import grassTall from "../assets/grassTall.png"
import grassBush from  "../assets/grassBush.png"
import desertPlant from "../assets/desertPlant.png"

export default function MapTile({variant, children,className, onclick,...props}) {
    const variants = {
        "desertSand": desertSand,
        "desertRock": desertRock,
        "dirtWater" : dirtWater,
        "dirtDirt" : dirtDirt,
        "dirtRocks" : dirtRocks,
        "grassGrass" : grassGrass,
        "grassTall" : grassTall,
        "grassBush" : grassBush,
        "desertPlant" : desertPlant



    }


  return (

        <img src = {`${variants[variant]}`} onClick={onclick} alt = {variant} className={` pixelated w-1/6 aspect-square p-0 ${className}`} />


  )
}
