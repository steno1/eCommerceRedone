import 'react-toastify/dist/ReactToastify.css';

import Container from 'react-bootstrap/esm/Container'
import Footer from './Components/Footer'
import Header from './Components/Headers'
import { Outlet } from 'react-router-dom'
import React from 'react'
import { ToastContainer } from 'react-toastify'

const App = () => {
  return (
   <>
   <Header/>
   <main className='py-3'>
<Container fluid="md">
  <Outlet/>
</Container>

   </main>
   <Footer/>
<ToastContainer/>
   </>
  )
}

export default App
