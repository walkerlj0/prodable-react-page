import React, { useEffect, useState } from 'react';
import './Portfolio.css';
import prodableLogo from '../assets/prodable-logo-noback.svg';
import prodableP from '../assets/prodable-p.svg';
import icnLitepaper from '../assets/ICN Litepaper.png';
import dispatch from '../assets/dispatch.png';
import Footer from '../components/Footer';

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

function PortfolioSection({ icon, title, text, image, reverse, darkBg }) {
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
          {image ? <img src={image} alt={title} /> : <div className="portfolio-image-placeholder">Embed/Image</div>}
        </div>
      </div>
    </section>
  );
}

function Portfolio() {
  return (
    <div className="page">
      {/* Header Section */}
      <header className="portfolio-header">
        <AnimatedPortfolioHeader />
        <div className="special-font intro-text">
          <p>
            Prodable is A versatile technical consulting agency bridging highly technical teams with functional audiences, 
            delivering value through data-driven product development, technical documentation, and curriculum design.
          </p>
        </div>
        <div className="special-font intro-text">
          <p>
            With expertise spanning data analytics, several programming tools and languages, decentralized systems, AI platforms, and educational technology, 
            we excel at working with cross-functional teams to successfully deliver ambitious projects.
          </p>
        </div>
        <div className="special-font intro-text">
          <p>
            Whether developing product roadmaps, managing technical documentation, or designing educational and enablement programs, 
            our agency combines technical depth with clear communication to transform complex ideas into accessible, impactful solutions.
          </p>
        </div>
      </header>
      <PortfolioSection
        icon={prodableLogo}
        title="Curriculum and Technical Writing"
        text="We create comprehensive technical documentation, developer guides, and curriculum for a variety of audiences. Our work includes API documentation, onboarding guides, and interactive tutorials tailored to client needs."
        image={icnLitepaper}
        reverse={false}
        darkBg={false}
      />
      <PortfolioSection
        icon={prodableP}
        title="Developer Relations Services"
        text="From community engagement to technical advocacy, we support developer relations through workshops, presentations, and direct collaboration with engineering teams to drive adoption and foster vibrant developer ecosystems."
        image={dispatch}
        reverse={true}
        darkBg={true}
      />
      <PortfolioSection
        icon={prodableLogo}
        title="Paper Authoring"
        text="We author whitepapers, litepapers, and research documents that help position your company as a thought leader. Our work is clear, concise, and tailored for both technical and non-technical stakeholders."
        image={icnLitepaper}
        reverse={false}
        darkBg={false}
      />
      <PortfolioSection
        icon={prodableP}
        title="Brand Awareness"
        text="We help craft and amplify your brand voice through strategic messaging, content campaigns, and social media engagement, ensuring your story reaches the right audience."
        image={dispatch}
        reverse={true}
        darkBg={true}
      />
      <PortfolioSection
        icon={prodableLogo}
        title="Program and Product Management"
        text="We provide program and product management services, helping teams deliver on time and within scope, while maintaining high quality and stakeholder satisfaction."
        image={icnLitepaper}
        reverse={false}
        darkBg={false}
      />
      <Footer />
    </div>
  );
}

export default Portfolio;
