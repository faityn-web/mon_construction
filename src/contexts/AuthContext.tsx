"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createSupabaseClient } from '@/lib/supabase';

interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'editor';
  last_login?: string;
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  clearError: () => void;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Prevent multiple initializations
    if (isInitialized) return;
    
    // Check current user on mount
    const initializeAuth = async () => {
      try {
        const supabase = createSupabaseClient();
        
        // Use getSession instead of getUser to avoid lock issues
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.warn("Session error:", sessionError);
          // Fall back to localStorage
          const savedUser = localStorage.getItem('admin_user');
          if (savedUser) {
            try {
              const parsedUser = JSON.parse(savedUser);
              setUser(parsedUser);
            } catch (error) {
              localStorage.removeItem('admin_user');
            }
          }
        } else if (session?.user) {
          // Get user profile from users table with retry logic
          let profile = null;
          let retries = 3;
          
          while (retries > 0 && !profile) {
            try {
              const { data: profileData, error: profileError } = await supabase
                .from("users")
                .select("*")
                .eq("id", session.user.id)
                .single();

              if (profileError) {
                if (profileError.code === "PGRST116") {
                  // Profile doesn't exist, create it
                  const { data: newProfile, error: insertError } = await supabase
                    .from("users")
                    .insert({
                      id: session.user.id,
                      username: session.user.email?.split("@")[0] || 'admin',
                      email: session.user.email!,
                      role: "admin"
                    })
                    .select()
                    .single();

                  if (!insertError) {
                    profile = newProfile;
                  }
                } else {
                  throw profileError;
                }
              } else {
                profile = profileData;
              }
            } catch (err) {
              console.warn(`Profile fetch attempt ${4 - retries} failed:`, err);
              retries--;
              if (retries > 0) {
                await new Promise(resolve => setTimeout(resolve, 1000));
              }
            }
          }

          if (profile) {
            setUser(profile);
            localStorage.setItem('admin_user', JSON.stringify(profile));
          }
        } else {
          // No session, check localStorage for fallback
          const savedUser = localStorage.getItem('admin_user');
          if (savedUser) {
            try {
              const parsedUser = JSON.parse(savedUser);
              setUser(parsedUser);
            } catch (error) {
              localStorage.removeItem('admin_user');
            }
          }
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
      } finally {
        setIsLoading(false);
        setIsInitialized(true);
      }
    };

    initializeAuth();

    // Listen for auth changes with debouncing
    let timeoutId: NodeJS.Timeout;
    const supabase = createSupabaseClient();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      // Debounce rapid auth changes
      clearTimeout(timeoutId);
      
      timeoutId = setTimeout(async () => {
        try {
          if (event === 'SIGNED_IN' && session?.user) {
            let profile = null;
            let retries = 3;
            
            while (retries > 0 && !profile) {
              try {
                const { data: profileData, error: profileError } = await supabase
                  .from("users")
                  .select("*")
                  .eq("id", session.user.id)
                  .single();

                if (profileError) {
                  if (profileError.code === "PGRST116") {
                    // Profile doesn't exist, create it
                    const { data: newProfile, error: insertError } = await supabase
                      .from("users")
                      .insert({
                        id: session.user.id,
                        username: session.user.email?.split("@")[0] || 'admin',
                        email: session.user.email!,
                        role: "admin"
                      })
                      .select()
                      .single();

                    if (!insertError) {
                      profile = newProfile;
                    }
                  } else {
                    throw profileError;
                  }
                } else {
                  profile = profileData;
                }
              } catch (err) {
                console.warn(`Auth state profile fetch attempt ${4 - retries} failed:`, err);
                retries--;
                if (retries > 0) {
                  await new Promise(resolve => setTimeout(resolve, 500));
                }
              }
            }

            if (profile) {
              setUser(profile);
              localStorage.setItem('admin_user', JSON.stringify(profile));
            }
          } else if (event === 'SIGNED_OUT') {
            setUser(null);
            localStorage.removeItem('admin_user');
          }
        } catch (error) {
          console.error("Error handling auth state change:", error);
        }
      }, 300);
    });

    return () => {
      clearTimeout(timeoutId);
      subscription?.unsubscribe();
    };
  }, [isInitialized]);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('admin_user', JSON.stringify(userData));
    setError(null);
  };

  const clearError = () => {
    setError(null);
  };

  const logout = async () => {
    try {
      // Clear local state immediately for better UX
      setUser(null);
      localStorage.removeItem('admin_user');
      setError(null);
      
      // Then attempt to sign out from Supabase
      const supabase = createSupabaseClient();
      await supabase.auth.signOut();
    } catch (err) {
      console.error("Logout error:", err);
      // User is already logged out locally, so don't show error
    }
  };

  const value = {
    user,
    login,
    logout,
    clearError,
    isLoading,
    error
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
