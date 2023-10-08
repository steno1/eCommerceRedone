import Container from 'react-bootstrap/esm/Container'
import Footer from './Components/Footer'
import Header from './Components/Headers'
import { Outlet } from 'react-router-dom'
import React from 'react'

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

   </>
  )
}

export default App
