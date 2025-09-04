# Bhakti-United - Ganesh Chaturthi 2025 Festival App

A premium, mobile-first, responsive festival web app for Ganesh Chaturthi 2025 (Aug 27 → Sep 6).

## 🕉️ Overview

Bhakti-United is a devotional festival experience that allows users to discover Mumbai's famous Ganesh mandals through an interactive map, vote for their favorites, and order blessed prasad. The app features a cinematic glassmorphism design with sacred aesthetics.

## 🗺️ Map Integration (Core Feature)

### Google Maps Setup
- **Provider**: Google Maps JavaScript API
- **API Key**: `AIzaSyAvOlU6uEZycjphIYj1TMIYO1t_k6pTGj4`
- **Environment Variable**: `MAP_API_KEY` (recommended for production)

### Implementation Details
```javascript
// Google Maps API Loader Configuration
const loader = new Loader({
  apiKey: GOOGLE_MAPS_API_KEY,
  version: "weekly", 
  libraries: ["places", "geometry"]
});
```

### Map Features
- **Custom Styled Maps**: Devotional color theme with warm tones
- **Interactive Pins**: Diya-styled markers with verification badges
- **Pin Clustering**: Automatic clustering for better performance
- **Staggered Animation**: Pins drop in sequentially with bounce effect
- **Custom Overlays**: HTML-based pin markers with hover effects

### Performance Recommendations
- **Rate Limiting**: Implement geocoding request caching
- **Billing Alerts**: Set up Google Cloud billing monitoring
- **Domain Restrictions**: Restrict API key to authorized domains
- **Fallback Provider**: Consider Mapbox or Leaflet for backup

## 🎨 Design System

### Color Palette
```css
/* Devotional Colors (HSL) */
--primary: 25 85% 55%;        /* Saffron */
--secondary: 45 75% 65%;      /* Gold */  
--maroon: 0 65% 35%;          /* Deep Maroon */
--accent: 15 80% 50%;         /* Vermillion */
```

### Gradients
```css
--gradient-saffron: linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)));
--gradient-sunset: linear-gradient(180deg, hsl(25 90% 65%), hsl(15 80% 50%));
--gradient-divine: linear-gradient(120deg, hsl(45 75% 65%), hsl(25 85% 55%), hsl(0 65% 35%));
```

### Glass Morphism Effects
```css
.glass {
  background: var(--gradient-glass);
  backdrop-filter: blur(16px);
  border: 1px solid hsla(45, 75%, 85%, 0.2);
}
```

### Sacred Shadows
```css
--shadow-divine: 0 8px 32px hsla(25, 85%, 55%, 0.15);
--shadow-glow: 0 0 40px hsla(25, 90%, 65%, 0.3);
```

## 🎭 Component Variants

### Button Variants
- **divine**: Saffron gradient with divine shadow
- **holy**: Glass effect with border glow
- **prasad**: Sunset gradient with hover scale
- **mandal**: Divine gradient with golden border
- **vote**: Glass with accent border
- **floating**: Glass with float animation

### Usage
```tsx
<Button variant="divine" size="lg">Discover Mandals</Button>
<Button variant="holy" size="lg">Register Mandal</Button>
<Button variant="prasad">Order Prasad</Button>
```

## 🗄️ Mock Database Schema

### Mandals Collection
```json
{
  "id": "uuid",
  "name": "string", 
  "est_year": "number",
  "location": "string",
  "lat": "number",
  "lng": "number", 
  "contact_phone": "string",
  "upi_id": "string",
  "delivery_available": "boolean",
  "verified": "boolean",
  "description": "string",
  "specialties": ["string"],
  "votes": "number"
}
```

### Orders Collection
```json
{
  "id": "uuid",
  "mandal_id": "uuid", 
  "items": [{"item": "Modak", "qty": 2, "price": 30}],
  "subtotal": 120.00,
  "delivery_fee": 200.00,
  "total": 320.00,
  "status": "created|paid|cancelled",
  "created_at": "timestamp"
}
```

### Votes Collection  
```json
{
  "id": "uuid",
  "mandal_id": "uuid",
  "device_hash": "string",
  "created_at": "timestamp"
}
```

## 🏪 Prasad Menu & Mock Payments

### Menu Items
- **Modak**: ₹30 (Traditional steamed sweet)
- **Ladoo**: ₹50 (Coconut/Sesame balls)  
- **Special**: ₹100 (Premium blessed prasad)
- **Delivery**: +₹200 (Optional home delivery)

### UPI QR Generation
```javascript
// UPI URI Format
const upiUri = `upi://pay?pa=${upi_id}&pn=Bhakti-United Mandal&tn=Bhakti-United Prasad&am=${total}&cu=INR`;
```

### Mock Payment Flow
1. **Generate QR**: Create UPI QR code with order details
2. **Display Modal**: Show QR, total amount, and UPI ID
3. **Mock Payment**: "Mock Paid" button simulates payment
4. **Status Update**: Order status changes to "paid"
5. **Disclaimer**: Clear messaging about mock payments

## 🎯 Device-Based Voting

### Implementation
```javascript
// Device Hash Generation
const deviceHash = btoa(
  navigator.userAgent + 
  navigator.language + 
  screen.width + 
  screen.height + 
  new Date().toDateString()
).substring(0, 32);

// Store in localStorage
localStorage.setItem('bhakti_device_id', deviceHash);
```

### Voting Rules
- **One Vote**: Per device per mandal
- **Prevention**: Check device_hash in votes table
- **UI Feedback**: Disable vote button after voting
- **Storage**: Use localStorage for client-side tracking

## 🎬 Motion & Animation Specs

### Keyframe Animations
```css
/* Pin Drop Animation */
@keyframes pin-drop {
  0% { transform: translateY(-100vh) scale(0.3); opacity: 0; }
  60% { transform: translateY(10px) scale(1.1); opacity: 0.8; }
  100% { transform: translateY(0) scale(1); opacity: 1; }
}

/* Diya Flicker */  
@keyframes diya-flicker {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.05); }
}

/* Float Animation */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}
```

### Motion Timing
- **Pin Drop**: 800ms with bounce easing
- **Button Hover**: 200ms scale transform  
- **Float**: 6s infinite ease-in-out
- **Glow Pulse**: 2s infinite alternate

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px (Primary focus)
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

### Mobile-First Features
- **Bottom Sheet**: Mandal details on mobile
- **Sticky Cart**: Fixed position cart bar
- **Touch Gestures**: Pinch zoom, pan navigation
- **Thumb-Friendly**: Large touch targets (44px+)

## ♿ Accessibility

### Requirements Met
- **Contrast Ratios**: AA compliant (4.5:1 minimum)
- **Keyboard Navigation**: Full keyboard support for map
- **ARIA Labels**: Descriptive labels for interactive elements
- **Alt Text**: Meaningful descriptions for images
- **Focus Management**: Visible focus indicators

### Screen Reader Support
```tsx
<Button 
  aria-label="Vote for Lalbaugcha Raja mandal"
  onClick={() => handleVote(mandalId)}
>
  <Star className="w-4 h-4" aria-hidden="true" />
  Vote
</Button>
```

## 🚀 Performance Optimizations

### Map Performance
- **Marker Clustering**: Reduce DOM elements at zoom levels
- **Lazy Loading**: Load mandal details on demand  
- **Image Optimization**: WebP format with srcset
- **Debounced Search**: 300ms delay on search input

### Bundle Optimization
- **Tree Shaking**: Import only used Lucide icons
- **Code Splitting**: Route-based code splitting
- **Compression**: Gzip/Brotli for assets
- **CDN**: Serve images from CDN

## 🔐 Security & Privacy

### Data Handling
- **No PII Storage**: Only device hashes, no personal data
- **Local Storage**: Device ID for voting prevention
- **API Security**: Rate limiting and input validation
- **Mock Payments**: No real financial transactions

### Privacy Compliance
- **Location Consent**: Request permission for location features
- **Data Minimization**: Collect only necessary data
- **Transparent Messaging**: Clear privacy notices

## 🧪 Mock API Endpoints

### Mandals
```javascript
GET    /api/mandals           // List all mandals
GET    /api/mandals/:id       // Single mandal details  
POST   /api/mandals           // Create new mandal
PUT    /api/mandals/:id       // Update mandal
```

### Voting
```javascript
POST   /api/votes             // Cast vote
body: { mandal_id, device_hash }
response: 201 Created | 409 Already Voted
```

### Orders
```javascript
POST   /api/orders            // Create order
body: { mandal_id, items, delivery_address }

PATCH  /api/orders/:id        // Update order status  
body: { status: "paid" }
```

## 📦 Dependencies

### Core Libraries
```json
{
  "@googlemaps/js-api-loader": "^1.16.6",
  "@types/google.maps": "^3.55.5", 
  "framer-motion": "^10.16.16",
  "qrcode": "^1.5.3"
}
```

### Development Setup
```bash
npm install
npm run dev
```

### Environment Variables
```bash
# .env.local
VITE_MAP_API_KEY=AIzaSyAvOlU6uEZycjphIYj1TMIYO1t_k6pTGj4
VITE_APP_ENV=development
```

## 🎊 Festival Features

### Seeded Mandals (12 Famous Locations)
1. **Lalbaugcha Raja** - Mumbai's most famous mandal
2. **Mumbaicha Raja** - Historic Ganesh Galli location  
3. **GSB Seva Mandal** - King's Circle heritage site
4. **Andhericha Raja** - Western suburbs favorite
5. **Khetwadi Ganraj** - Artistic pandal designs
6. **Chinchpokli Cha Chintamani** - Traditional celebrations
7. **Dongricha Raja** - Peaceful spiritual atmosphere
8. **Keshavji Naik Chawl** - Mumbai's first public celebration
9. **Fortcha Icchapurti Raja** - Business district mandal
10. **Parelcha Maharaja** - Mill area community center
11. **Sahyadri Krida Mandal** - Sports club modern approach  
12. **Kalachowkicha Mahaganpati** - Historic spiritual center

### Cultural Elements
- **Om Symbol**: Ganpati Bappa micro-logo watermark
- **Sacred Colors**: Saffron, gold, vermillion palette
- **Traditional Terms**: Hindi/Marathi cultural terminology
- **Festival Timeline**: Aug 27 - Sep 6, 2025 celebration period

## 🏗️ Future Enhancements

### Planned Features
- **Photo Gallery**: Mandal image uploads and galleries
- **Live Streaming**: Real-time darshan streaming  
- **Social Sharing**: Festival moment sharing
- **Push Notifications**: Event and prasad delivery updates
- **Multi-Language**: Hindi, Marathi, English support

### Technical Improvements  
- **PWA Support**: Offline functionality
- **Web3 Integration**: NFT collectibles for festival memories
- **AR Features**: Augmented reality mandal exploration
- **Analytics**: User journey and engagement tracking

## 📞 Support

For technical issues or feature requests, please refer to the component documentation or create an issue in the project repository.

---

**Ganpati Bappa Morya! 🙏**

*This is a mock festival application for demonstration purposes. No real payments are processed.*