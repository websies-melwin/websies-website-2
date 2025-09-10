import { supabase } from './supabaseClient';

export const auth = {
  // Sign up new user
  async signUp(email, password, metadata = {}) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata
        }
      });

      if (error) throw error;

      // Create profile
      if (data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            email: data.user.email,
            name: metadata.name,
            business_name: metadata.business_name,
            referral_code: generateReferralCode(),
          });

        if (profileError) console.error('Profile creation error:', profileError);
      }

      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Sign in existing user
  async signIn(email, password) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Sign out
  async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { error: null };
    } catch (error) {
      return { error };
    }
  },

  // Get current user
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

  // Check if user is admin
  async isAdmin() {
    const user = await this.getCurrentUser();
    return user?.profile?.role === 'admin' || user?.profile?.role === 'owner';
  },

  // Reset password
  async resetPassword(email) {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;
      return { error: null };
    } catch (error) {
      return { error };
    }
  },

  // Update password
  async updatePassword(newPassword) {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;
      return { error: null };
    } catch (error) {
      return { error };
    }
  },
};

// Helper function to generate referral code
function generateReferralCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

// Auth middleware for protected routes
export async function withAuth(handler) {
  return async (req, res) => {
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    req.user = user;
    return handler(req, res);
  };
}

// Admin middleware
export async function withAdmin(handler) {
  return async (req, res) => {
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (!profile || (profile.role !== 'admin' && profile.role !== 'owner')) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    req.user = user;
    req.profile = profile;
    return handler(req, res);
  };
}