
import React from 'react';
import { LOCATIONS } from '../constants';
import { Location } from '../types';

interface MapProps {
  onLocationSelect: (location: Location) => void;
}

const Map: React.FC<MapProps> = ({ onLocationSelect }) => {
  return (
    <div className="relative w-screen h-screen">
      <div 
        className="absolute inset-0 bg-cover bg-center filter sepia-[.5] brightness-75"
        style={{ backgroundImage: "url('https://picsum.photos/seed/map/1920/1080')" }}
      ></div>
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>

      {LOCATIONS.map((location) => (
        <button
          key={location.id}
          onClick={() => onLocationSelect(location)}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
          style={{ top: location.coordinates.top, left: location.coordinates.left }}
          aria-label={`Explore ${location.name}`}
        >
          <div className="w-4 h-4 bg-yellow-400 rounded-full shadow-lg border-2 border-yellow-200 animate-pulse"></div>
          <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-max px-3 py-1 bg-gray-800 bg-opacity-90 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            {location.name}
          </div>
        </button>
      ))}
    </div>
  );
};

export default Map;
