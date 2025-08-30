import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Player, Location, StorySegment } from '../types';
import Map from './Map';
import NpcInteractionModal from './NpcInteractionModal';
import { generateStorySegment } from '../services/geminiService';

interface GameProps {
  player: Player;
}

const Game: React.FC<GameProps> = ({ player }) => {
  const [activeLocation, setActiveLocation] = useState<Location | null>(null);
  const [storyHistory, setStoryHistory] = useState<StorySegment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isTraveling, setIsTraveling] = useState<boolean>(false);
  const locationClickSound = useRef(new Audio('https://cdn.pixabay.com/audio/2022/03/10/audio_c848a67220.mp3'));
  const backgroundMusic = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (backgroundMusic.current) {
      backgroundMusic.current.volume = 0.1;
    }
  }, []);

  const handleLocationSelect = useCallback(async (location: Location) => {
    if (isTraveling) return;

    locationClickSound.current.volume = 0.5;
    locationClickSound.current.play().catch(error => console.error("Audio play failed:", error));
    
    setIsTraveling(true);
    setActiveLocation(location);
    setIsLoading(true);
    setStoryHistory([]);

    const initialSegmentPromise = generateStorySegment(player.ancestry, location.name, location.context, []);

    setTimeout(async () => {
      setIsTraveling(false);
      const initialSegment = await initialSegmentPromise;
      if (initialSegment) {
        setStoryHistory([initialSegment]);
      } else {
        setStoryHistory([{ story: "The elder seems unable to speak of this place. The memories may be too painful.", choices: ["Leave in silence."] }]);
      }
      setIsLoading(false);
    }, 1500);
  }, [player.ancestry, isTraveling]);

  const handleChoiceSelect = async (choice: string) => {
    if (isLoading || !activeLocation) return;
    setIsLoading(true);
    
    const newSegment = await generateStorySegment(player.ancestry, activeLocation.name, activeLocation.context, storyHistory);

    if (newSegment) {
      setStoryHistory(prev => [...prev, newSegment]);
    } else {
      const lastSegment = storyHistory[storyHistory.length - 1];
      const errorSegment: StorySegment = {
        story: "The elder falters, the path of the story lost in the mists of time.",
        choices: lastSegment.choices 
      };
      setStoryHistory(prev => [...prev, errorSegment]);
    }
    setIsLoading(false);
  };

  const closeModal = () => {
    setActiveLocation(null);
    setStoryHistory([]);
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <audio ref={backgroundMusic} src="https://cdn.pixabay.com/audio/2022/08/14/audio_3918072a39.mp3" autoPlay loop controls={false} style={{ display: 'none' }}></audio>
      
      {isTraveling && (
        <div className="fixed inset-0 bg-black z-[100] flex items-center justify-center transition-opacity duration-500 ease-in-out">
          <p className="text-yellow-300 text-3xl animate-pulse">Traveling...</p>
        </div>
      )}

      <header className="absolute top-0 left-0 w-full p-4 bg-black bg-opacity-30 z-10 text-center">
        <h1 className="text-3xl text-yellow-300" style={{ fontFamily: 'serif' }}>The World Awaits</h1>
        <p className="text-gray-300">You are a descendant of the <span className="font-bold text-yellow-200">{player.ancestry}</span>. Explore the lands to hear their tales.</p>
      </header>
      
      <Map onLocationSelect={handleLocationSelect} activeLocation={activeLocation} />
      
      {activeLocation && !isTraveling && (
        <NpcInteractionModal 
          isOpen={!!activeLocation}
          onClose={closeModal}
          npc={activeLocation.npc}
          storyHistory={storyHistory}
          isLoading={isLoading}
          onChoiceSelect={handleChoiceSelect}
        />
      )}
    </div>
  );
};

export default Game;
