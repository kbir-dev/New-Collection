import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext';
import { useParams } from 'react-router-dom';
import Breadcrums from '../Component/Breadcrums/Breadcrums';
import all_product from '../Component/assets/all_product.js';
import ProductDisplay from '../ProductDisplay/ProductDisplay';
import DescriptionBox from '../Component/DescriptionBox/DescriptionBox.jsx';
import RelatedProducts from '../Component/RelatedProducts/RelatedProducts.jsx';

const Product = () => {
  useContext(ShopContext)
  const { ProductId } = useParams()
  const product = all_product.find((e) => {return e.id === Number(ProductId);});

  return (
    <div>
      <Breadcrums product={product} />
      <ProductDisplay product={product} />
      <DescriptionBox />
      <RelatedProducts/>
    </div>
  )
}

export default Product