import React from 'react';
import { Link } from 'react-router-dom';
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiClock,
  FiNavigation,
  FiCalendar,
  FiInfo,
} from 'react-icons/fi';
import { FaCarSide, FaSubway } from 'react-icons/fa';
import '../styles/contact.css';

const Contact = () => {
  return (
    <div className="contact-page">
      {/* 1. HERO HEADER */}
      <section className="page-hero" aria-label="Contact Header">
        <div className="container">
          <span className="section-subtitle" style={{ color: '#fed7aa' }}>
            We Look Forward to Welcoming You
          </span>
          <h1 className="page-hero-title">Location & Contact Details</h1>
          <p className="page-hero-subtitle">
            Find our location in the Gourmet District, check service timings, or get in touch with our
            hospitality concierge.
          </p>
        </div>
      </section>

      {/* 2. CONTACT INFO CARDS GRID (Task 1 & Task 4) */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Reach Our Concierge</span>
            <h2 className="section-title">Get in Touch</h2>
            <p className="section-description">
              Whether you have inquiries regarding private dining, dietary accommodations, or our
              wine selections, our team is at your disposal.
            </p>
          </div>

          <div className="contact-grid">
            {/* Address Card */}
            <div className="contact-card">
              <div className="contact-card-icon">
                <FiMapPin />
              </div>
              <h3 className="contact-card-title">Restaurant Address</h3>
              <div className="contact-card-detail">
                <p>
                  <strong>Urban Spoon Contemporary Dining</strong>
                  <br />
                  28 George Street, New Town
                  <br />
                  Edinburgh EH2 2PQ, Scotland, UK
                  <br />
                  <small style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
                    George Street Fine Dining Quarter
                  </small>
                </p>
              </div>
            </div>

            {/* Phone Card */}
            <div className="contact-card">
              <div className="contact-card-icon">
                <FiPhone />
              </div>
              <h3 className="contact-card-title">Telephone Numbers</h3>
              <div className="contact-card-detail">
                <p>
                  <strong>General Reservations:</strong>
                  <br />
                  +44 (0) 131 496 2345
                  <br />
                  <br />
                  <strong>Private Events & Banquets:</strong>
                  <br />
                  +44 (0) 131 496 2346
                  <br />
                  <small style={{ color: 'var(--color-text-light)' }}>
                    Phone hours: 10:00 AM – 10:00 PM GMT daily
                  </small>
                </p>
              </div>
            </div>

            {/* Email Card */}
            <div className="contact-card">
              <div className="contact-card-icon">
                <FiMail />
              </div>
              <h3 className="contact-card-title">Electronic Mail</h3>
              <div className="contact-card-detail">
                <p>
                  <strong>Table Reservations:</strong>
                  <br />
                  concierge@urbanspoon.co.uk
                  <br />
                  <br />
                  <strong>Press & Media Inquiries:</strong>
                  <br />
                  press@urbanspoon.co.uk
                  <br />
                  <small style={{ color: 'var(--color-text-light)' }}>
                    Inquiries answered within 2 to 4 business hours.
                  </small>
                </p>
              </div>
            </div>

            {/* Hours Card (Task 2) */}
            <div className="contact-card">
              <div className="contact-card-icon">
                <FiClock />
              </div>
              <h3 className="contact-card-title">Opening & Dining Hours</h3>
              <div className="contact-card-detail">
                <p>
                  <strong>Monday – Thursday:</strong>
                  <br />
                  11:30 AM – 10:00 PM
                  <br />
                  <strong>Friday – Saturday:</strong>
                  <br />
                  11:30 AM – 11:30 PM (Late Kitchen)
                  <br />
                  <strong>Sunday Grand Brunch:</strong>
                  <br />
                  10:30 AM – 09:30 PM
                </p>
              </div>
            </div>
          </div>

          {/* 3. LOCATION & MAP PLACEHOLDER SECTION (Task 3) */}
          <div className="map-container">
            {/* Visual Stylized Map Placeholder */}
            <div className="map-visual-placeholder">
              {/* Geometric Grid Overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  opacity: 0.15,
                  backgroundImage:
                    'linear-gradient(#ea580c 1px, transparent 1px), linear-gradient(90deg, #ea580c 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                }}
              />
              <div className="map-pinpoint">
                <FiMapPin className="map-pin-icon" />
                <div
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    padding: '0.65rem 1.25rem',
                    borderRadius: 'var(--radius-full)',
                    color: 'var(--color-dark-brown)',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                    marginTop: '0.5rem',
                  }}
                >
                  Urban Spoon • 28 George St, Edinburgh
                </div>
                <div style={{ color: '#fed7aa', fontSize: '0.75rem', marginTop: '0.35rem' }}>
                  GPS: 55.9533° N, 3.1965° W • Edinburgh, Scotland
                </div>
              </div>
            </div>

            {/* Map Directions & Transit Sidebar */}
            <div className="map-details-sidebar">
              <div>
                <span className="section-subtitle">Directions & Transit</span>
                <h3 style={{ fontSize: '1.6rem', marginBottom: '1.25rem' }}>
                  Getting to Urban Spoon
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                    <div style={{ color: 'var(--color-primary)', fontSize: '1.25rem', marginTop: '2px' }}>
                      <FaCarSide />
                    </div>
                    <div>
                      <strong style={{ display: 'block', color: 'var(--color-dark-brown)' }}>
                        Valet & Parking
                      </strong>
                      <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                        Complimentary valet parking is offered at our main George Street entrance
                        beginning at 5:00 PM daily.
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                    <div style={{ color: 'var(--color-primary)', fontSize: '1.25rem', marginTop: '2px' }}>
                      <FaSubway />
                    </div>
                    <div>
                      <strong style={{ display: 'block', color: 'var(--color-dark-brown)' }}>
                        Public Transit
                      </strong>
                      <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                        Located a 5-minute walk from Edinburgh Waverley Rail Station and 2 minutes from the St Andrew Square Tram Stop.
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                    <div style={{ color: 'var(--color-primary)', fontSize: '1.25rem', marginTop: '2px' }}>
                      <FiInfo />
                    </div>
                    <div>
                      <strong style={{ display: 'block', color: 'var(--color-dark-brown)' }}>
                        Dress Code Policy
                      </strong>
                      <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                        Smart casual / elegant evening attire is encouraged for dining room guests.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid #f1ece4' }}>
                <Link to="/reserve" className="btn btn-primary" style={{ width: '100%' }}>
                  <FiCalendar />
                  <span>Submit Table Inquiry</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
