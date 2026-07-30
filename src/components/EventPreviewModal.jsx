import React, { useState } from 'react';
import { 
  X, MapPin, Calendar, Clock, Trophy, ShieldCheck, Ticket, Users, 
  ChevronRight, Award, CheckCircle2, Star, Sparkles, ExternalLink, ArrowRight, Share2, Heart
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1517649763962-0c623266010b?auto=format&fit=crop&w=1200&q=80';

const EventPreviewModal = ({ event, onClose, onOpenShare }) => {
  const { openEventDetails, openRegistrationModal, showToast } = useApp();
  const [selectedGalleryIdx, setSelectedGalleryIdx] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  if (!event) return null;

  const seatsLeft = Math.max(0, event.maxSeats - event.registeredCount);
  const percentFilled = Math.min(100, Math.round((event.registeredCount / event.maxSeats) * 100));

  const galleryImages = [event.banner || FALLBACK_IMAGE, ...(event.gallery || [])];

  const handleFavoriteToggle = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    showToast(isFavorite ? `Removed ${event.title} from Saved Events` : `Added ${event.title} to Saved Events!`, isFavorite ? 'info' : 'success');
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      background: 'rgba(15, 41, 27, 0.8)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      overflowY: 'auto'
    }} onClick={onClose}>
      
      <div style={{
        background: '#FFFFFF',
        borderRadius: '24px',
        maxWidth: '940px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
        border: '1.5px solid #D4AF37',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column'
      }} onClick={e => e.stopPropagation()}>
        
        {/* Sticky Header Action Bar */}
        <div style={{
          position: 'sticky',
          top: 0,
          zIndex: 30,
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(118, 163, 118, 0.2)',
          padding: '16px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span className="badge-gold">
              <Trophy size={14} />
              {event.sport}
            </span>
            <span className={`badge-status status-${event.status.toLowerCase()}`}>
              {event.status}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={handleFavoriteToggle}
              title="Save Event"
              style={{
                background: isFavorite ? '#FEE2E2' : '#F4F7F4',
                border: isFavorite ? '1px solid #FCA5A5' : '1px solid #D1D5DB',
                borderRadius: '50%',
                width: '38px',
                height: '38px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: isFavorite ? '#DC2626' : '#4B5563',
                transition: 'all 0.2s ease'
              }}
            >
              <Heart size={18} fill={isFavorite ? '#DC2626' : 'none'} />
            </button>

            <button
              onClick={() => onOpenShare(event)}
              title="Share Event"
              style={{
                background: '#F4F7F4',
                border: '1px solid #D1D5DB',
                borderRadius: '50%',
                width: '38px',
                height: '38px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#0F4C2C'
              }}
            >
              <Share2 size={18} />
            </button>

            <button
              onClick={onClose}
              style={{
                background: '#F4F7F4',
                border: 'none',
                borderRadius: '50%',
                width: '38px',
                height: '38px',
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
        </div>

        {/* Hero Gallery Banner Section */}
        <div style={{ position: 'relative', height: '320px', background: '#0F4C2C', overflow: 'hidden' }}>
          <img
            src={galleryImages[selectedGalleryIdx] || FALLBACK_IMAGE}
            alt={event.title}
            onError={e => { e.target.onerror = null; e.target.src = FALLBACK_IMAGE; }}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />

          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(15,76,44,0.85) 100%)'
          }} />

          {/* Title & Venue Overlay */}
          <div style={{ position: 'absolute', bottom: '20px', left: '24px', right: '24px', color: '#FFFFFF' }}>
            <h2 style={{
              fontFamily: 'Cinzel, serif',
              fontSize: 'clamp(1.5rem, 3vw, 2.1rem)',
              fontWeight: 800,
              color: '#FFFFFF',
              marginBottom: '8px',
              textShadow: '0 2px 10px rgba(0,0,0,0.6)'
            }}>
              {event.title}
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.9rem', color: '#EAF2EA', flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MapPin size={16} style={{ color: '#F7D358' }} />
                {event.venue}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Calendar size={16} style={{ color: '#F7D358' }} />
                {event.date} at {event.time}
              </span>
            </div>
          </div>

          {/* Gallery Thumbnails Overlay */}
          {galleryImages.length > 1 && (
            <div style={{
              position: 'absolute',
              top: '20px',
              left: '24px',
              display: 'flex',
              gap: '8px'
            }}>
              {galleryImages.map((imgUrl, i) => (
                <img
                  key={i}
                  src={imgUrl}
                  alt={`Thumb ${i}`}
                  onClick={() => setSelectedGalleryIdx(i)}
                  style={{
                    width: '48px',
                    height: '36px',
                    borderRadius: '8px',
                    objectFit: 'cover',
                    cursor: 'pointer',
                    border: selectedGalleryIdx === i ? '2.5px solid #F7D358' : '2px solid rgba(255,255,255,0.6)',
                    opacity: selectedGalleryIdx === i ? 1 : 0.75,
                    transition: 'all 0.2s ease'
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Modal Body Container */}
        <div style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '28px' }}>
          
          {/* Key Metrics Row */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            background: '#F8FAF8',
            padding: '20px',
            borderRadius: '16px',
            border: '1px solid rgba(118, 163, 118, 0.3)'
          }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#5E7A5E', fontWeight: 700, textTransform: 'uppercase' }}>Entry Registration Fee</span>
              <div style={{ fontFamily: 'Cinzel, serif', fontSize: '1.4rem', fontWeight: 900, color: '#0F4C2C', marginTop: '2px' }}>
                {event.fee === 0 ? 'FREE ENTRY' : `₹${event.fee.toLocaleString()}`}
              </div>
            </div>

            <div>
              <span style={{ fontSize: '0.75rem', color: '#5E7A5E', fontWeight: 700, textTransform: 'uppercase' }}>Total Championship Prize Pool</span>
              <div style={{ fontFamily: 'Cinzel, serif', fontSize: '1.4rem', fontWeight: 900, color: '#B88E14', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Trophy size={18} style={{ color: '#D4AF37' }} />
                {event.prizes && event.prizes[0] ? event.prizes[0].split(':')[1] || '₹1,50,000' : '₹1,00,000+'}
              </div>
            </div>

            <div>
              <span style={{ fontSize: '0.75rem', color: '#5E7A5E', fontWeight: 700, textTransform: 'uppercase' }}>Organizer Rating</span>
              <div style={{ fontSize: '1rem', fontWeight: 800, color: '#0F4C2C', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShieldCheck size={18} style={{ color: '#22C55E' }} />
                <span>{event.organizer}</span>
                <span style={{ color: '#D4AF37', fontSize: '0.85rem' }}>★★★★★ (4.9)</span>
              </div>
            </div>
          </div>

          {/* Live Registration Widget */}
          <div style={{
            background: '#FFFDF5',
            border: '1.5px solid #D4AF37',
            borderRadius: '16px',
            padding: '20px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0F4C2C', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Users size={18} style={{ color: '#B88E14' }} />
                LIVE REGISTRATION CAPACITY
              </span>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: seatsLeft < 20 ? '#DC2626' : '#0F4C2C' }}>
                {event.registeredCount} / {event.maxSeats} Registered ({percentFilled}%) • {seatsLeft} Seats Left!
              </span>
            </div>

            <div style={{ height: '10px', background: '#E5E7EB', borderRadius: '999px', overflow: 'hidden', marginBottom: '10px' }}>
              <div style={{
                height: '100%',
                width: `${percentFilled}%`,
                background: seatsLeft < 20 ? 'linear-gradient(90deg, #EF4444, #DC2626)' : 'linear-gradient(90deg, #0F4C2C, #D4AF37)',
                borderRadius: '999px'
              }} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#6B7C72' }}>
              <span>Registration Deadline: <strong>{event.regCloseDate || '2026-08-10'}</strong></span>
              <span style={{ color: '#16A34A', fontWeight: 700 }}>⚡ Last registration: 2 mins ago</span>
            </div>
          </div>

          {/* Event Stage Timeline */}
          <div>
            <h4 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.1rem', color: '#0F4C2C', fontWeight: 800, marginBottom: '14px' }}>
              Tournament Timeline Pipeline
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px' }}>
              {[
                { stage: 'Reg. Opens', date: '01 Jul 2026', done: true },
                { stage: 'Reg. Closes', date: event.regCloseDate || '10 Aug 2026', done: false },
                { stage: 'Fixtures Out', date: '12 Aug 2026', done: false },
                { stage: 'Kickoff', date: event.date, done: false },
                { stage: 'Finals', date: '17 Aug 2026', done: false }
              ].map((item, idx) => (
                <div key={idx} style={{
                  background: item.done ? '#EAF5EB' : '#F8FAF8',
                  border: item.done ? '1.5px solid #76A376' : '1px solid #E5E7EB',
                  borderRadius: '12px',
                  padding: '10px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, color: item.done ? '#0F4C2C' : '#6B7C72' }}>{item.stage}</div>
                  <div style={{ fontSize: '0.7rem', color: '#4A6053', marginTop: '2px' }}>{item.date}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Description & Rules */}
          <div>
            <h4 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.1rem', color: '#0F4C2C', fontWeight: 800, marginBottom: '8px' }}>
              About Tournament
            </h4>
            <p style={{ color: '#3D5A3D', fontSize: '0.95rem', lineHeight: 1.6, fontFamily: 'Poppins, sans-serif' }}>
              {event.description}
            </p>
          </div>

          {/* Rules & Regulations */}
          {event.rules && (
            <div>
              <h4 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.1rem', color: '#0F4C2C', fontWeight: 800, marginBottom: '10px' }}>
                Key Rules & Guidelines
              </h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', listStyle: 'none' }}>
                {event.rules.map((rule, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.9rem', color: '#3D5A3D' }}>
                    <CheckCircle2 size={16} style={{ color: '#76A376', marginTop: '2px', flexShrink: 0 }} />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Map Location Mock Preview */}
          <div style={{ background: '#F4F7F4', border: '1px solid rgba(118,163,118,0.3)', borderRadius: '16px', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontWeight: 800, color: '#0F4C2C', fontSize: '0.92rem' }}>Venue Location</div>
              <div style={{ fontSize: '0.85rem', color: '#5E7A5E', marginTop: '2px' }}>{event.venue}</div>
            </div>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(event.venue)}`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-fern"
              style={{ padding: '8px 16px', fontSize: '0.8rem', borderRadius: '999px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              Open Map
              <ExternalLink size={14} />
            </a>
          </div>

        </div>

        {/* Footer Action Buttons */}
        <div style={{
          position: 'sticky',
          bottom: 0,
          background: '#FFFFFF',
          borderTop: '1px solid rgba(118, 163, 118, 0.2)',
          padding: '16px 28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          borderRadius: '0 0 24px 24px'
        }}>
          <button
            onClick={() => {
              onClose();
              openEventDetails(event.id);
            }}
            style={{
              background: 'none',
              border: '2px solid #0F4C2C',
              color: '#0F4C2C',
              padding: '12px 24px',
              borderRadius: '999px',
              fontSize: '0.9rem',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            View Full Event Page
            <ArrowRight size={16} />
          </button>

          <button
            onClick={() => {
              onClose();
              openRegistrationModal(event);
            }}
            disabled={seatsLeft === 0 || event.status === 'Completed'}
            className="btn btn-gold"
            style={{
              padding: '14px 32px',
              fontSize: '0.95rem',
              fontWeight: 800,
              borderRadius: '999px',
              boxShadow: '0 6px 20px rgba(212, 175, 55, 0.35)',
              opacity: (seatsLeft === 0 || event.status === 'Completed') ? 0.5 : 1
            }}
          >
            <Ticket size={18} />
            {event.status === 'Completed' ? 'Registration Closed' : seatsLeft === 0 ? 'Seats Full' : 'Register Now'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default EventPreviewModal;
