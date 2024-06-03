import React from 'react'
import NavBar from '../../compenents/sidebar/NavBar'
import Footer from '../../compenents/footer/Footer'
import './exet.css'
import Ahamed from '../../compenents/Exetable/Exetottable/Ahamed'
import Sanjeewa from '../../compenents/Exetable/Exetottable/Sanjeewa'
import Chameera from '../../compenents/Exetable/Exetottable/Chameera'
import Dasun from '../../compenents/Exetable/Exetottable/Dasun'
import Nawaneedan from '../../compenents/Exetable/Exetottable/Nawaneedan'

const Exetable = () => {
  return (
    <div>
        <NavBar/><br/>

        <h1 className='exe-table-h1'>Executives Products informations</h1>

        <Ahamed/>
        <Sanjeewa/>
        <Chameera/>
        <Dasun/>
        <Nawaneedan/>
        <Footer/>
    </div>
  )
}

export default Exetable