import { useState } from 'react'
import Sidebar from './components/sidebar/Sidebar'
import Home from './components/dashboard-home/Home'

function App(): JSX.Element {
  const [activeComponent, setActiveComponent] = useState<JSX.Element>(<Home />)
  const [sidebarActive, setSidebarActive] = useState<boolean>(true)
  const [fullScreenComponent, setFullScreenComponent] = useState<JSX.Element | null>(null)

  const changeComponent = (newComponent: JSX.Element): void => {
    setActiveComponent(newComponent)
    setFullScreenComponent(null) // Close any full screen view when changing main component
  }

  const openFullScreenView = (component: JSX.Element): void => {
    setFullScreenComponent(component)
  }

  const closeFullScreenView = (): void => {
    setFullScreenComponent(null)
  }

  // If there is a full screen component, show only that
  if (fullScreenComponent) {
    return <div className="w-full">{fullScreenComponent}</div>
  }

  // Otherwise show normal layout with sidebar
  return (
    <div className={`flex transition-opacity duration-500 opacity-0'}`}>
      {sidebarActive ? <Sidebar renewComponent={changeComponent} /> : null}
      {activeComponent}
    </div>
  )
}

// Export the App component as default
export default App

// Also export a context for managing full screen views
export const AppContext = {
  openFullScreenView: null as ((component: JSX.Element) => void) | null,
  closeFullScreenView: null as (() => void) | null
}
