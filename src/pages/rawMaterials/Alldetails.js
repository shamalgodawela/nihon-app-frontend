import React from 'react'
import NavBar from '../../compenents/sidebar/NavBar'
import Footer from '../../compenents/footer/Footer'
import AllProducts from '../../compenents/bulkproduct/Allproduct/AllProducts'

const Alldetails = () => {
  return (
    <div>
        <NavBar/><br/><br/>
        <AllProducts/>
        <br/><br/>
        <Footer/>
    </div>
  )
}

export default Alldetails