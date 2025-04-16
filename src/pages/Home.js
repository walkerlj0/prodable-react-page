import titleLogo from '../assets/Prodable_Title-noback.svg';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={titleLogo} className="App-logo" alt="Prodable" />
        <p>
          Welcome to Prodable Technical Consulting Agency
        </p>
        <Link
          to="/portfolio"
          className="App-link"
        >
          Visit Our Portfolio
        </Link>
      </header>
    </div>
  );
}

export default Home;
