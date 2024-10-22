import React from 'react'
import badEnd from "../assets/badEnd.png"
import cat from '../assets/cat.png'
import Button from './Button'

export default function GameOverScreen({variant,buttonFunction,level,returnToMainMenu}) {
  const variants = {
    "lose" : { 
      "text" : "Caught! Dine only on bitter defeat",
      "image" : badEnd,
      "buttonText" : "Try Again",
    },

    "win" : {
      "text" : "Glory in victory!",
      "image" : cat,
      "buttonText" : "I hunger still"
    },

    
  }
  /// currently i have disabled the return to main menu call on the retrun to menu buttons as the function in app.jsx they call doesnt reset the game properly yet
  /// i did have the game over menu fade in on mouse over but its actually not 
  return (
    <div className=' flex flex-col opacity-100 transition-opacity duration-1000  w-full aspect-square bg-black absolute z-20 items-center justify-center gap-1 text-white'>
      <img src = {variants[variant].image} className='w-2/3 pixelated m-auto '/>
      <a className='m-auto xl:text-2xl font-bold text-center'>{variants[variant].text}</a>
      {level>3 && variant == "win" ? <><a className='m-auto xl:text-2xl font-bold text-center'>At last your hunger is sated.</a><Button  buttonText={"Return to menu"}/></> :<><Button buttonFunction={buttonFunction} buttonText={variants[variant].buttonText} className={"animate-pulse"}/>{/*<Button buttonText={"Return to menu"}/>*/}</>}
    </div>
  )
}
