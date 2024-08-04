import React from 'react'

export default function ScoreBoard({score}) {
  return (
    <div className='md:text-l xl:text-2xl -mt-1 absolute z-30 font-mono font-extrabold text-s text-white'> {`LIVES: ${score}`}</div>
  )
}
