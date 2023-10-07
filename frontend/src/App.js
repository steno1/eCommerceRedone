import Container from 'react-bootstrap/esm/Container'
import Footer from './Components/Footer'
import Header from './Components/Headers'
import HomeScreen from './Screens/HomeScreen'
import React from 'react'

const App = () => {
  return (
   <>
   <Header/>
   <main className='py-3'>
<Container fluid="md">
  <HomeScreen/>
</Container>

   </main>
   <Footer/>

   </>
  )
}

export default App
