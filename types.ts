
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
}

export interface Npc {
  name: string;
  title: string;
}
