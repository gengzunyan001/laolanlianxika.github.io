export interface Message {
  role: 'user' | 'model';
  content: string;
}

export interface Card {
  id: string;
  name: string;
  type: 'Skill' | 'Item' | 'Curse';
  description: string;
  cost: number;
  icon: string;
}

export interface Investigator {
  name: string;
  role: string;
  sanity: number;
  maxSanity: number;
  health: number;
  maxHealth: number;
  clues: number;
}

export enum ModalType {
  NONE = 'NONE',
  INVENTORY = 'INVENTORY',
  MAP = 'MAP',
  BESTIARY = 'BESTIARY',
  JOURNAL = 'JOURNAL'
}