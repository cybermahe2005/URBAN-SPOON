import React from 'react';
import {
  FiX,
  FiUser,
  FiPhone,
  FiCalendar,
  FiUsers,
  FiFileText,
  FiClock,
  FiCheckCircle,
  FiXCircle,
} from 'react-icons/fi';
import { formatDate } from '../../utils/formatDate';

const InquiryDetailModal = ({ inquiry, onClose, onStatusChange, onDelete }) => {
  if (!inquiry) return null;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: '1.25rem',
            borderBottom: '1px solid var(--color-cream-border)',
            marginBottom: '1.5rem',
          }}
        >
          <div>
            <span className="section-subtitle" style={{ marginBottom: '0.25rem' }}>
              Inquiry Details
            </span>
            <h3 style={{ fontSize: '1.5rem', color: 'var(--color-dark-brown)' }}>
              {inquiry.customerName}
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{
              fontSize: '1.5rem',
              color: 'var(--color-text-muted)',
              cursor: 'pointer',
              padding: '4px',
            }}
            aria-label="Close Modal"
          >
            <FiX />
          </button>
        </div>

        {/* Status & ID Badge */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem',
            padding: '0.85rem 1rem',
            backgroundColor: 'var(--color-cream)',
            borderRadius: 'var(--radius-md)',
          }}
        >
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-light)' }}>
              Inquiry ID:
            </span>{' '}
            <code style={{ fontSize: '0.85rem', fontWeight: 600 }}>#{inquiry._id}</code>
          </div>
          <span
            className={`badge badge-${inquiry.status ? inquiry.status.toLowerCase() : 'pending'}`}
          >
            ● {inquiry.status}
          </span>
        </div>

        {/* Details Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
          <div className="summary-row">
            <span className="summary-label">
              <FiPhone />
              <span>Contact Phone</span>
            </span>
            <span className="summary-value">
              <a
                href={`tel:${inquiry.phoneNumber}`}
                style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}
              >
                {inquiry.phoneNumber}
              </a>
            </span>
          </div>

          <div className="summary-row">
            <span className="summary-label">
              <FiCalendar />
              <span>Requested Booking Date</span>
            </span>
            <span className="summary-value">{formatDate(inquiry.bookingDate)}</span>
          </div>

          <div className="summary-row">
            <span className="summary-label">
              <FiUsers />
              <span>Number of Guests</span>
            </span>
            <span className="summary-value">{inquiry.numberOfGuests} Guests</span>
          </div>

          <div className="summary-row">
            <span className="summary-label">
              <FiClock />
              <span>Submission Time</span>
            </span>
            <span className="summary-value">{formatDate(inquiry.createdAt)}</span>
          </div>

          <div style={{ paddingTop: '0.75rem' }}>
            <span
              style={{
                fontSize: '0.875rem',
                fontWeight: 600,
                color: 'var(--color-dark-brown)',
                display: 'block',
                marginBottom: '0.4rem',
              }}
            >
              Special Requests & Dietary Accommodations:
            </span>
            <div
              style={{
                padding: '1rem',
                backgroundColor: '#faf7f2',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.9rem',
                lineHeight: '1.6',
                color: inquiry.specialRequests ? 'var(--color-text-main)' : 'var(--color-text-light)',
                fontStyle: inquiry.specialRequests ? 'normal' : 'italic',
                border: '1px solid #f1ece4',
              }}
            >
              {inquiry.specialRequests || 'No special requests submitted.'}
            </div>
          </div>
        </div>

        {/* Status Actions */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label
            style={{
              fontSize: '0.85rem',
              fontWeight: 600,
              color: 'var(--color-dark-brown)',
              display: 'block',
              marginBottom: '0.5rem',
            }}
          >
            Update Inquiry Status:
          </label>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => onStatusChange(inquiry._id, 'Confirmed')}
              className="btn btn-sm"
              style={{
                backgroundColor: inquiry.status === 'Confirmed' ? '#15803d' : '#dcfce7',
                color: inquiry.status === 'Confirmed' ? '#ffffff' : '#15803d',
                border: '1px solid #15803d',
              }}
            >
              <FiCheckCircle />
              <span>Mark Confirmed</span>
            </button>

            <button
              onClick={() => onStatusChange(inquiry._id, 'Pending')}
              className="btn btn-sm"
              style={{
                backgroundColor: inquiry.status === 'Pending' ? '#d97706' : '#fef3c7',
                color: inquiry.status === 'Pending' ? '#ffffff' : '#d97706',
                border: '1px solid #d97706',
              }}
            >
              <span>Set to Pending</span>
            </button>

            <button
              onClick={() => onStatusChange(inquiry._id, 'Cancelled')}
              className="btn btn-sm"
              style={{
                backgroundColor: inquiry.status === 'Cancelled' ? '#dc2626' : '#fee2e2',
                color: inquiry.status === 'Cancelled' ? '#ffffff' : '#dc2626',
                border: '1px solid #dc2626',
              }}
            >
              <FiXCircle />
              <span>Mark Cancelled</span>
            </button>
          </div>
        </div>

        {/* Footer Actions */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '1.25rem',
            borderTop: '1px solid var(--color-cream-border)',
          }}
        >
          <button
            onClick={() => onDelete(inquiry._id)}
            style={{
              color: '#dc2626',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Delete Inquiry Record
          </button>

          <button onClick={onClose} className="btn btn-outline btn-sm">
            <span>Close Details</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default InquiryDetailModal;
