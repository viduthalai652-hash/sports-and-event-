import React from 'react';
import { X, ChevronLeft, ChevronRight, Trophy, MapPin, Calendar, Award } from 'lucide-react';

const NotificationGalleryLightbox = ({ item, onNext, onPrev, onClose }) => {
  if (!item) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 99999,
      background: 'rgba(10, 28, 18, 0.92)',
      backdropFilter: 'blur(12px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }} onClick={onClose}>
      
      <div style={{
        position: 'relative',
        maxWidth: '1000px',
        width: '100%',
        background: '#FFFFFF',
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: '0 30px 60px rgba(0,0,0,0.4)',
        border: '1.5px solid #D4AF37',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))'
      }} onClick={e => e.stopPropagation()}>
        
        {/* Image Preview */}
        <div style={{ position: 'relative', minHeight: '340px', background: '#0F4C2C', overflow: 'hidden' }}>
          <img
            src={item.image}
            alt={item.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />

          {onPrev && (
            <button
              onClick={onPrev}
              style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255, 255, 255, 0.9)',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#0F4C2C'
              }}
            >
              <ChevronLeft size={22} />
            </button>
          )}

          {onNext && (
            <button
              onClick={onNext}
              style={{
                position: 'absolute',
                right: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255, 255, 255, 0.9)',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#0F4C2C'
              }}
            >
              <ChevronRight size={22} />
            </button>
          )}
        </div>

        {/* Caption Panel */}
        <div style={{ padding: '32px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <span className="badge-gold">
                <Trophy size={14} />
                {item.sport} HIGHLIGHT
              </span>
              <button
                onClick={onClose}
                style={{
                  background: '#F4F7F4',
                  border: 'none',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#1C331C'
                }}
              >
                <X size={18} />
              </button>
            </div>

            <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.5rem', color: '#0F4C2C', fontWeight: 900, marginBottom: '10px' }}>
              {item.title}
            </h3>

            <div style={{ fontSize: '0.88rem', color: '#4A6053', marginBottom: '16px' }}>
              <strong>Location:</strong> {item.location || 'Pan-India Stadium Arena'}
            </div>

            <p style={{ color: '#3D5A3D', fontSize: '0.92rem', lineHeight: 1.6, fontFamily: 'Poppins, sans-serif' }}>
              {item.caption || 'Captured live during official SRV championship prize ceremonies and athlete celebrations.'}
            </p>
          </div>

          <div style={{ paddingTop: '16px', borderTop: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#6B7C72' }}>
            <span>SRV Official Media Gallery</span>
            <span>HD Photo Archives</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default NotificationGalleryLightbox;
