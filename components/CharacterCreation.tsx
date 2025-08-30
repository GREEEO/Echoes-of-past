
import React, { useState } from 'react';
import { ANCESTRIES } from '../constants';

interface CharacterCreationProps {
  onCharacterCreate: (ancestry: string) => void;
}

const CharacterCreation: React.FC<CharacterCreationProps> = ({ onCharacterCreate }) => {
  const [selectedAncestry, setSelectedAncestry] = useState<string>(ANCESTRIES[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCharacterCreate(selectedAncestry);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://picsum.photos/seed/history/1920/1080')" }}>
      <div className="bg-gray-900 bg-opacity-80 p-10 rounded-lg shadow-2xl border border-yellow-700/50 max-w-2xl text-center backdrop-blur-sm">
        <h1 className="text-5xl font-bold text-yellow-300 mb-4" style={{ fontFamily: 'serif' }}>Ancestral Echoes</h1>
        <p className="text-lg text-gray-300 mb-8">The whispers of the past call to you. Who were your ancestors? Choose your lineage and awaken their stories.</p>
        
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <label htmlFor="ancestry-select" className="text-xl text-yellow-400 mb-3">Choose Your Ancestry</label>
          <select
            id="ancestry-select"
            value={selectedAncestry}
            onChange={(e) => setSelectedAncestry(e.target.value)}
            className="bg-gray-800 border border-yellow-600 text-gray-200 text-lg rounded-md focus:ring-yellow-500 focus:border-yellow-500 block w-full p-3 mb-8"
          >
            {ANCESTRIES.map((ancestry) => (
              <option key={ancestry} value={ancestry}>{ancestry}</option>
            ))}
          </select>
          <button 
            type="submit" 
            className="px-10 py-4 text-xl font-bold text-gray-900 bg-yellow-400 rounded-lg hover:bg-yellow-300 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg"
          >
            Begin Your Journey
          </button>
        </form>
      </div>
    </div>
  );
};

export default CharacterCreation;
