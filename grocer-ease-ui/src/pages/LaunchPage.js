
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import StoreSelection from '../components/StoreSelection';
import ChatModal from '../components/ChatModal';

const LaunchPage = () => {
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);

  const handleChatClick = () => {
    setIsChatModalOpen(true);
  };

  const handleStoreClick = () => {
    const storeSection = document.getElementById('storeSection');
    if (storeSection) {
      storeSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStoreSelect = (store) => {
    console.log('Selected store:', store);
    // Implement store selection logic
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar userType="customer" onChatClick={handleChatClick} />
      <div style={{ flex: 1, marginLeft: '250px', display: 'flex', flexDirection: 'column' }}>
        <Hero
          title="Enhanced Shopping Experience"
          subtitle="Now with smart product selections and detailed shopping lists"
          onChatClick={handleChatClick}
          onStoreClick={handleStoreClick}
        />
        <Features />
        <StoreSelection onStoreSelect={handleStoreSelect} />
      </div>
      <ChatModal 
        isOpen={isChatModalOpen} 
        onClose={() => setIsChatModalOpen(false)} 
      />
    </div>
  );
};

export default LaunchPage;
