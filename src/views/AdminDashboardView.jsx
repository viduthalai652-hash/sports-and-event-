import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SPORTS_CATEGORIES } from '../data/mockData';
import { ShieldCheck, Plus, Edit, Trash2, CheckCircle2, XCircle, Download, Trophy, Users, DollarSign, Calendar, Bell, BarChart2, Eye, RefreshCw, X } from 'lucide-react';

const AdminDashboardView = () => {
  const {
    events,
    registrations,
    notifications,
    winners,
    createEvent,
    deleteEvent,
    toggleEventStatus,
    approveRegistration,
    rejectRegistration,
    addNotification,
    addWinner,
    showToast,
    logout
  } = useApp();

  const [activeTab, setActiveTab] = useState('overview');

  const [regSearch, setRegSearch] = useState('');

  const [showCreateEventModal, setShowCreateEventModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    sport: 'Cricket',
    city: 'Mumbai',
    state: 'Maharashtra',
    venue: 'National Sports Club Turf',
    date: '2026-09-10',
    time: '07:00 AM',
    regCloseDate: '2026-09-05',
    fee: 499,
    maxSeats: 500,
    banner: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80',
    organizer: 'SRV Sports Federation',
    organizerContact: '+91 98765 43210',
    organizerEmail: 'events@srvsports.in',
    description: 'National level sports championship with gold trophies and digital certificates.',
    eligibility: 'Open category for all eligible participants.',
    rules: 'Standard tournament guidelines apply.',
    prizes: '1st: Gold Trophy + Cash Prize'
  });

  const [newNotif, setNewNotif] = useState({
    title: '',
    category: 'Upcoming Events',
    content: ''
  });

  const [newWinner, setNewWinner] = useState({
    name: '',
    eventTitle: 'SRV Marathon 2026',
    sport: 'Running',
    medal: 'Gold',
    rank: '1st Place',
    timeScore: '1h 05m',
    prize: '₹1,50,000'
  });

  const totalRevenue = events.reduce((sum, e) => sum + (e.fee * e.registeredCount), 0);
  const totalParticipants = registrations.length + events.reduce((sum, e) => sum + e.registeredCount, 0);

  const handleExportCSV = () => {
    const headers = "ID,Participant Name,Email,Phone,Event,Category,Status,Receipt No\n";
    const rows = registrations.map(r => 
      `"${r.id}","${r.fullName}","${r.email}","${r.phone}","${r.eventTitle}","${r.category}","${r.status}","${r.receiptNo}"`
    ).join("\n");

    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SRV_Participant_Registrations_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    showToast('Participant list exported to CSV file!', 'success');
  };

  const handleCreateEventSubmit = (e) => {
    e.preventDefault();
    if (!newEvent.title) return;
    createEvent(newEvent);
    setShowCreateEventModal(false);
  };

  const handleBroadcastSubmit = (e) => {
    e.preventDefault();
    if (!newNotif.title || !newNotif.content) return;
    addNotification(newNotif);
    setNewNotif({ title: '', category: 'Upcoming Events', content: '' });
  };

  const handleWinnerSubmit = (e) => {
    e.preventDefault();
    if (!newWinner.name) return;
    addWinner(newWinner);
    setNewWinner({ name: '', eventTitle: 'SRV Marathon 2026', sport: 'Running', medal: 'Gold', rank: '1st Place', timeScore: '1h 05m', prize: '₹1,50,000' });
  };

  const filteredRegistrations = registrations.filter(r => 
    r.fullName.toLowerCase().includes(regSearch.toLowerCase()) ||
    r.email.toLowerCase().includes(regSearch.toLowerCase()) ||
    r.eventTitle.toLowerCase().includes(regSearch.toLowerCase())
  );

  return (
    <div style={{ padding: '40px 24px', minHeight: '85vh', background: '#F4F7F4' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
        {/* Dashboard Top Header Bar */}
        <div className="glass-card" style={{ padding: '24px', marginBottom: '32px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '20px', background: '#FFFFFF' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: '#FFFDF5',
              border: '1.5px solid #D4AF37',
              color: '#0F4C2C',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ShieldCheck size={26} />
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#146B3A', fontWeight: 800, letterSpacing: '1px' }}>
                EXECUTIVE CONTROL CENTER
              </div>
              <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.6rem', color: '#0F4C2C' }}>
                SRV Admin Dashboard
              </h1>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={() => setShowCreateEventModal(true)} className="btn btn-gold" style={{ padding: '10px 20px', fontSize: '0.85rem' }}>
              <Plus size={16} />
              Create Event
            </button>
            <button onClick={logout} className="btn btn-outline-gold" style={{ padding: '10px 16px', fontSize: '0.85rem' }}>
              Exit Admin
            </button>
          </div>
        </div>

        {/* Top KPI Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '20px',
          marginBottom: '36px'
        }}>
          {[
            { label: 'Total Events', val: events.length, icon: Trophy, color: '#0F4C2C' },
            { label: 'Total Participants', val: totalParticipants.toLocaleString(), icon: Users, color: '#146B3A' },
            { label: 'Platform Revenue', val: `₹${totalRevenue.toLocaleString()}`, icon: DollarSign, color: '#997A15' },
            { label: 'Notifications', val: notifications.length, icon: Bell, color: '#2563EB' }
          ].map((kpi, i) => {
            const Icon = kpi.icon;
            return (
              <div key={i} className="glass-card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', background: '#FFFFFF' }}>
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  background: '#F4F7F4',
                  border: `1px solid ${kpi.color}`,
                  color: kpi.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Icon size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#6B7C72', textTransform: 'uppercase', fontWeight: 600 }}>{kpi.label}</div>
                  <div style={{ fontFamily: 'Cinzel, serif', fontSize: '1.5rem', fontWeight: 800, color: '#0F4C2C' }}>{kpi.val}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dashboard Tabs Bar */}
        <div style={{
          display: 'flex',
          gap: '8px',
          borderBottom: '1px solid rgba(212,175,55,0.4)',
          marginBottom: '28px',
          overflowX: 'auto'
        }}>
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'events', label: 'Event Management' },
            { id: 'registrations', label: 'Registrations' },
            { id: 'winners', label: 'Winners Wall' },
            { id: 'notifications', label: 'Broadcast Notifications' },
            { id: 'analytics', label: 'Analytics' }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              style={{
                background: 'none',
                border: 'none',
                padding: '12px 20px',
                color: activeTab === t.id ? '#0F4C2C' : '#4A6053',
                fontFamily: 'Poppins, sans-serif',
                fontWeight: activeTab === t.id ? 700 : 500,
                fontSize: '0.88rem',
                borderBottom: activeTab === t.id ? '3px solid #D4AF37' : '3px solid transparent',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="glass-card" style={{ padding: '24px', background: '#FFFFFF' }}>
              <h3 style={{ fontFamily: 'Cinzel, serif', color: '#0F4C2C', fontSize: '1.2rem', marginBottom: '16px' }}>
                Recent Platform Registrations
              </h3>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1.5px solid #D4AF37', color: '#0F4C2C' }}>
                      <th style={{ padding: '12px' }}>Receipt #</th>
                      <th style={{ padding: '12px' }}>Participant Name</th>
                      <th style={{ padding: '12px' }}>Event</th>
                      <th style={{ padding: '12px' }}>Category</th>
                      <th style={{ padding: '12px' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registrations.slice(0, 5).map(r => (
                      <tr key={r.id} style={{ borderBottom: '1px solid #E5E7EB', color: '#0F291B' }}>
                        <td style={{ padding: '12px', fontFamily: 'monospace', color: '#997A15', fontWeight: 700 }}>{r.receiptNo}</td>
                        <td style={{ padding: '12px', fontWeight: 600, color: '#0F4C2C' }}>{r.fullName}</td>
                        <td style={{ padding: '12px' }}>{r.eventTitle}</td>
                        <td style={{ padding: '12px' }}>{r.category}</td>
                        <td style={{ padding: '12px' }}>
                          <span style={{ color: r.status === 'Approved' ? '#047857' : '#DC2626', fontWeight: 700 }}>● {r.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: EVENT MANAGEMENT */}
        {activeTab === 'events' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontFamily: 'Cinzel, serif', color: '#0F4C2C', fontSize: '1.3rem' }}>
                Manage Published & Draft Events ({events.length})
              </h3>
              <button onClick={() => setShowCreateEventModal(true)} className="btn btn-gold" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
                <Plus size={16} />
                Add New Event
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {events.map(evt => (
                <div key={evt.id} className="glass-card" style={{ padding: '16px 20px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px', background: '#FFFFFF' }}>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <img src={evt.banner} alt={evt.title} style={{ width: '80px', height: '56px', borderRadius: '8px', objectFit: 'cover' }} />
                    <div>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <span className="badge-gold" style={{ fontSize: '0.68rem' }}>{evt.sport}</span>
                        <span className={`badge-status status-${evt.status.toLowerCase()}`}>{evt.status}</span>
                      </div>
                      <h4 style={{ color: '#0F4C2C', fontSize: '1.05rem', fontFamily: 'Cinzel, serif', marginTop: '4px' }}>{evt.title}</h4>
                      <span style={{ fontSize: '0.78rem', color: '#4A6053' }}>📍 {evt.city} | 📅 {evt.date} | 🏷️ ₹{evt.fee}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => toggleEventStatus(evt.id)}
                      className="btn btn-outline-gold"
                      style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                    >
                      <RefreshCw size={14} />
                      Cycle Status
                    </button>
                    <button
                      onClick={() => deleteEvent(evt.id)}
                      style={{ background: '#FEE2E2', border: '1px solid #FCA5A5', color: '#DC2626', borderRadius: '8px', padding: '6px 12px', cursor: 'pointer', fontSize: '0.78rem' }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: REGISTRATIONS MANAGEMENT */}
        {activeTab === 'registrations' && (
          <div className="glass-card" style={{ padding: '24px', background: '#FFFFFF' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '16px' }}>
              <input
                type="text"
                placeholder="Search by participant name or email..."
                value={regSearch}
                onChange={e => setRegSearch(e.target.value)}
                className="glass-input"
                style={{ width: '300px' }}
              />

              <button onClick={handleExportCSV} className="btn btn-gold" style={{ padding: '8px 18px', fontSize: '0.85rem' }}>
                <Download size={16} />
                Export Participant CSV
              </button>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1.5px solid #D4AF37', color: '#0F4C2C' }}>
                    <th style={{ padding: '12px' }}>Receipt #</th>
                    <th style={{ padding: '12px' }}>Name</th>
                    <th style={{ padding: '12px' }}>Contact</th>
                    <th style={{ padding: '12px' }}>Event & Category</th>
                    <th style={{ padding: '12px' }}>Status</th>
                    <th style={{ padding: '12px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRegistrations.map(r => (
                    <tr key={r.id} style={{ borderBottom: '1px solid #E5E7EB', color: '#0F291B' }}>
                      <td style={{ padding: '12px', fontFamily: 'monospace', color: '#997A15', fontWeight: 700 }}>{r.receiptNo}</td>
                      <td style={{ padding: '12px', fontWeight: 600, color: '#0F4C2C' }}>{r.fullName}</td>
                      <td style={{ padding: '12px' }}>{r.email}<br/><span style={{ fontSize: '0.75rem', color: '#6B7C72' }}>{r.phone}</span></td>
                      <td style={{ padding: '12px' }}>{r.eventTitle}<br/><span style={{ fontSize: '0.75rem', color: '#047857', fontWeight: 600 }}>{r.category}</span></td>
                      <td style={{ padding: '12px' }}>
                        <span style={{ color: r.status === 'Approved' ? '#047857' : '#DC2626', fontWeight: 700 }}>{r.status}</span>
                      </td>
                      <td style={{ padding: '12px' }}>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <button onClick={() => approveRegistration(r.id)} style={{ background: '#ECFDF5', border: '1px solid #047857', color: '#047857', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}>
                            <CheckCircle2 size={14} />
                          </button>
                          <button onClick={() => rejectRegistration(r.id)} style={{ background: '#FEF2F2', border: '1px solid #DC2626', color: '#DC2626', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}>
                            <XCircle size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: WINNERS WALL */}
        {activeTab === 'winners' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }}>
            
            <div className="glass-card" style={{ padding: '24px', background: '#FFFFFF' }}>
              <h3 style={{ fontFamily: 'Cinzel, serif', color: '#0F4C2C', fontSize: '1.2rem', marginBottom: '16px' }}>
                Publish Event Winner
              </h3>
              <form onSubmit={handleWinnerSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: '#0F4C2C', marginBottom: '4px', fontWeight: 600 }}>Winner Name *</label>
                  <input
                    type="text"
                    required
                    value={newWinner.name}
                    onChange={e => setNewWinner({ ...newWinner, name: e.target.value })}
                    placeholder="Champion Name"
                    className="glass-input"
                    style={{ width: '100%' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: '#0F4C2C', marginBottom: '4px', fontWeight: 600 }}>Tournament Title *</label>
                  <input
                    type="text"
                    required
                    value={newWinner.eventTitle}
                    onChange={e => setNewWinner({ ...newWinner, eventTitle: e.target.value })}
                    placeholder="Event Title"
                    className="glass-input"
                    style={{ width: '100%' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: '#0F4C2C', marginBottom: '4px', fontWeight: 600 }}>Rank / Medal</label>
                    <input
                      type="text"
                      value={newWinner.rank}
                      onChange={e => setNewWinner({ ...newWinner, rank: e.target.value })}
                      placeholder="1st Place / Champions"
                      className="glass-input"
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: '#0F4C2C', marginBottom: '4px', fontWeight: 600 }}>Prize Money</label>
                    <input
                      type="text"
                      value={newWinner.prize}
                      onChange={e => setNewWinner({ ...newWinner, prize: e.target.value })}
                      placeholder="₹1,50,000"
                      className="glass-input"
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-gold" style={{ padding: '10px' }}>
                  Publish Winner
                </button>
              </form>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {winners.map(w => (
                <div key={w.id} className="glass-card" style={{ padding: '16px', display: 'flex', gap: '16px', alignItems: 'center', background: '#FFFFFF' }}>
                  <img src={w.image} alt={w.name} style={{ width: '60px', height: '60px', borderRadius: '50%', border: '2px solid #D4AF37', objectFit: 'cover' }} />
                  <div>
                    <h4 style={{ color: '#0F4C2C', fontSize: '1.1rem', fontFamily: 'Cinzel, serif' }}>{w.name}</h4>
                    <div style={{ fontSize: '0.8rem', color: '#997A15', fontWeight: 600 }}>🏆 {w.rank} • {w.eventTitle}</div>
                    <div style={{ fontSize: '0.75rem', color: '#047857' }}>Prize: {w.prize} ({w.timeScore})</div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* TAB 5: BROADCAST NOTIFICATIONS */}
        {activeTab === 'notifications' && (
          <div className="glass-card" style={{ padding: '28px', maxWidth: '700px', margin: '0 auto', background: '#FFFFFF' }}>
            <h3 style={{ fontFamily: 'Cinzel, serif', color: '#0F4C2C', fontSize: '1.3rem', marginBottom: '16px' }}>
              Broadcast Platform Announcement
            </h3>

            <form onSubmit={handleBroadcastSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#0F4C2C', marginBottom: '6px', fontWeight: 600 }}>Notification Title *</label>
                <input
                  type="text"
                  required
                  value={newNotif.title}
                  onChange={e => setNewNotif({ ...newNotif, title: e.target.value })}
                  placeholder="e.g. Schedule Update: National Marathon"
                  className="glass-input"
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#0F4C2C', marginBottom: '6px', fontWeight: 600 }}>Category *</label>
                <select
                  value={newNotif.category}
                  onChange={e => setNewNotif({ ...newNotif, category: e.target.value })}
                  className="glass-input"
                  style={{ width: '100%' }}
                >
                  <option value="Upcoming Events">Upcoming Events</option>
                  <option value="Registration Deadlines">Registration Deadlines</option>
                  <option value="Winners Announcements">Winners Announcements</option>
                  <option value="Platform News">Platform News</option>
                  <option value="Important Alerts">Important Alerts</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#0F4C2C', marginBottom: '6px', fontWeight: 600 }}>Announcement Body *</label>
                <textarea
                  required
                  rows="4"
                  value={newNotif.content}
                  onChange={e => setNewNotif({ ...newNotif, content: e.target.value })}
                  placeholder="Details regarding schedule, venue changes, or results..."
                  className="glass-input"
                  style={{ width: '100%' }}
                />
              </div>

              <button type="submit" className="btn btn-gold" style={{ padding: '12px' }}>
                <Bell size={18} />
                Broadcast Notification
              </button>
            </form>
          </div>
        )}

        {/* TAB 6: ANALYTICS */}
        {activeTab === 'analytics' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            <div className="glass-card" style={{ padding: '24px', background: '#FFFFFF' }}>
              <h4 style={{ fontFamily: 'Cinzel, serif', color: '#0F4C2C', marginBottom: '16px' }}>
                Registration Volume Trend
              </h4>
              <div style={{ height: '180px', display: 'flex', alignItems: 'flex-end', gap: '16px', paddingBottom: '10px', borderBottom: '1.5px solid #D4AF37' }}>
                {[30, 45, 75, 120, 190, 280, 420].map((val, i) => (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                    <div style={{ height: `${val / 4.5}px`, width: '100%', background: 'linear-gradient(180deg, #F7D358, #0F4C2C)', borderRadius: '4px' }} />
                    <span style={{ fontSize: '0.65rem', color: '#6B7C72' }}>Day {i+1}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card" style={{ padding: '24px', background: '#FFFFFF' }}>
              <h4 style={{ fontFamily: 'Cinzel, serif', color: '#0F4C2C', marginBottom: '16px' }}>
                Sport Share Distribution
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { sport: 'Running / Marathon', pct: '38%' },
                  { sport: 'Cricket T20', pct: '26%' },
                  { sport: 'Football 7s', pct: '18%' },
                  { sport: 'Badminton & Others', pct: '18%' }
                ].map(s => (
                  <div key={s.sport}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#0F291B', marginBottom: '4px', fontWeight: 600 }}>
                      <span>{s.sport}</span>
                      <span style={{ color: '#0F4C2C' }}>{s.pct}</span>
                    </div>
                    <div style={{ height: '6px', background: '#E5E7EB', borderRadius: '999px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: s.pct, background: '#0F4C2C' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CREATE EVENT MODAL */}
        {showCreateEventModal && (
          <div className="modal-overlay" onClick={() => setShowCreateEventModal(false)}>
            <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '650px', padding: '30px', background: '#FFFFFF' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <h3 style={{ fontFamily: 'Cinzel, serif', color: '#0F4C2C', fontSize: '1.4rem' }}>
                  Create & Publish New Sports Event
                </h3>
                <button onClick={() => setShowCreateEventModal(false)} style={{ background: 'none', border: 'none', color: '#0F4C2C', cursor: 'pointer' }}>
                  <X size={22} />
                </button>
              </div>

              <form onSubmit={handleCreateEventSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: '#0F4C2C', marginBottom: '4px', fontWeight: 600 }}>Event Title *</label>
                  <input
                    type="text"
                    required
                    value={newEvent.title}
                    onChange={e => setNewEvent({ ...newEvent, title: e.target.value })}
                    placeholder="e.g. SRV National Marathon 2026"
                    className="glass-input"
                    style={{ width: '100%' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: '#0F4C2C', marginBottom: '4px', fontWeight: 600 }}>Sport Category *</label>
                    <select
                      value={newEvent.sport}
                      onChange={e => setNewEvent({ ...newEvent, sport: e.target.value })}
                      className="glass-input"
                      style={{ width: '100%' }}
                    >
                      {SPORTS_CATEGORIES.map(c => (
                        <option key={c.name} value={c.name}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: '#0F4C2C', marginBottom: '4px', fontWeight: 600 }}>Registration Fee (₹) *</label>
                    <input
                      type="number"
                      required
                      value={newEvent.fee}
                      onChange={e => setNewEvent({ ...newEvent, fee: Number(e.target.value) })}
                      className="glass-input"
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: '#0F4C2C', marginBottom: '4px', fontWeight: 600 }}>City *</label>
                    <input
                      type="text"
                      required
                      value={newEvent.city}
                      onChange={e => setNewEvent({ ...newEvent, city: e.target.value })}
                      className="glass-input"
                      style={{ width: '100%' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: '#0F4C2C', marginBottom: '4px', fontWeight: 600 }}>State *</label>
                    <input
                      type="text"
                      required
                      value={newEvent.state}
                      onChange={e => setNewEvent({ ...newEvent, state: e.target.value })}
                      className="glass-input"
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: '#0F4C2C', marginBottom: '4px', fontWeight: 600 }}>Venue Address *</label>
                  <input
                    type="text"
                    required
                    value={newEvent.venue}
                    onChange={e => setNewEvent({ ...newEvent, venue: e.target.value })}
                    className="glass-input"
                    style={{ width: '100%' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: '#0F4C2C', marginBottom: '4px', fontWeight: 600 }}>Event Date *</label>
                    <input
                      type="date"
                      required
                      value={newEvent.date}
                      onChange={e => setNewEvent({ ...newEvent, date: e.target.value })}
                      className="glass-input"
                      style={{ width: '100%' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: '#0F4C2C', marginBottom: '4px', fontWeight: 600 }}>Start Time *</label>
                    <input
                      type="text"
                      required
                      value={newEvent.time}
                      onChange={e => setNewEvent({ ...newEvent, time: e.target.value })}
                      className="glass-input"
                      style={{ width: '100%' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: '#0F4C2C', marginBottom: '4px', fontWeight: 600 }}>Max Seats *</label>
                    <input
                      type="number"
                      required
                      value={newEvent.maxSeats}
                      onChange={e => setNewEvent({ ...newEvent, maxSeats: Number(e.target.value) })}
                      className="glass-input"
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: '#0F4C2C', marginBottom: '4px', fontWeight: 600 }}>Event Banner Image URL</label>
                  <input
                    type="url"
                    value={newEvent.banner}
                    onChange={e => setNewEvent({ ...newEvent, banner: e.target.value })}
                    className="glass-input"
                    style={{ width: '100%' }}
                  />
                </div>

                <button type="submit" className="btn btn-gold" style={{ padding: '12px', marginTop: '10px' }}>
                  Publish Event Live
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboardView;
