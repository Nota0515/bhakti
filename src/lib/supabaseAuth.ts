import { supabase } from './supabase';

export const signUpWithEmail = async (email: string, password: string, name: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
      },
    },
  });

  if (error) throw error;
  return data;
};

export const signInWithEmail = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

export const updateProfile = async (updates: { full_name?: string; phone?: string }) => {
  const { data, error } = await supabase.auth.updateUser({
    data: updates
  });
  
  if (error) throw error;
  return data;
};

export const markPrasadOrdered = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .update({ has_ordered_prasad: true })
    .eq('id', userId)
    .select()
    .single();
    
  if (error) throw error;
  return data;
};
