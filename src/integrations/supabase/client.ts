
import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

// Initialize Supabase client with correct credentials
export const supabase = createClient<Database>(
  'https://millycjkhnxhzngdekbd.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1pbGx5Y2praG54aHpuZ2Rla2JkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM4NzQ5NjgsImV4cCI6MjA1OTQ1MDk2OH0.3jxRpB-soQlrd0ZfYCUaQhKuqf_os3eVl9MrdAB0qKo'
)
