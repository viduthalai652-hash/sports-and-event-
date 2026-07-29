import React from 'react';
import { useApp } from '../context/AppContext';
import { MapPin, Calendar, Clock, Users, Ticket, ArrowUpRight, Trophy } from 'lucide-react';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1517649763962-0c623266010b?auto=format&fit=crop&w=1200&q=80';

const EventCard = ({ event }) => {
  const { openEventDetails, openRegistrationModal } = useApp();

  const percentFilled = Math.min(100, Math.round((event.registeredCount / event.maxSeats) * 100));
  const seatsLeft = Math.max(0, event.maxSeats - event.registeredCount);

  return (
    <div
      onClick={() => openEventDetails(event.id)}
      className="glass-card"
      style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#FFFFFF', cursor: 'pointer', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}
    >
      
      {/* Banner Image with Hover Zoom & Badges */}
      <div style={{ position: 'relative', height: '190px', overflow: 'hidden' }}>
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
          background: 'linear-gradient(180deg, rgba(15,76,44,0.2) 0%, rgba(15,76,44,0.7) 100%)'
        }} />

        {/* Top Badges */}
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          right: '12px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span className="badge-gold" style={{ background: '#FFFFFF', color: '#0F4C2C' }}>
            <Trophy size={13} />
            {event.sport}
          </span>
          <span className={`badge-status status-${event.status.toLowerCase()}`}>
            {event.status}
          </span>
        </div>

        {/* Price Tag Overlay */}
        <div style={{
          position: 'absolute',
          bottom: '12px',
          right: '12px',
          background: 'linear-gradient(135deg, #F7D358, #D4AF37)',
          color: '#0F4C2C',
          fontWeight: 800,
          padding: '4px 12px',
          borderRadius: '999px',
          fontSize: '0.85rem',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          fontFamily: 'Cinzel, serif'
        }}>
          {event.fee === 0 ? 'FREE ENTRY' : `₹${event.fee.toLocaleString()}`}
        </div>
      </div>

      {/* Content Section */}
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyBetween: 'space-between' }}>
        
        <div>
          <h3 style={{
            fontFamily: 'Cinzel, serif',
            fontSize: '1.15rem',
            color: '#0F4C2C',
            marginBottom: '10px',
            lineHeight: 1.35,
            minHeight: '2.7em'
          }}>
            {event.title}
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem', color: '#4A6053', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MapPin size={15} style={{ color: '#0F4C2C', flexShrink: 0 }} />
              <span className="truncate">{event.city}, {event.state} ({event.venue.split(',')[0]})</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
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
        </div>

        {/* Capacity / Seats Progress Bar */}
        <div style={{ marginBottom: '18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#6B7C72', marginBottom: '6px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Users size={14} style={{ color: '#146B3A' }} />
              {event.registeredCount} / {event.maxSeats} Registered
            </span>
            <span style={{ color: seatsLeft < 50 ? '#DC2626' : '#0F4C2C', fontWeight: 700 }}>
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
              background: seatsLeft < 50 
                ? 'linear-gradient(90deg, #F87171, #DC2626)' 
                : 'linear-gradient(90deg, #146B3A, #F7D358)',
              borderRadius: '999px',
              transition: 'width 0.5s ease'
            }} />
          </div>
        </div>

        {/* Single Prominent Action Button (Navigates to Event Details & Registration) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            openEventDetails(event.id);
          }}
          disabled={seatsLeft === 0 || event.status === 'Completed'}
          className="btn btn-fern"
          style={{
            padding: '12px 16px',
            fontSize: '0.9rem',
            fontWeight: 700,
            width: '100%',
            marginTop: 'auto',
            borderRadius: '999px',
            opacity: (seatsLeft === 0 || event.status === 'Completed') ? 0.5 : 1,
            cursor: (seatsLeft === 0 || event.status === 'Completed') ? 'not-allowed' : 'pointer'
          }}
        >
          <Ticket size={16} />
          {event.status === 'Completed' ? 'Registration Closed' : seatsLeft === 0 ? 'Seats Full' : 'Register Now'}
        </button>

      </div>
    </div>
  );
};

export default EventCard;
