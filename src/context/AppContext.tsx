import { createContext, ReactNode, useState, useEffect } from 'react'
import { boardDefault, generateWordSet } from '../assets/Words'

export type AppContextType = {
  board: string[][]
  setBoard: React.Dispatch<React.SetStateAction<string[][]>>
  currentAttempt: CurrentAttemptType
  // setCurrentAttempt: React.Dispatch<React.SetStateAction<CurrentAttemptType>>
  onSelectLetter(keyValue: string): void
  onEnter(): void
  onDelete(): void
  correctWord: string
  disabledLetters: string[]
  setDisabledLetters: React.Dispatch<React.SetStateAction<string[]>>
  gameOver: GameOverType
}

export type CurrentAttemptType = {
  attempt: number
  letterPos: number
}

export type GameOverType = {
  gameOver: boolean
  guessed: boolean
}

export const AppContext = createContext<AppContextType | null>(null)

const AppContextWrapper = ({ children }: { children: ReactNode }) => {
  const [board, setBoard] = useState<string[][]>(boardDefault)
  const [currentAttempt, setCurrentAttempt] = useState<CurrentAttemptType>({
    attempt: 0,
    letterPos: 0,
  })
  const [wordSet, setWordSet] = useState(new Set())
  const [disabledLetters, setDisabledLetters] = useState<string[]>([])
  const [gameOver, setGameOver] = useState<GameOverType>({
    gameOver: false,
    guessed: false,
  })
  const [correctWord, setCorrectWord] = useState<string>('')

  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet)
      const word = words.todaysWord
      setCorrectWord(word.toUpperCase())
    })
  }, [])

  const onSelectLetter = (keyValue: string) => {
    if (currentAttempt.letterPos > 4) return
    const newBoard = [...board]
    newBoard[currentAttempt.attempt][currentAttempt.letterPos] = keyValue
    setBoard(newBoard)
    setCurrentAttempt({
      ...currentAttempt,
      letterPos: currentAttempt.letterPos + 1,
    })
  }

  const onEnter = () => {
    if (currentAttempt.letterPos < 5) return
    let currWord = board[currentAttempt.attempt].join('')
    if (wordSet.has(currWord.toLowerCase())) {
      setCurrentAttempt({
        letterPos: currentAttempt.letterPos = 0,
        attempt: currentAttempt.attempt + 1,
      })
    } else {
      alert('Word not found!')
    }

    if (currWord === correctWord) {
      setGameOver({
        guessed: true,
        gameOver: true,
      })
    }

    if (currentAttempt.attempt >= 5) {
      setGameOver({
        guessed: false,
        gameOver: true,
      })
    }
  }

  const onDelete = () => {
    if (currentAttempt.letterPos === 0) return
    const newBoard = [...board]
    newBoard[currentAttempt.attempt][currentAttempt.letterPos - 1] = ''
    setCurrentAttempt({
      ...currentAttempt,
      letterPos: currentAttempt.letterPos - 1,
    })
  }

  return (
    <AppContext.Provider
      value={{
        board,
        setBoard,
        currentAttempt,
        onSelectLetter,
        onEnter,
        onDelete,
        correctWord,
        disabledLetters,
        setDisabledLetters,
        gameOver,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppContextWrapper
