import React from 'react'
import OfficeInventoryTable from '../../compenents/officeInventory/getallofficedetails/OfficeInventoryTable'
import NavBar from '../../compenents/sidebar/NavBar'
import Footer from '../../compenents/footer/Footer'

const Getalloffice = () => {
  return (
    <div>
        <NavBar/><br/><br/>
        
        <OfficeInventoryTable/>
        <br/>
        <Footer/>

        
    </div>
  )
}

export default Getalloffice