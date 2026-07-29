import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const Toast = () => {
  const { toast } = useApp();

  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isError = toast.type === 'error';

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        zIndex: 2000,
        background: isSuccess
          ? 'linear-gradient(135deg, #0F4C2C 0%, #0A341E 100%)'
          : isError
          ? 'linear-gradient(135deg, #7F1D1D 0%, #450A0A 100%)'
          : 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
        border: isSuccess ? '1px solid #F7D358' : isError ? '1px solid #F87171' : '1px solid #60A5FA',
        color: '#FFFFFF',
        padding: '14px 20px',
        borderRadius: '12px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        maxWidth: '400px',
        animation: 'slideUp 0.3s cubic-bezier(0.165, 0.84, 0.44, 1)'
      }}
    >
      {isSuccess && <CheckCircle2 size={22} style={{ color: '#F7D358', flexShrink: 0 }} />}
      {isError && <AlertCircle size={22} style={{ color: '#F87171', flexShrink: 0 }} />}
      {!isSuccess && !isError && <Info size={22} style={{ color: '#60A5FA', flexShrink: 0 }} />}

      <span style={{ fontSize: '0.9rem', fontFamily: 'Poppins, sans-serif', fontWeight: 500, lineHeight: 1.4 }}>
        {toast.message}
      </span>
    </div>
  );
};

export default Toast;
