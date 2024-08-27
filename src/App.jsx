import { useState } from 'react'
import './App.css'
import Navbar from './Components/Header/Navbar'
import Home from './Components/Home/Home'
import Footer from './Components/Footer/Footer'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>  
      <Home/>
      <Footer/>    
    </>
  )
}

export default App
