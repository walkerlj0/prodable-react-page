import logo from './assets/prodable-logo-noback.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to Prodable Technical Consulting Agency
        </p>
        <a
          className="Visit our Homepage"
          href="https://prodable.org/portfolio"
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit Our Portfolio
        </a>
      </header>
    </div>
  );
}

export default App;
