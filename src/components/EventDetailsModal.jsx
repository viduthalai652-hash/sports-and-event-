import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Calendar, MapPin, Clock, Trophy, ShieldCheck, Mail, Phone, FileText, CheckCircle2, ChevronRight, Share2, HelpCircle } from 'lucide-react';

const EventDetailsModal = ({ event }) => {
  const { closeModal, openRegistrationModal, showToast } = useApp();
  const [activeTab, setActiveTab] = useState('overview');

  if (!event) return null;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Event link copied to clipboard!', 'success');
    } else {
      showToast('Share link: ' + window.location.href, 'info');
    }
  };

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div 
        className="modal-content" 
        onClick={e => e.stopPropagation()} 
        style={{ 
          background: '#FFFFFF',
          maxWidth: '1080px',
          width: '95vw',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '24px',
          overflow: 'hidden',
          boxShadow: '0 30px 70px rgba(0,0,0,0.3), 0 0 40px rgba(118, 163, 118, 0.4)'
        }}
      >
        
        {/* Banner Section */}
        <div style={{ position: 'relative', height: '340px', flexShrink: 0 }}>
          <img
            src={event.banner}
            alt={event.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(15,76,44,0.3) 0%, #0F4C2C 100%)'
          }} />

          {/* Close & Share buttons */}
          <div style={{ position: 'absolute', top: '20px', right: '20px', display: 'flex', gap: '12px', zIndex: 10 }}>
            <button
              onClick={handleShare}
              style={{
                background: '#FFFFFF',
                border: '1.5px solid #D4AF37',
                color: '#0F4C2C',
                borderRadius: '50%',
                width: '44px',
                height: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }}
              title="Share Event"
            >
              <Share2 size={20} />
            </button>
            <button
              onClick={closeModal}
              style={{
                background: '#FFFFFF',
                border: '1.5px solid #D4AF37',
                color: '#0F4C2C',
                borderRadius: '50%',
                width: '44px',
                height: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }}
            >
              <X size={22} />
            </button>
          </div>

          {/* Overlay Details */}
          <div style={{ position: 'absolute', bottom: '24px', left: '32px', right: '32px' }}>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '10px' }}>
              <span className="badge-gold" style={{ background: '#FFFFFF', color: '#0F4C2C', fontSize: '0.85rem', padding: '6px 16px' }}>
                <Trophy size={16} />
                {event.sport}
              </span>
              <span className={`badge-status status-${event.status.toLowerCase()}`} style={{ fontSize: '0.85rem', padding: '6px 16px' }}>
                {event.status}
              </span>
            </div>

            <h2 style={{
              fontFamily: 'Cinzel, serif',
              fontSize: '2.1rem',
              color: '#FFFFFF',
              lineHeight: 1.2,
              fontWeight: 800,
              textShadow: '0 2px 10px rgba(0,0,0,0.5)'
            }}>
              {event.title}
            </h2>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid rgba(212,175,55,0.4)',
          background: '#F4F7F4',
          overflowX: 'auto',
          flexShrink: 0
        }}>
          {[
            { id: 'overview', label: 'Overview & Schedule' },
            { id: 'rules', label: 'Eligibility & Rules' },
            { id: 'prizes', label: 'Prizes & Awards' },
            { id: 'venue', label: 'Venue & Map' },
            { id: 'organizer', label: 'Organizer & FAQ' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: 'none',
                border: 'none',
                padding: '16px 26px',
                color: activeTab === tab.id ? '#0F4C2C' : '#6B7C72',
                fontFamily: 'Poppins, sans-serif',
                fontWeight: activeTab === tab.id ? 700 : 500,
                fontSize: '0.98rem',
                borderBottom: activeTab === tab.id ? '3.5px solid #D4AF37' : '3.5px solid transparent',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Body (Scrollable Area) */}
        <div style={{ padding: '32px', overflowY: 'auto', flexGrow: 1, background: '#FFFFFF' }}>
          
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <p style={{ color: '#0F291B', lineHeight: 1.8, fontSize: '1.05rem', fontFamily: 'Poppins, sans-serif' }}>
                {event.description}
              </p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '20px',
                background: '#F4F7F4',
                padding: '24px',
                borderRadius: '16px',
                border: '1.5px solid rgba(212,175,55,0.4)',
                boxShadow: '0 4px 15px rgba(0,0,0,0.03)'
              }}>
                <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#EAF2EA', border: '1px solid #76A376', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Calendar size={24} style={{ color: '#0F4C2C' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.78rem', color: '#6B7C72', fontWeight: 600 }}>EVENT DATE</div>
                    <div style={{ fontWeight: 800, color: '#0F4C2C', fontSize: '1.1rem' }}>{event.date}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#EAF2EA', border: '1px solid #76A376', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Clock size={24} style={{ color: '#0F4C2C' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.78rem', color: '#6B7C72', fontWeight: 600 }}>REPORTING TIME</div>
                    <div style={{ fontWeight: 800, color: '#0F4C2C', fontSize: '1.1rem' }}>{event.time}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#FEF2F2', border: '1px solid #EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <FileText size={24} style={{ color: '#DC2626' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.78rem', color: '#6B7C72', fontWeight: 600 }}>REGISTRATION CLOSES</div>
                    <div style={{ fontWeight: 800, color: '#DC2626', fontSize: '1.1rem' }}>{event.regCloseDate}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* RULES TAB */}
          {activeTab === 'rules' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ background: '#FFFDF5', padding: '20px 24px', borderRadius: '14px', borderLeft: '5px solid #D4AF37', border: '1.5px solid rgba(212,175,55,0.4)' }}>
                <h4 style={{ color: '#0F4C2C', marginBottom: '8px', fontFamily: 'Cinzel, serif', fontSize: '1.2rem' }}>Eligibility Criteria</h4>
                <p style={{ color: '#0F291B', fontSize: '1.0rem', lineHeight: 1.6 }}>{event.eligibility}</p>
              </div>

              <div>
                <h4 style={{ color: '#0F4C2C', marginBottom: '16px', fontFamily: 'Cinzel, serif', fontSize: '1.2rem' }}>Official Rules & Regulations</h4>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {event.rules && event.rules.map((rule, i) => (
                    <li key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', color: '#0F291B', fontSize: '0.98rem', background: '#F4F7F4', padding: '14px 18px', borderRadius: '10px' }}>
                      <CheckCircle2 size={20} style={{ color: '#146B3A', flexShrink: 0, marginTop: '2px' }} />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* PRIZES TAB */}
          {activeTab === 'prizes' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <h4 style={{ color: '#0F4C2C', fontFamily: 'Cinzel, serif', fontSize: '1.2rem' }}>Tournament Prizes & Awards</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                {event.prizes && event.prizes.map((prize, idx) => (
                  <div key={idx} style={{ background: '#FFFDF5', border: '1.5px solid #D4AF37', borderRadius: '14px', padding: '20px', display: 'flex', gap: '14px', alignItems: 'center' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#D4AF37', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                      #{idx + 1}
                    </div>
                    <div style={{ fontWeight: 700, color: '#0F4C2C', fontSize: '1.05rem' }}>{prize}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VENUE TAB */}
          {activeTab === 'venue' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', gap: '14px', alignItems: 'center', background: '#F4F7F4', padding: '20px', borderRadius: '14px', border: '1px solid #76A376' }}>
                <MapPin size={28} style={{ color: '#0F4C2C', flexShrink: 0 }} />
                <div>
                  <h4 style={{ color: '#0F4C2C', fontFamily: 'Cinzel, serif', margin: 0, fontSize: '1.15rem' }}>{event.venue}</h4>
                  <p style={{ color: '#6B7C72', margin: '4px 0 0', fontSize: '0.92rem' }}>{event.city}, {event.state}, India</p>
                </div>
              </div>

              {/* Map Placeholder Frame */}
              <div style={{ height: '220px', borderRadius: '14px', overflow: 'hidden', border: '1.5px solid rgba(118, 163, 118, 0.4)', background: '#EAF2EA', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '10px' }}>
                <MapPin size={40} style={{ color: '#76A376' }} />
                <span style={{ fontWeight: 700, color: '#0F4C2C', fontSize: '1.05rem' }}>Interactive Google Map Directions</span>
                <span style={{ color: '#6B7C72', fontSize: '0.88rem' }}>Venue GPS Coordinates: {event.city} Sports Arena</span>
              </div>
            </div>
          )}

          {/* ORGANIZER TAB */}
          {activeTab === 'organizer' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ background: '#F4F7F4', padding: '24px', borderRadius: '16px', border: '1.5px solid #76A376' }}>
                <h4 style={{ color: '#0F4C2C', fontFamily: 'Cinzel, serif', marginBottom: '12px', fontSize: '1.2rem' }}>Official Event Organizer</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', color: '#0F291B', fontSize: '0.98rem' }}>
                  <div><strong>Organization:</strong> {event.organizer}</div>
                  <div><strong>Phone Contact:</strong> {event.organizerContact}</div>
                  <div><strong>Email Inquiries:</strong> {event.organizerEmail}</div>
                </div>
              </div>

              <div>
                <h4 style={{ color: '#0F4C2C', fontFamily: 'Cinzel, serif', marginBottom: '12px', fontSize: '1.2rem' }}>Frequently Asked Questions</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ background: '#FFFDF5', padding: '16px 20px', borderRadius: '12px', border: '1px solid rgba(212,175,55,0.4)' }}>
                    <strong style={{ color: '#0F4C2C', fontSize: '1.0rem' }}>Q: Is spot registration available on event day?</strong>
                    <p style={{ color: '#4A6053', fontSize: '0.92rem', marginTop: '6px', margin: 0 }}>A: No. Registrations must be completed online via SRV prior to the deadline.</p>
                  </div>
                  <div style={{ background: '#FFFDF5', padding: '16px 20px', borderRadius: '12px', border: '1px solid rgba(212,175,55,0.4)' }}>
                    <strong style={{ color: '#0F4C2C', fontSize: '1.0rem' }}>Q: Will I receive an official registration receipt?</strong>
                    <p style={{ color: '#4A6053', fontSize: '0.92rem', marginTop: '6px', margin: 0 }}>A: Yes, an instant downloadable PDF/digital receipt with a unique QR code is generated upon registration.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Action Footer (Fixed at Bottom) */}
        <div style={{
          padding: '20px 32px',
          background: '#F4F7F4',
          borderTop: '2px solid rgba(212,175,55,0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0
        }}>
          <div>
            <span style={{ fontSize: '0.82rem', color: '#6B7C72', fontWeight: 600, letterSpacing: '0.5px' }}>OFFICIAL ENTRY FEE</span>
            <div style={{ color: '#0F4C2C', fontFamily: 'Cinzel, serif', fontSize: '1.7rem', fontWeight: 900 }}>
              {event.fee === 0 ? 'FREE ENTRY' : `₹${event.fee.toLocaleString()}`}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
            <button onClick={closeModal} className="btn btn-outline-gold" style={{ padding: '12px 24px', fontSize: '0.95rem' }}>
              Close
            </button>
            <button
              onClick={() => {
                closeModal();
                openRegistrationModal(event.id);
              }}
              className="btn btn-fern"
              style={{
                padding: '14px 34px',
                fontSize: '1.05rem',
                fontWeight: 800,
                borderRadius: '999px',
                boxShadow: '0 6px 20px rgba(118, 163, 118, 0.45)'
              }}
            >
              Register Now
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default EventDetailsModal;
