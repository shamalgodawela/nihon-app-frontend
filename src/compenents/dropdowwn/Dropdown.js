import React from 'react'

const Dropdown = () => {
  return (
    <div>
        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        Centered dropdown
      </button>
      <ul className="dropdown-menu">
        <li><a className="dropdown-item" href="/addbulkproduc">Add Bulk Product</a></li>
        <li><a className="dropdown-item" href="#">Action two</a></li>
        <li><a className="dropdown-item" href="#">Action three</a></li>
      </ul>
    </div>
  )
}

export default Dropdown