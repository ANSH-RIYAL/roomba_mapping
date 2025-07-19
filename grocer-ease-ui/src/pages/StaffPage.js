
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import StoreSelection from '../components/StoreSelection';
import ChatModal from '../components/ChatModal';

const StaffPage = () => {
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);

  const handleLogout = () => {
    console.log('Logging out...');
    // Implement logout logic
  };

  const handleChatClick = () => {
    setIsChatModalOpen(true);
  };

  const handleStoreClick = () => {
    const storeSection = document.getElementById('storeSection');
    if (storeSection) {
      storeSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar userType="staff" onLogout={handleLogout} onChatClick={handleChatClick} />
      <div style={{ flex: 1, marginLeft: '250px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '20px' }}>
          <button className="btn btn-customer" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i> Log Out
          </button>
        </div>
        <Hero
          title="Staff Dashboard - Enhanced Shopping Experience"
          subtitle="Manage inventory, floorplans, and store operations"
          onChatClick={handleChatClick}
          onStoreClick={handleStoreClick}
        />
        <Features />
        <StoreSelection />
      </div>
      <ChatModal 
        isOpen={isChatModalOpen} 
        onClose={() => setIsChatModalOpen(false)} 
      />
    </div>
  );
};

export default StaffPage;
