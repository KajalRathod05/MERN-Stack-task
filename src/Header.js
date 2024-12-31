import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div>
        <nav className='d-flex bg-primary p-2'>
            <div className='col w-50'>
                <h2>Transaction Dashboard</h2>
            </div>
            <div className='col w-50'>
                <Link className='btn btn-light me-2' to={'/view'}>View Product Transactions</Link>
            </div>
        </nav>
    </div>
  )
}

export default Header