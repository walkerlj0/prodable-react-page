import React from 'react';
import { Link } from 'react-router-dom';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';
import titleLogo from '../assets/Prodable_Title-noback.svg';
import icnLitepaper from '../assets/ICN Litepaper.png';
import starlinglabdispatch from '../assets/dispatch.png';
import Footer from '../components/Footer';
import './Home.css';

function Home() {
  return (
    <ParallaxProvider>
      <div className="App">
        <header className="App-header">
          <img src={titleLogo} className="App-logo" alt="Prodable" />
          <h2>A Technical Consulting Agency</h2>
    
          <div className="special-font intro-text">
            <p>
              Prodable is a consulting agency made up of experienced, native english-speaking engineers
              that specialize in technical documentation. With services and offerings that include
              technical writing & research, curriculum development, whitepaper authoring, documentation platform setup and maintenance, 
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
            <Parallax translateY={[-15, 15]} speed={-8} className="dark-section-text">
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
            </Parallax>
            <Parallax translateY={[15, -15]} speed={8} className="dark-section-image">
              <iframe
                src="https://www.youtube.com/embed/videoseries?list=PLQIpPhDqrx4U3I-MSveHXJg3DWHcvhzfC"
                title="Prodable DevRel Playlist"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </Parallax>
          </div>
        </section>

        <section className="grid-section">
          <h2>Featured Content</h2>
          <div className="grid-content">
            <div className="grid-item">
            <div className="grid-embed">
                <img 
                  src={starlinglabdispatch} 
                  alt="Starling Lab Outreach"
                  className="grid-image"
                />
              </div>
              <h3><Link to="https://dispatch.starlinglab.org/">Starling Lab Outreach</Link></h3>
              <p>
                Etablished a blog, posts, a social media presence in-person and online workshops, 
                wrote Case Studies for Starling Lab Fellowships, 
                and helped design a Stanford Univsersity course.
              </p>
            </div>
            <div className="grid-item">
              <div className="grid-embed">
                <img 
                  src={icnLitepaper} 
                  alt="Impossible Cloud Network Litepaper"
                  className="grid-image"
                />
              </div>
              <h3><Link to="https://www.impossiblecloudnetwork.com/">Impossible Cloud Network Litepaper</Link></h3>
              <p>
                Helped translate and edit the original whitepaper into a clear and concise
                published litepaper prior to the public token sale.
              </p>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </ParallaxProvider>
  );
}

export default Home;
