import { useState } from 'react'
import './App.css'
import Navbar from './Navbar.jsx'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Shop from './Pages/Shop.jsx' 
import Login from './Pages/Login.jsx'
import Product from './Pages/Product.jsx'
import Footer from './Component/Footer/Footer.jsx'
import men_banner from './Component/assets/banner_mens.png'
import women_banner from './Component/assets/banner_women.png'
import kid_banner from './Component/assets/banner_kids.png'
import Shopcat from './Pages/shopcat.jsx'
import Cart from './Pages/cart.jsx'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path = '/' element = {<Shop/>} />
          <Route path='/mens' element={<Shopcat banner={men_banner} category="men"/>} />
          <Route path='/womens' element={<Shopcat banner={women_banner} category="women"/>} />
          <Route path='/kids' element={<Shopcat banner={kid_banner} category="kid"/>} />
          <Route path='/Product' element={<Product/>} >
            <Route path=':ProductId' element={<Product/>}/>
          </Route>
          <Route path = '/cart' element = {<Cart/>}/>
          <Route path = '/Login' element = {<Login/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App