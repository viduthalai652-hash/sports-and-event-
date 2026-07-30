import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import EventCard from '../components/EventCard';
import { SPORTS_CATEGORIES } from '../data/mockData';
import { Search, Filter, Calendar, MapPin, Trophy, Grid, List, RefreshCw } from 'lucide-react';

const EventsView = () => {
  const { events, selectedSportFilter, setSelectedSportFilter, searchQuery, setSearchQuery, openEventDetails, openRegistrationModal } = useApp();
  
  const [statusFilter, setStatusFilter] = useState('All');
  const [feeFilter, setFeeFilter] = useState('All');
  const [viewMode, setViewMode] = useState('grid');

  const filteredEvents = events.filter(evt => {
    if (selectedSportFilter !== 'All' && evt.sport.toLowerCase() !== selectedSportFilter.toLowerCase()) {
      return false;
    }
    if (statusFilter !== 'All' && evt.status !== statusFilter) {
      return false;
    }
    if (feeFilter === 'Free' && evt.fee !== 0) return false;
    if (feeFilter === 'Paid' && evt.fee === 0) return false;

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchTitle = evt.title.toLowerCase().includes(q);
      const matchCity = evt.city.toLowerCase().includes(q);
      const matchState = evt.state.toLowerCase().includes(q);
      const matchSport = evt.sport.toLowerCase().includes(q);
      return matchTitle || matchCity || matchState || matchSport;
    }

    return true;
  });

  const resetFilters = () => {
    setSelectedSportFilter('All');
    setStatusFilter('All');
    setFeeFilter('All');
    setSearchQuery('');
  };

  return (
    <div style={{ padding: '60px 24px', minHeight: '85vh', background: '#F4F7F4' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
        {/* Page Hero Header with Vivid Sports Banner Background (No Box Container) */}
        <div style={{
          position: 'relative',
          padding: '50px 20px 40px',
          marginBottom: '40px',
          textAlign: 'center',
          overflow: 'hidden',
          width: '100%',
          minHeight: '280px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {/* Vivid Background Sports Banner Image (100% Visible) */}
          <img
            src="/sports-banner.png"
            alt="Sports Action Banner"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              objectPosition: 'center',
              zIndex: 0,
              opacity: 1
            }}
          />

          {/* Soft Center Backlight Tint for Crystal Clear Text Readability */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at center, rgba(244,247,244,0.92) 0%, rgba(244,247,244,0.75) 55%, rgba(244,247,244,0.2) 85%, rgba(244,247,244,0) 100%)',
            zIndex: 1,
            pointerEvents: 'none'
          }} />

          {/* Banner Hero Text Content */}
          <div style={{ position: 'relative', zIndex: 10, maxWidth: '920px', margin: '0 auto', padding: '0 16px' }}>
            <span className="badge-gold animate-pulse-gold" style={{ marginBottom: '16px', display: 'inline-flex', padding: '6px 18px', fontSize: '0.85rem', background: '#FFFFFF', border: '1.5px solid #D4AF37', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
              <Trophy size={14} style={{ color: '#B88E14' }} />
              EXPLORE ALL VERIFIED COMPETITIONS
            </span>
            
            <h1 style={{
              fontFamily: 'Cinzel, serif',
              fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)',
              color: '#0F4C2C',
              fontWeight: 900,
              lineHeight: 1.2,
              marginBottom: '16px',
              textShadow: '0 2px 14px rgba(255,255,255,1), 0 0 24px rgba(255,255,255,0.9), 0 2px 4px rgba(0,0,0,0.2)'
            }}>
              Empowering Champions & <br />
              <span style={{ color: '#1C331C', textShadow: '0 2px 14px rgba(255,255,255,1), 0 0 20px rgba(247,211,88,0.5)' }}>Elevating Indian Sports Management</span>
            </h1>
            
            <p style={{
              color: '#1C331C',
              fontSize: '1.08rem',
              maxWidth: '750px',
              margin: '0 auto',
              lineHeight: 1.6,
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 600,
              textShadow: '0 2px 10px rgba(255,255,255,1), 0 1px 3px rgba(255,255,255,0.9)'
            }}>
              Browse verified national marathons, T20 cricket cups, state athletic meets, football leagues, and pro championships with real-time registrations and instant QR digital gate passes.
            </p>
          </div>
        </div>

        {/* Search & Multi-Filter Control Panel */}
        <div className="glass-card" style={{ padding: '24px', marginBottom: '40px', background: '#FFFFFF' }}>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '16px',
            marginBottom: '20px'
          }}>
            
            {/* Search Input */}
            <div style={{ position: 'relative', gridColumn: 'span 2' }}>
              <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#0F4C2C' }} />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search by event title, sport, city, or state..."
                className="glass-input"
                style={{ width: '100%', paddingLeft: '44px' }}
              />
            </div>

            {/* Sport Category Selector */}
            <div>
              <select
                value={selectedSportFilter}
                onChange={e => setSelectedSportFilter(e.target.value)}
                className="glass-input"
                style={{ width: '100%' }}
              >
                <option value="All">All Sports Categories</option>
                {SPORTS_CATEGORIES.map(cat => (
                  <option key={cat.name} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>

            {/* Event Status Selector */}
            <div>
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="glass-input"
                style={{ width: '100%' }}
              >
                <option value="All">All Event Statuses</option>
                <option value="Upcoming">Upcoming</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            {/* Entry Fee Filter */}
            <div>
              <select
                value={feeFilter}
                onChange={e => setFeeFilter(e.target.value)}
                className="glass-input"
                style={{ width: '100%' }}
              >
                <option value="All">All Pricing Tiers</option>
                <option value="Free">Free Entry</option>
                <option value="Paid">Paid Registration</option>
              </select>
            </div>

          </div>

          {/* Filter Toolbar Footer */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid rgba(212,175,55,0.3)',
            paddingTop: '16px',
            fontSize: '0.85rem',
            color: '#4A6053'
          }}>
            <div>
              Showing <strong style={{ color: '#0F4C2C' }}>{filteredEvents.length}</strong> of {events.length} Events
            </div>

            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <button
                onClick={resetFilters}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#4A6053',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.8rem'
                }}
              >
                <RefreshCw size={14} />
                Reset Filters
              </button>

              {/* View Toggle */}
              <div style={{ display: 'flex', gap: '4px', background: '#F4F7F4', padding: '3px', borderRadius: '6px', border: '1px solid #D4AF37' }}>
                <button
                  onClick={() => setViewMode('grid')}
                  style={{
                    background: viewMode === 'grid' ? '#0F4C2C' : 'transparent',
                    color: viewMode === 'grid' ? '#FFFFFF' : '#0F4C2C',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '6px',
                    cursor: 'pointer'
                  }}
                  title="Grid View"
                >
                  <Grid size={16} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  style={{
                    background: viewMode === 'list' ? '#0F4C2C' : 'transparent',
                    color: viewMode === 'list' ? '#FFFFFF' : '#0F4C2C',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '6px',
                    cursor: 'pointer'
                  }}
                  title="List View"
                >
                  <List size={16} />
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Event List / Grid Rendering */}
        {filteredEvents.length === 0 ? (
          <div className="glass-card" style={{ padding: '60px 24px', textAlign: 'center', background: '#FFFFFF' }}>
            <Trophy size={48} style={{ color: '#D4AF37', margin: '0 auto 16px', opacity: 0.5 }} />
            <h3 style={{ fontFamily: 'Cinzel, serif', color: '#0F4C2C', fontSize: '1.4rem', marginBottom: '8px' }}>
              No Events Found
            </h3>
            <p style={{ color: '#4A6053', marginBottom: '20px' }}>
              No sports events match your current filter settings. Try adjusting your search query.
            </p>
            <button onClick={resetFilters} className="btn btn-gold" style={{ padding: '10px 24px' }}>
              Clear All Filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid-autofill">
            {filteredEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {filteredEvents.map(event => (
              <div key={event.id} className="glass-card" style={{ padding: '20px', display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'center', background: '#FFFFFF' }}>
                <img
                  src={event.banner}
                  alt={event.title}
                  style={{ width: '160px', height: '110px', objectFit: 'cover', borderRadius: '10px' }}
                />
                <div style={{ flex: 1, minWidth: '260px' }}>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
                    <span className="badge-gold">{event.sport}</span>
                    <span className={`badge-status status-${event.status.toLowerCase()}`}>{event.status}</span>
                  </div>
                  <h3 style={{ fontFamily: 'Cinzel, serif', color: '#0F4C2C', fontSize: '1.2rem', marginBottom: '6px' }}>
                    {event.title}
                  </h3>
                  <div style={{ display: 'flex', gap: '16px', fontSize: '0.82rem', color: '#4A6053' }}>
                    <span>📍 {event.city}, {event.state}</span>
                    <span>📅 {event.date} ({event.time})</span>
                  </div>
                </div>

                <div style={{ textAlign: 'right', minWidth: '160px' }}>
                  <div style={{ color: '#0F4C2C', fontFamily: 'Cinzel, serif', fontSize: '1.3rem', fontWeight: 800, marginBottom: '8px' }}>
                    {event.fee === 0 ? 'FREE' : `₹${event.fee}`}
                  </div>
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                    <button onClick={() => openEventDetails(event.id)} className="btn btn-outline-gold" style={{ padding: '6px 14px', fontSize: '0.78rem' }}>
                      Details
                    </button>
                    <button onClick={() => openRegistrationModal(event.id)} className="btn btn-gold" style={{ padding: '6px 14px', fontSize: '0.78rem' }}>
                      Register
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default EventsView;
