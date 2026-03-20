#!/bin/bash

# Setup Supabase Admin User
# This script creates an admin user in Supabase Auth

echo "Setting up Supabase Admin User..."

# You need to run this in your Supabase project SQL editor or using the CLI
# The following SQL commands should be executed in Supabase SQL Editor:

cat << 'EOF'
-- First, create the auth user manually in Supabase Dashboard
-- Then run this SQL to create the user profile:

-- Create admin user profile (replace with actual auth user ID)
INSERT INTO users (id, username, email, role) VALUES 
('YOUR_SUPABASE_AUTH_USER_ID', 'admin', 'admin@monconstr.mn', 'admin')
ON CONFLICT (id) DO UPDATE SET
  username = EXCLUDED.username,
  email = EXCLUDED.email,
  role = EXCLUDED.role,
  updated_at = NOW();

-- Alternative: Create a function to handle user creation automatically
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, username, email, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'role', 'admin')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a trigger to automatically create user profiles
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

EOF

echo "Please execute the SQL commands above in your Supabase SQL Editor"
echo "Then create an admin user with email: admin@monconstr.mn and password: admin123"
