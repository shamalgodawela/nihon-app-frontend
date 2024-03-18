import React from 'react'
import './Dropdown.css'

const Dropdown = () => {
  return (
    <div className="custom-dropdown-container">
      <a className="custom-btn custom-dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        Centered dropdown
      </a>
      <ul className="custom-dropdown-menu">
        <li><a className="custom-dropdown-item" href="/addbulkproduct">Add Bulk Product</a></li>
        <li><a className="custom-dropdown-item" href="#">Action two</a></li>
        <li><a className="custom-dropdown-item" href="#">Action three</a></li>
      </ul>
    </div>
  )
}

export default Dropdown