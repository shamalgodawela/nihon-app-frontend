import React from 'react'
import NavBar from '../../compenents/sidebar/NavBar'
import Footer from '../../compenents/footer/Footer'
import OutStandingTable from '../../compenents/outstandingTable/OutStandingTable'

const AllOutStanding = () => {
  return (
    <div>
        <NavBar/>
        <br/>

        <OutStandingTable/>
        
        <Footer/>

    </div>
  )
}

export default AllOutStanding