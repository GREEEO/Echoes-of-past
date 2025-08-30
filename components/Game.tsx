
import React, { useState, useCallback } from 'react';
import { Player, Location } from '../types';
import Map from './Map';
import NpcInteractionModal from './NpcInteractionModal';
import { generateStory } from '../services/geminiService';

interface GameProps {
  player: Player;
}

const Game: React.FC<GameProps> = ({ player }) => {
  const [activeLocation, setActiveLocation] = useState<Location | null>(null);
  const [story, setStory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLocationSelect = useCallback(async (location: Location) => {
    setActiveLocation(location);
    setIsLoading(true);
    setStory(null);
    const generatedStory = await generateStory(player.ancestry, location.name, location.context);
    setStory(generatedStory);
    setIsLoading(false);
  }, [player.ancestry]);

  const closeModal = () => {
    setActiveLocation(null);
    setStory(null);
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <header className="absolute top-0 left-0 w-full p-4 bg-black bg-opacity-30 z-10 text-center">
        <h1 className="text-3xl text-yellow-300" style={{ fontFamily: 'serif' }}>The World Awaits</h1>
        <p className="text-gray-300">You are a descendant of the <span className="font-bold text-yellow-200">{player.ancestry}</span>. Explore the lands to hear their tales.</p>
      </header>
      <Map onLocationSelect={handleLocationSelect} />
      {activeLocation && (
        <NpcInteractionModal 
          isOpen={!!activeLocation}
          onClose={closeModal}
          npc={activeLocation.npc}
          story={story}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default Game;
