"use client";

import { useAuth } from "@/contexts/AuthContext";
import Login from "@/components/admin/Login";

export default function AdminPage() {
  const { user, login, isLoading, error } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-gray-500">Ачаалж байна...</div>
      </div>
    );
  }

  if (user) {
    // Redirect to dashboard if already logged in
    window.location.href = "/admin/dashboard";
    return null;
  }

  return <Login onLogin={login} error={error || undefined} />;
}
