import titleLogo from '../assets/Prodable_Title-noback.svg';

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={titleLogo} className="App-logo" alt="Prodable" />
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

export default Home;
