import React from 'react'
import NavBar from '../../compenents/sidebar/NavBar'
import Footer from '../../compenents/footer/Footer'
import AllProducts from '../../compenents/bulkproduct/Allproduct/AllProducts'
import Dropdown from '../../compenents/dropdowwn/Dropdown'

const Alldetails = () => {
  return (
    <div>
        <NavBar/><br/><br/>
        <Dropdown/><br/><br/>
        <AllProducts/>
        <br/><br/>
        <Footer/>
    </div>
  )
}

export default Alldetails