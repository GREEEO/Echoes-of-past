export enum GameState {
  CHARACTER_CREATION,
  IN_GAME,
}

export interface Player {
  ancestry: string;
}

export interface Location {
  id: string;
  name: string;
  coordinates: { top: string; left: string };
  npc: Npc;
  context: string;
  imageUrl: string;
}

export interface Npc {
  name: string;
  title: string;
  backstory?: string;
}

export interface StorySegment {
  story: string;
  choices: string[];
}
