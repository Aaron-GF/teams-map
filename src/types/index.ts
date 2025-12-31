export interface Concello {
  id: string;
  name: string;
}

export interface Club {
  id: string;
  name: string;
  category: string;
  division: string;
  concelloId: string;
  imageUrl?: string | null;
}

export interface Player {
  id: string;
  clubId: string;
  name: string;
  birthDate: string;
  position: string;
  foot: "Diestro" | "Zurdo";
  rating: number;
  description: string;
  imageUrl?: string | null;
}

export interface MunicipalityJSON {
  id: string;
  name: string;
  provinceId: string;
  d: string;
}

export type Database = {
  public: {
    Tables: {
      clubs: {
        Row: {
          id: string;
          name: string;
          category: string;
          division: string;
          concello_id: string;
          image_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          category: string;
          division: string;
          concello_id: string;
          image_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          category?: string;
          division?: string;
          concello_id?: string;
          image_url?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      players: {
        Row: {
          id: string;
          club_id: string;
          name: string;
          birth_date: string;
          position: string;
          foot: "Diestro" | "Zurdo";
          rating: number;
          description: string;
          image_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          club_id: string;
          name: string;
          birth_date: string;
          position: string;
          foot: "Diestro" | "Zurdo";
          rating: number;
          description: string;
          image_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          club_id?: string;
          name?: string;
          birth_date?: string;
          position?: string;
          foot?: "Diestro" | "Zurdo";
          rating?: number;
          description?: string;
          image_url?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "players_club_id_fkey";
            columns: ["club_id"];
            isOneToOne: false;
            referencedRelation: "clubs";
            referencedColumns: ["id"];
          }
        ];
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
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};
