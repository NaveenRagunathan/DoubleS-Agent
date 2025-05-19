# Double S Agent - System Architecture

## Table of Contents
1. [Frontend Architecture](#frontend-architecture)
   - [Module: Authentication](#authentication-module)
   - [Module: Dashboard](#dashboard-module)
   - [Module: Content Generator](#content-generator-module)
   - [Module: Audience Research](#audience-research-module)
   - [Module: Strategy Planner](#strategy-planner-module)
   - [Module: Analytics](#analytics-module)
   - [Module: Headline Lab](#headline-lab-module)
   - [Module: Viral Formulas](#viral-formulas-module)

2. [Backend Architecture](#backend-architecture)
   - [API Endpoints](#api-endpoints)
   - [Database Schema](#database-schema)
   - [Authentication Flow](#authentication-flow)
   - [Services](#services)

3. [Deployment](#deployment)

## Frontend Architecture

### Authentication Module
- **Components**:
  - `LoginForm.js`: Handles user login
  - `SignupForm.js`: Handles new user registration
  - `PasswordReset.js`: Handles password reset flow
  - `AuthContext.js`: Context provider for auth state

- **Features**:
  - JWT-based authentication
  - Protected routes
  - Session persistence
  - Password reset flow

### Dashboard Module
- **Components**:
  - `MetricsOverview.js`: Shows key metrics
  - `RecentActivity.js`: Displays recent actions
  - `QuickActions.js`: Quick access to common actions

- **Features**:
  - Real-time metrics display
  - Activity feed
  - Quick navigation

### Content Generator Module
- **Components**:
  - `ContentForm.js`: Form for content generation
  - `ContentPreview.js`: Preview generated content
  - `ContentHistory.js`: Previously generated content

- **Features**:
  - AI-powered content generation
  - Content customization
  - Save and export options
  - Content history

### Audience Research Module
- **Components**:
  - `NicheSelector.js`: Select target niche
  - `AudienceInsights.js`: Display audience data
  - `CompetitorAnalysis.js`: Analyze competitors

- **Features**:
  - Audience demographics
  - Interest analysis
  - Competitor benchmarking

### Strategy Planner Module
- **Components**:
  - `StrategyBuilder.js`: Create content strategies
  - `ContentCalendar.js`: Visual planning calendar
  - `StrategyTemplates.js`: Pre-built strategy templates

- **Features**:
  - Drag-and-drop planning
  - Template library
  - Performance forecasting

### Analytics Module
- **Components**:
  - `MetricsDashboard.js`: Visualize key metrics
  - `ReportGenerator.js`: Create custom reports
  - `ExportOptions.js`: Export analytics data

- **Features**:
  - Custom date ranges
  - Metric comparisons
  - Export to CSV/PDF

### Headline Lab Module
- **Components**:
  - `HeadlineGenerator.js`: Generate headlines
  - `HeadlineTester.js`: Test headline effectiveness
  - `HeadlineHistory.js`: Past generated headlines

- **Features**:
  - AI headline generation
  - A/B testing
  - Performance tracking

### Viral Formulas Module
- **Components**:
  - `FormulaSelector.js`: Choose viral templates
  - `CustomizeFormula.js`: Customize templates
  - `PreviewContent.js`: Preview viral content

- **Features**:
  - Proven viral templates
  - Customization options
  - Performance metrics

## Backend Architecture

### API Endpoints

#### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh-token` - Refresh access token
- `POST /api/auth/forgot-password` - Initiate password reset
- `POST /api/auth/reset-password` - Complete password reset

#### User Management
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile
- `GET /api/user/content` - Get user's generated content
- `POST /api/user/preferences` - Update user preferences

#### Content Generation
- `POST /api/content/generate` - Generate new content
- `GET /api/content/:id` - Get specific content
- `GET /api/content` - List all user's content
- `PUT /api/content/:id` - Update content
- `DELETE /api/content/:id` - Delete content

#### Analytics
- `GET /api/analytics/overview` - Get overview metrics
- `GET /api/analytics/content` - Content performance
- `GET /api/analytics/audience` - Audience insights

### Database Schema

#### Users
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(100) NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Content
```sql
CREATE TABLE content (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  type VARCHAR(50) NOT NULL,
  status VARCHAR(50) DEFAULT 'draft',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Analytics
```sql
CREATE TABLE analytics (
  id SERIAL PRIMARY KEY,
  content_id INTEGER REFERENCES content(id),
  views INTEGER DEFAULT 0,
  engagement FLOAT,
  shares INTEGER DEFAULT 0,
  date DATE NOT NULL
);
```

### Authentication Flow
1. User submits login credentials
2. Server validates credentials
3. If valid, server issues JWT token
4. Token is stored in HTTP-only cookie
5. For protected routes, token is verified
6. On token expiration, refresh token is used to get new access token

### Services

#### Authentication Service
- User registration and login
- Token management
- Password reset

#### Content Service
- Content generation using AI
- Content storage and retrieval
- Content versioning

#### Analytics Service
- Data collection
- Report generation
- Performance metrics calculation

## Deployment

### Frontend
- Build: `npm run build`
- Host on Vercel/Netlify
- Environment variables required

### Backend
- Node.js server
- PostgreSQL database
- Environment variables required
- PM2 for process management

### CI/CD
- GitHub Actions for automated testing
- Auto-deploy on main branch
- Database migrations on deploy
