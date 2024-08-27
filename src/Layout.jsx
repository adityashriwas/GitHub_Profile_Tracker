import React from 'react'
import Footer from './Components/Footer/Footer'
import { Outlet } from 'react-router-dom'
import Navbar from './Components/Header/Navbar'


function Layout() {
  return (
    <>
    <Navbar/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default Layout