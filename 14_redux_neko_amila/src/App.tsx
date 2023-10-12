import { useState } from 'react'
import './index.css'
import House from "../src/House"
import Neko from './Neko'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <div>
      <House />
      <Neko />
     </div>
    </>
  )
}

export default App
