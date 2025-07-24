# IRELANCE E-commerce Platform

A comprehensive e-commerce platform built with Next.js and Supabase for IRELANCE, a Moroccan company specializing in IT equipment, security systems, air conditioning, and renewable energy solutions.

## 🚀 Features

### Frontend Features
- **Modern UI/UX**: Built with Next.js, Tailwind CSS, and Framer Motion
- **Product Catalog**: Complete product management with categories and brands
- **Shopping Cart**: Full cart functionality with quantity management
- **User Authentication**: Secure authentication with Supabase Auth
- **Responsive Design**: Mobile-first approach with responsive layouts
- **Real-time Updates**: Live notifications using Supabase Realtime
- **Advanced Search**: Product filtering and search capabilities

### Backend Features
- **Supabase Integration**: Complete backend with PostgreSQL database
- **Row Level Security**: Secure data access with RLS policies
- **Real-time Subscriptions**: Live updates for orders and inventory
- **File Storage**: Image upload and management
- **API Integration**: RESTful API with Supabase client

### Admin Panel Features
- **Product Management**: CRUD operations for products, categories, and brands
- **Order Management**: Track and manage customer orders
- **User Management**: View and manage customer accounts
- **Analytics Dashboard**: Sales and performance metrics
- **Inventory Management**: Stock tracking and alerts

## 🛠️ Technology Stack

- **Frontend**: Next.js 13+, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Backend**: Supabase (PostgreSQL, Auth, Storage, Realtime)
- **State Management**: React Hooks, Context API
- **Forms**: React Hook Form with Yup validation
- **Notifications**: React Hot Toast
- **Icons**: Lucide React

## 📊 Database Schema

### Core Tables
- **users**: Extended user profiles with contact information
- **products**: Complete product catalog with specifications
- **categories**: Product categorization (8 main categories)
- **brands**: Supported brands (LG, Samsung, Hikvision, etc.)
- **orders**: Order management with status tracking
- **order_items**: Individual items within orders
- **cart_items**: Shopping cart functionality
- **administrators**: Admin user management
- **user_actions**: User activity tracking

### Product Categories
1. **Cameras**: Professional surveillance and security cameras
2. **Air Conditioning**: Cooling and climate control systems
3. **Security Systems**: Complete security and alarm systems
4. **Laptops**: Professional and personal laptops
5. **Solar Panels**: Renewable energy solutions
6. **Access Control**: Door and access management systems
7. **Fire Systems**: Fire detection and suppression systems
8. **Electronic Equipment**: Various electronic devices and components

### Supported Brands
- LG, Samsung, Acer, Asus, Hager
- Hikvision, Ingelec, Dell, Simon, HP

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Supabase account
- Git

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd irelance-ecommerce
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up Supabase**
   - Create a new Supabase project
   - Run the migration files in `/supabase/migrations/`
   - Configure authentication settings
   - Set up Row Level Security policies

4. **Environment Configuration**
```bash
cp .env.example .env.local
```

Fill in your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

5. **Run the development server**
```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## 📁 Project Structure

```
├── components/           # Reusable UI components
│   ├── ui/              # Basic UI components (Button, Card, etc.)
│   ├── layout/          # Layout components (Header, Footer)
│   └── products/        # Product-specific components
├── pages/               # Next.js pages
│   ├── products/        # Product pages
│   ├── admin/           # Admin panel pages
│   └── api/             # API routes
├── lib/                 # Utility functions and configurations
├── hooks/               # Custom React hooks
├── types/               # TypeScript type definitions
├── styles/              # Global styles and Tailwind config
└── supabase/            # Database migrations and configurations
```

## 🔐 Authentication & Security

### User Authentication
- Email/password authentication via Supabase Auth
- Secure session management
- Password reset functionality
- User profile management

### Admin Authentication
- Role-based access control
- Admin-only routes and features
- Secure admin panel access

### Security Features
- Row Level Security (RLS) policies
- Input validation and sanitization
- CSRF protection
- Secure API endpoints

## 🛒 E-commerce Features

### Product Management
- Product catalog with detailed specifications
- Image galleries with zoom functionality
- Category and brand filtering
- Stock management and availability tracking
- Price comparison and discounts

### Shopping Cart
- Add/remove items with quantity control
- Persistent cart across sessions
- Real-time price calculations
- Cart abandonment tracking

### Order Management
- Order creation and tracking
- Status updates (pending, confirmed, shipped, delivered)
- Order history for customers
- Admin order management interface

## 📱 Contact Integration

### Contact Options
- **Primary Phone**: 06 61 16 23 71
- **Secondary Phone**: 05 22 27 35 39
- **Email**: h.mekouar@irelance.net
- **Address**: Rue 4, No 23, Bd Moulay Youssef, Casablanca

### Contact Features
- Modal with phone number options
- Direct call links for mobile devices
- Contact form with validation
- Business hours display

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#2563EB)
- **Secondary**: Orange (#EA580C)
- **Success**: Green (#059669)
- **Error**: Red (#DC2626)
- **Neutral**: Gray shades

### Typography
- **Headings**: Inter font, weights 600-900
- **Body**: Inter font, weights 400-500
- **Spacing**: 8px base unit system

### Components
- Consistent button styles with hover effects
- Card components with shadow and hover animations
- Form inputs with validation states
- Loading states and skeletons

## 📈 Performance Optimization

### Frontend Optimization
- Next.js Image optimization
- Code splitting and lazy loading
- Efficient re-rendering with React.memo
- Optimized bundle size

### Backend Optimization
- Database indexing for fast queries
- Efficient RLS policies
- Connection pooling
- Caching strategies

## 🚀 Deployment

### Production Build
```bash
npm run build
npm start
```

### Environment Variables
Ensure all production environment variables are set:
- Supabase URL and keys
- Google Maps API key (if using maps)
- Admin configuration

### Recommended Hosting
- **Frontend**: Vercel, Netlify
- **Backend**: Supabase (included)
- **CDN**: Cloudflare (optional)

## 📊 Analytics & Monitoring

### User Analytics
- Page views and user sessions
- Product view tracking
- Cart abandonment rates
- Conversion funnel analysis

### Performance Monitoring
- Core Web Vitals tracking
- Error monitoring with Sentry
- Database performance metrics
- API response times

## 🔧 Development Guidelines

### Code Standards
- TypeScript for type safety
- ESLint and Prettier for code formatting
- Consistent naming conventions
- Component documentation

### Git Workflow
- Feature branch workflow
- Conventional commit messages
- Pull request reviews
- Automated testing

## 📞 Support & Contact

### IRELANCE Information
- **Company**: IRELANCE SARL
- **Founded**: 2006
- **Registration**: RC: 123456 - IF: 7891011
- **Business Hours**: Mon-Fri 08:30-19:00, Sat 09:00-15:00

### Technical Support
- Documentation in `/docs` folder
- GitHub Issues for bug reports
- Email support for questions

## 📄 License

© 2024 IRELANCE SARL. All rights reserved.

---

**Built with ❤️ for IRELANCE - Your trusted technology partner in Morocco**