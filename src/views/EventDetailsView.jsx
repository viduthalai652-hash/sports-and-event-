import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ArrowLeft, Calendar, MapPin, Clock, Trophy, ShieldCheck, Mail, Phone, 
  FileText, CheckCircle2, ChevronRight, Share2, HelpCircle, Users, Award, Ticket 
} from 'lucide-react';

const EventDetailsView = () => {
  const { events, selectedEventId, navigateTo, openRegistrationModal, showToast } = useApp();
  const [activeTab, setActiveTab] = useState('overview');

  // Find the target event object or fallback to first event
  const event = events.find(e => e.id === selectedEventId) || events[0];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedEventId]);

  if (!event) {
    return (
      <div style={{ padding: '80px 24px', textAlign: 'center', color: '#1C331C' }}>
        <h2>Event Not Found</h2>
        <button onClick={() => navigateTo('events')} className="btn btn-fern" style={{ marginTop: '16px' }}>
          Back to All Events
        </button>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Event link copied to clipboard!', 'success');
    } else {
      showToast('Share link: ' + window.location.href, 'info');
    }
  };

  const seatsPercent = Math.min(100, Math.round((event.registeredCount / event.maxSeats) * 100));

  return (
    <div style={{ background: '#F8FAF8', minHeight: '100vh', paddingBottom: '80px' }}>
      
      {/* Top Breadcrumb & Navigation Bar */}
      <div style={{ background: '#F8FAF8', borderBottom: '1px solid rgba(118, 163, 118, 0.2)', padding: '16px 24px' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <button
            onClick={() => navigateTo('events')}
            style={{
              background: '#FFFFFF',
              border: '1.5px solid #76A376',
              color: '#1C331C',
              padding: '8px 18px',
              borderRadius: '999px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: 700,
              fontSize: '0.9rem',
              transition: 'all 0.3s ease'
            }}
          >
            <ArrowLeft size={18} />
            <span>Back to All Events</span>
          </button>

          <div style={{ fontSize: '0.85rem', color: '#5E7A5E', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ cursor: 'pointer' }} onClick={() => navigateTo('home')}>Home</span>
            <span>/</span>
            <span style={{ cursor: 'pointer' }} onClick={() => navigateTo('events')}>Events</span>
            <span>/</span>
            <span style={{ color: '#1C331C', fontWeight: 600 }}>{event.title}</span>
          </div>
        </div>
      </div>

      {/* Full-Bleed Hero Section */}
      <div className="event-hero-responsive" style={{ position: 'relative', height: '400px', background: '#1C331C', overflow: 'hidden' }}>
        <img
          src={event.banner}
          alt={event.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(15,76,44,0.4) 0%, rgba(28,51,28,0.92) 100%)'
        }} />

        <div style={{
          position: 'absolute',
          bottom: '36px',
          left: '0',
          right: '0',
          maxWidth: '1240px',
          margin: '0 auto',
          padding: '0 24px',
          color: '#FFFFFF'
        }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap' }}>
            <span className="badge-gold" style={{ background: '#FFFFFF', color: '#1C331C', fontSize: '0.85rem', padding: '6px 16px' }}>
              <Trophy size={16} />
              {event.sport}
            </span>
            <span className={`badge-status status-${event.status.toLowerCase()}`} style={{ fontSize: '0.85rem', padding: '6px 16px' }}>
              {event.status}
            </span>
            <span style={{ background: 'rgba(255,255,255,0.2)', color: '#FFF', fontSize: '0.85rem', padding: '6px 16px', borderRadius: '999px', backdropFilter: 'blur(4px)' }}>
              <MapPin size={14} style={{ display: 'inline', marginRight: '4px' }} />
              {event.city}, {event.state}
            </span>
          </div>

          <h1 style={{
            fontFamily: 'Cinzel, serif',
            fontSize: 'clamp(2.0rem, 5vw, 2.8rem)',
            color: '#FFFFFF',
            lineHeight: 1.2,
            fontWeight: 800,
            marginBottom: '12px',
            textShadow: '0 4px 15px rgba(0,0,0,0.6)'
          }}>
            {event.title}
          </h1>

          <div style={{ display: 'flex', gap: '24px', color: '#EAF2EA', fontSize: '0.95rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Calendar size={18} style={{ color: '#F7D358' }} />
              <span>Event Date: <strong>{event.date}</strong></span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={18} style={{ color: '#F7D358' }} />
              <span>Time: <strong>{event.time}</strong></span>
            </div>
            <button
              onClick={handleShare}
              style={{
                background: 'rgba(255,255,255,0.15)',
                border: '1px solid rgba(255,255,255,0.4)',
                color: '#FFF',
                padding: '4px 16px',
                borderRadius: '999px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.85rem',
                marginLeft: 'auto'
              }}
            >
              <Share2 size={16} />
              <span>Share Event</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Full Page Content Container */}
      <div style={{ maxWidth: '1240px', margin: '40px auto 0', padding: '0 24px' }}>
        <div className="event-grid-responsive" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 340px', gap: '32px', alignItems: 'start' }}>
          
          {/* Left Column (Main Tabs & Information) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Tab Navigation Header */}
            <div style={{
              display: 'flex',
              background: '#FFFFFF',
              borderRadius: '16px',
              padding: '6px',
              border: '1.5px solid rgba(118, 163, 118, 0.4)',
              boxShadow: '0 4px 16px rgba(28, 51, 28, 0.05)',
              overflowX: 'auto'
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
                    flex: 1,
                    background: activeTab === tab.id ? '#1C331C' : 'transparent',
                    color: activeTab === tab.id ? '#FFFFFF' : '#3D5A3D',
                    border: 'none',
                    padding: '14px 20px',
                    borderRadius: '12px',
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: activeTab === tab.id ? 700 : 500,
                    fontSize: '0.92rem',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content Box */}
            <div className="glass-card event-tab-card-responsive" style={{ padding: '36px', background: '#FFFFFF' }}>
              
              {/* OVERVIEW TAB */}
              {activeTab === 'overview' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                  <div>
                    <h3 style={{ fontFamily: 'Cinzel, serif', color: '#1C331C', marginBottom: '12px', fontSize: '1.4rem' }}>
                      About The Championship
                    </h3>
                    <p style={{ color: '#3D5A3D', lineHeight: 1.8, fontSize: '1.05rem' }}>
                      {event.description}
                    </p>
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: '20px',
                    background: '#F4F7F4',
                    padding: '24px',
                    borderRadius: '16px',
                    border: '1.5px solid rgba(118, 163, 118, 0.4)'
                  }}>
                    <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                      <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#EAF2EA', border: '1px solid #76A376', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Calendar size={24} style={{ color: '#1C331C' }} />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.78rem', color: '#5E7A5E', fontWeight: 600 }}>MATCH DATE</div>
                        <div style={{ fontWeight: 800, color: '#1C331C', fontSize: '1.1rem' }}>{event.date}</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                      <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#EAF2EA', border: '1px solid #76A376', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Clock size={24} style={{ color: '#1C331C' }} />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.78rem', color: '#5E7A5E', fontWeight: 600 }}>REPORTING TIME</div>
                        <div style={{ fontWeight: 800, color: '#1C331C', fontSize: '1.1rem' }}>{event.time}</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                      <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#FEF2F2', border: '1px solid #EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <FileText size={24} style={{ color: '#DC2626' }} />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.78rem', color: '#5E7A5E', fontWeight: 600 }}>REGISTRATION CLOSES</div>
                        <div style={{ fontWeight: 800, color: '#DC2626', fontSize: '1.1rem' }}>{event.regCloseDate}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* RULES TAB */}
              {activeTab === 'rules' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                  <div style={{ background: '#FFFDF2', padding: '24px', borderRadius: '16px', borderLeft: '6px solid #D4AF37', border: '1.5px solid rgba(212,175,55,0.4)' }}>
                    <h4 style={{ color: '#1C331C', marginBottom: '10px', fontFamily: 'Cinzel, serif', fontSize: '1.25rem' }}>Eligibility Criteria</h4>
                    <p style={{ color: '#3D5A3D', fontSize: '1.02rem', lineHeight: 1.6 }}>{event.eligibility}</p>
                  </div>

                  <div>
                    <h4 style={{ color: '#1C331C', marginBottom: '18px', fontFamily: 'Cinzel, serif', fontSize: '1.25rem' }}>Official Rules & Regulations</h4>
                    <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      {event.rules && event.rules.map((rule, i) => (
                        <li key={i} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', color: '#1C331C', fontSize: '1.0rem', background: '#F4F7F4', padding: '16px 20px', borderRadius: '12px' }}>
                          <CheckCircle2 size={22} style={{ color: '#76A376', flexShrink: 0, marginTop: '2px' }} />
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
                  <h4 style={{ color: '#1C331C', fontFamily: 'Cinzel, serif', fontSize: '1.3rem' }}>Championship Prize Pool & Rewards</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
                    {event.prizes && event.prizes.map((prize, idx) => (
                      <div key={idx} style={{ background: '#FFFDF2', border: '1.5px solid #D4AF37', borderRadius: '16px', padding: '24px', display: 'flex', gap: '16px', alignItems: 'center', boxShadow: '0 6px 18px rgba(212,175,55,0.12)' }}>
                        <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, #B88E14 0%, #D4AF37 100%)', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.1rem', boxShadow: '0 4px 10px rgba(0,0,0,0.15)' }}>
                          #{idx + 1}
                        </div>
                        <div style={{ fontWeight: 800, color: '#1C331C', fontSize: '1.1rem', fontFamily: 'Cinzel, serif' }}>{prize}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* VENUE TAB */}
              {activeTab === 'venue' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center', background: '#F4F7F4', padding: '24px', borderRadius: '16px', border: '1.5px solid #76A376' }}>
                    <MapPin size={32} style={{ color: '#1C331C', flexShrink: 0 }} />
                    <div>
                      <h4 style={{ color: '#1C331C', fontFamily: 'Cinzel, serif', margin: 0, fontSize: '1.2rem' }}>{event.venue}</h4>
                      <p style={{ color: '#5E7A5E', margin: '4px 0 0', fontSize: '0.95rem' }}>{event.city}, {event.state}, India</p>
                    </div>
                  </div>

                  <div style={{ height: '300px', borderRadius: '16px', overflow: 'hidden', border: '1.5px solid rgba(118, 163, 118, 0.4)', background: '#EAF2EA', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '12px' }}>
                    <MapPin size={48} style={{ color: '#76A376' }} />
                    <span style={{ fontWeight: 800, color: '#1C331C', fontSize: '1.15rem' }}>Interactive Google Maps Directions</span>
                    <span style={{ color: '#5E7A5E', fontSize: '0.92rem' }}>Venue GPS Coordinates: {event.city} Stadium Arena</span>
                  </div>
                </div>
              )}

              {/* ORGANIZER TAB */}
              {activeTab === 'organizer' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                  <div style={{ background: '#F4F7F4', padding: '28px', borderRadius: '16px', border: '1.5px solid #76A376' }}>
                    <h4 style={{ color: '#1C331C', fontFamily: 'Cinzel, serif', marginBottom: '14px', fontSize: '1.25rem' }}>Official Event Organizer Details</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', color: '#1C331C', fontSize: '1.02rem' }}>
                      <div><strong>Organization Body:</strong> {event.organizer}</div>
                      <div><strong>Helpline Contact:</strong> {event.organizerContact}</div>
                      <div><strong>Support Email:</strong> {event.organizerEmail}</div>
                    </div>
                  </div>

                  <div>
                    <h4 style={{ color: '#1C331C', fontFamily: 'Cinzel, serif', marginBottom: '14px', fontSize: '1.25rem' }}>Frequently Asked Questions</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      <div style={{ background: '#FFFDF2', padding: '20px', borderRadius: '12px', border: '1px solid rgba(212,175,55,0.4)' }}>
                        <strong style={{ color: '#1C331C', fontSize: '1.02rem' }}>Q: Is spot registration available on event day?</strong>
                        <p style={{ color: '#3D5A3D', fontSize: '0.95rem', marginTop: '6px', margin: 0 }}>A: No. Registrations must be completed online via SRV prior to the deadline.</p>
                      </div>
                      <div style={{ background: '#FFFDF2', padding: '20px', borderRadius: '12px', border: '1px solid rgba(212,175,55,0.4)' }}>
                        <strong style={{ color: '#1C331C', fontSize: '1.02rem' }}>Q: Will I receive an official registration receipt?</strong>
                        <p style={{ color: '#3D5A3D', fontSize: '0.95rem', marginTop: '6px', margin: 0 }}>A: Yes, an instant downloadable PDF/digital receipt with a unique QR code is generated upon registration.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Right Column (Sticky Registration Summary Box) */}
          <div style={{ position: 'sticky', top: '100px' }}>
            <div className="glass-card" style={{ padding: '30px', background: '#FFFFFF', border: '2px solid #76A376', borderRadius: '24px', boxShadow: '0 15px 35px rgba(28, 51, 28, 0.1)' }}>
              
              <div style={{ fontSize: '0.82rem', color: '#5E7A5E', fontWeight: 600, letterSpacing: '0.5px' }}>
                REGISTRATION FEE
              </div>
              <div style={{ color: '#1C331C', fontFamily: 'Cinzel, serif', fontSize: '2.2rem', fontWeight: 900, marginBottom: '16px' }}>
                {event.fee === 0 ? 'FREE ENTRY' : `₹${event.fee.toLocaleString()}`}
              </div>

              {/* Capacity Bar */}
              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#3D5A3D', fontWeight: 600, marginBottom: '6px' }}>
                  <span>Registered Capacity</span>
                  <span>{event.registeredCount} / {event.maxSeats} Seats</span>
                </div>
                <div style={{ width: '100%', height: '10px', background: '#EAF2EA', borderRadius: '999px', overflow: 'hidden' }}>
                  <div style={{ width: `${seatsPercent}%`, height: '100%', background: 'linear-gradient(90deg, #76A376, #1C331C)', borderRadius: '999px' }} />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px', fontSize: '0.92rem', color: '#1C331C' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Ticket size={18} style={{ color: '#76A376' }} />
                  <span>Instant E-Pass & QR Digital Receipt</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <ShieldCheck size={18} style={{ color: '#76A376' }} />
                  <span>SRV Verified Organizer Listing</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Clock size={18} style={{ color: '#DC2626' }} />
                  <span>Reg Closes: <strong>{event.regCloseDate}</strong></span>
                </div>
              </div>

              {/* Big Action Button */}
              <button
                onClick={() => openRegistrationModal(event.id)}
                className="btn btn-fern"
                style={{
                  width: '100%',
                  padding: '16px',
                  fontSize: '1.1rem',
                  fontWeight: 900,
                  borderRadius: '999px',
                  boxShadow: '0 8px 24px rgba(118, 163, 118, 0.45)'
                }}
              >
                Register Now
                <ChevronRight size={22} />
              </button>

            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default EventDetailsView;
