import React, { useState, useEffect, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import EventCard from '../components/EventCard';
import EventPreviewModal from '../components/EventPreviewModal';
import EventShareModal from '../components/EventShareModal';
import { SPORTS_CATEGORIES } from '../data/mockData';
import { 
  Search, Filter, Calendar, MapPin, Trophy, Grid, List, RefreshCw, 
  ChevronDown, X, Sparkles, SlidersHorizontal, ArrowUpDown, ShieldCheck, 
  Flame, Award, DollarSign, Users, Activity, CheckCircle2 
} from 'lucide-react';

const POPULAR_SEARCHES = ['T20 Cricket Cup', 'Coastal Marathon', '7-a-side Football', 'Pro Kabaddi', 'Badminton Singles'];

const EventsView = () => {
  const { 
    events, selectedSportFilter, setSelectedSportFilter, 
    searchQuery, setSearchQuery, openEventDetails, openRegistrationModal 
  } = useApp();
  
  // State variables for filters & sorting
  const [statusFilter, setStatusFilter] = useState('All');
  const [feeFilter, setFeeFilter] = useState('All');
  const [locationFilter, setLocationFilter] = useState('All');
  const [prizeFilter, setPrizeFilter] = useState('All');
  const [skillFilter, setSkillFilter] = useState('All');
  const [formatFilter, setFormatFilter] = useState('All');
  const [venueFilter, setVenueFilter] = useState('All');
  const [seatsFilter, setSeatsFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Popular');

  const [viewMode, setViewMode] = useState('grid');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Modals state
  const [previewEvent, setPreviewEvent] = useState(null);
  const [shareEvent, setShareEvent] = useState(null);

  // Simulated Skeleton loading on filter changes
  const triggerLoading = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 300);
  };

  // Real-time Search Suggestions
  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (val.trim().length > 1) {
      const q = val.toLowerCase();
      const suggestions = events
        .filter(evt => evt.title.toLowerCase().includes(q) || evt.city.toLowerCase().includes(q) || evt.sport.toLowerCase().includes(q))
        .map(evt => evt.title)
        .slice(0, 5);
      setSearchSuggestions(suggestions);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  // Locations list derived from events
  const availableLocations = useMemo(() => {
    const cities = Array.from(new Set(events.map(e => e.city)));
    return ['All', ...cities];
  }, [events]);

  // Comprehensive Filter & Sorting Logic
  const filteredEvents = useMemo(() => {
    let list = events.filter(evt => {
      // 1. Sport Filter
      if (selectedSportFilter !== 'All' && evt.sport.toLowerCase() !== selectedSportFilter.toLowerCase()) {
        return false;
      }
      // 2. Status Filter
      if (statusFilter !== 'All' && evt.status !== statusFilter) {
        return false;
      }
      // 3. Fee Filter
      if (feeFilter === 'Free' && evt.fee !== 0) return false;
      if (feeFilter === 'Paid' && evt.fee === 0) return false;

      // 4. Location Filter
      if (locationFilter !== 'All' && evt.city !== locationFilter) return false;

      // 5. Seats Filter
      const seatsLeft = evt.maxSeats - evt.registeredCount;
      if (seatsFilter === 'Filling Fast' && seatsLeft > 20) return false;

      // 6. Search Query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchTitle = evt.title.toLowerCase().includes(q);
        const matchCity = evt.city.toLowerCase().includes(q);
        const matchState = evt.state.toLowerCase().includes(q);
        const matchSport = evt.sport.toLowerCase().includes(q);
        const matchVenue = evt.venue.toLowerCase().includes(q);
        return matchTitle || matchCity || matchState || matchSport || matchVenue;
      }

      return true;
    });

    // Sort Logic
    return list.sort((a, b) => {
      if (sortBy === 'Newest') return new Date(b.date) - new Date(a.date);
      if (sortBy === 'Oldest') return new Date(a.date) - new Date(b.date);
      if (sortBy === 'Lowest Fee') return a.fee - b.fee;
      if (sortBy === 'Highest Prize') return b.fee - a.fee;
      if (sortBy === 'Most Registered') return b.registeredCount - a.registeredCount;
      if (sortBy === 'Alphabetical') return a.title.localeCompare(b.title);
      // Default: Popular (registeredCount DESC)
      return b.registeredCount - a.registeredCount;
    });
  }, [events, selectedSportFilter, statusFilter, feeFilter, locationFilter, seatsFilter, searchQuery, sortBy]);

  const resetFilters = () => {
    setSelectedSportFilter('All');
    setStatusFilter('All');
    setFeeFilter('All');
    setLocationFilter('All');
    setPrizeFilter('All');
    setSkillFilter('All');
    setFormatFilter('All');
    setVenueFilter('All');
    setSeatsFilter('All');
    setSortBy('Popular');
    setSearchQuery('');
    setShowSuggestions(false);
    triggerLoading();
  };

  return (
    <div style={{ paddingTop: '0px', paddingBottom: '60px', minHeight: '85vh', background: '#F8FAF8' }}>
      
      {/* 1. HERO BANNER SECTION (Compact ~240px Height) */}
      <div style={{
        position: 'relative',
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
        marginRight: 'calc(-50vw + 50%)',
        marginTop: '0px',
        marginBottom: '0px',
        padding: '48px 24px 40px',
        textAlign: 'center',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '240px',
        background: 'linear-gradient(135deg, #0F4C2C 0%, #1C331C 100%)'
      }}>
        {/* Full-Bleed 100% Background Image */}
        <img
          src="/sports-banner.png"
          alt="Olympic Champions Sports Banner"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 35%',
            zIndex: 0,
            opacity: 0.85
          }}
        />

        {/* Hero Content Container */}
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '980px', margin: '0 auto', width: '100%' }}>
          
          <span className="badge-gold animate-pulse-gold" style={{
            marginBottom: '12px',
            display: 'inline-flex',
            padding: '6px 20px',
            fontSize: '0.82rem',
            background: 'rgba(255, 255, 255, 0.96)',
            border: '2px solid #D4AF37',
            boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
            fontWeight: 800
          }}>
            <Trophy size={14} style={{ color: '#B88E14' }} />
            VERIFIED NATIONAL SPORTS MARKETPLACE
          </span>
          
          <h1 style={{
            fontFamily: 'Cinzel, serif',
            fontSize: 'clamp(1.8rem, 3.8vw, 2.8rem)',
            color: '#0F4C2C',
            fontWeight: 900,
            lineHeight: 1.25,
            marginBottom: '16px',
            textShadow: '0 0 20px #FFFFFF, 0 0 35px #FFFFFF, 0 3px 12px rgba(255,255,255,1), 0 2px 4px rgba(0,0,0,0.6)'
          }}>
            Empowering Champions & Elevating Indian Sports Management
          </h1>

          {/* Integrated Search Box inside Hero */}
          <div style={{ position: 'relative', maxWidth: '640px', margin: '0 auto' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              background: '#FFFFFF',
              borderRadius: '999px',
              padding: '6px 8px 6px 20px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
              border: '2px solid #D4AF37'
            }}>
              <Search size={20} style={{ color: '#0F4C2C', marginRight: '10px', flexShrink: 0 }} />
              <input
                type="text"
                placeholder="Search tournaments, cities, sports or venues..."
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => searchQuery.trim().length > 1 && setShowSuggestions(true)}
                style={{
                  border: 'none',
                  outline: 'none',
                  width: '100%',
                  fontSize: '0.96rem',
                  fontFamily: 'Poppins, sans-serif',
                  color: '#1C331C'
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => { setSearchQuery(''); setShowSuggestions(false); }}
                  style={{ background: 'none', border: 'none', color: '#9CA3AF', cursor: 'pointer', padding: '4px' }}
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Real-time Autocomplete Suggestions Dropdown */}
            {showSuggestions && searchSuggestions.length > 0 && (
              <div style={{
                position: 'absolute',
                top: '108%',
                left: 0,
                right: 0,
                zIndex: 50,
                background: '#FFFFFF',
                borderRadius: '16px',
                padding: '12px',
                boxShadow: '0 15px 35px rgba(0,0,0,0.2)',
                border: '1.5px solid #76A376',
                textAlign: 'left'
              }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#5E7A5E', padding: '4px 8px', textTransform: 'uppercase' }}>
                  Matching Competitions
                </div>
                {searchSuggestions.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setSearchQuery(item);
                      setShowSuggestions(false);
                    }}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '8px',
                      fontSize: '0.9rem',
                      color: '#0F4C2C',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'background 0.2s ease'
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = '#F4F7F4'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <Search size={14} style={{ color: '#76A376' }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* 2. EVENT STATISTICS COUNTER BAR */}
      <div style={{
        background: 'linear-gradient(135deg, #0F4C2C 0%, #1C331C 100%)',
        color: '#FFFFFF',
        padding: '20px 24px',
        boxShadow: '0 10px 25px rgba(15, 76, 44, 0.2)'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '20px',
          textAlign: 'center'
        }}>
          {[
            { count: '500+', label: 'Events Hosted', icon: Trophy },
            { count: '25,000+', label: 'Registered Players', icon: Users },
            { count: '120+', label: 'Host Cities', icon: MapPin },
            { count: '350+', label: 'Verified Organizers', icon: ShieldCheck },
            { count: '₹2 Crore+', label: 'Total Prize Pool', icon: Award }
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#F7D358', marginBottom: '2px' }}>
                  <Icon size={18} />
                  <span style={{ fontFamily: 'Cinzel, serif', fontSize: '1.4rem', fontWeight: 900 }}>{stat.count}</span>
                </div>
                <span style={{ fontSize: '0.8rem', color: '#EAF2EA', fontWeight: 600, fontFamily: 'Poppins, sans-serif' }}>{stat.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. STICKY SEARCH & FILTER CONTROL PANEL */}
      <div style={{
        position: 'sticky',
        top: '80px',
        zIndex: 40,
        background: '#F8FAF8',
        borderBottom: '1px solid rgba(118, 163, 118, 0.25)',
        padding: '16px 24px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.04)'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          
          {/* Top Quick Filters Row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
            
            {/* Quick Sports Category Pills */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflowX: 'auto', paddingBottom: '4px', maxWidth: '100%' }}>
              {['All', 'Cricket', 'Football', 'Running', 'Volleyball', 'Kabaddi', 'Badminton', 'Athletics'].map(sport => {
                const isSelected = selectedSportFilter.toLowerCase() === sport.toLowerCase();
                return (
                  <button
                    key={sport}
                    onClick={() => { setSelectedSportFilter(sport); triggerLoading(); }}
                    style={{
                      padding: '8px 18px',
                      borderRadius: '999px',
                      fontSize: '0.86rem',
                      fontWeight: 800,
                      fontFamily: "'Outfit', 'Poppins', sans-serif",
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      border: isSelected ? '1.5px solid #D4AF37' : '1px solid rgba(118,163,118,0.3)',
                      background: isSelected ? 'linear-gradient(135deg, #0F4C2C, #1C331C)' : '#FFFFFF',
                      color: isSelected ? '#FFFFFF' : '#1C331C',
                      boxShadow: isSelected ? '0 4px 12px rgba(15,76,44,0.25)' : 'none',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {sport}
                  </button>
                );
              })}
            </div>

            {/* Filter Toggle Controls & Sort Dropdown */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
              
              {/* Advanced Filter Toggle Button */}
              <button
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                style={{
                  padding: '9px 18px',
                  borderRadius: '999px',
                  fontSize: '0.86rem',
                  fontWeight: 800,
                  fontFamily: "'Outfit', sans-serif",
                  background: showAdvancedFilters ? '#0F4C2C' : '#FFFFFF',
                  color: showAdvancedFilters ? '#FFFFFF' : '#0F4C2C',
                  border: '1.5px solid #0F4C2C',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <SlidersHorizontal size={15} />
                <span>Filters</span>
                <ChevronDown size={14} style={{ transform: showAdvancedFilters ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }} />
              </button>

              {/* Multi-Sorting Dropdown */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#FFFFFF', padding: '6px 14px', borderRadius: '999px', border: '1px solid rgba(118,163,118,0.4)' }}>
                <ArrowUpDown size={14} style={{ color: '#0F4C2C' }} />
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#5E7A5E' }}>Sort:</span>
                <select
                  value={sortBy}
                  onChange={e => { setSortBy(e.target.value); triggerLoading(); }}
                  style={{
                    border: 'none',
                    outline: 'none',
                    background: 'transparent',
                    fontSize: '0.86rem',
                    fontWeight: 800,
                    color: '#0F4C2C',
                    cursor: 'pointer'
                  }}
                >
                  <option value="Popular">Most Popular</option>
                  <option value="Newest">Newest Dates</option>
                  <option value="Oldest">Oldest Dates</option>
                  <option value="Highest Prize">Highest Prize</option>
                  <option value="Lowest Fee">Lowest Fee</option>
                  <option value="Most Registered">Most Registered</option>
                  <option value="Alphabetical">Alphabetical</option>
                </select>
              </div>

              {/* Grid / List View Toggle */}
              <div style={{ display: 'flex', background: '#FFFFFF', padding: '4px', borderRadius: '999px', border: '1px solid rgba(118,163,118,0.3)' }}>
                <button
                  onClick={() => setViewMode('grid')}
                  style={{
                    background: viewMode === 'grid' ? '#0F4C2C' : 'none',
                    color: viewMode === 'grid' ? '#FFFFFF' : '#5E7A5E',
                    border: 'none',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <Grid size={16} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  style={{
                    background: viewMode === 'list' ? '#0F4C2C' : 'none',
                    color: viewMode === 'list' ? '#FFFFFF' : '#5E7A5E',
                    border: 'none',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <List size={16} />
                </button>
              </div>

            </div>

          </div>

          {/* Collapsible Advanced Filter Panel */}
          {showAdvancedFilters && (
            <div style={{
              marginTop: '16px',
              padding: '20px',
              background: '#FFFFFF',
              borderRadius: '20px',
              border: '1.5px solid #76A376',
              boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px'
            }}>
              
              {/* Event Status Filter */}
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 800, color: '#5E7A5E', display: 'block', marginBottom: '6px' }}>
                  EVENT STATUS
                </label>
                <select
                  value={statusFilter}
                  onChange={e => { setStatusFilter(e.target.value); triggerLoading(); }}
                  style={filterSelectStyle}
                >
                  <option value="All">All Statuses</option>
                  <option value="Upcoming">Upcoming Events</option>
                  <option value="Ongoing">Ongoing Matches</option>
                  <option value="Completed">Completed Past Events</option>
                </select>
              </div>

              {/* Entry Fee Filter */}
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 800, color: '#5E7A5E', display: 'block', marginBottom: '6px' }}>
                  ENTRY PRICING TIER
                </label>
                <select
                  value={feeFilter}
                  onChange={e => { setFeeFilter(e.target.value); triggerLoading(); }}
                  style={filterSelectStyle}
                >
                  <option value="All">All Pricing Tiers</option>
                  <option value="Free">Free Entry Events</option>
                  <option value="Paid">Paid Entry Championships</option>
                </select>
              </div>

              {/* Location Filter */}
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 800, color: '#5E7A5E', display: 'block', marginBottom: '6px' }}>
                  LOCATION / HOST CITY
                </label>
                <select
                  value={locationFilter}
                  onChange={e => { setLocationFilter(e.target.value); triggerLoading(); }}
                  style={filterSelectStyle}
                >
                  {availableLocations.map(loc => (
                    <option key={loc} value={loc}>{loc === 'All' ? 'All Host Cities' : loc}</option>
                  ))}
                </select>
              </div>

              {/* Seats Left Availability Filter */}
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 800, color: '#5E7A5E', display: 'block', marginBottom: '6px' }}>
                  SEAT AVAILABILITY
                </label>
                <select
                  value={seatsFilter}
                  onChange={e => { setSeatsFilter(e.target.value); triggerLoading(); }}
                  style={filterSelectStyle}
                >
                  <option value="All">All Availability</option>
                  <option value="Filling Fast">Filling Fast (&lt;20 Seats)</option>
                </select>
              </div>

              {/* Reset All Filters Button */}
              <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                <button
                  onClick={resetFilters}
                  className="btn btn-gold"
                  style={{ width: '100%', padding: '10px', fontSize: '0.85rem', borderRadius: '12px' }}
                >
                  <RefreshCw size={14} />
                  Reset All Filters
                </button>
              </div>

            </div>
          )}

        </div>
      </div>

      {/* 4. MAIN EVENTS LIST & GRID DISPLAY CONTAINER */}
      <div style={{ maxWidth: '1280px', margin: '40px auto 0', padding: '0 24px' }}>
        
        {/* Results Info Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F4C2C', fontFamily: 'Cinzel, serif' }}>
            Showing {filteredEvents.length} Verified Tournaments
          </div>

          {/* Popular Searches Quick Tags */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.78rem', color: '#5E7A5E', fontWeight: 700 }}>Popular Searches:</span>
            {POPULAR_SEARCHES.map(tag => (
              <span
                key={tag}
                onClick={() => setSearchQuery(tag)}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid rgba(118, 163, 118, 0.4)',
                  padding: '3px 10px',
                  borderRadius: '999px',
                  fontSize: '0.75rem',
                  color: '#0F4C2C',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Loading Skeleton Cards Shimmer State */}
        {isLoading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '28px' }}>
            {[1, 2, 3, 4, 5, 6].map(n => (
              <div key={n} style={{
                background: '#FFFFFF',
                borderRadius: '20px',
                height: '380px',
                padding: '16px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.04)',
                border: '1px solid #E5E7EB'
              }}>
                <div style={{ width: '100%', height: '180px', background: '#E5E7EB', borderRadius: '12px', marginBottom: '16px' }} />
                <div style={{ width: '60%', height: '20px', background: '#E5E7EB', borderRadius: '6px', marginBottom: '12px' }} />
                <div style={{ width: '90%', height: '16px', background: '#E5E7EB', borderRadius: '6px', marginBottom: '8px' }} />
                <div style={{ width: '40%', height: '16px', background: '#E5E7EB', borderRadius: '6px' }} />
              </div>
            ))}
          </div>
        ) : filteredEvents.length > 0 ? (
          
          /* Events Grid / List Layout */
          <div style={{
            display: 'grid',
            gridTemplateColumns: viewMode === 'grid' ? 'repeat(auto-fill, minmax(320px, 1fr))' : '1fr',
            gap: '28px'
          }}>
            {filteredEvents.map(evt => (
              <EventCard
                key={evt.id}
                event={evt}
                onQuickPreview={setPreviewEvent}
                onShare={setShareEvent}
              />
            ))}
          </div>

        ) : (

          /* Premium Empty State when no events match */
          <div style={{
            background: '#FFFFFF',
            borderRadius: '24px',
            padding: '60px 24px',
            textAlign: 'center',
            boxShadow: '0 15px 35px rgba(28, 51, 28, 0.05)',
            border: '1.5px solid rgba(118, 163, 118, 0.3)',
            maxWidth: '640px',
            margin: '40px auto'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: '#FFFDF5',
              border: '2px solid #D4AF37',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
              color: '#B88E14'
            }}>
              <Trophy size={40} />
            </div>

            <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.8rem', color: '#0F4C2C', marginBottom: '10px', fontWeight: 800 }}>
              No Competitions Found
            </h3>
            
            <p style={{ color: '#5E7A5E', fontSize: '0.98rem', maxWidth: '440px', margin: '0 auto 24px', lineHeight: 1.6 }}>
              We couldn't find any events matching your selected filters or search term. Try adjusting your criteria or reset all filters.
            </p>

            <button
              onClick={resetFilters}
              className="btn btn-gold"
              style={{ padding: '12px 32px', fontSize: '0.92rem', borderRadius: '999px' }}
            >
              <RefreshCw size={16} />
              Reset All Filters
            </button>
          </div>

        )}

      </div>

      {/* 5. MODAL RENDERING */}
      {previewEvent && (
        <EventPreviewModal
          event={previewEvent}
          onClose={() => setPreviewEvent(null)}
          onOpenShare={(evt) => setShareEvent(evt)}
        />
      )}

      {shareEvent && (
        <EventShareModal
          event={shareEvent}
          onClose={() => setShareEvent(null)}
        />
      )}

    </div>
  );
};

const filterSelectStyle = {
  width: '100%',
  padding: '10px 14px',
  borderRadius: '12px',
  border: '1.5px solid rgba(118, 163, 118, 0.4)',
  fontSize: '0.88rem',
  fontWeight: 700,
  color: '#0F4C2C',
  background: '#F8FAF8',
  outline: 'none',
  cursor: 'pointer'
};

export default EventsView;
