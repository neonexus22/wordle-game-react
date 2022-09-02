import React, { useContext, useEffect } from 'react'
import { AppContext, AppContextType } from 'context/AppContext'

type LetterProps = {
  letterPos: number
  attemptVal: number
}

const Letter = ({ letterPos, attemptVal }: LetterProps) => {
  const {
    board,
    correctWord,
    currentAttempt,
    setDisabledLetters,
  } = useContext<AppContextType | null>(AppContext) as AppContextType

  const letter = board[attemptVal][letterPos]

  let correct = correctWord[letterPos] === letter
  let almost = !correct && correctWord.includes(letter)

  let val = correct ? 1 : almost ? 2 : 0
  let bgColor =
    currentAttempt.attempt > attemptVal &&
    letter !== '' &&
    (val === 1 ? 'bg-green-700' : val === 2 ? 'bg-yellow-500' : 'bg-gray-700')

  useEffect(() => {
    if (!correct && !almost && letter !== '') {
      setDisabledLetters((prev) => [...prev, letter])
    }
  }, [currentAttempt.attempt])

  return (
    <div
      className={`flex justify-center items-center flex-1 h-10 font-extrabold border border-gray-400 ${bgColor}`}
    >
      {letter}
    </div>
  )
}

export default Letter
