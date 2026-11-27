import React, { useState } from 'react';
import {
  FiUser,
  FiPhone,
  FiCalendar,
  FiUsers,
  FiMessageSquare,
  FiAlertCircle,
  FiCheckCircle,
  FiSearch,
} from 'react-icons/fi';
import { validateInquiryForm } from '../../utils/validation';
import { inquiryService } from '../../services/inquiryService';
import { useToast } from '../../context/ToastContext';
import '../../styles/inquiry.css';

const TableInquiryForm = ({ onSuccess, onOpenStatusCheck }) => {
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    customerName: '',
    phoneNumber: '',
    bookingDate: '',
    numberOfGuests: 2,
    specialRequests: '',
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState('');

  // Calculate minimum datetime allowed (now + 30 mins) in ISO format for datetime-local input
  const getMinDateTime = () => {
    const d = new Date(Date.now() + 30 * 60 * 1000);
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().slice(0, 16);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear specific error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (apiError) setApiError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');

    // Client-side validation
    const { errors: validationErrors, isValid } = validateInquiryForm(formData);
    if (!isValid) {
      setErrors(validationErrors);
      showToast('Please correct the highlighted form errors.', 'error');
      return;
    }

    setSubmitting(true);

    try {
      // Submit inquiry via REST API
      const result = await inquiryService.submitInquiry({
        customerName: formData.customerName,
        phoneNumber: formData.phoneNumber,
        bookingDate: new Date(formData.bookingDate).toISOString(),
        numberOfGuests: Number(formData.numberOfGuests),
        specialRequests: formData.specialRequests,
      });

      showToast('Table booking inquiry submitted successfully!', 'success');
      if (onSuccess) {
        onSuccess(result.data);
      }
    } catch (err) {
      console.error('[TableInquiryForm] Submission error:', err);
      let errorMsg = 'Failed to submit inquiry. Please check your network or try again.';

      if (err.response && err.response.data) {
        if (err.response.data.errors && err.response.data.errors.length > 0) {
          errorMsg = err.response.data.errors.map((e) => e.message).join(' | ');
        } else if (err.response.data.message) {
          errorMsg = err.response.data.message;
        }
      }

      setApiError(errorMsg);
      showToast(errorMsg, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="inquiry-card">
      <div className="inquiry-notice-banner">
        <FiAlertCircle className="inquiry-notice-banner-icon" />
        <div>
          <strong>Table Inquiry Notice:</strong> This submission is a table booking inquiry, not an
          instant guaranteed table reservation. Our hospitality manager will contact you via phone
          shortly to confirm seating availability and arrangements.
        </div>
      </div>

      {apiError && (
        <div
          style={{
            backgroundColor: '#fee2e2',
            color: '#dc2626',
            padding: '1rem',
            borderRadius: 'var(--radius-md)',
            marginBottom: '1.5rem',
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <FiAlertCircle />
          <span>{apiError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* Row 1: Name & Phone */}
        <div className="form-row">
          <div className="form-group">
            <label className="form-label" htmlFor="customerName">
              Full Name <span className="required">*</span>
            </label>
            <div className="input-with-icon">
              <FiUser className="input-icon" />
              <input
                id="customerName"
                name="customerName"
                type="text"
                className={`form-control ${errors.customerName ? 'error' : ''}`}
                placeholder="e.g. Eleanor Vance"
                value={formData.customerName}
                onChange={handleChange}
                disabled={submitting}
                required
              />
            </div>
            {errors.customerName && <p className="form-error">{errors.customerName}</p>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="phoneNumber">
              Phone Number <span className="required">*</span>
            </label>
            <div className="input-with-icon">
              <FiPhone className="input-icon" />
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                className={`form-control ${errors.phoneNumber ? 'error' : ''}`}
                placeholder="e.g. +44 131 496 2345 or 07911 123456"
                value={formData.phoneNumber}
                onChange={handleChange}
                disabled={submitting}
                required
              />
            </div>
            {errors.phoneNumber && <p className="form-error">{errors.phoneNumber}</p>}
          </div>
        </div>

        {/* Row 2: Date/Time & Guests */}
        <div className="form-row">
          <div className="form-group">
            <label className="form-label" htmlFor="bookingDate">
              Preferred Date & Time <span className="required">*</span>
            </label>
            <div className="input-with-icon">
              <FiCalendar className="input-icon" />
              <input
                id="bookingDate"
                name="bookingDate"
                type="datetime-local"
                min={getMinDateTime()}
                className={`form-control ${errors.bookingDate ? 'error' : ''}`}
                value={formData.bookingDate}
                onChange={handleChange}
                disabled={submitting}
                required
              />
            </div>
            {errors.bookingDate && <p className="form-error">{errors.bookingDate}</p>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="numberOfGuests">
              Number of Guests <span className="required">*</span>
            </label>
            <div className="input-with-icon">
              <FiUsers className="input-icon" />
              <input
                id="numberOfGuests"
                name="numberOfGuests"
                type="number"
                min="1"
                max="50"
                className={`form-control ${errors.numberOfGuests ? 'error' : ''}`}
                placeholder="Number of guests"
                value={formData.numberOfGuests}
                onChange={handleChange}
                disabled={submitting}
                required
              />
            </div>
            {errors.numberOfGuests && <p className="form-error">{errors.numberOfGuests}</p>}
          </div>
        </div>

        {/* Row 3: Special Requests */}
        <div className="form-group">
          <label className="form-label" htmlFor="specialRequests">
            Special Requests & Dietary Preferences <small style={{ color: 'var(--color-text-light)' }}>(Optional)</small>
          </label>
          <div className="input-with-icon" style={{ alignItems: 'flex-start' }}>
            <FiMessageSquare className="input-icon" style={{ top: '22px' }} />
            <textarea
              id="specialRequests"
              name="specialRequests"
              rows={4}
              className={`form-control ${errors.specialRequests ? 'error' : ''}`}
              placeholder="Allergies, anniversary celebrations, window seating requests, or custom tasting requirements..."
              value={formData.specialRequests}
              onChange={handleChange}
              disabled={submitting}
              maxLength={500}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.25rem' }}>
            {errors.specialRequests ? (
              <p className="form-error">{errors.specialRequests}</p>
            ) : <span />}
            <small style={{ color: 'var(--color-text-light)', fontSize: '0.8rem' }}>
              {formData.specialRequests.length}/500
            </small>
          </div>
        </div>

        {/* Submit Button */}
        <div style={{ marginTop: '1.5rem' }}>
          <button
            type="submit"
            className="btn btn-primary btn-lg"
            style={{ width: '100%', gap: '0.75rem' }}
            disabled={submitting}
          >
            {submitting ? (
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
                <span>Submitting Table Inquiry...</span>
              </>
            ) : (
              <>
                <FiCheckCircle size={20} />
                <span>Submit Table Booking Inquiry</span>
              </>
            )}
          </button>
        </div>

        {/* Check Existing Table Inquiry Status Button */}
        {onOpenStatusCheck && (
          <div className="inquiry-secondary-action">
            <span className="inquiry-secondary-hint">
              Already submitted a table inquiry? Check your confirmation status anytime.
            </span>
            <button
              type="button"
              onClick={onOpenStatusCheck}
              className="btn btn-outline btn-lg"
              style={{ width: '100%', gap: '0.65rem' }}
              disabled={submitting}
            >
              <FiSearch size={19} />
              <span>Check Table Inquiry Status</span>
            </button>
          </div>
        )}
      </form>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default TableInquiryForm;
