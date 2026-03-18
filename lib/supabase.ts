import { createClient } from '@supabase/supabase-js'

// Fallback values so the app builds in demo mode without real credentials
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-service-key'

// Client-side Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Admin client (server-side only, bypasses RLS)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)
