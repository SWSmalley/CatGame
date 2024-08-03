import React from 'react'

export default function ScoreBoard({score}) {
  return (
    <div className='font-mono text-xl'> {`Score: ${score}`}</div>
  )
}
