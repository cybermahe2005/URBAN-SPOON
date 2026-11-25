import React from 'react';
import { Link } from 'react-router-dom';
import { GiForkKnifeSpoon } from 'react-icons/gi';
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiInstagram,
  FiFacebook,
  FiTwitter,
  FiClock,
} from 'react-icons/fi';
import { FaTripadvisor } from 'react-icons/fa';
import '../../styles/footer.css';

const Footer = () => {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-top">
          {/* Brand Info */}
          <div className="footer-brand">
            <Link to="/" className="brand-link" style={{ width: 'fit-content' }}>
              <div className="brand-icon-wrapper">
                <GiForkKnifeSpoon />
              </div>
              <div className="brand-text">
                <span className="brand-name">
                  Urban <span>Spoon</span>
                </span>
                <span className="brand-tagline">Fine Dining & Bistro</span>
              </div>
            </Link>
            <p className="footer-description">
              Urban Spoon celebrates contemporary culinary artistry. We bring together fresh
              farm-sourced ingredients, timeless epicurean techniques, and warm hospitality to create
              unforgettable dining memories.
            </p>
            <div className="footer-socials">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="social-icon-btn"
                aria-label="Follow Urban Spoon on Instagram"
              >
                <FiInstagram />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="social-icon-btn"
                aria-label="Follow Urban Spoon on Facebook"
              >
                <FiFacebook />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="social-icon-btn"
                aria-label="Follow Urban Spoon on Twitter"
              >
                <FiTwitter />
              </a>
              <a
                href="https://tripadvisor.com"
                target="_blank"
                rel="noreferrer"
                className="social-icon-btn"
                aria-label="Review Urban Spoon on TripAdvisor"
              >
                <FaTripadvisor />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="footer-heading">Quick Navigation</h3>
            <ul className="footer-links">
              <li>
                <Link to="/" className="footer-link">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/menu" className="footer-link">
                  Menu & Pricing
                </Link>
              </li>
              <li>
                <Link to="/about" className="footer-link">
                  Our Culinary Story
                </Link>
              </li>
              <li>
                <Link to="/contact" className="footer-link">
                  Contact & Location
                </Link>
              </li>
              <li>
                <Link to="/reserve" className="footer-link">
                  Table Booking Inquiry
                </Link>
              </li>
              <li>
                <Link to="/admin/login" className="footer-link">
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="footer-heading">Opening Hours</h3>
            <ul className="footer-hours-list">
              <li className="hours-item">
                <span className="hours-day">Mon – Thu</span>
                <span className="hours-time">11:30 AM – 10:00 PM</span>
              </li>
              <li className="hours-item">
                <span className="hours-day">Friday</span>
                <span className="hours-time">11:30 AM – 11:30 PM</span>
              </li>
              <li className="hours-item">
                <span className="hours-day">Saturday</span>
                <span className="hours-time">11:00 AM – 11:30 PM</span>
              </li>
              <li className="hours-item">
                <span className="hours-day">Sunday Brunch</span>
                <span className="hours-time">10:30 AM – 09:30 PM</span>
              </li>
            </ul>
            <div style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#b8ada1', fontSize: '0.85rem' }}>
              <FiClock style={{ color: 'var(--color-primary)' }} />
              <span>Kitchen closes 45 mins before closing</span>
            </div>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="footer-heading">Find & Reach Us</h3>
            <ul className="footer-contact-items">
              <li className="contact-item">
                <FiMapPin className="contact-icon" />
                <span>
                  28 George Street, New Town, Edinburgh EH2 2PQ, Scotland, UK
                  <br />
                  <small style={{ color: 'var(--color-accent)' }}>(Valet Parking Available on George Street)</small>
                </span>
              </li>
              <li className="contact-item">
                <FiPhone className="contact-icon" />
                <span>+44 (0) 131 496 2345 / +44 (0) 131 496 2346</span>
              </li>
              <li className="contact-item">
                <FiMail className="contact-icon" />
                <span>concierge@urbanspoon.co.uk</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Urban Spoon Restaurant. All rights reserved.</p>
          <p className="footer-tagline">
            Fine Dining &amp; Contemporary Bistro • Edinburgh, Scotland
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
