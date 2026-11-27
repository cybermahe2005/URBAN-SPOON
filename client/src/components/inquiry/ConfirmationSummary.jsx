import React from 'react';
import { Link } from 'react-router-dom';
import {
  FiCheckCircle,
  FiUser,
  FiPhone,
  FiCalendar,
  FiUsers,
  FiFileText,
  FiClock,
  FiPlusCircle,
  FiBookOpen,
  FiHome,
  FiSearch,
} from 'react-icons/fi';
import { formatDate } from '../../utils/formatDate';
import '../../styles/inquiry.css';

const ConfirmationSummary = ({ inquiry, onReset, onCheckStatus }) => {
  if (!inquiry) return null;

  const referenceCode = inquiry._id ? `#${inquiry._id.slice(-8).toUpperCase()}` : 'REC-PENDING';

  return (
    <div className="confirmation-container" role="region" aria-label="Booking Confirmation Summary">
      <div className="confirmation-success-icon">
        <FiCheckCircle />
      </div>

      <span className="section-subtitle">Inquiry Received</span>
      <h2 style={{ fontSize: '2.25rem', marginBottom: '0.75rem' }}>
        Thank You, {inquiry.customerName.split(' ')[0]}!
      </h2>
      <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', maxWidth: '520px', margin: '0 auto' }}>
        We have received your table booking inquiry. Below is a complete summary of your submitted
        details for your records.
      </p>

      {/* Submitted Details Card */}
      <div className="confirmation-card">
        <div className="summary-row">
          <span className="summary-label">
            <FiFileText />
            <span>Inquiry Reference ID</span>
          </span>
          <span className="summary-value" style={{ fontFamily: 'monospace', color: 'var(--color-primary)' }}>
            #{inquiry._id ? inquiry._id.slice(-8).toUpperCase() : 'REC-PENDING'}
          </span>
        </div>

        <div className="summary-row">
          <span className="summary-label">
            <FiUser />
            <span>Customer Name</span>
          </span>
          <span className="summary-value">{inquiry.customerName}</span>
        </div>

        <div className="summary-row">
          <span className="summary-label">
            <FiPhone />
            <span>Phone Number</span>
          </span>
          <span className="summary-value">{inquiry.phoneNumber}</span>
        </div>

        <div className="summary-row">
          <span className="summary-label">
            <FiCalendar />
            <span>Requested Date & Time</span>
          </span>
          <span className="summary-value">{formatDate(inquiry.bookingDate)}</span>
        </div>

        <div className="summary-row">
          <span className="summary-label">
            <FiUsers />
            <span>Party Size</span>
          </span>
          <span className="summary-value">{inquiry.numberOfGuests} Guests</span>
        </div>

        <div className="summary-row">
          <span className="summary-label">
            <FiClock />
            <span>Inquiry Status</span>
          </span>
          <span className="summary-value">
            <span className="badge badge-pending">
              ● {inquiry.status || 'Pending'} Review
            </span>
          </span>
        </div>

        <div className="summary-row">
          <span className="summary-label">
            <FiFileText />
            <span>Special Requests</span>
          </span>
          <span className="summary-value" style={{ fontStyle: inquiry.specialRequests ? 'normal' : 'italic' }}>
            {inquiry.specialRequests || 'No special requests provided'}
          </span>
        </div>
      </div>

      {/* Clarification Notice */}
      <div
        style={{
          backgroundColor: '#fffbeb',
          border: '1px solid #fde68a',
          padding: '1.25rem',
          borderRadius: 'var(--radius-md)',
          textAlign: 'left',
          fontSize: '0.9rem',
          color: '#92400e',
          lineHeight: '1.6',
          marginBottom: '2.5rem',
        }}
      >
        <strong>Please Note:</strong> This is a table booking inquiry, not a confirmed reservation.
        Save your Inquiry Reference ID (<strong>{referenceCode}</strong>) to track your live
        confirmation status once our hospitality team updates your request, or await our call on{' '}
        <strong>{inquiry.phoneNumber}</strong>.
      </div>

      {/* Action Buttons */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          flexWrap: 'wrap',
        }}
      >
        {onCheckStatus && (
          <button onClick={() => onCheckStatus(inquiry)} className="btn btn-primary">
            <FiSearch />
            <span>Check Inquiry Status</span>
          </button>
        )}

        <button onClick={onReset} className={onCheckStatus ? 'btn btn-outline' : 'btn btn-primary'}>
          <FiPlusCircle />
          <span>Submit Another Inquiry</span>
        </button>

        <Link to="/menu" className="btn btn-outline">
          <FiBookOpen />
          <span>Explore Our Menu</span>
        </Link>

        <Link to="/" className="btn btn-outline">
          <FiHome />
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
};

export default ConfirmationSummary;
