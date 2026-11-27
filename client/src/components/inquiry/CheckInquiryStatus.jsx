import React, { useState, useEffect } from 'react';
import {
  FiSearch,
  FiHash,
  FiPhone,
  FiUser,
  FiCalendar,
  FiUsers,
  FiFileText,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiAlertCircle,
  FiArrowLeft,
  FiRefreshCw,
} from 'react-icons/fi';
import { inquiryService } from '../../services/inquiryService';
import { useToast } from '../../context/ToastContext';
import { formatDate } from '../../utils/formatDate';
import '../../styles/inquiry.css';

const CheckInquiryStatus = ({ initialValues = null, onBackToForm }) => {
  const { showToast } = useToast();

  const [referenceId, setReferenceId] = useState(initialValues?.referenceId || '');
  const [phoneNumber, setPhoneNumber] = useState(initialValues?.phoneNumber || '');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (initialValues?.referenceId || initialValues?.phoneNumber) {
      setReferenceId(initialValues.referenceId || '');
      setPhoneNumber(initialValues.phoneNumber || '');
    }
  }, [initialValues]);

  const performCheck = async (refVal, phoneVal) => {
    const trimmedRef = refVal.trim();
    const trimmedPhone = phoneVal.trim();

    if (!trimmedRef) {
      setErrorMsg('Please enter your Inquiry Reference ID (e.g. #98E994AB).');
      return;
    }

    if (!trimmedPhone || trimmedPhone.replace(/\D/g, '').length < 7) {
      setErrorMsg('Please enter the valid mobile/phone number used when submitting your inquiry.');
      return;
    }

    setErrorMsg('');
    setLoading(true);

    try {
      const response = await inquiryService.checkStatus(trimmedRef, trimmedPhone);
      if (response.success && response.data) {
        setResult(response.data);
        showToast(`Current inquiry status: ${response.data.status}`, 'info');
      }
    } catch (err) {
      const msg =
        (err.response && err.response.data && err.response.data.message) ||
        'Could not find a matching inquiry. Please verify your Reference ID and Phone Number.';
      setResult(null);
      setErrorMsg(msg);
      showToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await performCheck(referenceId, phoneNumber);
  };

  const handleResetSearch = () => {
    setResult(null);
    setErrorMsg('');
    setReferenceId('');
    setPhoneNumber('');
  };

  const getStatusBannerInfo = (status) => {
    switch (status) {
      case 'Confirmed':
        return {
          className: 'status-banner-confirmed',
          icon: <FiCheckCircle size={26} />,
          title: 'Table Confirmed!',
          message:
            'Great news! Our hospitality team has verified availability and confirmed your table reservation.',
        };
      case 'Cancelled':
        return {
          className: 'status-banner-cancelled',
          icon: <FiXCircle size={26} />,
          title: 'Inquiry Cancelled',
          message:
            'This booking inquiry has been cancelled. Please call +44 (0) 131 496 2345 or submit a new inquiry if you would like another time.',
        };
      default:
        return {
          className: 'status-banner-pending',
          icon: <FiClock size={26} />,
          title: 'Pending Host Review',
          message:
            'Your table inquiry is currently under review. Our dining host team will update your status and contact you shortly.',
        };
    }
  };

  return (
    <div className="inquiry-card">
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          flexWrap: 'wrap',
          marginBottom: '1.5rem',
          paddingBottom: '1.25rem',
          borderBottom: '1px solid var(--color-cream-border)',
        }}
      >
        <div>
          <span className="section-subtitle" style={{ marginBottom: '0.25rem' }}>
            Live Booking Tracker
          </span>
          <h3 style={{ fontSize: '1.6rem', color: 'var(--color-dark-brown)' }}>
            Check Table Inquiry Status
          </h3>
        </div>

        <button
          type="button"
          onClick={onBackToForm}
          className="btn btn-outline btn-sm"
        >
          <FiArrowLeft />
          <span>Back to Reservation Form</span>
        </button>
      </div>

      {/* Lookup Form */}
      <form onSubmit={handleSubmit} noValidate>
        {errorMsg && (
          <div
            style={{
              backgroundColor: '#fee2e2',
              color: '#dc2626',
              padding: '0.9rem 1rem',
              borderRadius: 'var(--radius-md)',
              marginBottom: '1.25rem',
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <FiAlertCircle style={{ flexShrink: 0 }} />
            <span>{errorMsg}</span>
          </div>
        )}

        <div className="form-row">
          <div className="form-group">
            <label className="form-label" htmlFor="lookupReferenceId">
              Inquiry Reference ID <span className="required">*</span>
            </label>
            <div className="input-with-icon">
              <FiHash className="input-icon" />
              <input
                id="lookupReferenceId"
                type="text"
                className="form-control"
                placeholder="e.g. #98E994AB"
                value={referenceId}
                onChange={(e) => {
                  setReferenceId(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                disabled={loading}
                required
              />
            </div>
            <small style={{ color: 'var(--color-text-light)', fontSize: '0.8rem' }}>
              Enter the Reference ID shown on your booking confirmation screen.
            </small>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="lookupPhoneNumber">
              Entered Mobile / Phone Number <span className="required">*</span>
            </label>
            <div className="input-with-icon">
              <FiPhone className="input-icon" />
              <input
                id="lookupPhoneNumber"
                type="tel"
                className="form-control"
                placeholder="e.g. +44 131 496 0821"
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                disabled={loading}
                required
              />
            </div>
            <small style={{ color: 'var(--color-text-light)', fontSize: '0.8rem' }}>
              Must match the mobile number submitted with your inquiry.
            </small>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-lg"
          style={{ width: '100%', gap: '0.65rem' }}
          disabled={loading}
        >
          {loading ? (
            <>
              <span
                style={{
                  width: '18px',
                  height: '18px',
                  border: '2px solid #ffffff',
                  borderTopColor: 'transparent',
                  borderRadius: '50%',
                  display: 'inline-block',
                  animation: 'spin 0.8s linear infinite',
                }}
              />
              <span>Checking Status...</span>
            </>
          ) : (
            <>
              <FiSearch size={19} />
              <span>Check Inquiry Status</span>
            </>
          )}
        </button>
      </form>

      {/* Result Display */}
      {result && (
        <div className="status-result-wrapper" role="region" aria-label="Inquiry Status Result">
          {(() => {
            const banner = getStatusBannerInfo(result.status);
            return (
              <div className={`status-banner ${banner.className}`}>
                <div className="status-banner-icon">{banner.icon}</div>
                <div>
                  <h4 style={{ fontSize: '1.15rem', marginBottom: '0.2rem', color: 'inherit' }}>
                    {banner.title}
                  </h4>
                  <p style={{ fontSize: '0.9rem', color: 'inherit', opacity: 0.92, lineHeight: 1.5 }}>
                    {banner.message}
                  </p>
                </div>
              </div>
            );
          })()}

          <div className="confirmation-card" style={{ margin: '1.5rem 0' }}>
            <div className="summary-row">
              <span className="summary-label">
                <FiHash />
                <span>Reference ID</span>
              </span>
              <span className="summary-value" style={{ fontFamily: 'monospace', color: 'var(--color-primary)' }}>
                {result.referenceCode || `#${result._id.slice(-8).toUpperCase()}`}
              </span>
            </div>

            <div className="summary-row">
              <span className="summary-label">
                <FiUser />
                <span>Guest Name</span>
              </span>
              <span className="summary-value">{result.customerName}</span>
            </div>

            <div className="summary-row">
              <span className="summary-label">
                <FiPhone />
                <span>Mobile Number</span>
              </span>
              <span className="summary-value">{result.phoneNumber}</span>
            </div>

            <div className="summary-row">
              <span className="summary-label">
                <FiCalendar />
                <span>Requested Date & Time</span>
              </span>
              <span className="summary-value">{formatDate(result.bookingDate)}</span>
            </div>

            <div className="summary-row">
              <span className="summary-label">
                <FiUsers />
                <span>Party Size</span>
              </span>
              <span className="summary-value">{result.numberOfGuests} Guests</span>
            </div>

            <div className="summary-row">
              <span className="summary-label">
                <FiClock />
                <span>Current Status</span>
              </span>
              <span className="summary-value">
                <span className={`badge badge-${result.status.toLowerCase()}`}>
                  ● {result.status}
                </span>
              </span>
            </div>

            <div className="summary-row">
              <span className="summary-label">
                <FiFileText />
                <span>Special Requests</span>
              </span>
              <span className="summary-value" style={{ fontStyle: result.specialRequests ? 'normal' : 'italic' }}>
                {result.specialRequests || 'No special requests provided'}
              </span>
            </div>

            <div className="summary-row">
              <span className="summary-label">
                <FiClock />
                <span>Last Updated</span>
              </span>
              <span className="summary-value" style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                {formatDate(result.updatedAt || result.createdAt)}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              type="button"
              onClick={() => performCheck(referenceId, phoneNumber)}
              className="btn btn-outline btn-sm"
              disabled={loading}
            >
              <FiRefreshCw />
              <span>Refresh Live Status</span>
            </button>

            <button
              type="button"
              onClick={handleResetSearch}
              className="btn btn-outline btn-sm"
            >
              <FiSearch />
              <span>Check Another Inquiry</span>
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default CheckInquiryStatus;
