import React, { useState, useEffect } from 'react';
import './Portfolio.css';
import prodableLogo from '../assets/prodable-logo-noback.svg';
import prodableP from '../assets/prodable-p.svg';
import icnLitepaper from '../assets/ICN Litepaper.png';
import dispatch from '../assets/dispatch.png';
import Footer from '../components/Footer';
import meDeskImage from '../assets/me-desk.jpg';
import githubLogo from '../assets/github.png';
import ethIcon from '../assets/eth-icon.png';
import blueskyLogo from '../assets/Bluesky_logo.png';
import youtubeIcon from '../assets/youtube-icon.png';
import plLaunchpad from '../assets/pl-launchpad.png';
import starlingLabDispatch from '../assets/starling-lab-dispatch.png';
import pMing from '../assets/p-ming.png';

// Animated header logic
const lines = ["P ortfolio"];
function AnimatedPortfolioHeader() {
  const [displayed, setDisplayed] = useState([""]);
  useEffect(() => {
    let currentLine = 0;
    let currentChar = 0;
    const interval = setInterval(() => {
      if (
        currentLine >= lines.length ||
        currentChar >= (lines[currentLine]?.length || 0)
      ) {
        clearInterval(interval);
        return;
      }
      setDisplayed(prev => {
        if (currentLine >= lines.length) return prev;
        const newDisplayed = [...prev];
        if (!newDisplayed[currentLine]) newDisplayed[currentLine] = "";
        if (currentChar < lines[currentLine].length) {
          newDisplayed[currentLine] += lines[currentLine][currentChar];
        }
        return newDisplayed;
      });
      currentChar++;
      if (currentChar === lines[currentLine].length) {
        currentLine++;
        currentChar = 0;
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);
  return (
    <h1 className="portfolio-animated-header">
      {displayed.map((line, idx) => (
        <span key={idx}>{line}<br/></span>
      ))}
    </h1>
  );
}

function PortfolioSection({ icon, title, text, image, reverse, darkBg, link, caption, embedContent }) {
  // Function to handle image loading errors
  const handleImageError = (e, localImage) => {
    if (localImage) {
      e.target.src = localImage;
    }
  };

  return (
    <section className={`portfolio-section-alt${reverse ? ' reverse' : ''}${darkBg ? ' dark-bg' : ''}`}>
      <div className="portfolio-section-content">
        <div className="portfolio-section-text">
          <div className="portfolio-section-title-row">
            <img src={icon} alt="Section Icon" className="portfolio-section-icon" />
            <h2>{title}</h2>
          </div>
          <p>{text}</p>
        </div>
        <div className="portfolio-section-image">
          {embedContent ? (
            <div className="portfolio-embed-content" dangerouslySetInnerHTML={{ __html: embedContent }} />
          ) : image ? (
            <div className="portfolio-image-wrapper">
              {link ? (
                <a href={link} target="_blank" rel="noopener noreferrer">
                  <img 
                    src={image} 
                    alt={title} 
                    onError={(e) => handleImageError(e, 
                      title.includes("Curriculum") ? plLaunchpad : 
                      title.includes("Technical Enablement") ? starlingLabDispatch : 
                      title.includes("Program Management") ? pMing : 
                      icnLitepaper
                    )}
                  />
                </a>
              ) : (
                <img 
                  src={image} 
                  alt={title} 
                  onError={(e) => handleImageError(e, 
                    title.includes("Curriculum") ? plLaunchpad : 
                    title.includes("Technical Enablement") ? starlingLabDispatch : 
                    title.includes("Program Management") ? pMing : 
                    icnLitepaper
                  )}
                />
              )}
              {caption && (
                <div className="portfolio-image-caption" dangerouslySetInnerHTML={{ __html: caption }} />
              )}
            </div>
          ) : (
            <div className="portfolio-image-placeholder">Embed/Image</div>
          )}
        </div>
      </div>
    </section>
  );
}

function Portfolio() {
  useEffect(() => {
    try {
      // Skip in headless environments
      if (typeof window === 'undefined' || process.env.REACT_APP_HEADLESS_BROWSER === 'true') {
        return;
      }
      
      // Check if there's a hash in the URL
      if (window.location.hash) {
        // Get the element with the ID matching the hash
        const id = window.location.hash.substring(1);
        const element = document.getElementById(id);
        
        // If the element exists, scroll to it with a slight delay to ensure rendering
        if (element) {
          setTimeout(() => {
            try {
              element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } catch (error) {
              console.error('Error scrolling to element:', error);
            }
          }, 100);
        }
      }
    } catch (error) {
      console.error('Error in Portfolio hash navigation:', error);
    }
  }, []); // Empty dependency array means this runs once on component mount

  return (
    <div className="page">
      {/* Header Section */}
      <header className="page-header portfolio-header">
        <AnimatedPortfolioHeader />
        <div className="special-font intro-text">
          <p>
            Prodable is a versatile technical consulting agency bridging highly technical teams with functional audiences, 
            delivering value through data-driven product development, technical documentation, and curriculum design.
          </p>
        </div>
      </header>

      {/* Profile Section */}
      <section id="lindsay" className="profile-section">
        <div className="profile-container">
          <div className="profile-image-wrapper">
            <div className="profile-image-container">
              <img 
                src={meDeskImage} 
                alt="Lindsay Walker" 
                className="profile-image" 
                onError={(e) => {
                  e.target.src = "https://firebasestorage.googleapis.com/v0/b/prodable-react-page.appspot.com/o/me-desk.jpg?alt=media";
                }}
              />
            </div>
            <div className="profile-social-container">
              <a href="https://github.com/walkerlj0" target="_blank" rel="noopener noreferrer">
                <img 
                  src={githubLogo} 
                  alt="GitHub Profile" 
                  className="profile-social-icon" 
                  style={{ height: '25px' }}
                  onError={(e) => {
                    e.target.src = "https://firebasestorage.googleapis.com/v0/b/prodable-react-page.appspot.com/o/github.png?alt=media";
                  }}
                />
              </a>
              <a href="https://app.ens.domains/lindsayj.eth" target="_blank" rel="noopener noreferrer">
                <img 
                  src={ethIcon} 
                  alt="Ethereum ENS Profile" 
                  className="profile-social-icon" 
                  style={{ height: '29px' }}
                  onError={(e) => {
                    e.target.src = "https://firebasestorage.googleapis.com/v0/b/prodable-react-page.appspot.com/o/eth-icon.png?alt=media";
                  }}
                />
              </a>
              <a href="https://bsky.app/profile/lindsayj.bsky.social" target="_blank" rel="noopener noreferrer">
                <img 
                  src={blueskyLogo} 
                  alt="Bluesky Profile" 
                  className="profile-social-icon" 
                  style={{ height: '25px' }}
                  onError={(e) => {
                    e.target.src = "https://firebasestorage.googleapis.com/v0/b/prodable-react-page.appspot.com/o/Bluesky_logo.png?alt=media";
                  }}
                />
              </a>
              <a href="https://www.youtube.com/playlist?list=PLQIpPhDqrx4U3I-MSveHXJg3DWHcvhzfC" target="_blank" rel="noopener noreferrer">
                <img 
                  src={youtubeIcon} 
                  alt="YouTube Playlist" 
                  className="profile-social-icon" 
                  style={{ height: '25px' }}
                  onError={(e) => {
                    e.target.src = "https://firebasestorage.googleapis.com/v0/b/prodable-react-page.appspot.com/o/youtube-icon.png?alt=media";
                  }}
                />
              </a>
              {/* Additional social icons can be added here */}
            </div>
          </div>
          <div className="profile-content">
            <h2 className="profile-name">
              <a href="#lindsay" className="profile-name-link">Lindsay Walker</a>
            </h2>
            <h3 className="profile-title">Technical Enablement, Program, and Product Management</h3>
            <div className="special-font profile-description">
              <p>
                With expertise spanning data analytics, several programming tools and languages, decentralized systems, AI platforms, and educational technology, 
                Lindsay excels at working with cross-functional teams to successfully deliver ambitious projects.
              </p>
            </div>
            <div className="special-font profile-description">
              <p>
                Whether developing product roadmaps, managing technical documentation, or designing educational and enablement programs, 
                Lindsay combines technical depth with clear communication to transform complex ideas into accessible, impactful solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      <PortfolioSection
        icon={prodableLogo}
        title="Curriculum and Technical Writing"
        text="We create comprehensive technical documentation, developer guides, and curriculum for a variety of audiences. Our work includes API documentation, onboarding guides, and interactive tutorials tailored to client needs."
        image="https://firebasestorage.googleapis.com/v0/b/prodable-react-page.appspot.com/o/pl-launchpad.png?alt=media"
        reverse={false}
        darkBg={false}
        link="https://pl-launchpad.io/curriculum/"
        caption={`<span style="font-style: italic; color: #777; font-size: 0.9rem;">see the Curriculum <a href="https://www.notion.so/lindsayjowalk/6f16855e660a4ea69cc059c71ce84c7e?v=e0fd0aee50dd4d1f930624bbed3b1b28&pvs=4" target="_blank" rel="noopener noreferrer">scope and sequence</a></span>`}
      />
      <PortfolioSection
        icon={prodableP}
        title="Developer Relations Services"
        text="From community engagement to technical advocacy, we support developer relations through workshops, presentations, and direct collaboration with engineering teams to drive adoption and foster vibrant developer ecosystems."
        reverse={true}
        darkBg={true}
        embedContent='<iframe width="560" height="315" src="https://www.youtube.com/embed/iSBylySBOVA?si=zENMzMZb0-RU7of8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
      />
      <PortfolioSection
        icon={prodableLogo}
        title="Paper Authoring"
        text="We author whitepapers, litepapers, and research documents that help position your company as a thought leader. Our work is clear, concise, and tailored for both technical and non-technical stakeholders."
        image={icnLitepaper}
        reverse={false}
        darkBg={false}
        link="https://console.impossiblecloud.com/static/icn/Litepaper.pdf"
      />
      <PortfolioSection
        icon={prodableP}
        title="Technical Enablement"
        text="We help your team develop the skills and knowledge needed to leverage new technologies effectively. Our enablement programs include workshops, training sessions, and hands-on labs designed to accelerate adoption and proficiency."
        image="https://firebasestorage.googleapis.com/v0/b/prodable-react-page.appspot.com/o/starling-lab-dispatch.png?alt=media"
        reverse={true}
        darkBg={true}
        link="https://dispatch.starlinglab.org/"
      />
      <PortfolioSection
        icon={prodableLogo}
        title="Program Management"
        text="We manage complex technical programs from inception to completion, ensuring alignment with business objectives, stakeholder satisfaction, and timely delivery. Our approach emphasizes clear communication, risk management, and continuous improvement."
        image="https://firebasestorage.googleapis.com/v0/b/prodable-react-page.appspot.com/o/p-ming.png?alt=media"
        reverse={false}
        darkBg={false}
        link="https://pl-launchpad.io/"
        caption={`<span style="font-style: italic; color: #777; font-size: 0.9rem;">See the program <a href="https://www.notion.so/lindsayjowalk/Planning-Roadmaps-b7027615dc8a4d7cba8cd5b2feeb07bd?pvs=4" target="_blank" rel="noopener noreferrer">goals</a> and <a href="https://www.notion.so/lindsayjowalk/List-of-Improvements-895358a25efb405a849e7a12c9ee3c03?pvs=4" target="_blank" rel="noopener noreferrer">improvement processes</a></span>`}
      />
      <Footer />
    </div>
  );
}

export default Portfolio;
