
import React from 'react';
import { Npc } from '../types';
import LoadingSpinner from './LoadingSpinner';

interface NpcInteractionModalProps {
  isOpen: boolean;
  onClose: () => void;
  npc: Npc;
  story: string | null;
  isLoading: boolean;
}

const NpcInteractionModal: React.FC<NpcInteractionModalProps> = ({ isOpen, onClose, npc, story, isLoading }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 transition-opacity duration-300"
      onClick={onClose}
    >
      <div 
        className="bg-gray-900 bg-opacity-90 border border-yellow-700/50 rounded-lg shadow-2xl p-8 max-w-3xl w-11/12 text-gray-200 backdrop-blur-sm transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'fadeInScale 0.3s forwards' }}
      >
        <div className="text-center mb-6">
          <h2 className="text-3xl text-yellow-300 font-bold" style={{ fontFamily: 'serif' }}>{npc.name}</h2>
          <p className="text-md text-yellow-500">{npc.title}</p>
        </div>

        <div className="max-h-[60vh] overflow-y-auto pr-4 text-lg leading-relaxed text-gray-300">
          {isLoading && (
            <div className="flex flex-col items-center justify-center p-8">
              <LoadingSpinner />
              <p className="mt-4 text-yellow-400 animate-pulse">The elder gathers their thoughts...</p>
            </div>
          )}
          {story && !isLoading && (
            <p style={{ whiteSpace: 'pre-wrap' }}>{story}</p>
          )}
        </div>
        <div className="text-center mt-8">
          <button 
            onClick={onClose}
            className="px-6 py-2 font-bold text-gray-900 bg-yellow-400 rounded-lg hover:bg-yellow-300 transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </div>
      <style>{`
        @keyframes fadeInScale {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fade-in-scale { animation: fadeInScale 0.3s cubic-bezier(0.165, 0.84, 0.44, 1) forwards; }
      `}</style>
    </div>
  );
};

export default NpcInteractionModal;
