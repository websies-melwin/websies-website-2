import { createClient } from '@supabase/supabase-js';

// Supabase project credentials
const supabaseUrl = 'https://izenvkhvvypghmfvflmn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml6ZW52a2h2dnlwZ2htZnZmbG1uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1OTQzNDcsImV4cCI6MjA3MzE3MDM0N30.QIimxcBRYuXaByYLLKJ9qImZoAZdJY2hK1eabRPNpH0';

console.log('Initializing Supabase client...');

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
});

console.log('Supabase client initialized successfully');