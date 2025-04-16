import { Link } from 'react-router-dom';
import { useState } from 'react';
import './Navigation.css';
import logo from '../assets/prodable-logo-noback.svg';

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="nav-menu">
      <Link to="/" className="nav-logo">
        <img src={logo} alt="Prodable" />
      </Link>
      <button className="hamburger" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </button>
      <ul className={isMenuOpen ? 'active' : ''}>
        <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
        <li><Link to="/portfolio" onClick={() => setIsMenuOpen(false)}>Portfolio</Link></li>
        <li><Link to="/services" onClick={() => setIsMenuOpen(false)}>Services</Link></li>
        <li><Link to="/demos" onClick={() => setIsMenuOpen(false)}>Demos</Link></li>
      </ul>
    </nav>
  );
}

export default Navigation;
