import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Make sure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set.')
}

// single shared client
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey)

// function to create a new client (optional)
export const createSupabaseClient = (): SupabaseClient => {
  return createClient(supabaseUrl, supabaseAnonKey)
}