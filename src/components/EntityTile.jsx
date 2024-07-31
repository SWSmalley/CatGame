import React from 'react'
import cat from "../assets/cat.png"
import nothing from "../assets/nothing.png"

export default function EntityTile({variant,...props}) {
    const variants = {
        "player": cat,
        "": nothing,
    }
/// the "" variant is literally the base64 code for a 1x1 transparent png... lol if we dont pass an actual image it breaks things

  return (

        <img src = {`${variants[variant]}`} alt = {variant} className='pixelated  w-1/6 aspect-square' />

  )
}
