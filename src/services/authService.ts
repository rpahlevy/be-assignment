import { SupabaseClient } from "@supabase/supabase-js";
import { AuthRequest } from "../types/requests";

export const handleRegister = async (supabase: SupabaseClient, authRequest: AuthRequest) => {
  const { data, error } = await supabase.auth.signUp({
    email: authRequest.email,
    password: authRequest.password,
  });
  if (error) {
    throw new Error(error.message);
  }
  return data.session;
};

export const handleLogin = async (supabase: SupabaseClient, authRequest: AuthRequest) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: authRequest.email,
    password: authRequest.password,
  });
  if (error) {
    throw new Error(error.message);
  }
  return data.session;
};
