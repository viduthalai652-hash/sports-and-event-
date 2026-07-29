import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_EVENTS, INITIAL_NOTIFICATIONS, USER_REVIEWS, PAST_WINNERS } from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Navigation State
  const [currentView, setCurrentView] = useState('home');
  const [selectedSportFilter, setSelectedSportFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEventId, setSelectedEventId] = useState(null);

  // User & Admin Auth State
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('srv_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('srv_is_admin') === 'true';
  });

  // Dynamic Data States with LocalStorage Persistence
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('srv_events');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.map(evt => {
          const matchingInit = INITIAL_EVENTS.find(i => i.id === evt.id);
          if (matchingInit) {
            return { ...evt, banner: matchingInit.banner };
          }
          return evt;
        });
      } catch (err) {
        return INITIAL_EVENTS;
      }
    }
    return INITIAL_EVENTS;
  });

  const [registrations, setRegistrations] = useState(() => {
    const saved = localStorage.getItem('srv_registrations');
    return saved ? JSON.parse(saved) : [
      {
        id: 'reg-801',
        eventId: 'evt-001',
        eventTitle: 'SRV National Marathon Championship 2026',
        fullName: 'Vikram Mehta',
        email: 'vikram@example.com',
        phone: '+91 9876543210',
        gender: 'Male',
        category: '21K Half Marathon',
        idType: 'Aadhaar Card',
        idNumber: 'XXXX-XXXX-4921',
        emergencyContact: '+91 9876500000',
        status: 'Approved',
        registeredAt: '2026-07-27T10:30:00Z',
        receiptNo: 'SRV-2026-MAR-0089'
      }
    ];
  });

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('srv_notifications');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.map(notif => {
          const matchingInit = INITIAL_NOTIFICATIONS.find(i => i.id === notif.id);
          if (matchingInit) {
            return { ...notif, image: matchingInit.image };
          }
          return notif;
        });
      } catch (err) {
        return INITIAL_NOTIFICATIONS;
      }
    }
    return INITIAL_NOTIFICATIONS;
  });

  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem('srv_reviews');
    return saved ? JSON.parse(saved) : USER_REVIEWS;
  });

  const [winners, setWinners] = useState(() => {
    const saved = localStorage.getItem('srv_winners');
    return saved ? JSON.parse(saved) : PAST_WINNERS;
  });

  // Modal & Toast States
  const [activeModal, setActiveModal] = useState(null);
  const [toast, setToast] = useState(null);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('srv_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('srv_registrations', JSON.stringify(registrations));
  }, [registrations]);

  useEffect(() => {
    localStorage.setItem('srv_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('srv_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('srv_winners', JSON.stringify(winners));
  }, [winners]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('srv_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('srv_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('srv_is_admin', isAdmin ? 'true' : 'false');
  }, [isAdmin]);

  // Toast Handler
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // View Navigation
  const navigateTo = (view, sportFilter = null) => {
    setCurrentView(view);
    if (sportFilter !== null) {
      setSelectedSportFilter(sportFilter);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Modal Handlers
  const closeModal = () => setActiveModal(null);

  const openEventDetails = (eventId) => {
    setSelectedEventId(eventId);
    setCurrentView('event-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openRegistrationModal = (eventId) => {
    const eventObj = events.find(e => e.id === eventId);
    if (eventObj) {
      setActiveModal({ type: 'register', event: eventObj });
    }
  };

  const openVideoModal = (videoUrl, title) => {
    setActiveModal({ type: 'video', videoUrl, title });
  };

  // Action Methods
  const registerForEvent = (registrationData) => {
    const newReg = {
      id: 'reg-' + Date.now(),
      ...registrationData,
      status: 'Approved',
      registeredAt: new Date().toISOString(),
      receiptNo: 'SRV-2026-' + Math.floor(100000 + Math.random() * 900000)
    };

    setRegistrations(prev => [newReg, ...prev]);

    // Increment registered count for event
    setEvents(prev => prev.map(evt => {
      if (evt.id === registrationData.eventId) {
        return { ...evt, registeredCount: evt.registeredCount + 1 };
      }
      return evt;
    }));

    showToast(`Registration Successful! Receipt #${newReg.receiptNo} issued.`, 'success');
    return newReg;
  };

  // Auth Methods
  const loginUser = (email, name = 'Participant User') => {
    const userData = { email, name, role: 'Participant' };
    setUser(userData);
    setIsAdmin(false);
    showToast(`Welcome back, ${name}!`, 'success');
    navigateTo('events');
  };

  const loginAdmin = (adminId, password) => {
    if (adminId === 'admin' && password === 'password123') {
      const adminData = { adminId: 'SRV-ADMIN-01', name: 'SRV Executive Admin', role: 'Administrator' };
      setUser(adminData);
      setIsAdmin(true);
      showToast('Admin Access Granted. Welcome to SRV Dashboard!', 'success');
      navigateTo('admin');
      return true;
    } else {
      showToast('Invalid Admin Credentials. Try admin / password123', 'error');
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
    showToast('Logged out successfully', 'info');
    navigateTo('home');
  };

  // Admin CRUD Methods
  const createEvent = (newEvent) => {
    const created = {
      id: 'evt-' + Date.now(),
      registeredCount: 0,
      status: 'Upcoming',
      banner: newEvent.banner || 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80',
      gallery: [],
      rules: newEvent.rules ? newEvent.rules.split('\n') : ['Standard tournament rules apply.'],
      prizes: newEvent.prizes ? newEvent.prizes.split('\n') : ['Official Trophies & Medals'],
      ...newEvent
    };

    setEvents(prev => [created, ...prev]);
    showToast(`Event "${created.title}" successfully created and published!`, 'success');
  };

  const updateEvent = (eventId, updatedFields) => {
    setEvents(prev => prev.map(e => e.id === eventId ? { ...e, ...updatedFields } : e));
    showToast('Event details updated successfully.', 'success');
  };

  const deleteEvent = (eventId) => {
    setEvents(prev => prev.filter(e => e.id !== eventId));
    showToast('Event deleted from platform.', 'info');
  };

  const toggleEventStatus = (eventId) => {
    setEvents(prev => prev.map(e => {
      if (e.id === eventId) {
        const nextStatus = e.status === 'Upcoming' ? 'Ongoing' : e.status === 'Ongoing' ? 'Completed' : 'Upcoming';
        return { ...e, status: nextStatus };
      }
      return e;
    }));
    showToast('Event status updated', 'info');
  };

  const approveRegistration = (regId) => {
    setRegistrations(prev => prev.map(r => r.id === regId ? { ...r, status: 'Approved' } : r));
    showToast('Participant registration approved!', 'success');
  };

  const rejectRegistration = (regId) => {
    setRegistrations(prev => prev.map(r => r.id === regId ? { ...r, status: 'Rejected' } : r));
    showToast('Registration status updated to Rejected', 'info');
  };

  const addNotification = (notif) => {
    const newN = {
      id: 'notif-' + Date.now(),
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      unread: true,
      ...notif
    };
    setNotifications(prev => [newN, ...prev]);
    showToast('Platform notification broadcasted!', 'success');
  };

  const addReview = (review) => {
    const newR = {
      id: 'rev-' + Date.now(),
      rating: 5,
      photo: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
      ...review
    };
    setReviews(prev => [newR, ...prev]);
    showToast('Thank you for your feedback! Review published.', 'success');
  };

  const addWinner = (winner) => {
    const newW = {
      id: 'win-' + Date.now(),
      image: winner.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      ...winner
    };
    setWinners(prev => [newW, ...prev]);
    showToast('Winner published to Wall of Champions!', 'success');
  };

  return (
    <AppContext.Provider value={{
      currentView,
      selectedSportFilter,
      setSelectedSportFilter,
      searchQuery,
      setSearchQuery,
      selectedEventId,
      setSelectedEventId,
      user,
      isAdmin,
      events,
      registrations,
      notifications,
      reviews,
      winners,
      activeModal,
      toast,
      showToast,
      navigateTo,
      closeModal,
      openEventDetails,
      openRegistrationModal,
      openVideoModal,
      registerForEvent,
      loginUser,
      loginAdmin,
      logout,
      createEvent,
      updateEvent,
      deleteEvent,
      toggleEventStatus,
      approveRegistration,
      rejectRegistration,
      addNotification,
      addReview,
      addWinner
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
