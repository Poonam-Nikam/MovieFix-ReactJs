import React from 'react'
import "../components/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        MovieFix
      </div>
      <ul className="navbar-nav">
      <li className="nav-item">All</li>
      <li className="nav-item">Action</li>
      <li className="nav-item">Comedy</li>
      <li className="nav-item">Horror</li>
      <li className="nav-item">Drama</li>
      <li className="nav-item">Sci-Fi</li>
      </ul>
    </nav>
  )
}

export default Navbar
