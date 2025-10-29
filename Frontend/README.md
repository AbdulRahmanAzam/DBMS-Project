# Smart Healthcare Verification System - Frontend

A comprehensive React-based healthcare application featuring a clean, modern, and professional design tailored for healthcare management.

## 🎨 Design Theme

The application implements a **Clean & Modern Clinical** theme with:

### Color Palette
- **Primary**: Shades of blue (#4A90E2, #50E3C2) - representing trust, health, and calmness
- **Secondary**: Green (#7ED321) - for success states and positive actions
- **Accent**: Soft orange/yellow (#FFA726) - for notifications and alerts
- **Neutral**: Whites (#FFFFFF) and light grays (#F5F5F5) - for clean, readable backgrounds

### Typography
- **Font Family**: Lato, Open Sans, Roboto (sans-serif fonts for high legibility)
- **Consistent Scale**: Clear visual hierarchy with h1-h6 headings and body text

### Design Principles
- ✅ Minimalism - Every element has a purpose
- ✅ Card-based Design - Organized information display
- ✅ Consistent Iconography - Intuitive navigation
- ✅ Responsive Design - Mobile-first approach
- ✅ Accessibility - WCAG compliant

## 📱 Application Structure

### Public Pages
1. **Landing Page** - First impression with key features and benefits
2. **Login Page** - Secure authentication
3. **Registration Page** - New user onboarding
4. **About Page** - Mission, vision, and platform information
5. **Contact Page** - Support and communication

### Patient Views
1. **Dashboard** - Overview of appointments, records, and quick actions
2. **My Profile** - Personal information management
3. **Medical Records** - Verified health records with filtering
4. **Appointments** - View and manage healthcare appointments
5. **Find a Doctor** - Searchable directory with filters

### Doctor Views
1. **Dashboard** - Today's schedule and patient overview
2. **My Schedule** - Calendar view of appointments
3. **My Patients** - Patient list with record access

### Admin Views
1. **Dashboard** - Platform statistics and recent activity
2. **User Management** - Manage patients and doctors
3. **Verification Portal** - Approve doctor registrations

## 🚀 Features

### Core Functionality
- **Secure Authentication** - Role-based access control (Patient, Doctor, Admin)
- **Protected Routes** - Route guards based on user roles
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Verified Records Badge** - Visual confirmation of verified medical data
- **Real-time Updates** - Dynamic data fetching from backend API

### Key Components
- `Navbar` - Responsive navigation with role-based menu items
- `Card` - Reusable card component with hover effects
- `Button` - Multiple variants and sizes
- `Input` - Form input with validation styling
- `Loading` - Loading spinner for async operations
- `ProtectedRoute` - Route protection wrapper

## 🛠️ Technology Stack

- **React 19** - UI library
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API calls
- **Vite** - Build tool and dev server
- **ESLint** - Code linting

## 📦 Installation

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Update the API base URL in .env
VITE_API_BASE_URL=http://localhost:3000/api
```

## 🏃 Running the Application

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## 📁 Project Structure

```
Frontend/
├── src/
│   ├── components/
│   │   ├── common/          # Reusable components
│   │   ├── patient/         # Patient-specific components
│   │   ├── doctor/          # Doctor-specific components
│   │   └── admin/           # Admin-specific components
│   ├── pages/
│   │   ├── public/          # Public pages
│   │   ├── patient/         # Patient pages
│   │   ├── doctor/          # Doctor pages
│   │   └── admin/           # Admin pages
│   ├── context/             # React context providers
│   ├── utils/               # Utility functions and API
│   ├── styles/              # Global styles and theme
│   ├── App.jsx              # Main app component with routing
│   └── main.jsx             # Application entry point
├── public/                  # Static assets
└── package.json
```

## 🎯 API Integration

The application uses Axios for API communication with the following endpoints:

- `/api/auth/*` - Authentication endpoints
- `/api/patients/*` - Patient management
- `/api/doctors/*` - Doctor management
- `/api/appointments/*` - Appointment scheduling
- `/api/lab/*` - Lab results
- `/api/pharmacy/*` - Prescriptions
- `/api/billing/*` - Billing information

## 🔐 Security Features

- JWT token-based authentication
- Automatic token refresh
- Role-based access control
- Protected routes
- Secure API communication
- LocalStorage for session management

## 📱 Responsive Breakpoints

```css
Mobile: 480px
Tablet: 768px
Desktop: 1024px
Wide: 1280px
```

## 🎨 Theme Variables

All theme variables are defined in `src/styles/global.css` using CSS custom properties:

```css
--primary-main: #4A90E2
--secondary-main: #7ED321
--accent-warning: #FFA726
--neutral-white: #FFFFFF
--neutral-light-gray: #F5F5F5
```

## 📝 Code Style

- ESLint configuration for React
- Consistent component structure
- CSS modules for component styling
- Functional components with hooks
- Clean code principles

## 🚀 Deployment

```bash
# Build the application
npm run build

# The dist/ folder contains the production build
# Deploy dist/ folder to your hosting service
```

## 📄 License

This project is part of the DBMS-Project healthcare management system.

## 🤝 Contributing

1. Follow the existing code style
2. Create feature branches
3. Write meaningful commit messages
4. Test thoroughly before submitting

## 📞 Support

For support and queries, visit the Contact page in the application.
