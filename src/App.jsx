import React from 'react'
import Header from './components/Header'
import Inicio from './pages/Inicio'
import Footer from './components/Footer'
import { BrowserRouter } from 'react-router-dom'

const App = () => {
  return (
    <>
      <BrowserRouter>
      <div className="contenedor">
        <Header />

        <main>
          <Inicio/>
        </main>

        <Footer />
        </div>
      </BrowserRouter>
    </>
  )
}

export default App