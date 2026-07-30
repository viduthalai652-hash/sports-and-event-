import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import NotificationDetailsModal from '../components/NotificationDetailsModal';
import NotificationPreferencesModal from '../components/NotificationPreferencesModal';
import NotificationGalleryLightbox from '../components/NotificationGalleryLightbox';
import EventShareModal from '../components/EventShareModal';
import { 
  Bell, Search, Filter, Calendar, AlertTriangle, CheckCircle2, 
  Info, Clock, ArrowRight, ShieldCheck, Tag, Sparkles, ChevronDown, 
  Bookmark, Share2, Download, Eye, FileText, MapPin, Zap, Trophy, 
  Flame, Radio, Settings, RefreshCw, Send, Check
} from 'lucide-react';

const HIGHLIGHT_GALLERY = [
  {
    id: 'th-1',
    sport: 'Cricket',
    title: 'SRV All-India T20 Champions Trophy',
    location: 'Bengaluru Arena',
    caption: 'Karnataka Lions celebrating their ₹3,00,000 championship trophy victory.',
    image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'th-2',
    sport: 'Football',
    title: 'Goa Coastal Gold Cup Finals',
    location: 'Fatorda Stadium',
    caption: 'FC Coastline Strikers lifting the floodlit 7-a-side trophy.',
    image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'th-3',
    sport: 'Running',
    title: 'National Sea Link Marathon 2026',
    location: 'Bandra Promenade',
    caption: 'Over 1,200 runners crossing the finish line receiving gold medals.',
    image: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'th-4',
    sport: 'Badminton',
    title: 'Pro Open Singles Masters',
    location: 'Gachibowli Arena',
    caption: 'Ananya Deshmukh receiving the 2026 Masters singles trophy.',
    image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'th-5',
    sport: 'Kabaddi',
    title: 'Pro-Mat Kabaddi Championship',
    location: 'Kanteerava Stadium',
    caption: 'Deccan Raiders executing the winning super raid in the final minute.',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623266010b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'th-6',
    sport: 'Volleyball',
    title: 'Beach Spike Super Cup',
    location: 'Calangute Arena',
    caption: 'Sunset beach volleyball spike match point victory ceremony.',
    image: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=800&q=80'
  }
];

const NotificationsView = () => {
  const appContext = useApp() || {};
  const notifications = appContext.notifications || [];
  const navigateTo = appContext.navigateTo || (() => {});

  // State Management
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [sportFilter, setSportFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('Newest');
  
  // Bookmarks state
  const [bookmarkedIds, setBookmarkedIds] = useState([]);

  // Modals state
  const [activeDetailNotice, setActiveDetailNotice] = useState(null);
  const [showPreferencesModal, setShowPreferencesModal] = useState(false);
  const [activeShareNotice, setActiveShareNotice] = useState(null);

  // Gallery state
  const [selectedGalleryCategory, setSelectedGalleryCategory] = useState('All');
  const [activeGalleryIdx, setActiveGalleryIdx] = useState(null);

  // Newsletter state
  const [emailInput, setEmailInput] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Toggle Bookmark
  const toggleBookmark = (id) => {
    setBookmarkedIds(prev => 
      prev.includes(id) ? prev.filter(bId => bId !== id) : [...prev, id]
    );
  };

  // Filtered Notifications Logic
  const filteredNotifications = useMemo(() => {
    let list = [...notifications];

    if (selectedCategory !== 'All') {
      list = list.filter(n => (n.category || '').toLowerCase() === selectedCategory.toLowerCase());
    }

    if (priorityFilter !== 'All') {
      list = list.filter(n => (n.priority || '').toLowerCase() === priorityFilter.toLowerCase());
    }

    if (sportFilter !== 'All') {
      list = list.filter(n => (n.sport || '').toLowerCase() === sportFilter.toLowerCase());
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(n => 
        (n.title || '').toLowerCase().includes(q) ||
        (n.content || n.desc || '').toLowerCase().includes(q) ||
        (n.organizer || '').toLowerCase().includes(q) ||
        (n.sport || '').toLowerCase().includes(q)
      );
    }

    return list.sort((a, b) => {
      if (sortBy === 'Newest') return new Date(b.date || '2026-01-01') - new Date(a.date || '2026-01-01');
      if (sortBy === 'Oldest') return new Date(a.date || '2026-01-01') - new Date(b.date || '2026-01-01');
      if (sortBy === 'Alphabetical') return (a.title || '').localeCompare(b.title || '');
      return 0;
    });
  }, [notifications, selectedCategory, priorityFilter, sportFilter, searchQuery, sortBy]);

  // Gallery Filtering
  const filteredGallery = useMemo(() => {
    if (selectedGalleryCategory === 'All') return HIGHLIGHT_GALLERY;
    return HIGHLIGHT_GALLERY.filter(item => item.sport === selectedGalleryCategory);
  }, [selectedGalleryCategory]);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) return;
    setIsSubscribed(true);
    setTimeout(() => {
      setEmailInput('');
    }, 2000);
  };

  return (
    <div style={{ paddingTop: '0px', paddingBottom: '60px', minHeight: '85vh', background: '#F8FAF8' }}>
      
      {/* 1. BREAKING NEWS TICKER (TOP SCROLLING MARQUEE BANNER) */}
      <div style={{
        background: 'linear-gradient(90deg, #0F4C2C 0%, #1C331C 100%)',
        color: '#F7D358',
        padding: '10px 24px',
        fontSize: '0.85rem',
        fontWeight: 800,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        overflow: 'hidden',
        borderBottom: '1.5px solid #D4AF37'
      }}>
        <div style={{
          background: '#DC2626',
          color: '#FFFFFF',
          padding: '2px 10px',
          borderRadius: '999px',
          fontSize: '0.75rem',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          flexShrink: 0
        }}>
          <Radio size={12} className="animate-pulse" />
          LIVE TICKER
        </div>

        <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', width: '100%' }}>
          <div style={{
            display: 'inline-block',
            animation: 'marquee 25s linear infinite',
            cursor: 'pointer'
          }}>
            ⚡ <strong>URGENT:</strong> Registration Closing Today for Goa Coastal Football Cup • 🏆 T20 Cricket Semi-Final Fixtures Released • 🏃 National Sea Link Marathon Digital Passes Issued • 🛡️ 0% Commission Organizer Payout Escrow Verified • 📢 All-India Pro Badminton Masters Schedule Published
          </div>
        </div>
      </div>

      {/* 2. COMPACT HERO SECTION (~240px Height) */}
      <div style={{
        position: 'relative',
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
        marginRight: 'calc(-50vw + 50%)',
        marginTop: '0px',
        marginBottom: '0px',
        padding: '45px 24px 40px',
        textAlign: 'center',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '240px',
        background: 'linear-gradient(135deg, #0F4C2C 0%, #1C331C 100%)'
      }}>
        {/* Full-Bleed Olympic Champions Banner */}
        <img
          src="/sports-banner.png"
          alt="Sports Announcements Banner"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 35%',
            zIndex: 0,
            opacity: 0.35
          }}
        />

        <div style={{ position: 'relative', zIndex: 10, maxWidth: '960px', margin: '0 auto' }}>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '14px' }}>
            <span className="badge-gold animate-pulse-gold">
              <Radio size={14} style={{ color: '#DC2626' }} />
              LIVE NOTIFICATION CENTER
            </span>
            <button
              onClick={() => setShowPreferencesModal(true)}
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                color: '#0F4C2C',
                border: '1px solid #D4AF37',
                borderRadius: '999px',
                padding: '4px 14px',
                fontSize: '0.78rem',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Settings size={14} />
              Alert Preferences
            </button>
          </div>

          <h1 style={{
            fontFamily: 'Cinzel, serif',
            fontSize: 'clamp(2.1rem, 4.2vw, 3.2rem)',
            color: '#FFFFFF',
            fontWeight: 900,
            lineHeight: 1.2,
            marginBottom: '14px',
            textShadow: '0 3px 14px rgba(0,0,0,0.6)'
          }}>
            Real-Time Tournament Updates & Announcements
          </h1>

          {/* Real-time Search Input inside Hero */}
          <div style={{ position: 'relative', maxWidth: '640px', margin: '0 auto 14px' }}>
            <input
              type="text"
              placeholder="Search announcements, sports, cities, or organizers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '14px 20px 14px 48px',
                borderRadius: '999px',
                border: '2px solid #D4AF37',
                fontSize: '0.95rem',
                outline: 'none',
                boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
                background: '#FFFFFF',
                color: '#1C331C',
                fontWeight: 600
              }}
            />
            <Search size={20} style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)', color: '#0F4C2C' }} />
          </div>

          {/* Trending Tags */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap', fontSize: '0.82rem', color: '#EAF2EA' }}>
            <span style={{ fontWeight: 700, color: '#F7D358' }}>Trending Tags:</span>
            {['#Registration', '#Football', '#Cricket', '#Marathon', '#Results'].map(tag => (
              <button
                key={tag}
                onClick={() => setSearchQuery(tag.replace('#', ''))}
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  border: '1px solid rgba(247, 211, 88, 0.4)',
                  borderRadius: '999px',
                  padding: '2px 10px',
                  color: '#FFFFFF',
                  fontSize: '0.78rem',
                  cursor: 'pointer'
                }}
              >
                {tag}
              </button>
            ))}
          </div>

        </div>
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>

        {/* 3. LIVE NOTIFICATION COUNTER STAT CARDS */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '16px',
          marginTop: '32px',
          marginBottom: '40px'
        }}>
          {[
            { count: '18', label: "Today's Updates", color: '#0F4C2C', icon: Bell },
            { count: '6', label: 'Unread Notices', color: '#B88E14', icon: Sparkles },
            { count: '42', label: 'Upcoming Events', color: '#2563EB', icon: Calendar },
            { count: '9', label: 'Registration Closing', color: '#DC2626', icon: Clock },
            { count: '12', label: 'Winner Announcements', color: '#D4AF37', icon: Trophy }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '18px',
                  padding: '20px 16px',
                  textAlign: 'center',
                  border: '1.5px solid rgba(118, 163, 118, 0.3)',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.04)',
                  transition: 'transform 0.2s ease'
                }}
              >
                <Icon size={20} style={{ color: item.color, margin: '0 auto 6px' }} />
                <div style={{ fontFamily: 'Cinzel, serif', fontSize: '1.8rem', fontWeight: 900, color: item.color }}>
                  {item.count}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#5E7A5E', fontWeight: 700, marginTop: '2px' }}>
                  {item.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* 4. FEATURED URGENT ANNOUNCEMENT SHOWCASE BANNER */}
        <div style={{
          background: 'linear-gradient(135deg, #0F4C2C 0%, #1C331C 100%)',
          borderRadius: '24px',
          padding: '32px',
          color: '#FFFFFF',
          marginBottom: '40px',
          border: '2px solid #D4AF37',
          boxShadow: '0 15px 35px rgba(15,76,44,0.2)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          alignItems: 'center'
        }}>
          <div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '12px' }}>
              <span className="badge-gold">
                🔥 FEATURED URGENT NOTICE
              </span>
              <span style={{ background: '#DC2626', color: '#FFFFFF', padding: '4px 12px', borderRadius: '999px', fontSize: '0.78rem', fontWeight: 800 }}>
                Deadline Tonight
              </span>
            </div>

            <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.8rem', color: '#FFFFFF', fontWeight: 900, marginBottom: '10px' }}>
              SRV All-India T20 Finals Registration Closing Tonight
            </h2>

            <p style={{ color: '#EAF2EA', fontSize: '0.94rem', lineHeight: 1.6, marginBottom: '20px', fontFamily: 'Poppins, sans-serif' }}>
              Final 4 team slots remaining for Chinnaswamy Stadium floodlit tournament. Verified scannable QR passes will be generated immediately upon registration checkout.
            </p>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <button
                onClick={() => navigateTo('events')}
                className="btn btn-gold"
                style={{ padding: '12px 28px', fontSize: '0.9rem', borderRadius: '999px' }}
              >
                Register Now Before Deadline
                <ArrowRight size={16} />
              </button>
              <button
                onClick={() => setActiveDetailNotice({
                  id: 'feat-notice',
                  title: 'SRV All-India T20 Finals Registration Closing Tonight',
                  category: 'DEADLINES',
                  priority: 'Critical',
                  date: 'Today',
                  organizer: 'Karnataka Cricket Association',
                  readTime: '2 min read',
                  content: 'Final team slots remaining for Chinnaswamy Stadium floodlit tournament. Official rules, fixture brackets, and gate pass tokens will be issued instantly.'
                })}
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  color: '#FFFFFF',
                  border: '1.5px solid #FFFFFF',
                  borderRadius: '999px',
                  padding: '12px 24px',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: 'pointer'
                }}
              >
                Read Full Details
              </button>
            </div>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '20px',
            padding: '24px',
            border: '1px solid rgba(247, 211, 88, 0.4)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#F7D358', textTransform: 'uppercase' }}>
              Registration Countdown Timer
            </div>
            <div style={{ fontFamily: 'Cinzel, serif', fontSize: '2rem', fontWeight: 900, color: '#FFFFFF', marginTop: '6px' }}>
              04h : 18m : 32s
            </div>
            <div style={{ fontSize: '0.78rem', color: '#EAF2EA', marginTop: '8px' }}>
              Only 4 Team Seats Left • Instant Escrow Prize Verification
            </div>
          </div>
        </div>

        {/* 5. STICKY SMART FILTER BAR */}
        <div style={{
          position: 'sticky',
          top: '80px',
          zIndex: 40,
          background: 'rgba(248, 250, 248, 0.96)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          padding: '16px 20px',
          marginBottom: '32px',
          border: '1.5px solid rgba(118, 163, 118, 0.3)',
          boxShadow: '0 8px 24px rgba(28, 51, 28, 0.06)',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            
            {/* Category Filter Pills */}
            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
              {['All', 'Schedules', 'Results', 'Deadlines', 'Alerts', 'Platform'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '8px 18px',
                    borderRadius: '999px',
                    fontSize: '0.85rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    border: selectedCategory.toLowerCase() === cat.toLowerCase() ? '1.5px solid #D4AF37' : '1px solid rgba(118,163,118,0.3)',
                    background: selectedCategory.toLowerCase() === cat.toLowerCase() ? 'linear-gradient(135deg, #0F4C2C, #1C331C)' : '#FFFFFF',
                    color: selectedCategory.toLowerCase() === cat.toLowerCase() ? '#FFFFFF' : '#1C331C'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sort & Filter Selectors */}
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              
              {/* Priority Filter */}
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                style={{
                  padding: '8px 14px',
                  borderRadius: '999px',
                  border: '1px solid rgba(118,163,118,0.4)',
                  background: '#FFFFFF',
                  color: '#1C331C',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="All">All Priorities</option>
                <option value="Critical">🔴 Critical</option>
                <option value="Deadline">🟠 Deadline</option>
                <option value="New">🟢 New Event</option>
                <option value="Info">🔵 Info</option>
                <option value="Winner">🏆 Winner</option>
              </select>

              {/* Sort Selector */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  padding: '8px 14px',
                  borderRadius: '999px',
                  border: '1px solid rgba(118,163,118,0.4)',
                  background: '#FFFFFF',
                  color: '#1C331C',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="Newest">Sort: Newest</option>
                <option value="Oldest">Sort: Oldest</option>
                <option value="Alphabetical">Sort: Alphabetical</option>
              </select>

            </div>

          </div>
        </div>

        {/* 6. MAIN CONTENT LAYOUT (CARDS GRID + RIGHT SIDEBAR) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', marginBottom: '70px' }}>
          
          {/* LEFT: REDESIGNED NOTIFICATION CARDS LIST */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', gridColumn: 'span 2' }}>
            
            {filteredNotifications.length === 0 ? (
              <div style={{
                background: '#FFFFFF',
                borderRadius: '24px',
                padding: '50px 24px',
                textAlign: 'center',
                border: '1.5px solid rgba(118,163,118,0.3)'
              }}>
                <Bell size={40} style={{ color: '#D4AF37', margin: '0 auto 16px' }} />
                <h3 style={{ fontFamily: 'Cinzel, serif', color: '#0F4C2C', fontSize: '1.4rem', fontWeight: 800 }}>
                  No Announcements Match Your Search
                </h3>
                <p style={{ color: '#5E7A5E', fontSize: '0.9rem', marginTop: '6px' }}>
                  Try resetting your category or search query filters to explore all updates.
                </p>
                <button
                  onClick={() => { setSelectedCategory('All'); setPriorityFilter('All'); setSearchQuery(''); }}
                  className="btn btn-gold"
                  style={{ marginTop: '20px', padding: '10px 24px', fontSize: '0.88rem', borderRadius: '999px' }}
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              filteredNotifications.map((notice) => {
                const isBookmarked = bookmarkedIds.includes(notice.id);
                return (
                  <div
                    key={notice.id}
                    className="glass-card"
                    style={{
                      background: '#FFFFFF',
                      borderRadius: '24px',
                      padding: '24px 28px',
                      border: '1.5px solid rgba(118, 163, 118, 0.3)',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.04)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow = '0 15px 35px rgba(15,76,44,0.1)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.04)';
                    }}
                  >
                    <div>
                      {/* Badges Row */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                          <span className="badge-gold">
                            {notice.category || 'GENERAL'}
                          </span>
                          {notice.priority && (
                            <span style={{
                              background: notice.priority === 'Critical' ? '#DC2626' : '#D4AF37',
                              color: '#FFFFFF',
                              padding: '2px 10px',
                              borderRadius: '999px',
                              fontSize: '0.75rem',
                              fontWeight: 800
                            }}>
                              {notice.priority}
                            </span>
                          )}
                          <span style={{ fontSize: '0.78rem', color: '#6B7C72', fontWeight: 600 }}>
                            • {notice.date || 'Today'}
                          </span>
                        </div>

                        {/* Quick Actions */}
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            onClick={() => toggleBookmark(notice.id)}
                            title="Bookmark announcement"
                            style={{
                              background: '#F4F7F4',
                              border: 'none',
                              borderRadius: '50%',
                              width: '34px',
                              height: '34px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                              color: isBookmarked ? '#B88E14' : '#6B7C72'
                            }}
                          >
                            <Bookmark size={16} fill={isBookmarked ? '#B88E14' : 'none'} />
                          </button>
                          <button
                            onClick={() => setActiveShareNotice(notice)}
                            title="Share announcement"
                            style={{
                              background: '#F4F7F4',
                              border: 'none',
                              borderRadius: '50%',
                              width: '34px',
                              height: '34px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                              color: '#0F4C2C'
                            }}
                          >
                            <Share2 size={16} />
                          </button>
                        </div>
                      </div>

                      <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.3rem', color: '#0F4C2C', fontWeight: 900, marginBottom: '8px' }}>
                        {notice.title}
                      </h3>

                      <p style={{ color: '#4A6053', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '16px', fontFamily: 'Poppins, sans-serif' }}>
                        {notice.content || notice.desc}
                      </p>
                    </div>

                    {/* Footer Actions Row */}
                    <div style={{ paddingTop: '14px', borderTop: '1px solid #F1F5F1', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                      <div style={{ fontSize: '0.8rem', color: '#5E7A5E', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <ShieldCheck size={14} style={{ color: '#0F4C2C' }} />
                        <span>Host: {notice.organizer || 'SRV Official Committee'}</span>
                      </div>

                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button
                          onClick={() => setActiveDetailNotice(notice)}
                          style={{
                            background: '#FFFDF5',
                            color: '#0F4C2C',
                            border: '1.5px solid #D4AF37',
                            borderRadius: '999px',
                            padding: '8px 20px',
                            fontSize: '0.82rem',
                            fontWeight: 800,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                          }}
                        >
                          <Eye size={14} />
                          Read Full Details
                        </button>
                        <button
                          onClick={() => navigateTo('events')}
                          style={{
                            background: 'linear-gradient(135deg, #0F4C2C, #1C331C)',
                            color: '#FFFFFF',
                            border: 'none',
                            borderRadius: '999px',
                            padding: '8px 20px',
                            fontSize: '0.82rem',
                            fontWeight: 800,
                            cursor: 'pointer'
                          }}
                        >
                          Proceed
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}

          </div>

          {/* RIGHT SIDEBAR: LIVE ACTIVITY STREAM & POPULAR TOPICS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Live Activity Stream Panel */}
            <div style={{
              background: '#FFFFFF',
              borderRadius: '24px',
              padding: '24px',
              border: '1.5px solid rgba(118,163,118,0.3)',
              boxShadow: '0 8px 20px rgba(0,0,0,0.04)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <Radio size={18} style={{ color: '#DC2626' }} className="animate-pulse" />
                <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.15rem', color: '#0F4C2C', fontWeight: 800 }}>
                  Live Platform Activity
                </h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {[
                  { text: 'Vikram Mehta registered for Sea Link Marathon', time: '2 mins ago', icon: CheckCircle2 },
                  { text: 'Karnataka Lions won T20 Cricket Championship', time: '5 mins ago', icon: Trophy },
                  { text: 'New 7-a-side Football Cup published in Goa', time: '12 mins ago', icon: Zap },
                  { text: 'Age verification rulebook PDF updated', time: '25 mins ago', icon: FileText }
                ].map((act, idx) => {
                  const ActIcon = act.icon;
                  return (
                    <div key={idx} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '0.84rem' }}>
                      <ActIcon size={16} style={{ color: '#0F4C2C', flexShrink: 0, marginTop: '2px' }} />
                      <div>
                        <div style={{ color: '#1C331C', fontWeight: 600 }}>{act.text}</div>
                        <div style={{ fontSize: '0.75rem', color: '#6B7C72', marginTop: '1px' }}>{act.time}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Instant Newsletter Alert Widget */}
            <div style={{
              background: 'linear-gradient(135deg, #0F4C2C, #1C331C)',
              borderRadius: '24px',
              padding: '24px',
              color: '#FFFFFF',
              border: '1.5px solid #D4AF37'
            }}>
              <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.2rem', color: '#FFFFFF', fontWeight: 800, marginBottom: '8px' }}>
                Instant SMS & Email Alerts
              </h3>
              <p style={{ fontSize: '0.84rem', color: '#EAF2EA', lineHeight: 1.5, marginBottom: '16px' }}>
                Get instant notifications for new tournament registrations, schedule changes, and winner results.
              </p>

              {isSubscribed ? (
                <div style={{ background: '#FFFDF5', color: '#0F4C2C', padding: '12px', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 800, textTransform: 'center' }}>
                  ✓ You are subscribed to instant SRV alerts!
                </div>
              ) : (
                <form onSubmit={handleSubscribe} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <input
                    type="email"
                    placeholder="Enter your email address..."
                    value={emailInput}
                    onChange={e => setEmailInput(e.target.value)}
                    required
                    style={{
                      padding: '10px 16px',
                      borderRadius: '999px',
                      border: 'none',
                      fontSize: '0.85rem',
                      outline: 'none'
                    }}
                  />
                  <button
                    type="submit"
                    className="btn btn-gold"
                    style={{ padding: '10px', fontSize: '0.85rem', borderRadius: '999px', justifyContent: 'center' }}
                  >
                    <Send size={14} />
                    Subscribe Alerts
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>

        {/* 7. TOURNAMENT HIGHLIGHTS GALLERY (NEW SECTION) */}
        <div style={{ marginBottom: '70px' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <span className="badge-gold" style={{ marginBottom: '12px' }}>TOURNAMENT HIGHLIGHTS GALLERY</span>
            <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: '2.4rem', color: '#0F4C2C', fontWeight: 900 }}>
              Winner Celebrations & Moments
            </h2>
            <p style={{ color: '#4A6053', fontSize: '0.98rem', marginTop: '8px', maxWidth: '640px', margin: '8px auto 0' }}>
              <em>"Celebrating unforgettable prize distributions, crowd atmospheres, and champions across India."</em>
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '28px' }}>
            {['All', 'Cricket', 'Football', 'Running', 'Badminton', 'Kabaddi', 'Volleyball'].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedGalleryCategory(cat)}
                style={{
                  padding: '8px 18px',
                  borderRadius: '999px',
                  fontSize: '0.84rem',
                  fontWeight: 800,
                  fontFamily: "'Outfit', sans-serif",
                  cursor: 'pointer',
                  border: selectedGalleryCategory === cat ? '1.5px solid #D4AF37' : '1px solid rgba(118,163,118,0.3)',
                  background: selectedGalleryCategory === cat ? 'linear-gradient(135deg, #0F4C2C, #1C331C)' : '#FFFFFF',
                  color: selectedGalleryCategory === cat ? '#FFFFFF' : '#1C331C'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
            {filteredGallery.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => setActiveGalleryIdx(idx)}
                style={{
                  position: 'relative',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  height: '260px',
                  cursor: 'pointer',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                  border: '1.5px solid rgba(118,163,118,0.3)'
                }}
              >
                <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(15,76,44,0.85) 100%)',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  color: '#FFFFFF'
                }}>
                  <span className="badge-gold" style={{ background: '#FFFFFF', color: '#0F4C2C', width: 'fit-content', marginBottom: '6px' }}>
                    <Trophy size={12} />
                    {item.sport}
                  </span>
                  <h4 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.15rem', color: '#FFFFFF', fontWeight: 800 }}>
                    {item.title}
                  </h4>
                  <div style={{ fontSize: '0.8rem', color: '#F7D358', marginTop: '2px', fontWeight: 700 }}>
                    {item.caption}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Detail Reader Modal */}
      {activeDetailNotice && (
        <NotificationDetailsModal
          notification={activeDetailNotice}
          onClose={() => setActiveDetailNotice(null)}
          isBookmarked={bookmarkedIds.includes(activeDetailNotice.id)}
          onBookmark={() => toggleBookmark(activeDetailNotice.id)}
          onShare={() => setActiveShareNotice(activeDetailNotice)}
        />
      )}

      {/* Preferences Modal */}
      {showPreferencesModal && (
        <NotificationPreferencesModal
          onClose={() => setShowPreferencesModal(false)}
          onSave={(prefs) => console.log('Saved prefs:', prefs)}
        />
      )}

      {/* Share Modal */}
      {activeShareNotice && (
        <EventShareModal
          event={{
            id: activeShareNotice.id,
            title: activeShareNotice.title,
            sport: activeShareNotice.category || 'Sports Announcement',
            city: activeShareNotice.organizer || 'SRV Platform',
            date: activeShareNotice.date || '2026'
          }}
          onClose={() => setActiveShareNotice(null)}
        />
      )}

    </div>
  );
};

export default NotificationsView;
