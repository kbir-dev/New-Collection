import React, { useContext } from 'react'
import './CSS/shopcat.css'
import { ShopContext } from '../Context/ShopContext.jsx'
import dropdown_icon from '../Component/assets/dropdown_icon.png'
import Items from '../Component/Items/Items.jsx'
import all_products from '../Component/assets/all_product.js'

const Shopcat = (props) => {

  useContext(ShopContext);

  return (
    <div className="shop-category">
      <img className='shopcategory-banner' src={props.banner} alt="" />
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-12</span> out of 36 products
        </p>
        <div className="shopcategory-sort">
          Sort by <img src={dropdown_icon} alt="" />
        </div>
      </div>
      <div className="shopcategory-products">
        {all_products.map((item,i)=>{
          if(props.category===item.category){
            return <Items key={i} id={item.id} name={item.name} image={item.image} new_price={'$'+item.new_price} old_price={'$'+item.old_price}/>
          }
          else{
            return null;
          }
        })}
      </div>
      <div className="shopcategory-loadmore">
        Explore More
      </div>
    </div>
  )
}

export default Shopcat
