export interface Profile {
  id: number
  created_at: string
  execution_id: string | null
  ai_summary: any // jsonb
  raw_data: any // jsonb
  email: string | null
  name: string | null
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile
        Insert: Omit<Profile, 'id' | 'created_at'>
        Update: Partial<Omit<Profile, 'id' | 'created_at'>>
      }
    }
  }
} 