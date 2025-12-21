import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-service-key'

// Client-side Supabase client with proper session management
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Server-side Supabase client with service role key
export const supabaseAdmin = createClient(
  supabaseUrl,
  supabaseServiceKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

// Database types
export interface SharedFile {
  id: string
  owner_id: string
  file_name: string
  encrypted_file_name: string
  file_size: number
  file_salt: string
  file_iv: string
  master_key_hash: string
  metadata_iv: string
  expires_at: string | null
  burn_after_read: boolean
  download_count: number
  created_at: string
}

export interface UserProfile {
  id: string
  email: string | null
  full_name: string | null
  phone: string | null
  created_at: string
  updated_at: string
}
