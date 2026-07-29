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
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#051A0E' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        {renderView()}
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
