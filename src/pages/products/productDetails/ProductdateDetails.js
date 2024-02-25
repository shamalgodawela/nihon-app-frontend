import React from 'react'
import ProductdateList from '../../../compenents/product/productList/ProductdateList'
import NavBar from '../../../compenents/sidebar/NavBar'
import Footer from '../../../compenents/footer/Footer'

const ProductdateDetails = () => {
  return (
    <div>
        <NavBar/>
        <br/><br/><br/>
        <ProductdateList/>
        <br/><br/>
        <Footer/>
    </div>
  )
}

export default ProductdateDetails