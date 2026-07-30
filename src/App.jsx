import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';
import EventDetailsModal from './components/EventDetailsModal';
import RegistrationModal from './components/RegistrationModal';
import VideoModal from './components/VideoModal';

import LoginView from './views/LoginView';
import HomeView from './views/HomeView';
import EventsView from './views/EventsView';
import EventDetailsView from './views/EventDetailsView';
import PricingView from './views/PricingView';
import NotificationsView from './views/NotificationsView';
import AboutView from './views/AboutView';
import ContactView from './views/ContactView';
import AdminDashboardView from './views/AdminDashboardView';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("SRV App ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '60px 24px',
          textAlign: 'center',
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#F8FAF8'
        }}>
          <h2 style={{ fontFamily: 'Cinzel, serif', color: '#0F4C2C', fontSize: '2rem', marginBottom: '12px' }}>
            SRV Platform View Updated
          </h2>
          <p style={{ color: '#4A6053', marginBottom: '20px', maxWidth: '500px' }}>
            We've just pushed a live system update. Please reload the page to sync the latest version.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: 'linear-gradient(135deg, #0F4C2C, #1C331C)',
              color: '#F7D358',
              border: 'none',
              borderRadius: '999px',
              padding: '12px 30px',
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: '0 6px 20px rgba(15,76,44,0.25)'
            }}
          >
            Reload SRV Platform
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const MainAppContent = () => {
  const { currentView, activeModal } = useApp();

  const renderView = () => {
    switch (currentView) {
      case 'login':
        return <LoginView />;
      case 'home':
        return <HomeView />;
      case 'events':
        return <EventsView />;
      case 'event-details':
        return <EventDetailsView />;
      case 'pricing':
        return <PricingView />;
      case 'notifications':
        return <NotificationsView />;
      case 'about':
        return <AboutView />;
      case 'contact':
        return <ContactView />;
      case 'admin':
        return <AdminDashboardView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#F8FAF8' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <ErrorBoundary key={currentView}>
          {renderView()}
        </ErrorBoundary>
      </main>
      <Footer />

      {/* Global Modals */}
      {activeModal && activeModal.type === 'event-details' && (
        <EventDetailsModal event={activeModal.event} />
      )}
      {activeModal && activeModal.type === 'register' && (
        <RegistrationModal event={activeModal.event} />
      )}
      {activeModal && activeModal.type === 'video' && (
        <VideoModal videoUrl={activeModal.videoUrl} title={activeModal.title} />
      )}

      {/* Global Toast Popup */}
      <Toast />
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}

export default App;
