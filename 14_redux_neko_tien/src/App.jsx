import { useState } from 'react'
import Neko from './neko'
import House from './house'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Neko/>
    <House/>
あいうえお
    </>
  )
}

export default App
