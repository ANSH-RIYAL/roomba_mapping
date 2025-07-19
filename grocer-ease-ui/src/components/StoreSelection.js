
import React, { useState } from 'react';
import '../styles/store.css';

const StoreSelection = ({ onStoreSelect }) => {
  const [selectedStore, setSelectedStore] = useState(null);

  const stores = [
    {
      id: 1,
      name: "Store A",
      address: "123 Main Street, City Center",
      hours: "8AM - 10PM"
    },
    {
      id: 2,
      name: "Store B",
      address: "456 Park Avenue, West District",
      hours: "9AM - 9PM"
    },
    {
      id: 3,
      name: "Store C",
      address: "789 Oak Boulevard, Northside",
      hours: "7AM - 11PM"
    },
    {
      id: 4,
      name: "Store D",
      address: "101 Pine Road, South Quarter",
      hours: "8AM - 10PM"
    }
  ];

  const handleStoreClick = (store) => {
    setSelectedStore(store);
    if (onStoreSelect) {
      onStoreSelect(store);
    }
  };

  return (
    <section className="store-section" id="storeSection">
      <h2 className="section-title">Find Your Store</h2>
      <p className="section-subtitle">
        Select a store location to access detailed information, floorplans, and store-specific features.
      </p>
      
      <div className="store-container">
        <h3>Available Locations</h3>
        <div className="store-list">
          {stores.map((store) => (
            <div
              key={store.id}
              className={`store-item ${selectedStore?.id === store.id ? 'selected-store' : ''}`}
              onClick={() => handleStoreClick(store)}
            >
              <i className="fas fa-store"></i>
              <h3>{store.name}</h3>
              <p>{store.address}</p>
              <p>Open: {store.hours}</p>
            </div>
          ))}
        </div>
        
        {selectedStore && (
          <div id="floorplanAccess">
            <h3>Access Floorplan for: <span>{selectedStore.name}</span></h3>
            <p>You can now access the detailed floorplan for your selected store</p>
            <a href="/floorplan" className="nav-btn">
              <i className="fas fa-map-marked-alt"></i>
              View Floorplan
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default StoreSelection;
