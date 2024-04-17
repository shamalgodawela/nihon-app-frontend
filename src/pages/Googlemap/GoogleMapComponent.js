import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';

const GoogleMapComponent = () => {
  const [executiveLocation, setExecutiveLocation] = useState(null);

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setExecutiveLocation({ lat: latitude, lng: longitude });
      },
      (error) => console.error(error),
      { enableHighAccuracy: true }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return (
    <LoadScript googleMapsApiKey="AIzaSyALBHqp76uov9Q-9pAlsY5DX0mTnS2JXmE">
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '400px' }}
        center={executiveLocation}
        zoom={13}
      >
        {executiveLocation && <Marker position={executiveLocation} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapComponent;
