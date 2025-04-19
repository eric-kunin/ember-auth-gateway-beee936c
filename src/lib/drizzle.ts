
import { drizzle } from 'drizzle-orm/postgres-js';
import { supabase } from '@/integrations/supabase/client';
import postgres from 'postgres';

// Create a PostgreSQL connection using the Supabase connection string
// Note: This is a separate connection from the Supabase client
// We're using the same database but connecting directly with postgres.js
const connectionString = process.env.DATABASE_URL || 'postgres://postgres:postgres@millycjkhnxhzngdekbd.supabase.co:5432/postgres';
const queryClient = postgres(connectionString);

// Create a Drizzle ORM instance
export const db = drizzle(queryClient);
