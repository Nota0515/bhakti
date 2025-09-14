# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Bhakti-United is a premium, mobile-first React application for Ganesh Chaturthi 2025 festival (Aug 27 - Sep 6). It's a devotional festival experience allowing users to discover Mumbai's famous Ganesh mandals through an interactive Google Maps interface, vote for favorites, and order blessed prasad.

**Key Features:**
- Interactive Google Maps with custom styled mandal pins
- User authentication with Supabase
- Prasad ordering system with UPI QR code payments (mock)
- Device-based voting system
- Glassmorphism design with sacred aesthetics
- Express.js API for email functionality

## Technology Stack

- **Frontend:** React 18 + TypeScript + Vite
- **UI Framework:** Tailwind CSS + shadcn/ui components
- **State Management:** TanStack React Query + React Context
- **Authentication & Database:** Supabase
- **Backend API:** Express.js with TypeScript (runs on port 3001)
- **Maps:** Google Maps JavaScript API
- **Animations:** Framer Motion
- **Build Tool:** Vite
- **Email Service:** Nodemailer with Gmail

## Development Commands

### Start Development Environment
```bash
# Starts both frontend (port 8080) and backend API (port 3001)
npm run dev

# Alternative: Start only frontend
npm run dev:vite

# Alternative: Start only API server
npm run dev:api
```

### Build & Deploy
```bash
# Production build
npm run build

# Development build
npm run build:dev

# Preview production build
npm run preview
```

### Code Quality
```bash
# Run ESLint
npm run lint
```

## Architecture Overview

### Application Structure
```
src/
├── api/              # Backend Express server
│   ├── server.ts     # Main Express server with email API
│   └── email.ts      # Email service client
├── components/       # React components
│   ├── ui/           # shadcn/ui components
│   ├── Landing.tsx   # Role selection landing page
│   ├── MapView.tsx   # Google Maps integration
│   ├── Navbar.tsx    # Navigation component
│   └── ProtectedRoute.tsx # Auth guard
├── contexts/         # React contexts
│   └── AuthContext.tsx # Authentication state
├── lib/              # Utility libraries
│   ├── supabase.ts   # Supabase client setup
│   └── supabaseAuth.ts # Auth helper functions
├── pages/            # Page components
└── App.tsx           # Main application router
```

### Key Architectural Patterns

**Full-Stack Setup:** The application runs both a Vite frontend and Express backend simultaneously using the custom `scripts/dev.js` orchestrator.

**Authentication Flow:** Uses Supabase Auth with custom profile management. The `AuthContext` provides global authentication state, and `ProtectedRoute` guards authenticated pages.

**Maps Integration:** Google Maps JavaScript API with custom styled maps, diya-shaped markers, and pin clustering for performance.

**Database Schema:** Supabase PostgreSQL with Row Level Security (RLS) policies. Main table is `profiles` linked to Supabase auth.users.

**API Proxy:** Vite dev server proxies `/api` requests to the Express server running on port 3001.

## Environment Setup

### Required Environment Variables
Create `.env` file in project root:
```env
# Supabase (Required for auth & database)
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Google Maps (Required for map functionality)
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# Email Service (Optional - for mandal registration emails)
GMAIL_EMAIL=your_gmail_address
GMAIL_APP_PASSWORD=your_app_specific_password
```

### Google Maps Setup
- Enable Google Maps JavaScript API, Places API, and Geocoding API
- Restrict API key to authorized domains in production
- The app uses custom map styling with devotional color themes
- Implements marker clustering and staggered pin animations

### Supabase Database Setup
1. Create new Supabase project
2. Run the migration script from `supabase/migrations/20230909150000_create_tables.sql`
3. This creates the `profiles` table with RLS policies
4. Set up authentication providers (Email/Password recommended)

## Design System

### Color Scheme (Devotional Theme)
- **Primary (Saffron):** `hsl(25 85% 55%)`
- **Secondary (Gold):** `hsl(45 75% 65%)`
- **Maroon:** `hsl(0 65% 35%)`
- **Accent (Vermillion):** `hsl(15 80% 50%)`

### Custom Tailwind Classes
- **Gradients:** `bg-gradient-saffron`, `bg-gradient-sunset`, `bg-gradient-divine`
- **Shadows:** `shadow-divine`, `shadow-glow`
- **Animations:** `animate-float`, `animate-glow-pulse`, `animate-pin-drop`

### Button Variants (in `button-variants.tsx`)
- `divine`: Saffron gradient with divine shadow
- `holy`: Glass effect with border glow
- `prasad`: Sunset gradient for ordering
- `mandal`: Divine gradient with golden border

## Common Development Tasks

### Adding New Pages
1. Create component in `src/pages/`
2. Add route in `App.tsx`
3. Wrap with `<ProtectedRoute>` if authentication required
4. Update navigation in `Navbar.tsx` if needed

### Map Customization
- Map styles defined in `src/components/MapView.tsx`
- Custom markers use diya-shaped SVGs
- Pin animations use CSS keyframes defined in `tailwind.config.ts`
- Clustering configuration in Google Maps initialization

### Adding UI Components
- Use shadcn/ui: `npx shadcn@latest add [component-name]`
- Components auto-configured for project's Tailwind theme
- Custom variants can be added to existing components

### Database Operations
- Use Supabase client from `src/lib/supabase.ts`
- Authentication helpers in `src/lib/supabaseAuth.ts`
- Always respect RLS policies when adding new tables

### Email Integration
- Email API runs on Express server (`src/api/server.ts`)
- Uses Gmail SMTP with app-specific passwords
- Client-side integration via `src/api/email.ts`

## Festival-Specific Features

### Mock Payment System
- Generates UPI QR codes for prasad orders
- Uses `qrcode` library to create QR images
- Payment flow is simulated (no real transactions)
- Order status tracked in user profiles

### Voting System
- One vote per device per mandal
- Device fingerprinting using browser/screen properties
- Votes stored in localStorage for client-side validation
- Backend validation should be implemented for production

### Seeded Data
The app includes 12 famous Mumbai mandals:
- Lalbaugcha Raja, Mumbaicha Raja, GSB Seva Mandal, etc.
- Each with coordinates, descriptions, and specialties
- Located in mock database or hardcoded in components

## Performance Considerations

### Maps Optimization
- Implement marker clustering for large datasets
- Use debounced search (300ms) for user input
- Lazy load mandal details on demand
- Consider WebP images with srcset for photos

### Bundle Optimization
- Tree shake Lucide icons (import specific icons only)
- Code splitting at route level (already implemented)
- Use Vite's built-in optimizations
- Consider CDN for images in production

### API Rate Limiting
- Google Maps API has daily quotas
- Implement request caching for geocoding
- Use environment-based API key management

## Security Notes

- No PII storage beyond email and name
- Uses Row Level Security in Supabase
- API keys restricted to authorized domains
- Mock payment system - no real financial data processed
- Device hashing for voting (not personally identifiable)

## Troubleshooting

### Common Issues
1. **Maps not loading:** Check Google Maps API key and enabled services
2. **Auth errors:** Verify Supabase URL/keys and RLS policies
3. **Email not sending:** Confirm Gmail app password setup
4. **API proxy failing:** Ensure Express server is running on port 3001
5. **Build failures:** Check TypeScript errors and dependency versions

### Development Server Issues
- Both frontend and backend must run simultaneously
- Check ports 8080 (frontend) and 3001 (backend) are available
- Use `npm run dev:vite` or `npm run dev:api` to debug individually

### Database Connection
- Verify Supabase project is active and accessible
- Check database policies allow the operations you're attempting
- Ensure user is authenticated for protected operations

## Testing

Currently no testing framework is configured. Consider adding:
- Vitest for unit tests
- React Testing Library for component tests
- Playwright or Cypress for E2E tests
- Jest for API endpoint testing

## Deployment Notes

### Environment Variables
- Set production values for all environment variables
- Use Vite's environment handling for client-side variables
- Keep server environment variables separate

### Build Process
- `npm run build` creates production bundle
- API server needs separate deployment (Express app)
- Consider serverless functions for API endpoints

### Google Maps in Production
- Set up proper API key restrictions
- Configure billing alerts
- Use domain restrictions for security
