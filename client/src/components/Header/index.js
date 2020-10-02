import React from 'react';
import logo from '../../logo.png';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <a className="navbar-brand" href="#">
          <img src={logo} alt="SpaceX logo" style={{ width: 150, display: 'block' }} />
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="">Github</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">LinkedIn</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Header;

