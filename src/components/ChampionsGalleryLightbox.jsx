import React from 'react';
import { X, ChevronLeft, ChevronRight, Trophy, MapPin, Calendar, Award } from 'lucide-react';

const ChampionsGalleryLightbox = ({ item, onNext, onPrev, onClose }) => {
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
        maxWidth: '1080px',
        width: '100%',
        background: '#FFFFFF',
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: '0 30px 60px rgba(0,0,0,0.4)',
        border: '1.5px solid #D4AF37',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))'
      }} onClick={e => e.stopPropagation()}>
        
        {/* Lightbox Main Image */}
        <div style={{ position: 'relative', minHeight: '360px', background: '#0F4C2C', overflow: 'hidden' }}>
          <img
            src={item.image}
            alt={item.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />

          {/* Navigation Arrows */}
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
                width: '42px',
                height: '42px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#0F4C2C',
                boxShadow: '0 4px 15px rgba(0,0,0,0.25)'
              }}
            >
              <ChevronLeft size={24} />
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
                width: '42px',
                height: '42px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#0F4C2C',
                boxShadow: '0 4px 15px rgba(0,0,0,0.25)'
              }}
            >
              <ChevronRight size={24} />
            </button>
          )}
        </div>

        {/* Lightbox Details Panel */}
        <div style={{ padding: '36px 30px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span className="badge-gold">
                <Trophy size={14} />
                {item.sport} CHAMPIONS
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
                <X size={20} />
              </button>
            </div>

            <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.6rem', color: '#0F4C2C', fontWeight: 900, marginBottom: '12px' }}>
              {item.title}
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.92rem', color: '#4A6053', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={16} style={{ color: '#0F4C2C' }} />
                <span>{item.location}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Calendar size={16} style={{ color: '#0F4C2C' }} />
                <span>{item.date}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Award size={16} style={{ color: '#B88E14' }} />
                <span>Winner: <strong style={{ color: '#0F4C2C' }}>{item.winner}</strong></span>
              </div>
            </div>

            <div style={{
              background: '#FFFDF5',
              border: '1.5px solid #D4AF37',
              borderRadius: '16px',
              padding: '16px',
              marginBottom: '20px'
            }}>
              <div style={{ fontSize: '0.78rem', color: '#5E7A5E', fontWeight: 800, textTransform: 'uppercase' }}>
                Tournament Prize Awarded
              </div>
              <div style={{ fontFamily: 'Cinzel, serif', fontSize: '1.5rem', fontWeight: 900, color: '#B88E14', marginTop: '2px' }}>
                {item.prize}
              </div>
            </div>

            <p style={{ color: '#3D5A3D', fontSize: '0.92rem', lineHeight: 1.6, fontFamily: 'Poppins, sans-serif' }}>
              {item.desc || 'Celebrating extraordinary athletic achievements and victorious moments from state and national championships hosted on SRV platform.'}
            </p>
          </div>

          <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: '#6B7C72' }}>
            <span>Verified SRV Tournament Certificate</span>
            <span>ID: #SRV-CHAMP-2026</span>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ChampionsGalleryLightbox;
