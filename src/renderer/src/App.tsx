import { useState } from 'react'
import Sidebar from './components/sidebar/Sidebar'
import Home from './components/dashboard-home/Home'

function App(): JSX.Element {
  const [activeComponent, setActiveComponent] = useState<JSX.Element>(<Home />)
  const [fullScreenComponent, setFullScreenComponent] = useState<JSX.Element | null>(null)

  const changeComponent = (newComponent: JSX.Element): void => {
    setActiveComponent(newComponent)
    setFullScreenComponent(null)
  }

  if (fullScreenComponent) {
    return <div className="w-full">{fullScreenComponent}</div>
  }

  return (
    <div className={`flex transition-opacity duration-500 opacity-0'}`}>
      <Sidebar renewComponent={changeComponent} />
      {activeComponent}
    </div>
  )
}

export default App
