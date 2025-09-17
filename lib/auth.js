import { supabase } from './supabaseClient';

export const auth = {
  // Sign up new user with automatic profile creation
  async signUp(email, password, metadata = {}) {
    try {
      console.log('Starting signup for:', email);
      
      // First, sign up the user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: metadata.name,
            business_name: metadata.business_name
          }
        }
      });

      if (authError) {
        console.error('Auth signup error:', authError);
        throw authError;
      }

      console.log('User signed up successfully:', authData.user?.email);

      // If user was created and is confirmed, create profile
      if (authData.user && authData.user.email_confirmed_at) {
        console.log('User is confirmed, creating profile...');
        await this.createProfile(authData.user, metadata);
      } else if (authData.user) {
        console.log('User created but needs email confirmation');
      }

      return { data: authData, error: null };
    } catch (error) {
      console.error('Signup error:', error);
      return { data: null, error };
    }
  },

  // Create user profile
  async createProfile(user, metadata = {}) {
    try {
      console.log('Creating profile for user:', user.id);
      
      const { error } = await supabase
        .from('profiles')
        .insert({
          id: user.id,
          email: user.email,
          name: metadata.name || user.email.split('@')[0],
          business_name: metadata.business_name || null
        });

      if (error) {
        console.error('Profile creation error:', error);
        throw error;
      }

      console.log('Profile created successfully');
      return { error: null };
    } catch (error) {
      console.error('Create profile error:', error);
      return { error };
    }
  },

  // Sign in existing user
  async signIn(email, password) {
    try {
      console.log('Starting signin for:', email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Signin error:', error);
        throw error;
      }
      
      console.log('Signin successful for:', data.user?.email);
      
      // Check if profile exists, create if not
      if (data.user) {
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();

        if (profileError && profileError.code === 'PGRST116') {
          // Profile doesn't exist, create it
          console.log('Profile not found, creating...');
          await this.createProfile(data.user);
        }
      }
      
      return { data, error: null };
    } catch (error) {
      console.error('Auth signin error:', error);
      return { data: null, error };
    }
  },

  // Sign out
  async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      console.log('Signed out successfully');
      return { error: null };
    } catch (error) {
      console.error('Signout error:', error);
      return { error };
    }
  },

  // Get current user with profile
  async getCurrentUser() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error || !user) return null;

      // Get profile data
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      return {
        ...user,
        profile
      };
    } catch (error) {
      console.error('Get user error:', error);
      return null;
    }
  },

  // Listen to auth state changes
  onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange(callback);
  }
};