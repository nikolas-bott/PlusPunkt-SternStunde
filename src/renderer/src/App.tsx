import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import Home from './components/Home'
import { jsx } from '@emotion/react'
import { c } from 'vite/dist/node/moduleRunnerTransport.d-CXw_Ws6P'

function App(): JSX.Element {
  const [activeComponent, setActiveComponent] = useState<JSX.Element>(<Home />)

  const changeComponent = (newComponent: JSX.Element): void => {
    setActiveComponent(newComponent)
  }

  return (
    <div className={`flex transition-opacity duration-500 opacity-0'}`}>
      <Sidebar renewComponent={changeComponent} />
      {activeComponent}
    </div>
  )
}

export default App
