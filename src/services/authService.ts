import { SupabaseClient } from '@supabase/supabase-js';

export const handleRegister = async (supabase: SupabaseClient, email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) {
    throw new Error(error.message);
  }
  return data.session;
};

export const handleLogin = async (supabase: SupabaseClient, email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    throw new Error(error.message);
  }
  return data.session;
};
