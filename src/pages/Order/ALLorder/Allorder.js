import React from 'react'
import NavBar from '../../../compenents/sidebar/NavBar'
import Footer from '../../../compenents/footer/Footer'
import OrderDetails from '../../../compenents/HandleOrder/allorder/OrderDetails'

const Allorder = () => {
  return (
    <div>
        <NavBar/><br/><br/>
        <button type="button" class="btn btn-outline-primary" disabled><a href="/addorder" >Add Order</a></button><br/><br/>

        <OrderDetails/>
        <Footer/>
    </div>
  )
}

export default Allorder