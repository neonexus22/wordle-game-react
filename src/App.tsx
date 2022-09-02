import AppContextWrapper from 'context/AppContext'
import Home from 'components/Home'

function App() {
  return (
    <div className="flex flex-col items-center bg-black text-white w-screen h-screen">
      <nav className="w-full h-14 border-b border-b-gray-400 grid justify-center items-center">
        <h1 className="text-white text-4xl">Wordle</h1>
      </nav>
      <AppContextWrapper>
        <Home />
      </AppContextWrapper>
    </div>
  )
}

export default App
