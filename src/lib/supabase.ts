import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://iszakcbmlxbdhjhvpvba.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlzemFrY2JtbHhiZGhqaHZwdmJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM2NjE2MjQsImV4cCI6MjA4OTIzNzYyNH0.V_4kaM7lPjvnsaJQvtiMuXzK4xYD9UFFwgrrJhAn13s'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
