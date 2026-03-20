import { supabase } from "./supabase";

// Authentication functions
export const authenticateUser = async (username: string, password: string) => {
  try {
    // For now, use simple authentication
    // In production, you would hash passwords and use proper auth
    if (username === 'admin' && password === 'admin123') {
      // Check if user exists in database
      const { data: user, error } = await supabase
        .from("users")
        .select("*")
        .eq("username", username)
        .single();

      if (error && error.code !== "PGRST116") {
        throw error;
      }

      // If user doesn't exist in DB, create them
      if (!user) {
        const { data: newUser, error: insertError } = await supabase
          .from("users")
          .insert({
            username: username,
            email: "admin@monconstr.mn",
            role: "admin"
          })
          .select()
          .single();

        if (insertError) throw insertError;
        return newUser;
      }

      return user;
    } else {
      throw new Error('Хэрэглэгчийн нэр эсвэл нууц үг буруу байна');
    }
  } catch (error) {
    console.error("Authentication error:", error);
    throw error;
  }
};

export const getUserByUsername = async (username: string) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("username", username)
      .single();

    if (error && error.code !== "PGRST116") {
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

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
