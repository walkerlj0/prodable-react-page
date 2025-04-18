import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import './Services.css';
import prodableLogo from '../assets/prodable-logo-noback.svg';

// Animated header logic
const lines = ["S ervices"];
function AnimatedServicesHeader() {
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
    <h1 className="services-animated-header">
      {displayed.map((line, idx) => (
        <span key={idx}>{line}<br/></span>
      ))}
    </h1>
  );
}

function Services() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic would go here
    alert('Thank you for your message! We will get back to you soon.');
  };

  return (
    <div className="page">
      {/* Header Section */}
      <header className="services-header">
        <AnimatedServicesHeader />
        <p>
          We offer a range of technical consulting services to help bridge the gap between highly technical teams and functional audiences. Our expertise spans documentation, developer relations, and strategic communications.
        </p>
      </header>

      {/* Services Overview Section */}
      <section className="service-section">
        <h2>Our Services</h2>
        <p>
          At Prodable, we specialize in creating clear, concise, and effective technical communication. Our services are designed to help you connect with your audience, whether they're developers, executives, or end-users.
        </p>
        <p>
          We work closely with your team to understand your technology, your goals, and your audience. This allows us to create tailored solutions that meet your specific needs and help you achieve your objectives.
        </p>
        <p>
          Our team brings years of experience in technical writing, developer relations, and strategic communications. We've worked with companies of all sizes, from startups to enterprise organizations, across a variety of industries.
        </p>
      </section>

      {/* Pricing Section */}
      <section className="service-section dark-bg">
        <h2>Pricing</h2>
        <p>
          We offer flexible pricing options to accommodate different project scopes and budgets. Choose the tier that best fits your needs, or contact us for a custom quote.
        </p>
        <div className="pricing-container">
          <div className="pricing-tier">
            <h3>Basic</h3>
            <div className="price">$2,000</div>
            <ul>
              <li>Single document creation</li>
              <li>Up to 20 pages</li>
              <li>2 revision rounds</li>
              <li>Basic formatting</li>
              <li>Delivery in 2 weeks</li>
            </ul>
            <a href="#contact" className="cta-button">Get Started</a>
          </div>
          <div className="pricing-tier">
            <h3>Standard</h3>
            <div className="price">$5,000</div>
            <ul>
              <li>Multiple document creation</li>
              <li>Up to 50 pages total</li>
              <li>3 revision rounds</li>
              <li>Custom formatting</li>
              <li>Graphics and diagrams</li>
              <li>Delivery in 3 weeks</li>
            </ul>
            <a href="#contact" className="cta-button">Get Started</a>
          </div>
          <div className="pricing-tier">
            <h3>Premium</h3>
            <div className="price">$10,000+</div>
            <ul>
              <li>Comprehensive documentation</li>
              <li>Unlimited pages</li>
              <li>Unlimited revisions</li>
              <li>Custom branding</li>
              <li>Interactive elements</li>
              <li>Ongoing support</li>
              <li>Priority delivery</li>
            </ul>
            <a href="#contact" className="cta-button">Get Started</a>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section id="contact" className="service-section">
        <h2>Contact Information</h2>
        <p>
          Ready to get started? Have questions about our services? We'd love to hear from you. Reach out using any of the methods below, or fill out the form and we'll get back to you as soon as possible.
        </p>
        <div className="contact-container">
          <div className="contact-info">
            <div className="contact-method">
              <h3>Email</h3>
              <p><a href="mailto:info@prodable.org">info@prodable.org</a></p>
            </div>
            <div className="contact-method">
              <h3>Phone</h3>
              <p>(555) 123-4567</p>
            </div>
            <div className="contact-method">
              <h3>Location</h3>
              <p>Austin, TX</p>
            </div>
            <div className="contact-method">
              <h3>Hours</h3>
              <p>Monday - Friday: 9am - 5pm CST</p>
            </div>
          </div>
          <div className="contact-form">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required />
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input type="text" id="subject" name="subject" required />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" required></textarea>
              </div>
              <button type="submit" className="submit-button">Send Message</button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Services;
