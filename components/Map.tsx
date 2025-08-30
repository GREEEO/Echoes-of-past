import React, { useState, useEffect, useMemo, useRef } from 'react';
import { LOCATIONS, DEFAULT_MAP_IMAGE } from '../constants';
import { Location } from '../types';

interface MapProps {
  onLocationSelect: (location: Location) => void;
  activeLocation: Location | null;
}

const Map: React.FC<MapProps> = ({ onLocationSelect, activeLocation }) => {
  const [hoveredLocation, setHoveredLocation] = useState<Location | null>(null);
  const parallaxContainerRef = useRef<HTMLDivElement>(null);
  const targetOffset = useRef({ x: 0, y: 0 });

  const allImageUrls = useMemo(() => [DEFAULT_MAP_IMAGE, ...LOCATIONS.map(l => l.imageUrl)], []);

  // Preload images for smoother transitions
  useEffect(() => {
    allImageUrls.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [allImageUrls]);

  // Effect to update the target parallax offset on mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = clientX - innerWidth / 2;
      const y = clientY - innerHeight / 2;
      const parallaxIntensity = 50; 
      targetOffset.current = { 
        x: -x / parallaxIntensity, 
        y: -y / parallaxIntensity 
      };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Animation loop for smooth, interpolated parallax motion
  useEffect(() => {
    const smoothingFactor = 0.08;
    let animationFrameId: number;
    const currentOffset = { x: 0, y: 0 };

    const animate = () => {
      const { x: targetX, y: targetY } = targetOffset.current;
      
      // Use linear interpolation (lerp) for a smooth "damping" effect
      currentOffset.x += (targetX - currentOffset.x) * smoothingFactor;
      currentOffset.y += (targetY - currentOffset.y) * smoothingFactor;

      if (parallaxContainerRef.current) {
        // Round values to avoid sub-pixel rendering issues
        const roundedX = Math.round(currentOffset.x * 100) / 100;
        const roundedY = Math.round(currentOffset.y * 100) / 100;
        parallaxContainerRef.current.style.transform = `translate(${roundedX}px, ${roundedY}px) scale(1.1)`;
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const currentImageUrl = activeLocation?.imageUrl ?? hoveredLocation?.imageUrl ?? DEFAULT_MAP_IMAGE;

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      <div 
        ref={parallaxContainerRef}
        className="absolute inset-0"
        style={{ 
          transform: 'scale(1.1)', // Initial scale, translate is applied via JS
          willChange: 'transform' // Performance hint for the browser
        }}
      >
        {allImageUrls.map((src) => (
          <div
            key={src}
            className="absolute inset-0 bg-cover bg-center filter sepia-[.5] brightness-75 transition-opacity duration-1000 ease-in-out"
            style={{
              backgroundImage: `url('${src}')`,
              opacity: currentImageUrl === src ? 1 : 0,
            }}
          ></div>
        ))}
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>

      {LOCATIONS.map((location) => (
        <button
          key={location.id}
          onClick={() => onLocationSelect(location)}
          onMouseEnter={() => setHoveredLocation(location)}
          onMouseLeave={() => setHoveredLocation(null)}
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