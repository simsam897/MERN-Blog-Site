import React from 'react'
import Home from './Pages/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import About from './Pages/About'
import Dashboard from './Pages/Dashboard'
import SignUp from './Pages/SignUp'
import SignIn from './Pages/SignIn'
import Projects from './Pages/Projects'
import FooterComp from './components/FooterComp'
import PrivateRoute from './components/PrivateRoute'


function App() {

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />

          <Route element={<PrivateRoute />} ><Route path='/dashboard' element={<Dashboard />} /> </Route>
          <Route path='signIn' element={<SignIn />} />
          <Route path='/signUp' element={<SignUp />} />
          <Route path='/projects' element={<Projects />} />


        </Routes>
        <FooterComp />
      </BrowserRouter>

    </>
  )
}

export default App
