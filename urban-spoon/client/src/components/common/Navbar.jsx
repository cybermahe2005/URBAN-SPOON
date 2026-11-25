import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { GiForkKnifeSpoon } from 'react-icons/gi';
import { FiMenu, FiX, FiCalendar, FiLock } from 'react-icons/fi';
import '../../styles/navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <>
      <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          {/* Logo / Branding */}
          <Link to="/" className="brand-link" aria-label="Urban Spoon Homepage">
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

          {/* Desktop Navigation Links */}
          <nav aria-label="Main Navigation">
            <ul className="nav-links">
              <li className="nav-item">
                <NavLink
                  to="/"
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  end
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/menu"
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  Menu
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/about"
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/contact"
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </nav>

          {/* Desktop Actions */}
          <div className="nav-actions">
            <Link to="/admin/login" className="admin-nav-link" title="Admin Portal">
              <FiLock size={14} />
              <span>Admin</span>
            </Link>
            <Link to="/reserve" className="btn btn-primary btn-reserve-nav">
              <FiCalendar />
              <span>Reserve Table</span>
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              className="mobile-toggle"
              onClick={() => setMobileOpen(true)}
              aria-label="Open Mobile Menu"
            >
              <FiMenu />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer & Overlay */}
      <div
        className={`mobile-overlay ${mobileOpen ? 'open' : ''}`}
        onClick={() => setMobileOpen(false)}
      />

      <aside className={`mobile-drawer ${mobileOpen ? 'open' : ''}`} aria-label="Mobile Navigation">
        <div>
          <div className="mobile-drawer-header">
            <div className="brand-text">
              <span className="brand-name" style={{ fontSize: '1.25rem' }}>
                Urban <span>Spoon</span>
              </span>
              <span className="brand-tagline">Fine Dining</span>
            </div>
            <button
              className="mobile-drawer-close"
              onClick={() => setMobileOpen(false)}
              aria-label="Close Mobile Menu"
            >
              <FiX />
            </button>
          </div>

          <ul className="mobile-nav-links">
            <li>
              <NavLink to="/" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`} end>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/menu" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}>
                Menu
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}>
                Contact
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="mobile-drawer-footer">
          <Link to="/reserve" className="btn btn-primary" style={{ width: '100%' }}>
            <FiCalendar />
            <span>Reserve Table</span>
          </Link>
          <Link
            to="/admin/login"
            className="admin-nav-link"
            style={{ justifyContent: 'center', width: '100%', padding: '0.75rem' }}
          >
            <FiLock size={14} />
            <span>Admin Dashboard</span>
          </Link>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
