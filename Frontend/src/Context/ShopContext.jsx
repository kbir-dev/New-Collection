import React, { createContext, useEffect } from 'react'
import { useState } from 'react';

export const ShopContext = createContext();

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < 300 + 1; index++) {
        cart[index] = 0;
    }
    return cart;
}

const ShopContextProvider = ({ children}) => {

    const [all_product,setAll_Product] = useState([]);
    // const[cartItems,setCartItems]=useState(getDefaultCart());

    useEffect(()=>{
       
         fetch("http://localhost:3000/allproducts")
        .then((res)=>res.json())
        .then((data)=>setAll_Product(data))

if(localStorage.getItem('auth-token')){
    fetch('http://localhost:3000/getcart',{
        method:'POST',
        headers:{
            Accept:'application/form-data',
            'auth-token':`${localStorage.getItem('auth-token')}`,
            'Content-Type':'application/json',
        },
        body:"",
        }).then((res)=>res.json())
        .then((data)=>setCartItems(data));  
      }
    },[])

    const [cartItems, setCartItems] = useState(getDefaultCart())

    const addToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        console.log(localStorage.getItem("auth-token"))
        if(localStorage.getItem('auth-token')){
              fetch('http://localhost:3000/addtocart',{
               method:'POST',
               headers:{
                Accept:'application/form-data',
                'auth-token':`${localStorage.getItem('auth-token')}`,
                'Content-Type':'application/json',
               },
              body:JSON.stringify({"itemId":itemId}),

         })
         .then((res)=>res.json())
         .then((data)=>console.log(data));
        }
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        console.log(localStorage.getItem('auth-token')); // This should print the token

        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:3000/removefromcart',{
                method:'POST',
                headers:{
                 Accept:'application/form-data',
                 'auth-token':`${localStorage.getItem('auth-token')}`,
                 'Content-Type':'application/json',
                },
               body:JSON.stringify({"itemId":itemId}),
 
          })
          .then((res)=>res.json())
          .then((data)=>console.log(data));
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            if (cartItems[items] > 0) {
                let itemInfo = all_product.find((product) => product.id === Number(items));
                console.log(itemInfo)
                // totalAmount += itemInfo.new_price * cartItems[items];
            }
        }
        return totalAmount;
    }
    
    const getTotalCartItems = () => {
        let totalItem = 0
        for (const items in cartItems) {
            if (cartItems[items] > 0) {
                totalItem += cartItems[items];
            }
        }
        return totalItem;
    }

    const contextValue = { all_product, cartItems, getTotalCartItems, getTotalCartAmount, addToCart, removeFromCart };

    return (
        < ShopContext.Provider value={contextValue}>
            {children}
        </ ShopContext.Provider>
    )
}

export default ShopContextProvider