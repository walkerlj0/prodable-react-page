import { Link } from 'react-router-dom';
import './Navigation.css';
import logo from '../assets/prodable-logo-noback.svg';

function Navigation() {
  return (
    <nav className="nav-menu">
      <Link to="/" className="nav-logo">
        <img src={logo} alt="Prodable" />
      </Link>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/portfolio">Portfolio</Link></li>
        <li><Link to="/services">Services</Link></li>
        <li><Link to="/demos">Demos</Link></li>
      </ul>
    </nav>
  );
}

export default Navigation;
