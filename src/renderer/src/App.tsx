import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import Home from './components/Home'

function App(): JSX.Element {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Small delay for the initial animation
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className={`flex transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
    >
      <Sidebar />
      <Home />
    </div>
  )
}

export default App
