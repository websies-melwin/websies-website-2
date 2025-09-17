# Test Account Information

## How to Test Authentication

### Option 1: Create a New Account
1. Go to https://websies.co
2. Click the login button (user icon in top right)
3. Click "Sign up" at the bottom of the login modal
4. Enter:
   - Name: Test User
   - Business: Test Business
   - Email: your-email@example.com
   - Password: testpass123 (minimum 6 characters)
5. Click "Create Account"
6. You'll be logged in and redirected to dashboard

### Option 2: Use Existing Test Account (if you created one)
1. Go to https://websies.co
2. Click the login button
3. Enter the email and password you used during signup
4. Click "Log In"

### Troubleshooting

If login doesn't work:
1. Open browser console (F12)
2. Check for any error messages
3. Make sure JavaScript is enabled
4. Try clearing browser cache and cookies

### Check Supabase Dashboard
You can verify users are being created:
1. Go to: https://app.supabase.com/project/izenvkhvvypghmfvflmn/auth/users
2. You should see any accounts you've created listed there

### Important Notes
- Email verification is optional (you can login without verifying)
- The dashboard at /dashboard requires authentication to access
- Sessions persist until you log out or clear cookies