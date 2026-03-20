"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { createSupabaseClient } from '@/lib/supabase';

interface LoginProps {
  onLogin: (user: any) => void;
  error?: string | undefined;
}

export default function Login({ onLogin, error }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [localError, setLocalError] = useState<string | undefined>(error);

  useEffect(() => {
    setLocalError(error);
  }, [error]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLocalError(undefined);
    
    try {
      // Create Supabase client
      const supabase = createSupabaseClient();
      
      // Sign in with Supabase Auth
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (signInError) {
        throw signInError;
      }

      if (data.user) {
        // Get or create user profile
        const { data: profile, error: profileError } = await supabase
          .from("users")
          .select("*")
          .eq("id", data.user.id)
          .single();

        if (profileError && profileError.code !== "PGRST116") {
          throw profileError;
        }

        let userProfile = profile;
        
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
          userProfile = newProfile;
        }

        // Update last login
        await supabase
          .from("users")
          .update({ last_login: new Date().toISOString() })
          .eq("id", userProfile.id);

        // Call parent login function
        onLogin(userProfile);
      }
    } catch (err: any) {
      let errorMessage = 'Нэвтрэхэд алдаа гарлаа';
      
      if (err?.message) {
        if (err.message.includes('Invalid login credentials')) {
          errorMessage = 'Имэйл эсвэл нууц үг буруу байна';
        } else if (err.message.includes('Email not confirmed')) {
          errorMessage = 'Имэйл баталгаажуулаагүй байна';
        } else if (err.message.includes('Invalid email')) {
          errorMessage = 'Буруу имэйл хаяг байна';
        } else {
          errorMessage = err.message;
        }
      }
      
      setLocalError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-fill admin credentials for development
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      setEmail(process.env.ADMIN_EMAIL || 'admin@monconstr.mn');
      setPassword(process.env.ADMIN_PASSWORD || 'admin123');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-900 mb-2">МонКонстракшн</h1>
          <p className="text-gray-600">Админ хэсэгт нэвтрэх</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {localError && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg"
            >
              {localError}
            </motion.div>
          )}

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Имэйл хаяг
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="admin@monconstr.mn"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Нууц үг
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              'Нэвтрэх'
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Зөвхөн зөвшөөрөгдсөн хэрэглэгчид нэвтрэх боломжтой
          </p>
          {process.env.NODE_ENV === 'development' && (
            <p className="text-xs text-gray-400 mt-2">
              Development: admin@monconstr.mn / admin123
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
}
