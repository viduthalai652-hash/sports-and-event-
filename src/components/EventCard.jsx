import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  MapPin, Calendar, Clock, Users, Ticket, Trophy, Heart, Share2, 
  Eye, ShieldCheck, Flame, Star, Award, Zap 
} from 'lucide-react';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1517649763962-0c623266010b?auto=format&fit=crop&w=1200&q=80';

const EventCard = ({ event, onQuickPreview, onShare }) => {
  const { openEventDetails, openRegistrationModal, showToast } = useApp();
  const [isFavorite, setIsFavorite] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 3, hours: 14, mins: 21, secs: 45 });

  // Real-time Countdown Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.secs > 0) return { ...prev, secs: prev.secs - 1 };
        if (prev.mins > 0) return { ...prev, mins: 59, secs: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, mins: 59, secs: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, mins: 59, secs: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const percentFilled = Math.min(100, Math.round((event.registeredCount / event.maxSeats) * 100));
  const seatsLeft = Math.max(0, event.maxSeats - event.registeredCount);

  // Color Coding Seats Left
  const getSeatsColor = () => {
    if (seatsLeft <= 10) return '#DC2626'; // Red
    if (seatsLeft <= 20) return '#F97316'; // Orange
    return '#146B3A'; // Green
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    showToast(isFavorite ? `Removed ${event.title} from favorites` : `Saved ${event.title} to favorites!`, isFavorite ? 'info' : 'success');
  };

  const handleShareClick = (e) => {
    e.stopPropagation();
    if (onShare) onShare(event);
  };

  // Determine Special Badge
  const getSpecialBadge = () => {
    if (seatsLeft <= 10 && seatsLeft > 0) return { text: 'Limited Seats', bg: '#EF4444', icon: Flame };
    if (event.registeredCount > 1000) return { text: '🔥 Trending', bg: '#F59E0B', icon: Zap };
    if (event.fee > 2000) return { text: '💎 Premium', bg: '#8B5CF6', icon: Award };
    return { text: '🏆 Featured', bg: '#0F4C2C', icon: Trophy };
  };

  const specialBadge = getSpecialBadge();
  const BadgeIcon = specialBadge.icon;

  return (
    <div
      onClick={() => onQuickPreview ? onQuickPreview(event) : openEventDetails(event.id)}
      className="glass-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        background: '#FFFFFF',
        borderRadius: '20px',
        cursor: 'pointer',
        border: '1.5px solid rgba(118, 163, 118, 0.25)',
        boxShadow: '0 8px 24px rgba(28, 51, 28, 0.06)',
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease',
        position: 'relative'
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-6px)';
        e.currentTarget.style.boxShadow = '0 20px 40px rgba(15, 76, 44, 0.15)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(28, 51, 28, 0.06)';
      }}
    >
      
      {/* Banner Image with Hover Zoom */}
      <div style={{ position: 'relative', height: '210px', overflow: 'hidden' }}>
        <img
          src={event.banner || FALLBACK_IMAGE}
          alt={event.title}
          onError={e => { e.target.onerror = null; e.target.src = FALLBACK_IMAGE; }}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease'
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        />

        {/* Gradient Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(15,76,44,0.75) 100%)'
        }} />

        {/* Top Badges (Sport + Status + Special Badge) */}
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          right: '12px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '8px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span className="badge-gold" style={{ background: '#FFFFFF', color: '#0F4C2C', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
              <Trophy size={12} />
              {event.sport}
            </span>
            <span style={{
              background: specialBadge.bg,
              color: '#FFFFFF',
              fontSize: '0.72rem',
              fontWeight: 800,
              padding: '4px 10px',
              borderRadius: '999px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
            }}>
              <BadgeIcon size={11} />
              {specialBadge.text}
            </span>
          </div>

          <span className={`badge-status status-${event.status.toLowerCase()}`}>
            {event.status}
          </span>
        </div>

        {/* Favorite & Share Quick Overlay Buttons */}
        <div style={{
          position: 'absolute',
          bottom: '12px',
          left: '12px',
          display: 'flex',
          gap: '8px'
        }}>
          <button
            onClick={handleFavoriteClick}
            title="Save Event"
            style={{
              background: 'rgba(255, 255, 255, 0.9)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: isFavorite ? '#DC2626' : '#1C331C',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              transition: 'all 0.2s ease'
            }}
          >
            <Heart size={16} fill={isFavorite ? '#DC2626' : 'none'} />
          </button>

          <button
            onClick={handleShareClick}
            title="Share Event"
            style={{
              background: 'rgba(255, 255, 255, 0.9)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#0F4C2C',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
            }}
          >
            <Share2 size={16} />
          </button>
        </div>

        {/* Gold Price Tag Overlay */}
        <div style={{
          position: 'absolute',
          bottom: '12px',
          right: '12px',
          background: 'linear-gradient(135deg, #F7D358, #D4AF37)',
          color: '#0F4C2C',
          fontWeight: 900,
          padding: '4px 14px',
          borderRadius: '999px',
          fontSize: '0.86rem',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          fontFamily: 'Cinzel, serif'
        }}>
          {event.fee === 0 ? 'FREE ENTRY' : `₹${event.fee.toLocaleString()}`}
        </div>
      </div>

      {/* Content Section */}
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        
        {/* Organizer Verified Rating */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem', color: '#5E7A5E', fontWeight: 600 }}>
            <ShieldCheck size={14} style={{ color: '#22C55E' }} />
            <span>{event.organizer || 'SRV Federation'}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2px', fontSize: '0.75rem', color: '#B88E14', fontWeight: 800 }}>
            <Star size={12} fill="#D4AF37" style={{ color: '#D4AF37' }} />
            <span>4.8</span>
          </div>
        </div>

        {/* Event Title */}
        <h3 style={{
          fontFamily: 'Cinzel, serif',
          fontSize: '1.15rem',
          color: '#0F4C2C',
          marginBottom: '10px',
          lineHeight: 1.35,
          fontWeight: 800,
          minHeight: '2.7em'
        }}>
          {event.title}
        </h3>

        {/* Location & Date Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem', color: '#4A6053', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MapPin size={15} style={{ color: '#0F4C2C', flexShrink: 0 }} />
            <span className="truncate">{event.city}, {event.state} ({event.venue.split(',')[0]})</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Calendar size={15} style={{ color: '#0F4C2C' }} />
              <span>{event.date}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={15} style={{ color: '#0F4C2C' }} />
              <span>{event.time}</span>
            </div>
          </div>
        </div>

        {/* Prize Pool Display */}
        <div style={{
          background: '#FFFDF5',
          border: '1px solid #D4AF37',
          borderRadius: '10px',
          padding: '8px 12px',
          marginBottom: '14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.82rem'
        }}>
          <span style={{ color: '#5E7A5E', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Trophy size={15} style={{ color: '#D4AF37' }} />
            Prize Pool:
          </span>
          <span style={{ fontFamily: 'Cinzel, serif', fontWeight: 900, color: '#B88E14', fontSize: '0.92rem' }}>
            {event.prizes && event.prizes[0] ? event.prizes[0].split(':')[1] || '₹1,50,000' : '₹1,00,000'}
          </span>
        </div>

        {/* Live Countdown Timer Bar */}
        {event.status === 'Upcoming' && (
          <div style={{
            background: '#F8FAF8',
            border: '1px solid rgba(118, 163, 118, 0.3)',
            borderRadius: '8px',
            padding: '6px 10px',
            marginBottom: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.76rem'
          }}>
            <span style={{ color: '#6B7C72', fontWeight: 600 }}>Starts In:</span>
            <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, color: '#0F4C2C', letterSpacing: '0.5px' }}>
              {String(timeLeft.days).padStart(2, '0')}d : {String(timeLeft.hours).padStart(2, '0')}h : {String(timeLeft.mins).padStart(2, '0')}m : {String(timeLeft.secs).padStart(2, '0')}s
            </span>
          </div>
        )}

        {/* Capacity / Seats Progress Bar */}
        <div style={{ marginBottom: '18px', marginTop: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#6B7C72', marginBottom: '6px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Users size={14} style={{ color: '#146B3A' }} />
              {event.registeredCount} / {event.maxSeats} Registered ({percentFilled}%)
            </span>
            <span style={{ color: getSeatsColor(), fontWeight: 800 }}>
              {seatsLeft} Seats Left
            </span>
          </div>
          <div style={{
            height: '6px',
            width: '100%',
            background: '#E5E7EB',
            borderRadius: '999px',
            overflow: 'hidden'
          }}>
            <div style={{
              height: '100%',
              width: `${percentFilled}%`,
              background: seatsLeft <= 10 
                ? 'linear-gradient(90deg, #F87171, #DC2626)' 
                : 'linear-gradient(90deg, #146B3A, #F7D358)',
              borderRadius: '999px',
              transition: 'width 0.5s ease'
            }} />
          </div>
        </div>

        {/* Dual Action Buttons (Quick Preview + Register Now) */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onQuickPreview) onQuickPreview(event);
            }}
            title="Quick Preview"
            style={{
              background: '#F4F7F4',
              border: '1.5px solid rgba(118, 163, 118, 0.4)',
              color: '#0F4C2C',
              padding: '10px 14px',
              borderRadius: '999px',
              fontSize: '0.84rem',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#EAF5EB'}
            onMouseLeave={e => e.currentTarget.style.background = '#F4F7F4'}
          >
            <Eye size={15} />
            Preview
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              openRegistrationModal(event);
            }}
            disabled={seatsLeft === 0 || event.status === 'Completed'}
            className="btn btn-fern"
            style={{
              padding: '10px 18px',
              fontSize: '0.86rem',
              fontWeight: 800,
              flexGrow: 1,
              borderRadius: '999px',
              opacity: (seatsLeft === 0 || event.status === 'Completed') ? 0.5 : 1,
              cursor: (seatsLeft === 0 || event.status === 'Completed') ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 15px rgba(15, 76, 44, 0.2)',
              whiteSpace: 'nowrap'
            }}
          >
            <Ticket size={15} />
            {event.status === 'Completed' ? 'Closed' : seatsLeft === 0 ? 'Full' : 'Register Now'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default EventCard;
