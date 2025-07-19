
import React, { useEffect } from 'react';
import '../styles/floorplan.css';

const FloorplanPage = () => {
  useEffect(() => {
    // Initialize floorplan functionality
    const initializeFloorplan = () => {
      const tooltip = document.getElementById('tooltip');
      const svg = document.getElementById('floorplan-svg');
      
      if (!tooltip || !svg) return;

      // Floorplan data
      const floorplanData = {
        store_vertices: [
          [38, 127], [37, 274], [68, 277], [66, 296], [37, 297], 
          [39, 495], [61, 495], [64, 508], [203, 508], [207, 521], 
          [288, 520], [289, 560], [298, 563], [298, 598], [289, 601], 
          [291, 664], [523, 663], [525, 640], [570, 640], [572, 716], 
          [545, 717], [541, 694], [508, 694], [509, 750], [672, 749], 
          [743, 805], [968, 805], [969, 765], [984, 762], [984, 692], 
          [960, 689], [960, 616], [988, 606], [988, 531], [931, 527], 
          [931, 402], [957, 395], [956, 326], [792, 326], [790, 298], 
          [501, 298], [495, 305], [417, 304], [416, 275], [439, 274], 
          [437, 225], [416, 228], [414, 127], [288, 127], [286, 155], 
          [252, 155], [249, 140], [148, 140], [143, 147], [85, 147], 
          [80, 128]
        ],
        polygons: [
          {
            polygon_vertices: [
              [238, 264], [236, 266], [236, 477], [270, 479], [272, 482], 
              [271, 508], [273, 510], [285, 510], [287, 508], [287, 482], 
              [294, 477], [463, 478], [467, 483], [467, 532], [463, 535], 
              [456, 535], [454, 538], [455, 572], [458, 575], [478, 575], 
              [482, 579], [483, 601], [507, 602], [509, 600], [509, 375], 
              [507, 373], [410, 375], [385, 373], [383, 375], [382, 386], 
              [376, 389], [279, 388], [275, 384], [275, 338], [281, 334], 
              [318, 335], [320, 333], [319, 309], [316, 307], [278, 307], 
              [275, 304], [274, 265]
            ]
          },
          {
            polygon_vertices: [
              [615, 366], [614, 368], [615, 397], [618, 400], [625, 401], 
              [627, 404], [627, 532], [628, 534], [634, 534], [638, 537], 
              [638, 562], [640, 565], [656, 565], [659, 563], [659, 545], 
              [665, 539], [808, 539], [808, 506], [805, 503], [669, 503], 
              [667, 502], [665, 499], [665, 387], [669, 383], [682, 383], 
              [684, 381], [683, 367], [681, 365], [617, 365]
            ]
          }
        ]
      };

      // Create store outline polygon
      const storePoints = floorplanData.store_vertices.map(pt => pt.join(',')).join(' ');
      const storePoly = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
      storePoly.setAttribute('points', storePoints);
      storePoly.setAttribute('id', 'store-outline');
      storePoly.setAttribute('fill', 'rgba(30, 40, 100, 0.15)');
      storePoly.setAttribute('stroke', '#4361ee');
      svg.appendChild(storePoly);

      // Create interactive edges
      const createEdges = (vertices, idPrefix) => {
        for (let i = 0; i < vertices.length; i++) {
          const start = vertices[i];
          const end = vertices[(i + 1) % vertices.length];
          
          const dx = end[0] - start[0];
          const dy = end[1] - start[1];
          const length = Math.round(Math.sqrt(dx * dx + dy * dy));
          
          const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
          line.setAttribute('x1', start[0]);
          line.setAttribute('y1', start[1]);
          line.setAttribute('x2', end[0]);
          line.setAttribute('y2', end[1]);
          line.setAttribute('data-info', `${idPrefix}-edge-${i+1} | Length: ${length} units`);
          line.setAttribute('data-id', `${idPrefix}-edge-${i+1}`);
          line.setAttribute('data-length', length);
          line.setAttribute('stroke', 'transparent');
          line.setAttribute('stroke-width', '12');
          line.style.cursor = 'pointer';
          
          let material = 'Concrete';
          if (idPrefix.includes('poly1')) material = 'Drywall';
          if (idPrefix.includes('poly2')) material = 'Glass partitions';
          
          line.setAttribute('data-material', material);
          
          const features = ['Milk', 'Tomato', 'Fish', 'Meat', 'Door'];
          const randomFeature = features[Math.floor(Math.random() * features.length)];
          line.setAttribute('data-features', randomFeature);
          
          svg.appendChild(line);
        }
      };

      createEdges(floorplanData.store_vertices, 'store');

      // Create polygons
      floorplanData.polygons.forEach((poly, index) => {
        const polyPoints = poly.polygon_vertices.map(pt => pt.join(',')).join(' ');
        const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        polygon.setAttribute('points', polyPoints);
        polygon.setAttribute('id', `polygon-${index+1}`);
        polygon.setAttribute('fill', index === 0 ? 'rgba(67, 97, 238, 0.1)' : 'rgba(76, 201, 240, 0.1)');
        polygon.setAttribute('stroke', index === 0 ? '#4361ee' : '#4cc9f0');
        svg.appendChild(polygon);
        
        createEdges(poly.polygon_vertices, `poly${index+1}`);
      });

      // Add event listeners to lines
      const lines = document.querySelectorAll('line');
      lines.forEach(line => {
        line.addEventListener('mouseover', function(e) {
          const data = this.getAttribute('data-info');
          
          tooltip.textContent = data;
          tooltip.style.opacity = '1';
          
          // Update info panel
          const wallId = document.getElementById('wall-id');
          const wallLength = document.getElementById('wall-length');
          const wallMaterial = document.getElementById('wall-material');
          const wallFeatures = document.getElementById('wall-features');
          
          if (wallId) wallId.textContent = this.getAttribute('data-id');
          if (wallLength) wallLength.textContent = this.getAttribute('data-length') + ' units';
          if (wallMaterial) wallMaterial.textContent = this.getAttribute('data-material');
          if (wallFeatures) wallFeatures.textContent = this.getAttribute('data-features');
          
          tooltip.style.left = `${e.clientX + 15}px`;
          tooltip.style.top = `${e.clientY + 15}px`;
        });
        
        line.addEventListener('mousemove', function(e) {
          tooltip.style.left = `${e.clientX + 15}px`;
          tooltip.style.top = `${e.clientY + 15}px`;
        });
        
        line.addEventListener('mouseout', function() {
          tooltip.style.opacity = '0';
        });
      });
    };

    initializeFloorplan();
  }, []);

  return (
    <div className="floorplan-page">
      <header>
        <h1>Interactive Floorplan</h1>
        <p className="subtitle">Hover over any wall edge to see detailed information</p>
      </header>
      
      <div className="container">
        <div className="floorplan-container">
          <div className="controls">
            <button className="btn active">Floorplan</button>
          </div>
          
          <div className="floorplan-wrapper">
            <div id="tooltip" className="tooltip"></div>
            <div className="svg-container">
              <svg id="floorplan-svg" viewBox="0 0 1000 850">
              </svg>
            </div>
          </div>
        </div>
        
        <div className="info-panel">
          <h2>Floorplan Information</h2>
          
          <div className="instructions">
            <h3>How to Use This Floorplan</h3>
            <ul>
              <li>Hover your cursor over any wall to see detailed information</li>
              <li>Different colors represent different areas</li>
              <li>Click the control buttons for additional functionality</li>
              <li>Floorplan is fully interactive and responsive</li>
            </ul>
          </div>
          
          <div className="data-display">
            <h3>Current Selection</h3>
            <div className="data-item">
              <span className="data-label">Wall ID:</span>
              <span id="wall-id" className="data-value">None</span>
            </div>
            <div className="data-item">
              <span className="data-label">Length:</span>
              <span id="wall-length" className="data-value">0 units</span>
            </div>
            <div className="data-item">
              <span className="data-label">Material:</span>
              <span id="wall-material" className="data-value">None</span>
            </div>
            <div className="data-item">
              <span className="data-label">Features:</span>
              <span id="wall-features" className="data-value">None</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloorplanPage;
