export interface RawDataEntry {
  profileUrl?: string;
  basic_info?: {
    current_company?: string;
    headline?: string;
  };
  experience?: { title?: string }[];
  education?: unknown[];
  certifications?: unknown[];
  projects?: unknown[];
}

export interface Profile {
  id: number;
  created_at: string;
  execution_id: string | null;
  ai_summary: unknown; // jsonb
  raw_data: RawDataEntry[] | null; // jsonb
  email: string | null;
  name: string | null;
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, "id" | "created_at">;
        Update: Partial<Omit<Profile, "id" | "created_at">>;
      };
    };
  };
}
