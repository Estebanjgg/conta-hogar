import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://elxmjeqalbxqfittzsnh.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVseG1qZXFhbGJ4cWZpdHR6c25oIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODM4NjY5MTEsImV4cCI6MTk5OTQ0MjkxMX0.V9-SZvpJPbpsrWckyO930vu4iRS27DuwNwOWnApK4Sg';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
