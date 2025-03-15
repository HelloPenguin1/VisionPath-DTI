export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          current_status: string | null
          education_level: string | null
          graduation_year: number | null
          university: string | null
          major: string | null
          preferred_careers: string[] | null
          skills: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          current_status?: string | null
          education_level?: string | null
          graduation_year?: number | null
          university?: string | null
          major?: string | null
          preferred_careers?: string[] | null
          skills?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          current_status?: string | null
          education_level?: string | null
          graduation_year?: number | null
          university?: string | null
          major?: string | null
          preferred_careers?: string[] | null
          skills?: string[] | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}