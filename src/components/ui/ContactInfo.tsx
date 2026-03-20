"use client";

import { useState, useEffect } from 'react';
import { getSettings } from '@/lib/supabase-data';
import { SiteSettings } from '@/types';

interface ContactInfoProps {
  className?: string;
  showPhone?: boolean;
  showEmail?: boolean;
  showAddress?: boolean;
  asLink?: boolean;
}

export default function ContactInfo({ 
  className = "", 
  showPhone = true, 
  showEmail = true, 
  showAddress = false,
  asLink = false 
}: ContactInfoProps): React.ReactNode | string {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const data = await getSettings();
        setSettings(data);
      } catch (error) {
        console.error('Error loading contact info:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  if (loading) {
    return <div className={className}>Ачаалж байна...</div>;
  }

  if (!settings) {
    return <div className={className}>Мэдээлэл байхгүй</div>;
  }

  const renderContent = () => (
    <>
      {showPhone && settings.phone && (
        <span className={className}>{settings.phone}</span>
      )}
      {showEmail && settings.email && (
        <span className={className}>{settings.email}</span>
      )}
      {showAddress && settings.address && (
        <span className={className}>{settings.address}</span>
      )}
    </>
  );

  if (asLink && showEmail && settings.email) {
    // Return just the email string for parent <a> tag
    return settings.email;
  }

  return <>{renderContent()}</>;
}
