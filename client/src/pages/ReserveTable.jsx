import React, { useState } from 'react';
import TableInquiryForm from '../components/inquiry/TableInquiryForm';
import ConfirmationSummary from '../components/inquiry/ConfirmationSummary';
import CheckInquiryStatus from '../components/inquiry/CheckInquiryStatus';
import { FiClock, FiPhone, FiCheck } from 'react-icons/fi';
import '../styles/inquiry.css';

const ReserveTable = () => {
  const [activeView, setActiveView] = useState('form'); // 'form' | 'confirmation' | 'status-check'
  const [submittedInquiry, setSubmittedInquiry] = useState(null);
  const [statusPrefill, setStatusPrefill] = useState(null);

  const handleSuccess = (inquiryData) => {
    setSubmittedInquiry(inquiryData);
    setActiveView('confirmation');
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleReset = () => {
    setSubmittedInquiry(null);
    setStatusPrefill(null);
    setActiveView('form');
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleOpenStatusCheck = () => {
    setStatusPrefill(null);
    setActiveView('status-check');
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleCheckSubmittedStatus = (inquiry) => {
    setStatusPrefill({
      referenceId: inquiry?._id ? `#${inquiry._id.slice(-8).toUpperCase()}` : '',
      phoneNumber: inquiry?.phoneNumber || '',
    });
    setActiveView('status-check');
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  return (
    <div className="reserve-page">
      {/* 1. HERO HEADER */}
      <section className="page-hero" aria-label="Reservation Header">
        <div className="container">
          <span className="section-subtitle" style={{ color: '#fed7aa' }}>
            Book Your Dining Experience
          </span>
          <h1 className="page-hero-title">Table Booking Inquiry</h1>
          <p className="page-hero-subtitle">
            Submit your table preferences below or check the status of an existing inquiry. Our
            dining host team will reach out promptly to confirm availability.
          </p>
        </div>
      </section>

      {/* 2. MAIN FORM, CONFIRMATION, OR STATUS CHECK */}
      <section className="section" style={{ paddingTop: '3.5rem' }}>
        <div className="container">
          <div className="inquiry-wrapper">
            {activeView === 'confirmation' && submittedInquiry ? (
              <ConfirmationSummary
                inquiry={submittedInquiry}
                onReset={handleReset}
                onCheckStatus={handleCheckSubmittedStatus}
              />
            ) : activeView === 'status-check' ? (
              <CheckInquiryStatus
                initialValues={statusPrefill}
                onBackToForm={handleReset}
              />
            ) : (
              <>
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                  <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                    Dining Reservation Details
                  </h2>
                  <p style={{ color: 'var(--color-text-muted)' }}>
                    Fill out the required information below to request a dining table.
                  </p>
                </div>

                <TableInquiryForm
                  onSuccess={handleSuccess}
                  onOpenStatusCheck={handleOpenStatusCheck}
                />

                {/* Additional Guidance */}
                <div className="guidance-grid">
                  <div className="guidance-card">
                    <div className="guidance-icon">
                      <FiClock />
                    </div>
                    <h4>Prompt Response</h4>
                    <p>Inquiries reviewed within 1-2 hours during operating times.</p>
                  </div>

                  <div className="guidance-card">
                    <div className="guidance-icon">
                      <FiPhone />
                    </div>
                    <h4>Direct Line</h4>
                    <p>Prefer immediate assistance? Call +44 (0) 131 496 2345.</p>
                  </div>

                  <div className="guidance-card">
                    <div className="guidance-icon">
                      <FiCheck />
                    </div>
                    <h4>Special Occasions</h4>
                    <p>Personalized floral, cake, or wine setups accommodated.</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ReserveTable;
