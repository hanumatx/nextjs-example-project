"use client";

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { LatLngExpression } from 'leaflet';
import { BusInfo } from '@/lib/busData';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Create custom icons for different types of stops
const createCustomIcon = (color: string, text: string) => {
  return L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="background-color: ${color}; width: 30px; height: 30px; border-radius: 50%; border: 3px solid white; display: flex; align-items: center; justify-content: center; font-weight: bold; color: white; font-size: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">${text}</div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });
};

// Create bus icon
const createBusIcon = () => {
  return L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="background-color: #ff6b35; width: 40px; height: 40px; border-radius: 50%; border: 4px solid white; display: flex; align-items: center; justify-content: center; font-weight: bold; color: white; font-size: 14px; box-shadow: 0 4px 8px rgba(0,0,0,0.4); animation: pulse 2s infinite;">🚌</div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });
};

interface MapProps {
  busInfo: BusInfo;
}

const Map: React.FC<MapProps> = ({ busInfo }) => {
  if (!busInfo.lat || !busInfo.lng) {
    return (
      <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">Location data not available</p>
      </div>
    );
  }

  const busPosition: LatLngExpression = [busInfo.lat, busInfo.lng];
  
  // Create route line from all stops
  const routeCoordinates: LatLngExpression[] = busInfo.stops.map(stop => [stop.lat, stop.lng]);

  // Calculate map bounds to fit all stops
  const bounds = L.latLngBounds(routeCoordinates);

  return (
    <div className="w-full h-96 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
      <style jsx>{`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
      `}</style>
      
      <MapContainer
        bounds={bounds}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {/* Route line */}
        <Polyline 
          positions={routeCoordinates} 
          color="#3b82f6" 
          weight={4} 
          opacity={0.7}
          dashArray="10, 5"
        />
        
        {/* Bus stops markers */}
        {busInfo.stops.map((stop, index) => {
          const isStart = index === 0;
          const isEnd = index === busInfo.stops.length - 1;
          const icon = isStart 
            ? createCustomIcon('#10b981', 'S') 
            : isEnd 
            ? createCustomIcon('#ef4444', 'E')
            : createCustomIcon('#6b7280', (index).toString());
            
          return (
            <Marker 
              key={index} 
              position={[stop.lat, stop.lng]} 
              icon={icon}
            >
              <Popup>
                <div className="text-center min-w-[200px]">
                  <h4 className="font-semibold text-base mb-1">{stop.name}</h4>
                  <p className="text-sm text-gray-600 mb-1">
                    {isStart ? 'Starting Point' : isEnd ? 'Final Destination' : `Stop ${index}`}
                  </p>
                  <p className="text-xs text-gray-500">
                    Estimated time: {stop.estimatedTime} from start
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {stop.lat.toFixed(4)}, {stop.lng.toFixed(4)}
                  </p>
                </div>
              </Popup>
            </Marker>
          );
        })}
        
        {/* Current bus location */}
        <Marker position={busPosition} icon={createBusIcon()}>
          <Popup>
            <div className="text-center min-w-[200px]">
              <h3 className="font-semibold text-lg mb-1">🚌 Bus {busInfo.busNumber}</h3>
              <p className="text-sm text-gray-600 mb-1">{busInfo.route}</p>
              <p className="text-sm font-medium text-blue-600 mb-1">Current Location</p>
              <p className="text-xs text-gray-500">Last updated: {busInfo.lastUpdated}</p>
              <p className="text-xs text-gray-400 mt-1">
                {busInfo.lat.toFixed(4)}, {busInfo.lng.toFixed(4)}
              </p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
