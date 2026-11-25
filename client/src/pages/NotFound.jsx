import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiCompass, FiAlertCircle } from 'react-icons/fi';
import { GiForkKnifeSpoon } from 'react-icons/gi';

const NotFound = () => {
  return (
    <div
      style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem 1.5rem',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: '560px' }}>
        <div
          style={{
            fontSize: '5rem',
            color: 'var(--color-primary)',
            marginBottom: '1rem',
            lineHeight: 1,
          }}
        >
          <GiForkKnifeSpoon />
        </div>
        <span className="section-subtitle">404 Error</span>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--color-dark-brown)' }}>
          Dish Not On Our Menu
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '2.5rem' }}>
          We apologize, but the culinary page you are searching for does not exist or has been
          relocated to another table.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <Link to="/" className="btn btn-primary btn-lg">
            <FiHome />
            <span>Return to Homepage</span>
          </Link>
          <Link to="/menu" className="btn btn-outline btn-lg">
            <FiCompass />
            <span>Browse Full Menu</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
