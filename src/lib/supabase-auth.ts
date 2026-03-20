import { supabase } from "./supabase";

// Supabase Auth functions
export const signInWithSupabase = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    // Get user profile from users table
    if (data.user) {
      const { data: profile, error: profileError } = await supabase
        .from("users")
        .select("*")
        .eq("id", data.user.id)
        .single();

      if (profileError && profileError.code !== "PGRST116") {
        throw profileError;
      }

      // If profile doesn't exist, create it
      if (!profile) {
        const { data: newProfile, error: insertError } = await supabase
          .from("users")
          .insert({
            id: data.user.id,
            username: email.split("@")[0],
            email: data.user.email!,
            role: "admin"
          })
          .select()
          .single();

        if (insertError) throw insertError;
        return newProfile;
      }

      return profile;
    }

    return null;
  } catch (error) {
    console.error("Sign in error:", error);
    throw error;
  }
};

export const signOutWithSupabase = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }
  } catch (error) {
    console.error("Sign out error:", error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error) {
      throw error;
    }

    if (user) {
      const { data: profile, error: profileError } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profileError && profileError.code !== "PGRST116") {
        throw profileError;
      }

      return profile;
    }

    return null;
  } catch (error) {
    console.error("Get current user error:", error);
    return null;
  }
};

export const onAuthStateChange = (callback: (event: string, session: any) => void) => {
  return supabase.auth.onAuthStateChange(callback);
};

// Update last login
export const updateUserLastLogin = async (userId: string) => {
  try {
    const { error } = await supabase
      .from("users")
      .update({ last_login: new Date().toISOString() })
      .eq("id", userId);

    if (error) throw error;
  } catch (error) {
    console.error("Error updating last login:", error);
  }
};
