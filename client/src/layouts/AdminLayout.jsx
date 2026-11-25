import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { GiForkKnifeSpoon } from 'react-icons/gi';
import { FiLogOut, FiHome, FiUser, FiExternalLink } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import '../styles/admin.css';

const AdminLayout = () => {
  const { admin, logout } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    showToast('Administrator signed out successfully.', 'info');
    navigate('/admin/login');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f9f6f0' }}>
      {/* Top Admin Navigation Header */}
      <header className="admin-header">
        <div className="admin-header-content">
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <Link to="/admin/dashboard" className="brand-link" style={{ textDecoration: 'none' }}>
              <div className="brand-icon-wrapper" style={{ width: '38px', height: '38px', fontSize: '1.2rem' }}>
                <GiForkKnifeSpoon />
              </div>
              <div className="brand-text">
                <span className="brand-name" style={{ color: '#ffffff', fontSize: '1.25rem' }}>
                  Urban <span>Spoon</span>
                </span>
                <span className="brand-tagline" style={{ color: '#fed7aa', fontSize: '0.65rem' }}>
                  Admin Portal
                </span>
              </div>
            </Link>

            <Link
              to="/"
              target="_blank"
              style={{
                color: '#d1c7bc',
                fontSize: '0.85rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.35rem 0.75rem',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
              }}
            >
              <span>View Public Site</span>
              <FiExternalLink size={13} />
            </Link>
          </div>

          <div className="admin-user-info">
            <div className="admin-avatar">
              {admin && admin.name ? admin.name.charAt(0).toUpperCase() : 'A'}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'right' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#ffffff' }}>
                {admin ? admin.name : 'Administrator'}
              </span>
              <small style={{ fontSize: '0.75rem', color: '#fed7aa', textTransform: 'capitalize' }}>
                {admin ? admin.role : 'Manager'}
              </small>
            </div>

            <button
              onClick={handleLogout}
              className="btn btn-sm"
              style={{
                backgroundColor: 'rgba(239, 68, 68, 0.2)',
                color: '#fca5a5',
                border: '1px solid rgba(239, 68, 68, 0.4)',
                marginLeft: '1rem',
              }}
              title="Sign Out"
            >
              <FiLogOut />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Page Content */}
      <main style={{ flex: 1, padding: '2.5rem 0' }}>
        <Outlet />
      </main>

      {/* Footer */}
      <footer style={{ padding: '1.5rem', textAlign: 'center', fontSize: '0.85rem', color: '#8c8276', borderTop: '1px solid #ede4d3' }}>
        Urban Spoon Administration Portal • Sysslan IT Solutions Internship Evaluation System
      </footer>
    </div>
  );
};

export default AdminLayout;
