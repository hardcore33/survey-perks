export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          name: string | null;
          points: number;
          surveys_completed: number;
          referrals_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          name?: string | null;
          points?: number;
          surveys_completed?: number;
          referrals_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string | null;
          points?: number;
          surveys_completed?: number;
          referrals_count?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      user_roles: {
        Row: {
          id: string;
          user_id: string;
          role: 'admin' | 'user';
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          role: 'admin' | 'user';
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          role?: 'admin' | 'user';
          created_at?: string;
        };
      };
      questions: {
        Row: {
          id: number;
          text: string;
          type: 'rating' | 'text';
          points: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          text: string;
          type: 'rating' | 'text';
          points?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          text?: string;
          type?: 'rating' | 'text';
          points?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      rewards: {
        Row: {
          id: number;
          title: string;
          description: string | null;
          points: number;
          category: string;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          title: string;
          description?: string | null;
          points: number;
          category: string;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          title?: string;
          description?: string | null;
          points?: number;
          category?: string;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      materials: {
        Row: {
          id: number;
          title: string;
          description: string | null;
          type: 'avaliacao' | 'leitura' | 'manual' | 'atendimento';
          file_url: string | null;
          content: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          title: string;
          description?: string | null;
          type: 'avaliacao' | 'leitura' | 'manual' | 'atendimento';
          file_url?: string | null;
          content?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          title?: string;
          description?: string | null;
          type?: 'avaliacao' | 'leitura' | 'manual' | 'atendimento';
          file_url?: string | null;
          content?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      reward_requests: {
        Row: {
          id: string;
          user_id: string;
          reward_id: number;
          status: 'pending' | 'approved' | 'rejected';
          requested_at: string;
          processed_at: string | null;
          processed_by: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          reward_id: number;
          status?: 'pending' | 'approved' | 'rejected';
          requested_at?: string;
          processed_at?: string | null;
          processed_by?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          reward_id?: number;
          status?: 'pending' | 'approved' | 'rejected';
          requested_at?: string;
          processed_at?: string | null;
          processed_by?: string | null;
        };
      };
      survey_responses: {
        Row: {
          id: string;
          user_id: string;
          question_id: number;
          answer: string | null;
          rating: number | null;
          points_earned: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          question_id: number;
          answer?: string | null;
          rating?: number | null;
          points_earned?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          question_id?: number;
          answer?: string | null;
          rating?: number | null;
          points_earned?: number;
          created_at?: string;
        };
      };
      referrals: {
        Row: {
          id: string;
          referrer_id: string;
          referred_email: string;
          referred_user_id: string | null;
          points_earned: number;
          status: 'pending' | 'completed';
          created_at: string;
          completed_at: string | null;
        };
        Insert: {
          id?: string;
          referrer_id: string;
          referred_email: string;
          referred_user_id?: string | null;
          points_earned?: number;
          status?: 'pending' | 'completed';
          created_at?: string;
          completed_at?: string | null;
        };
        Update: {
          id?: string;
          referrer_id?: string;
          referred_email?: string;
          referred_user_id?: string | null;
          points_earned?: number;
          status?: 'pending' | 'completed';
          created_at?: string;
          completed_at?: string | null;
        };
      };
      point_transactions: {
        Row: {
          id: string;
          user_id: string;
          points: number;
          type: 'earned' | 'spent' | 'referral' | 'bonus';
          description: string | null;
          reference_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          points: number;
          type: 'earned' | 'spent' | 'referral' | 'bonus';
          description?: string | null;
          reference_id?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          points?: number;
          type?: 'earned' | 'spent' | 'referral' | 'bonus';
          description?: string | null;
          reference_id?: string | null;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}