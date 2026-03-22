"use client";

import { useState, useEffect } from "react";
import {
  Home,
  FolderOpen,
  MessageSquare,
  Settings,
  Users,
  BarChart3,
  Menu,
  X,
  LogOut,
  Image,
  User as UserIcon,
  Cog,
  TrendingUp,
  HelpCircle,
} from "lucide-react";
import { initializeData } from "@/lib/data";
import { useAuth } from "@/contexts/AuthContext";
import { getSettings } from "@/lib/supabase-data";
import { SiteSettings } from "@/types";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const menuItems = [
  { icon: Home, label: "Нүүр", href: "/admin/dashboard" },
  { icon: Image, label: "Нүүр хуудас", href: "/admin/hero" },
  { icon: FolderOpen, label: "Төслүүд", href: "/admin/projects" },
  { icon: Settings, label: "Үйлчилгээ", href: "/admin/services" },
  { icon: HelpCircle, label: "FAQ", href: "/admin/faq" },
  { icon: MessageSquare, label: "Сэтгэгдэл", href: "/admin/testimonials" },
  { icon: Users, label: "Холбогдол", href: "/admin/contacts" },
  { icon: UserIcon, label: "Бидний тухай", href: "/admin/about" },
  { icon: Cog, label: "Тохиргоо", href: "/admin/settings" },
  { icon: TrendingUp, label: "Статистик", href: "/admin/analytics" },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePath, setActivePath] = useState("/admin/dashboard");
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const { user, logout, isLoading } = useAuth();

  useEffect(() => {
    if (user && !isLoading) {
      // Initialize data only once when user is available
      initializeData().catch(console.error);
      // Set active path from current URL
      const currentPath = window.location.pathname;
      setActivePath(currentPath);
      
      // Load settings
      const loadSettings = async () => {
        try {
          const data = await getSettings();
          setSettings(data);
        } catch (error) {
          console.error('Error loading settings:', error);
        }
      };
      
      loadSettings();
    }
  }, [user, isLoading]);

  // Handle navigation
  const handleNavigation = (href: string) => {
    setActivePath(href);
    // Close mobile sidebar after navigation
    setSidebarOpen(false);
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      // Redirect to login page
      window.location.href = "/admin";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Show loading state while auth is loading
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-gray-500">Ачаалж байна...</div>
      </div>
    );
  }

  // Show nothing if user is not authenticated (pages handle this)
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex w-full">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 min-w-72 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out flex flex-col ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:inset-0`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <h1 className="text-xl font-bold text-blue-900">
            {settings?.company_name || 'Админ'}
          </h1>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 mt-6 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePath === item.href || 
                           (item.href === "/admin/dashboard" && activePath === "/admin");

            return (
              <a
                key={item.href}
                href={item.href}
                onClick={() => handleNavigation(item.href)}
                className={`flex items-center px-6 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* User Section */}
        <div className="p-6 border-t mt-auto">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
              {user?.username?.charAt(0)?.toUpperCase() || 'A'}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">{user?.username || 'Admin'}</p>
              <p className="text-xs text-gray-500">{user?.email || settings?.email || 'admin@monconstr.mn'}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center mt-4 text-sm text-red-600 hover:text-red-700 transition-colors"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Гарах
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full">
        {/* Top Bar */}
        <div className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between h-16 px-6">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
              <Menu className="w-6 h-6" />
            </button>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Сайн байна уу, {user?.username || 'Admin'} - {settings?.company_name || 'Админ'}
              </span>
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                {user?.username?.charAt(0)?.toUpperCase() || 'A'}
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="p-6">{children}</main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
