import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Bell, Calendar, Trophy, AlertTriangle, ShieldCheck, CheckCircle2, ChevronRight, Filter } from 'lucide-react';

const NotificationsView = () => {
  const { notifications, showToast } = useApp();
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedNotif, setSelectedNotif] = useState(null);

  const categories = ['All', 'Upcoming Events', 'Registration Deadlines', 'Winners Announcements', 'Platform News', 'Important Alerts'];

  const filteredNotifs = notifications.filter(n => {
    if (activeCategory !== 'All' && n.category !== activeCategory) return false;
    return true;
  });

  return (
    <div style={{ padding: '60px 24px', minHeight: '85vh', background: '#F8FAF8' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* Page Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="badge-gold" style={{ marginBottom: '12px' }}>LIVE PLATFORM FEED</span>
          <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: '2.5rem', color: '#0F4C2C' }}>
            Notifications & Announcements
          </h1>
          <p style={{ color: '#4A6053', fontSize: '0.98rem', marginTop: '8px', maxWidth: '640px', margin: '8px auto 0' }}>
            Stay updated with real-time tournament alerts, registration deadlines, and official announcements across India.
          </p>
        </div>

        {/* Category Filters Pill Bar */}
        <div style={{
          display: 'flex',
          gap: '10px',
          overflowX: 'auto',
          paddingBottom: '12px',
          marginBottom: '28px'
        }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                background: activeCategory === cat ? '#0F4C2C' : '#FFFFFF',
                border: activeCategory === cat ? 'none' : '1px solid rgba(118,163,118,0.3)',
                color: activeCategory === cat ? '#FFFFFF' : '#0F4C2C',
                padding: '10px 20px',
                borderRadius: '999px',
                fontFamily: 'Poppins, sans-serif',
                fontWeight: activeCategory === cat ? 700 : 500,
                fontSize: '0.85rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {filteredNotifs.length === 0 ? (
            <div className="glass-card" style={{ padding: '40px', textAlign: 'center', background: '#FFFFFF' }}>
              <Bell size={36} style={{ color: '#76A376', margin: '0 auto 12px', opacity: 0.5 }} />
              <h4 style={{ color: '#0F4C2C' }}>No notifications found in this category</h4>
            </div>
          ) : (
            filteredNotifs.map(notif => (
              <div
                key={notif.id}
                className="glass-card notification-card-responsive"
                onClick={() => setSelectedNotif(notif)}
                style={{
                  padding: '24px 28px',
                  display: 'flex',
                  gap: '24px',
                  alignItems: 'flex-start',
                  cursor: 'pointer',
                  borderRadius: '20px',
                  borderLeft: notif.unread ? '6px solid #EF4444' : '6px solid #76A376',
                  background: notif.unread ? '#FFFDFD' : '#FFFFFF',
                  borderTop: '1px solid rgba(118, 163, 118, 0.25)',
                  borderRight: '1px solid rgba(118, 163, 118, 0.25)',
                  borderBottom: '1px solid rgba(118, 163, 118, 0.25)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
              >
                {/* Large Featured Sports Image */}
                <div 
                  className="notification-image-responsive"
                  style={{
                    width: '200px',
                    height: '130px',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    flexShrink: 0,
                    border: '2px solid #76A376',
                    boxShadow: '0 6px 18px rgba(0,0,0,0.12)',
                    position: 'relative'
                  }}
                >
                  <img
                    src={notif.image || 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=400&q=80'}
                    alt={notif.title}
                    onError={e => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=600&q=80'; }}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, transparent 50%, rgba(15,41,27,0.3) 100%)'
                  }} />
                </div>

                {/* Main Content & Details Below Title */}
                <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  
                  {/* Category & Timestamp Line */}
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap' }}>
                    <span className="badge-gold" style={{ fontSize: '0.75rem', padding: '4px 12px' }}>
                      {notif.category}
                    </span>
                    {notif.unread && (
                      <span style={{ background: '#EF4444', color: '#FFF', fontSize: '0.68rem', padding: '3px 10px', borderRadius: '999px', fontWeight: 800 }}>
                        NEW ALERT
                      </span>
                    )}
                    <span style={{ fontSize: '0.8rem', color: '#6B7C72', marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Calendar size={13} style={{ color: '#76A376' }} />
                      {notif.date} at {notif.time}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 style={{
                    fontFamily: 'Cinzel, serif',
                    color: '#0F4C2C',
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    lineHeight: 1.3,
                    marginBottom: '8px'
                  }}>
                    {notif.title}
                  </h3>

                  {/* Details Paragraph Below Title */}
                  <p style={{
                    color: '#4A6053',
                    fontSize: '0.94rem',
                    lineHeight: 1.6,
                    margin: 0,
                    fontFamily: 'Poppins, sans-serif'
                  }}>
                    {notif.content}
                  </p>

                  {/* Bottom Action Footer */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginTop: '12px', gap: '6px', color: '#76A376', fontWeight: 700, fontSize: '0.85rem' }}>
                    <span>Read Full Announcement</span>
                    <ChevronRight size={16} />
                  </div>

                </div>
              </div>
            ))
          )}
        </div>

        {/* Selected Notification Detail Modal */}
        {selectedNotif && (
          <div className="modal-overlay" onClick={() => setSelectedNotif(null)}>
            <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '560px', padding: '0', background: '#FFFFFF', borderRadius: '24px', overflow: 'hidden' }}>
              
              {/* Notification Banner Image */}
              {selectedNotif.image && (
                <div style={{ position: 'relative', height: '200px' }}>
                  <img
                    src={selectedNotif.image}
                    alt={selectedNotif.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(15,41,27,0.85) 100%)'
                  }} />
                  <div style={{ position: 'absolute', bottom: '16px', left: '20px', right: '20px', color: '#FFFFFF' }}>
                    <span className="badge-gold" style={{ marginBottom: '6px' }}>{selectedNotif.category}</span>
                    <h3 style={{ fontFamily: 'Cinzel, serif', color: '#FFFFFF', fontSize: '1.3rem', margin: 0 }}>
                      {selectedNotif.title}
                    </h3>
                  </div>
                </div>
              )}

              <div style={{ padding: '24px' }}>
                <div style={{ fontSize: '0.8rem', color: '#6B7C72', marginBottom: '16px' }}>
                  Broadcasted on {selectedNotif.date} at {selectedNotif.time}
                </div>
                <p style={{ color: '#0F291B', lineHeight: 1.7, fontSize: '0.95rem', marginBottom: '24px' }}>
                  {selectedNotif.content}
                </p>
                <button onClick={() => setSelectedNotif(null)} className="btn btn-fern" style={{ width: '100%', padding: '12px', borderRadius: '999px' }}>
                  Close Notification
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default NotificationsView;
