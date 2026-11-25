import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { FiLock, FiMail, FiEye, FiEyeOff, FiArrowLeft, FiCheck } from 'react-icons/fi';
import { GiForkKnifeSpoon } from 'react-icons/gi';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import '../../styles/admin.css';

const AdminLogin = () => {
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fillDemoCredentials = () => {
    setEmail('admin@urbanspoon.com');
    setPassword('admin123');
    setErrorMessage('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !password) {
      setErrorMessage('Please provide both email address and password.');
      return;
    }

    setSubmitting(true);
    try {
      await login(email.trim(), password);
      showToast('Welcome back! Administrator login successful.', 'success');
      navigate('/admin/dashboard');
    } catch (err) {
      const msg =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        'Authentication failed. Please verify your credentials.';
      setErrorMessage(msg);
      showToast(msg, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        {/* Brand Header */}
        <div className="admin-login-header">
          <div
            className="brand-icon-wrapper"
            style={{ width: '56px', height: '56px', fontSize: '1.75rem', margin: '0 auto 1rem' }}
          >
            <GiForkKnifeSpoon />
          </div>
          <h2 style={{ fontSize: '1.75rem', color: 'var(--color-dark-brown)', marginBottom: '0.35rem' }}>
            Admin Portal
          </h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
            Authorized Personnel & Management Login
          </p>
        </div>

        {/* Demo Credentials Helper Box */}
        <div className="demo-credentials-box">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <strong>Demo Administrator Access:</strong>
            <button
              type="button"
              onClick={fillDemoCredentials}
              style={{
                fontSize: '0.75rem',
                color: 'var(--color-primary)',
                fontWeight: 700,
                textDecoration: 'underline',
              }}
            >
              Fill Credentials
            </button>
          </div>
          <div>Email: <code>admin@urbanspoon.com</code></div>
          <div>Password: <code>admin123</code></div>
        </div>

        {errorMessage && (
          <div
            style={{
              backgroundColor: '#fee2e2',
              color: '#dc2626',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              marginBottom: '1.25rem',
              fontSize: '0.85rem',
            }}
          >
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleLogin} noValidate>
          <div className="form-group">
            <label className="form-label" htmlFor="adminEmail">
              Admin Email Address
            </label>
            <div className="input-with-icon">
              <FiMail className="input-icon" />
              <input
                id="adminEmail"
                type="email"
                className="form-control"
                placeholder="admin@urbanspoon.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={submitting}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="adminPassword">
              Password
            </label>
            <div className="input-with-icon">
              <FiLock className="input-icon" />
              <input
                id="adminPassword"
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={submitting}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--color-text-light)',
                  padding: '4px',
                }}
                aria-label="Toggle password visibility"
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
          </div>

          <div style={{ marginTop: '1.75rem' }}>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.9rem' }}
              disabled={submitting}
            >
              {submitting ? 'Verifying Credentials...' : 'Sign In to Dashboard'}
            </button>
          </div>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.75rem' }}>
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              color: 'var(--color-text-muted)',
              fontSize: '0.875rem',
            }}
          >
            <FiArrowLeft />
            <span>Return to Public Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
