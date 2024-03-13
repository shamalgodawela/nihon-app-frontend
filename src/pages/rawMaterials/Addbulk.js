import React from 'react'
import NavBar from '../../compenents/sidebar/NavBar'
import Footer from '../../compenents/footer/Footer'
import AddbulkProduct from '../../compenents/bulkproduct/addproduct/AddbulkProduct'

const Addbulk = () => {
  return (
    <div>
        <NavBar/><br/><br/>
        <AddbulkProduct/>
        <br/>
        <Footer/>
    </div>
  )
}

export default Addbulk