import React, { useContext } from 'react'
import { AppContext, AppContextType } from 'context/AppContext'
import GameOver from 'components/GameOver'
import Keyboard from 'components/Keyboard'
import Board from './Board'

const Home = () => {
  const { gameOver } = useContext<AppContextType | null>(
    AppContext,
  ) as AppContextType
  return (
    <div className="w-full h-full flex flex-col justify-between">
      <Board />
      {gameOver.gameOver ? <GameOver /> : <Keyboard />}
    </div>
  )
}

export default Home
