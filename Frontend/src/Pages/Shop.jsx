import React from 'react'
import Hero from '../Component/Hero/Hero'
import Popular from '../Component/Popular/Popular'
import Offers from '../Component/Offers/Offers'
import NewCollection from '../Component/NewCollection/NewCollection'
import NewLetter from '../Component/NewsLetter/NewLetter'

const Shop = () => {
  return (
    <div>
        <Hero/>
        <Popular/>
        <Offers/>
        <NewCollection/>
        <NewLetter/>
    </div>
  )
}

export default Shop