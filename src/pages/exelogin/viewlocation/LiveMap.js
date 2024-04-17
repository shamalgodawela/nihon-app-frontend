import React, { useEffect, useState } from 'react';
import L from 'leaflet';

const LiveMap = ({ locations }) => {
    useEffect(() => {
        if (!locations) {
          return;
        }
      
        const map = L.map('map').setView([6.9337088, 79.8818304], 13);
      
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        }).addTo(map);
      
        locations.forEach(location => {
          L.marker([location.latitude, location.longitude])
            .addTo(map)
            .bindPopup(`User Location: ${location.latitude}, ${location.longitude}`);
        });
      
        return () => {
          map.remove(); // Use remove() method to destroy the map
        };
      }, [locations]);
      

  return <div id="map" style={{ height: '800px' }} />;
};

export default LiveMap;
