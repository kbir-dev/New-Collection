import React from 'react'
import '../Breadcrums/Breadcrums.css'
import arrow_icon from '../assets/breadcrum_arrow.png'


const Breadcrums = (products) => {
    const { product } = products
    return (
        <div className="Breadcrums">
            HOME <img src={arrow_icon} alt="" /> SHOP <img src={arrow_icon} alt="" /> {product?.category} <img src={arrow_icon} alt="" /> {product?.name}
        </div>
    )
}


export default Breadcrums