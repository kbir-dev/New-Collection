import React, { useContext, useRef } from 'react'
import { useState } from 'react'
import './Navbar.css'
import logo from './Component/assets/logo.png' 
import cart_icon from './Component/assets/cart_icon.png'
import { Link } from 'react-router-dom'
import { ShopContext } from './Context/ShopContext'
import nav_dropdown from './Component/assets/nav_dropdown.png'

const Navbar = () => {

    const [menu,setmenu] = useState("Shop");
    const {getTotalCartItems} = useContext(ShopContext)
    const menuRef = useRef()

    const dropdown_toggle = (e) => {
        menuRef.current.classList.toggle('nav-menu-visible')
        e.target.classList.toggle('open')
    }

    return (
        <div className='navbar'>
            <div className='nav-logo'>
                <img src={logo} alt="" />
                <p>Shopper</p>
            </div>
            <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown} alt="" />
            <ul ref={menuRef} className='nav-menu'>
                <li onClick={()=>{setmenu("Shop")}}><Link to='/' style={{textDecoration : 'none'}}>Shop</Link>{menu==="Shop"?<hr/>:<></>}</li>
                <li onClick={()=>{setmenu("mens")}}><Link to='/mens' style={{textDecoration : 'none'}}>Men</Link>{menu==="mens"?<hr/>:<></>}</li>
                <li onClick={()=>{setmenu("womens")}}><Link to='/womens' style={{textDecoration : 'none'}}>Women</Link>{menu==="womens"?<hr/>:<></>}</li>
                <li onClick={()=>{setmenu("kids")}}><Link to='/kids' style={{textDecoration : 'none'}}>Kids</Link>{menu==="kids"?<hr/>:<></>}</li>
            </ul>
            <div className="nav-login-cart">
                {localStorage.getItem('auth-token')?
                <button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace("/")}}>Logout</button>: <Link to='/Login'><button>Login</button></Link>}
               
                <Link to='/cart'><img src={cart_icon} alt="" /></Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>
            </div>
        </div>
    )
}

export default Navbar