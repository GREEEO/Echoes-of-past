import React, { useEffect, useRef } from 'react';
import { Npc, StorySegment } from '../types';
import LoadingSpinner from './LoadingSpinner';

interface NpcInteractionModalProps {
  isOpen: boolean;
  onClose: () => void;
  npc: Npc;
  storyHistory: StorySegment[];
  isLoading: boolean;
  onChoiceSelect: (choice: string) => void;
}

const usePrevious = <T,>(value: T): T | undefined => {
  const ref = useRef<T | undefined>(undefined);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const NpcInteractionModal: React.FC<NpcInteractionModalProps> = ({ isOpen, onClose, npc, storyHistory, isLoading, onChoiceSelect }) => {
  const wasLoading = usePrevious(isLoading);
  const storyLoadedSound = useRef(new Audio('https://cdn.pixabay.com/audio/2022/03/15/audio_e3150523db.mp3'));
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (wasLoading && !isLoading && storyHistory.length > 0) {
      storyLoadedSound.current.volume = 0.6;
      storyLoadedSound.current.play().catch(error => console.error("Audio play failed:", error));
    }
  }, [isLoading, storyHistory, wasLoading]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [storyHistory, isLoading]);

  if (!isOpen) return null;

  const latestSegment = storyHistory.length > 0 ? storyHistory[storyHistory.length - 1] : null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 transition-opacity duration-300"
      onClick={onClose}
    >
      <div 
        className="bg-gray-900 bg-opacity-90 border border-yellow-700/50 rounded-lg shadow-2xl p-8 max-w-3xl w-11/12 flex flex-col text-gray-200 backdrop-blur-sm transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'fadeInScale 0.3s forwards', maxHeight: '90vh' }}
      >
        <div className="text-center mb-6 flex-shrink-0">
          <h2 className="text-3xl text-yellow-300 font-bold" style={{ fontFamily: 'serif' }}>{npc.name}</h2>
          <p className="text-md text-yellow-500">{npc.title}</p>
        </div>

        <div className="flex-grow overflow-y-auto pr-4 text-gray-300 space-y-6">
          {npc.backstory && (
            <p className="text-base italic text-gray-400 border-l-2 border-yellow-700/50 pl-4">
              {npc.backstory}
            </p>
          )}

          {storyHistory.map((segment, index) => (
            <div key={index} className="animate-fade-in">
              <p className="text-lg leading-relaxed" style={{ whiteSpace: 'pre-wrap' }}>{segment.story}</p>
              {index < storyHistory.length - 1 && <hr className="my-6 border-yellow-800/50" />}
            </div>
          ))}

          {isLoading && (
            <div className="flex flex-col items-center justify-center p-8">
              <LoadingSpinner />
              <p className="mt-4 text-yellow-400 animate-pulse">The elder weaves the threads of fate...</p>
            </div>
          )}

          {!isLoading && latestSegment && latestSegment.choices && (
            <div className="flex flex-col items-center gap-4 pt-6 animate-fade-in-choices">
              <p className="text-yellow-300 font-bold text-lg">What do you do?</p>
              {latestSegment.choices.map((choice, index) => (
                <button
                  key={index}
                  onClick={() => onChoiceSelect(choice)}
                  className="w-full max-w-md px-6 py-3 font-bold text-gray-900 bg-yellow-400 rounded-lg hover:bg-yellow-300 transition-all duration-200 transform hover:scale-105"
                  disabled={isLoading}
                >
                  {choice}
                </button>
              ))}
            </div>
          )}
          <div ref={scrollRef} />
        </div>

        <div className="text-center mt-8 flex-shrink-0">
          <button 
            onClick={onClose}
            className="px-6 py-2 font-bold text-gray-900 bg-yellow-400 rounded-lg hover:bg-yellow-300 transition-colors duration-200"
          >
            Leave the Elder
          </button>
        </div>
      </div>
      <style>{`
        @keyframes fadeInScale {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fade-in-scale { animation: fadeInScale 0.3s cubic-bezier(0.165, 0.84, 0.44, 1) forwards; }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in { animation: fadeIn 0.5s ease-in-out forwards; }

        @keyframes fadeInChoices {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-choices { animation: fadeInChoices 0.5s ease-in-out 0.2s forwards; opacity: 0; }
      `}</style>
    </div>
  );
};

export default NpcInteractionModal;
