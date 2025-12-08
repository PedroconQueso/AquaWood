import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/database';

const supabaseUrl = "https://kqqsjysoxhqdflddhzej.supabase.co"
const supabaseKey = "sb_publishable_ucO4F4yKWGhpMU7lpHTNVA_UaJZWAjy"
console.log(supabaseUrl, supabaseKey);
if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
