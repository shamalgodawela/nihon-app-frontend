import React from 'react'
import Footer from '../../../compenents/footer/Footer'
import OrderDetails from '../../../compenents/HandleOrder/allorder/OrderDetails'
import HeaderExe from '../../../compenents/headerexe/HeaderExe'
import HeaderE from '../../../compenents/header/HeaderE'

const Allorder = () => {
  return (
    <div>
      <HeaderExe/>
      <HeaderE/>
        <OrderDetails/>
        <Footer/>
    </div>
  )
}

export default Allorder