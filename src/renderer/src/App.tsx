import Sidebar from './components/Sidebar'
import Home from './components/Home'

function App(): JSX.Element {
  return (
    <div className="flex">
      <Sidebar />
      <Home></Home>
    </div>
  )
}

export default App
