import React from 'react';
import { Link } from 'react-router-dom';
import titleLogo from '../assets/Prodable_Title-noback.svg';
import Footer from '../components/Footer';
import './Home.css';

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={titleLogo} className="App-logo" alt="Prodable" />
        <h2>A Technical Consulting Agency</h2>
  
        <div className="special-font intro-text">
          <p>
            Prodable is a consulting agency made up of experienced, native english-speaking engineers
            that specialize in technical documentation. With services and offerings that include
            technical writing & research, whitepaper authoring, documentation platform setup and maintenance, 
            website setup & copywriting, documentation architecture, and developer relations services. 
            <br></br>
            <br></br>
            See <Link to="/services">services</Link> for pricing and more information.
          </p>
          <p>
            We work closely with engineering and product teams to gain a deep understanding
             and build out quality documentation and messaging. 
          </p>
        </div>
        <Link to="/portfolio" className="App-link special-font">
          See Our Work
        </Link>
      </header>

      <section className="dark-section">
        <div className="dark-section-content">
          <div className="dark-section-text">
            <h2>Our Expertise</h2>
            <p>
            We are equipped to help emerging and existing tech startups create
            the training, documentation, messaging, curriculum, and enablement materials
             they need for their partners, users, and customers.
            </p>
            <p>
            The content and platforms
              we put in place enable product discovery and independent onboarding that saves
               time and money for sales and partner enablement teams. 
            </p>
          </div>
          <div className="dark-section-image">
            {/* Placeholder for image */}
          </div>
        </div>
      </section>

      <section className="grid-section">
        <h2>Featured Content</h2>
        <div className="grid-content">
          <div className="grid-item">
            <div className="grid-embed">
              {/* Video or website embed 1 */}
            </div>
            <h3>Content Title 1</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore.
            </p>
          </div>
          <div className="grid-item">
            <div className="grid-embed">
              {/* Video or website embed 2 */}
            </div>
            <h3>Content Title 2</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;
