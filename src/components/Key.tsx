import { AppContext, AppContextType } from 'context/AppContext'
import { useContext } from 'react'

const Key = ({
  keyValue,
  disabled,
}: {
  keyValue: string
  disabled: boolean
}) => {
  const {
    onSelectLetter,
    onEnter,
    onDelete,
  } = useContext<AppContextType | null>(AppContext) as AppContextType

  const selectLetter = () => {
    if (!disabled) {
      if (keyValue === 'ENTER') {
        onEnter()
      } else if (keyValue === '⌫') {
        onDelete()
      } else {
        onSelectLetter(keyValue)
      }
    }
  }

  return (
    <div
      className={`flex justify-center items-center w-fit px-2 h-10 border rounded-sm ${
        disabled
          ? 'bg-gray-500'
          : 'cursor-pointer hover:bg-white hover:text-black'
      }`}
      onClick={selectLetter}
    >
      {keyValue}
    </div>
  )
}

export default Key
