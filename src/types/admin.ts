export interface Question {
  id: number;
  text: string;
  type: 'rating' | 'text';
  points: number;
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

export interface RewardRequest {
  id: number;
  userId: number;
  userName: string;
  userEmail: string;
  rewardId: number;
  rewardTitle: string;
  rewardPoints: number;
  status: 'pending' | 'approved' | 'rejected';
  requestedAt: string;
  processedAt?: string;
}