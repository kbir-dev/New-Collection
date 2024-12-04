import React, { useEffect, useState } from 'react'
import './NewCollection.css'
import Items from '../Items/Items'

const NewCollection = () => {
  const[new_collection,setNew_collection]=useState([]);
  useEffect(()=>{
    fetch('http://localhost:3000/newcollections')//5173
    .then((res)=>res.json())
    .then((data)=>setNew_collection(data))
    // .then((data)=>setNew_collection(data))
  },[])

  return (
    <div className="NewCollection">
        <h1>NEW COLLECTIONS</h1>
        <hr />
        <div className="collection">
            {new_collection.map((item,i)=>{
                return <Items key={i} id={item.id} name={item.name} image={item.image} new_price={'$'+item.new_price} old_price={'$'+item.old_price}/>
            })}
        </div>
    </div>
  )
}

export default NewCollection