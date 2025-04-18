import React, { ReactNode, createContext, useContext, useState } from 'react'
import Sidebar from './components/sidebar/Sidebar'
import Home from './components/dashboard-home/Home'

interface AppContextType {
  openFullScreenView: (component: JSX.Element) => void
  closeFullScreenView: () => void
}

// Create context with default values that will be overwritten
export const AppContext = createContext<AppContextType>({
  openFullScreenView: () => {},
  closeFullScreenView: () => {}
})

// Custom hook for using the app context
export const useApp = () => useContext(AppContext)

interface AppProviderProps {
  children: ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  const [activeComponent, setActiveComponent] = useState<JSX.Element>(<Home />)
  const [fullScreenView, setFullScreenView] = useState<JSX.Element | null>(null)

  const openFullScreenView = (component: JSX.Element) => {
    setFullScreenView(component)
  }

  const closeFullScreenView = () => {
    setFullScreenView(null)
  }

  const changeComponent = (newComponent: JSX.Element): void => {
    setActiveComponent(newComponent)
  }

  // Context value containing our functions
  const contextValue: AppContextType = {
    openFullScreenView,
    closeFullScreenView
  }

  return (
    <AppContext.Provider value={contextValue}>
      {fullScreenView ? (
        <div className="w-full">{fullScreenView}</div>
      ) : (
        <div className="flex transition-opacity duration-500">
          <Sidebar renewComponent={changeComponent} />
          {activeComponent}
        </div>
      )}
    </AppContext.Provider>
  )
}
