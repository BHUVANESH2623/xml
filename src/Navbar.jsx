import React from 'react'
import './navbar.scss'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='navbar'>
        <div className="left">
          {/* <img src="" alt="" /> */}
        </div>
        <div className="center">
          <h1>UI Design </h1>
        </div>
        <div className="right">
          <h3><Link to={'/'} className='link'>Home</Link></h3>
          <h3><Link to={'/help'} className='link'>XML Help Guide</Link></h3>
          {/* <h3 className="user">Bhuvanesh</h3> */}
        </div>
    </div>
  )
}

export default Navbar
