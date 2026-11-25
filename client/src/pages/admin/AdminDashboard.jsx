import React, { useState, useEffect, useCallback } from 'react';
import {
  FiUsers,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiSearch,
  FiCalendar,
  FiRefreshCw,
  FiEye,
  FiTrash2,
  FiChevronLeft,
  FiChevronRight,
  FiAlertCircle,
} from 'react-icons/fi';
import { inquiryService } from '../../services/inquiryService';
import { useToast } from '../../context/ToastContext';
import { formatDate } from '../../utils/formatDate';
import InquiryDetailModal from '../../components/admin/InquiryDetailModal';
import '../../styles/admin.css';

const AdminDashboard = () => {
  const { showToast } = useToast();

  const [inquiries, setInquiries] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    confirmed: 0,
    cancelled: 0,
  });

  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    totalItems: 0,
    totalPages: 1,
    currentPage: 1,
    limit: 8,
  });

  const [selectedInquiry, setSelectedInquiry] = useState(null);

  // Fetch inquiries from backend
  const fetchInquiries = useCallback(async () => {
    setLoading(true);
    try {
      const params = {
        page: currentPage,
        limit: 8,
      };

      if (statusFilter !== 'All') {
        params.status = statusFilter;
      }
      if (searchTerm.trim() !== '') {
        params.search = searchTerm.trim();
      }
      if (dateFilter) {
        params.date = dateFilter;
      }

      const response = await inquiryService.getInquiries(params);

      if (response.success) {
        setInquiries(response.data || []);
        if (response.pagination) {
          setPagination(response.pagination);
        }
        if (response.stats) {
          setStats(response.stats);
        }
      }
    } catch (err) {
      console.error('[AdminDashboard] Fetch error:', err);
      showToast('Error loading table inquiries. Please retry.', 'error');
    } finally {
      setLoading(false);
    }
  }, [currentPage, statusFilter, searchTerm, dateFilter, showToast]);

  useEffect(() => {
    fetchInquiries();
  }, [fetchInquiries]);

  // Handle status update
  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const response = await inquiryService.updateStatus(id, newStatus);
      if (response.success) {
        showToast(`Inquiry status updated to ${newStatus}.`, 'success');
        // Update in-memory
        setInquiries((prev) =>
          prev.map((item) => (item._id === id ? { ...item, status: newStatus } : item))
        );
        if (selectedInquiry && selectedInquiry._id === id) {
          setSelectedInquiry((prev) => ({ ...prev, status: newStatus }));
        }
        // Refresh counts
        fetchInquiries();
      }
    } catch (err) {
      showToast('Failed to update status.', 'error');
    }
  };

  // Handle inquiry deletion
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this table inquiry record? This cannot be undone.')) {
      try {
        await inquiryService.deleteInquiry(id);
        showToast('Inquiry record deleted successfully.', 'info');
        if (selectedInquiry && selectedInquiry._id === id) {
          setSelectedInquiry(null);
        }
        fetchInquiries();
      } catch (err) {
        showToast('Failed to delete inquiry.', 'error');
      }
    }
  };

  const handleResetFilters = () => {
    setStatusFilter('All');
    setSearchTerm('');
    setDateFilter('');
    setCurrentPage(1);
  };

  return (
    <div className="container">
      {/* 1. DASHBOARD HEADER & REFRESH */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div>
          <span className="section-subtitle" style={{ marginBottom: '0.25rem' }}>
            Management Overview
          </span>
          <h1 style={{ fontSize: '2.25rem', color: 'var(--color-dark-brown)' }}>
            Table Inquiries Dashboard
          </h1>
        </div>

        <button
          onClick={fetchInquiries}
          className="btn btn-outline"
          style={{ backgroundColor: 'var(--color-white)', padding: '0.65rem 1.25rem' }}
          title="Refresh Data"
        >
          <FiRefreshCw className={loading ? 'spin-icon' : ''} />
          <span>Refresh Data</span>
        </button>
      </div>

      {/* 2. STATS CARDS GRID */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="stat-card-info">
            <h4>Total Inquiries</h4>
            <div className="stat-card-value">{stats.total}</div>
          </div>
          <div className="stat-card-icon stat-icon-total">
            <FiUsers />
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="stat-card-info">
            <h4>Pending Review</h4>
            <div className="stat-card-value" style={{ color: 'var(--color-status-pending)' }}>
              {stats.pending}
            </div>
          </div>
          <div className="stat-card-icon stat-icon-pending">
            <FiClock />
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="stat-card-info">
            <h4>Confirmed Tables</h4>
            <div className="stat-card-value" style={{ color: 'var(--color-status-confirmed)' }}>
              {stats.confirmed}
            </div>
          </div>
          <div className="stat-card-icon stat-icon-confirmed">
            <FiCheckCircle />
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="stat-card-info">
            <h4>Cancelled</h4>
            <div className="stat-card-value" style={{ color: 'var(--color-status-cancelled)' }}>
              {stats.cancelled}
            </div>
          </div>
          <div className="stat-card-icon stat-icon-cancelled">
            <FiXCircle />
          </div>
        </div>
      </div>

      {/* 3. FILTERS & SEARCH CONTROLS */}
      <div className="table-controls">
        {/* Status Tabs */}
        <div className="filter-tabs">
          {['All', 'Pending', 'Confirmed', 'Cancelled'].map((status) => (
            <button
              key={status}
              onClick={() => {
                setStatusFilter(status);
                setCurrentPage(1);
              }}
              className={`filter-tab-btn ${statusFilter === status ? 'active' : ''}`}
            >
              {status} {status === 'All' ? `(${stats.total})` : `(${stats[status.toLowerCase()] || 0})`}
            </button>
          ))}
        </div>

        {/* Search & Date Filter Group */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Customer Search */}
          <div style={{ position: 'relative', width: '220px' }}>
            <FiSearch
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--color-text-light)',
              }}
            />
            <input
              type="text"
              placeholder="Search name or phone..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="form-control"
              style={{ paddingLeft: '2.2rem', paddingRight: '0.75rem', paddingBlock: '0.5rem', fontSize: '0.85rem' }}
            />
          </div>

          {/* Date Picker */}
          <div style={{ position: 'relative' }}>
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => {
                setDateFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="form-control"
              style={{ paddingBlock: '0.5rem', fontSize: '0.85rem' }}
              title="Filter by Booking Date"
            />
          </div>

          {(statusFilter !== 'All' || searchTerm !== '' || dateFilter !== '') && (
            <button
              onClick={handleResetFilters}
              style={{
                fontSize: '0.825rem',
                color: 'var(--color-primary)',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* 4. INQUIRIES DATA TABLE */}
      <div className="table-responsive">
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--color-text-muted)' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                border: '3px solid var(--color-cream-border)',
                borderTopColor: 'var(--color-primary)',
                borderRadius: '50%',
                margin: '0 auto 1rem',
                animation: 'spin 0.8s linear infinite',
              }}
            />
            <p>Loading table inquiries...</p>
          </div>
        ) : inquiries.length > 0 ? (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Phone Number</th>
                <th>Requested Date & Time</th>
                <th>Guests</th>
                <th>Special Requests</th>
                <th>Status</th>
                <th>Received</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.map((inquiry) => (
                <tr key={inquiry._id}>
                  <td>
                    <strong style={{ color: 'var(--color-dark-brown)', display: 'block' }}>
                      {inquiry.customerName}
                    </strong>
                    <small style={{ color: 'var(--color-text-light)', fontFamily: 'monospace' }}>
                      #{inquiry._id.slice(-6).toUpperCase()}
                    </small>
                  </td>
                  <td>
                    <a
                      href={`tel:${inquiry.phoneNumber}`}
                      style={{ color: 'var(--color-primary)', fontWeight: 500 }}
                    >
                      {inquiry.phoneNumber}
                    </a>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{formatDate(inquiry.bookingDate)}</div>
                  </td>
                  <td>
                    <span
                      style={{
                        padding: '0.2rem 0.6rem',
                        backgroundColor: '#f4ede3',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                      }}
                    >
                      {inquiry.numberOfGuests} Guests
                    </span>
                  </td>
                  <td style={{ maxWidth: '200px' }}>
                    <div
                      style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        color: inquiry.specialRequests ? 'var(--color-text-main)' : 'var(--color-text-light)',
                        fontSize: '0.85rem',
                      }}
                      title={inquiry.specialRequests || 'No special requests'}
                    >
                      {inquiry.specialRequests || '—'}
                    </div>
                  </td>
                  <td>
                    <select
                      value={inquiry.status}
                      onChange={(e) => handleStatusUpdate(inquiry._id, e.target.value)}
                      className={`badge badge-${inquiry.status.toLowerCase()}`}
                      style={{
                        border: 'none',
                        cursor: 'pointer',
                        padding: '0.35rem 0.65rem',
                        outline: 'none',
                      }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td style={{ fontSize: '0.8rem', color: 'var(--color-text-light)', whiteSpace: 'nowrap' }}>
                    {formatDate(inquiry.createdAt, { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
                  </td>
                  <td>
                    <div className="action-buttons" style={{ justifyContent: 'flex-end' }}>
                      <button
                        onClick={() => setSelectedInquiry(inquiry)}
                        className="btn-icon"
                        title="View Full Inquiry Details"
                      >
                        <FiEye />
                      </button>
                      <button
                        onClick={() => handleDelete(inquiry._id)}
                        className="btn-icon delete"
                        title="Delete Inquiry"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          /* Empty State */
          <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <FiAlertCircle style={{ fontSize: '2.5rem', color: 'var(--color-text-light)', marginBottom: '0.75rem' }} />
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.35rem' }}>No Table Inquiries Found</h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
              No inquiries match the current filter or search criteria.
            </p>
          </div>
        )}
      </div>

      {/* 5. PAGINATION CONTROLS */}
      {pagination.totalPages > 1 && (
        <div className="pagination-bar">
          <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
            Showing page <strong>{pagination.currentPage}</strong> of{' '}
            <strong>{pagination.totalPages}</strong> ({pagination.totalItems} total inquiries)
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={pagination.currentPage <= 1}
              className="btn btn-outline btn-sm"
              style={{ backgroundColor: 'var(--color-white)' }}
            >
              <FiChevronLeft />
              <span>Previous</span>
            </button>

            <button
              onClick={() => setCurrentPage((p) => Math.min(pagination.totalPages, p + 1))}
              disabled={pagination.currentPage >= pagination.totalPages}
              className="btn btn-outline btn-sm"
              style={{ backgroundColor: 'var(--color-white)' }}
            >
              <span>Next</span>
              <FiChevronRight />
            </button>
          </div>
        </div>
      )}

      {/* 6. DETAIL MODAL */}
      {selectedInquiry && (
        <InquiryDetailModal
          inquiry={selectedInquiry}
          onClose={() => setSelectedInquiry(null)}
          onStatusChange={handleStatusUpdate}
          onDelete={handleDelete}
        />
      )}

      <style>{`
        .spin-icon {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
