
import React from 'react';
import '../styles/features.css';

const Features = () => {
  const features = [
    {
      icon: "fas fa-list",
      title: "Smart Shopping List",
      description: "Create intelligent shopping lists with detailed product options and variants."
    },
    {
      icon: "fas fa-search-location",
      title: "Find Your Store",
      description: "Locate the nearest store with detailed information about location, hours, and amenities."
    },
    {
      icon: "fas fa-robot",
      title: "AI Product Assistant",
      description: "Our AI understands your needs and suggests appropriate product variants."
    },
    {
      icon: "fas fa-map-marked-alt",
      title: "Interactive Floorplan",
      description: "Once you've selected a store, access detailed floorplans to navigate efficiently."
    },
    {
      icon: "fas fa-user-circle",
      title: "Personal Account",
      description: "Save your favorite stores, create shopping lists, and get personalized recommendations."
    },
    {
      icon: "fas fa-tags",
      title: "Product Variants",
      description: "Select from multiple options for each item in your shopping list."
    }
  ];

  return (
    <section className="features">
      {features.map((feature, index) => (
        <div key={index} className="feature-card">
          <div className="feature-icon">
            <i className={feature.icon}></i>
          </div>
          <h2>{feature.title}</h2>
          <p>{feature.description}</p>
        </div>
      ))}
    </section>
  );
};

export default Features;
