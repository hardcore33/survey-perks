export interface Question {
  id: number;
  text: string;
  type: 'rating' | 'text';
}

export interface Reward {
  id: number;
  title: string;
  description: string;
  points: number;
  category: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  points: number;
  surveys: number;
  referrals: number;
}

export interface Material {
  id: number;
  title: string;
  description: string;
  type: 'avaliacao' | 'leitura' | 'manual' | 'atendimento';
  fileUrl?: string;
  content?: string;
  createdAt: string;
}