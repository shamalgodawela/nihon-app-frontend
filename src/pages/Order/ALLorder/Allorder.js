import React from 'react'
import NavBar from '../../../compenents/sidebar/NavBar'
import Footer from '../../../compenents/footer/Footer'
import OrderDetails from '../../../compenents/HandleOrder/allorder/OrderDetails'
import HeaderExe from '../../../compenents/headerexe/HeaderExe'

const Allorder = () => {
  return (
    <div>
      <HeaderExe/>
        <OrderDetails/>
        <Footer/>
    </div>
  )
}

export default Allorder