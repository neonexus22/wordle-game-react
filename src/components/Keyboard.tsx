import { useContext, useEffect } from 'react'
import { AppContext, AppContextType } from 'context/AppContext'
import Key from './Key'

const keys1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P']
const keys2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']
const keys3 = ['Z', 'X', 'C', 'V', 'B', 'N', 'M']

const Keyboard = () => {
  const {
    onSelectLetter,
    onEnter,
    onDelete,
    disabledLetters,
  } = useContext<AppContextType | null>(AppContext) as AppContextType

  const handleKeyboard = (event: any) => {
    if (event.key === 'Enter') {
      onEnter()
    } else if (event.key === 'Backspace') {
      onDelete()
    } else {
      keys1.forEach((key) => {
        if (
          event.key.toLowerCase() === key.toLowerCase() &&
          !disabledLetters.includes(key)
        ) {
          onSelectLetter(key)
        }
      })
      keys2.forEach((key) => {
        if (
          event.key.toLowerCase() === key.toLowerCase() &&
          !disabledLetters.includes(key)
        ) {
          onSelectLetter(key)
        }
      })
      keys3.forEach((key) => {
        if (
          event.key.toLowerCase() === key.toLowerCase() &&
          !disabledLetters.includes(key)
        ) {
          onSelectLetter(key)
        }
      })
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyboard)
    return () => {
      document.removeEventListener('keydown', handleKeyboard)
    }
  }, [handleKeyboard])

  return (
    <div
      // onKeyDown={handleKeyboard}
      className="flex flex-col items-center mb-32 space-y-4"
    >
      <div className="flex space-x-2">
        {keys1.map((key) => (
          <Key
            key={key}
            keyValue={key}
            disabled={disabledLetters.includes(key)}
          />
        ))}
      </div>
      <div className="flex space-x-2">
        {keys2.map((key) => (
          <Key
            key={key}
            keyValue={key}
            disabled={disabledLetters.includes(key)}
          />
        ))}
      </div>
      <div className="flex space-x-2">
        <Key keyValue="ENTER" disabled={false} />
        {keys3.map((key) => (
          <Key
            key={key}
            keyValue={key}
            disabled={disabledLetters.includes(key)}
          />
        ))}
        <Key keyValue="&#9003;" disabled={false} />
      </div>
    </div>
  )
}

export default Keyboard
