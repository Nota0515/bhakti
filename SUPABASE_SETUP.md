# Supabase Integration Guide

This document provides instructions for setting up and using Supabase for authentication and database in the Ganpati Mandal App.

## Prerequisites

1. Node.js and npm installed
2. Supabase account (https://supabase.com/)
3. Git installed (for database migrations)

## Setup Instructions

### 1. Create a new Supabase project

1. Go to [Supabase](https://supabase.com/) and sign in/sign up
2. Click on "New Project"
3. Fill in your project details and create the project
4. Note down your project URL and anon/public key from Project Settings > API

### 2. Set up environment variables

Create a `.env` file in the root of your project with the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

### 3. Run database migrations

1. Navigate to the SQL editor in your Supabase dashboard
2. Run the SQL script from `supabase/migrations/20230909150000_create_tables.sql`
3. This will create the necessary tables and set up the required triggers

### 4. Configure Authentication

1. Go to Authentication > Providers in your Supabase dashboard
2. Enable "Email/Password" authentication
3. Optionally, enable other providers (Google, GitHub, etc.)
4. Configure your site URL in Authentication > URL Configuration
   - Add your development URL (e.g., http://localhost:3000)
   - Add your production URL when deploying

### 5. Set up Row Level Security (RLS)

The SQL migration script already includes RLS policies, but you should verify them in your Supabase dashboard:

1. Go to Table Editor > `profiles`
2. Click on "Policies"
3. Ensure the following policies exist:
   - Public profiles are viewable by everyone
   - Users can insert their own profile
   - Users can update their own profile

## Features

### User Authentication
- Sign up with email/password
- Log in/out
- Password reset
- Email confirmation

### User Profile
- View and edit profile information
- Track prasad orders
- View order history

### Prasad Ordering
- Browse available prasad items
- Add items to cart
- Place orders
- Track order status

## API Reference

### Authentication

- `signUp(email, password, name)` - Register a new user
- `signIn(email, password)` - Log in a user
- `signOut()` - Log out the current user
- `getCurrentUser()` - Get the currently logged in user
- `updateProfile(updates)` - Update the current user's profile

### Orders

- `orderPrasad(mandalId, items, deliveryInfo)` - Place a new prasad order
- `getUserOrders(userId)` - Get all orders for a user
- `getOrderDetails(orderId)` - Get details for a specific order

## Troubleshooting

### Common Issues

1. **Authentication errors**
   - Verify your Supabase URL and anon key
   - Check that email confirmation is not required if you haven't set up email
   - Ensure the redirect URLs are correctly configured in Supabase

2. **Database permission errors**
   - Verify that RLS policies are correctly set up
   - Check that the `profiles` table exists and has the correct schema

3. **Missing environment variables**
   - Ensure all required environment variables are set in your `.env` file
   - Restart your development server after making changes to `.env`

## Security Considerations

1. Never expose your Supabase service role key in client-side code
2. Always use Row Level Security (RLS) to protect sensitive data
3. Validate all user inputs on both client and server side
4. Keep your dependencies up to date
5. Use HTTPS in production

## Deployment

When deploying to production:

1. Update your environment variables with production values
2. Enable production mode in your Supabase project settings
3. Set up a custom domain if needed
4. Configure proper CORS settings in Supabase
5. Set up a backup strategy for your database

## Support

For additional help, please refer to:
- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/initializing)
