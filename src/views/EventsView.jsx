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
        
        {/* Page Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="badge-gold" style={{ marginBottom: '12px' }}>EXPLORE COMPETITIONS</span>
          <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: '2.5rem', color: '#0F4C2C' }}>
            Sports Events & Tournaments
          </h1>
          <p style={{ color: '#4A6053', fontSize: '0.95rem', maxWidth: '600px', margin: '8px auto 0' }}>
            Browse verified national marathons, T20 cricket cups, state athletic meets, and pro tournaments.
          </p>
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
