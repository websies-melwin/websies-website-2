import { supabase } from './supabaseClient';

export const auth = {
  // Sign up new user - profile creation handled separately
  async signUp(email, password, metadata = {}) {
    try {
      console.log('Starting signup for:', email);
      
      // Sign up the user with metadata
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
      console.log('Email confirmed:', !!authData.user?.email_confirmed_at);

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
      
      // Ensure profile exists after successful login
      if (data.user) {
        await this.ensureProfile(data.user);
      }
      
      return { data, error: null };
    } catch (error) {
      console.error('Auth signin error:', error);
      return { data: null, error };
    }
  },

  // Ensure profile exists for a user
  async ensureProfile(user) {
    try {
      console.log('Checking/creating profile for user:', user.id);
      
      // Check if profile exists
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError && profileError.code === 'PGRST116') {
        // Profile doesn't exist, create it
        console.log('Profile not found, creating...');
        const { error: createError } = await supabase
          .from('profiles')
          .insert({
            id: user.id,
            email: user.email,
            name: user.user_metadata?.name || user.email.split('@')[0],
            business_name: user.user_metadata?.business_name || null
          });

        if (createError) {
          console.error('Profile creation error:', createError);
          // Don't throw here, user is still authenticated
        } else {
          console.log('Profile created successfully');
        }
      } else if (!profileError) {
        console.log('Profile already exists');
      }
    } catch (error) {
      console.error('Ensure profile error:', error);
      // Don't throw here, user is still authenticated
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