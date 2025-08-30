
import React, { useState, useCallback } from 'react';
import CharacterCreation from './components/CharacterCreation';
import Game from './components/Game';
import { GameState, Player } from './types';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.CHARACTER_CREATION);
  const [player, setPlayer] = useState<Player | null>(null);

  const handleCharacterCreate = useCallback((selectedAncestry: string) => {
    setPlayer({ ancestry: selectedAncestry });
    setGameState(GameState.IN_GAME);
  }, []);

  const renderContent = () => {
    switch (gameState) {
      case GameState.CHARACTER_CREATION:
        return <CharacterCreation onCharacterCreate={handleCharacterCreate} />;
      case GameState.IN_GAME:
        return player ? <Game player={player} /> : <CharacterCreation onCharacterCreate={handleCharacterCreate} />;
      default:
        return <div>Loading...</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-serif">
      {renderContent()}
    </div>
  );
};

export default App;
