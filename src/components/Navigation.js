import { Link } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  return (
    <nav className="nav-menu">
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
