import React, { useContext } from 'react'
import { AppContext, AppContextType } from 'context/AppContext'

const GameOver = () => {
  const {
    gameOver,
    correctWord,
    currentAttempt,
  } = useContext<AppContextType | null>(AppContext) as AppContextType
  return (
    <div className="flex flex-col items-center mb-32 space-y-4">
      <h3 className="text-bold">
        {gameOver.guessed &&
          `You guessed in ${currentAttempt.attempt} attempts`}
      </h3>
      <h3>{gameOver.gameOver && !gameOver.guessed && 'You failed'}</h3>
      <h1 className="text-2xl text-bold">Correct word: {correctWord}</h1>
    </div>
  )
}

export default GameOver
