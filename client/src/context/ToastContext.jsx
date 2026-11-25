import React, { createContext, useContext, useState, useCallback } from 'react';
import { FiCheckCircle, FiAlertCircle, FiInfo, FiX } from 'react-icons/fi';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback((message, type = 'success', duration = 4000) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ showToast, removeToast }}>
      {children}
      <div style={styles.toastContainer} aria-live="polite">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            style={{
              ...styles.toast,
              ...styles[toast.type] || styles.success,
            }}
          >
            <div style={styles.icon}>
              {toast.type === 'success' && <FiCheckCircle size={20} />}
              {toast.type === 'error' && <FiAlertCircle size={20} />}
              {(toast.type === 'info' || toast.type === 'warning') && <FiInfo size={20} />}
            </div>
            <div style={styles.message}>{toast.message}</div>
            <button
              onClick={() => removeToast(toast.id)}
              style={styles.closeBtn}
              aria-label="Close notification"
            >
              <FiX size={16} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

const styles = {
  toastContainer: {
    position: 'fixed',
    top: '88px',
    right: '24px',
    zIndex: 9999,
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    maxWidth: '420px',
    width: 'calc(100% - 48px)',
    pointerEvents: 'none',
  },
  toast: {
    pointerEvents: 'auto',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '14px 18px',
    borderRadius: '12px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
    color: '#ffffff',
    fontSize: '0.95rem',
    fontWeight: '500',
    animation: 'slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
  },
  success: {
    backgroundColor: '#15803d',
  },
  error: {
    backgroundColor: '#dc2626',
  },
  info: {
    backgroundColor: '#0284c7',
  },
  warning: {
    backgroundColor: '#d97706',
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
  },
  message: {
    flexGrow: 1,
    lineHeight: '1.4',
  },
  closeBtn: {
    background: 'transparent',
    border: 'none',
    color: '#ffffff',
    cursor: 'pointer',
    opacity: 0.8,
    display: 'flex',
    alignItems: 'center',
    padding: '2px',
  },
};
