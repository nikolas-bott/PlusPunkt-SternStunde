import { useState } from 'react'
import Sidebar from './components/sidebar/Sidebar'
import Home from './components/dashboard-home/Home'

function App(): JSX.Element {
  const [activeComponent, setActiveComponent] = useState<JSX.Element>(<Home />)
  const [sidebarActive, setSidebarActive] = useState<boolean>(true)

  const changeComponent = (newComponent: JSX.Element): void => {
    setActiveComponent(newComponent)
  }

  return (
    <div className={`flex transition-opacity duration-500 opacity-0'}`}>
      {sidebarActive ? <Sidebar renewComponent={changeComponent} /> : null}
      {activeComponent}
    </div>
  )
}

export default App
