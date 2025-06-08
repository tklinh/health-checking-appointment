import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zvyxgoxffbyahziewnly.supabase.co' //import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2eXhnb3hmZmJ5YWh6aWV3bmx5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyOTI1OTMsImV4cCI6MjA2NDg2ODU5M30.FRuCVvTGmdoc5K3326LsbweipeQoJX2NWk4N016qEis' //import.meta.env.VITE_SUPABASE_ANON_KEY

console.log(supabaseUrl)
console.log(supabaseAnonKey)

export const useSupabaseClient = createClient(supabaseUrl, supabaseAnonKey)
