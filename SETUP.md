# Complete Setup Guide: Frontend + Backend

This guide will walk you through setting up and running the complete blog application with the React frontend and Node.js backend.

## 📋 Prerequisites

Ensure you have installed:
- **Node.js** 18+ ([Download](https://nodejs.org/))
- **npm** 9+ or yarn
- **MongoDB** 5.0+ (Local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - free)
- **Git**
- A code editor (VS Code recommended)

## 🎯 Quick Start (5 minutes)

### 1. Setup MongoDB

**Option A: Local MongoDB (Windows)**

```bash
# Download MongoDB from: https://www.mongodb.com/try/download/community
# Follow installation wizard and start MongoDB service
mongod
```

**Option B: MongoDB Atlas (Cloud - Recommended)**

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account and log in
3. Create a new project
4. Create a cluster (choose Free Shared tier)
5. Create database user (remember username/password)
6. Add your IP to Network Access (0.0.0.0/0 for development)
7. Click "Connect" → "Connect your application"
8. Copy connection string, it will look like:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/blog-db?retryWrites=true&w=majority
   ```

### 2. Setup Backend

**Terminal 1 - Backend Setup**

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env file with your configuration
# If using MongoDB Atlas, update MONGODB_URI with your connection string
# Otherwise, use default: mongodb://localhost:27017/blog-db

# Seed database with sample data (optional)
npm run seed

# Start development server
npm run dev
```

Backend should be running on: `http://localhost:5000`

### 3. Setup Frontend

**Terminal 2 - Frontend Setup**

```bash
# Navigate to frontend directory
cd my-project

# Install dependencies
npm install

# Create .env.local file
cp .env.example .env.local

# Start development server
npm run dev
```

Frontend should be running on: `http://localhost:5173` (or different port if 5173 is taken)

### 4. Test the Application

1. Open `http://localhost:5173` in your browser
2. Click "Sign up" and create an account
   - Email: `yourname@example.com`
   - Password: `Password123` (must have uppercase, lowercase, number)
3. Login with your credentials
4. Create and view blog posts
5. Explore all features!

## 📂 Project Structure

```
project/
├── my-project/                 (React Frontend)
│   ├── src/
│   │   ├── api/               (API client configuration)
│   │   ├── pages/             (Page components)
│   │   ├── components/        (Reusable components)
│   │   └── ...
│   ├── package.json
│   ├── vite.config.js
│   └── .env.example
│
└── backend/                    (Node.js Backend)
    ├── src/
    │   ├── config/            (Database, JWT, Logger)
    │   ├── controllers/       (Business logic)
    │   ├── middleware/        (Auth, Validation, Errors)
    │   ├── models/            (MongoDB schemas)
    │   ├── routes/            (API endpoints)
    │   ├── utils/             (Helper functions)
    │   ├── validators/        (Zod schemas)
    │   └── server.js          (Main server)
    ├── scripts/
    │   └── seed.js            (Seed database)
    ├── package.json
    ├── .env.example
    └── README.md
```

## 🔧 Configuration

### Backend .env File

Create `backend/.env` with these variables:

```env
# Server
NODE_ENV=development
PORT=5000

# Database
MONGODB_URI=mongodb://localhost:27017/blog-db
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/blog-db?retryWrites=true&w=majority

# JWT (CHANGE THESE IN PRODUCTION!)
JWT_ACCESS_SECRET=super_secret_access_key_change_me
JWT_REFRESH_SECRET=super_secret_refresh_key_change_me
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d

# Frontend URL
FRONTEND_URL=http://localhost:5173

# Logging
LOG_LEVEL=info
```

### Frontend .env.local File

Create `my-project/.env.local`:

```env
VITE_API_URL=http://localhost:5000/api
```

## 📖 API Documentation

### Authentication

**Sign Up**
```http
POST http://localhost:5000/api/auth/signup
Content-Type: application/json

{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "Password123",
  "confirmPassword": "Password123"
}
```

**Login**
```http
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "Password123",
  "rememberMe": false
}
```

### Posts

**Get All Posts**
```
GET http://localhost:5000/api/posts?page=1&limit=10&category=javascript&sort=newest
```

**Get Single Post**
```
GET http://localhost:5000/api/posts/{postId}
Authorization: Bearer {accessToken}
```

**Create Post** (requires authentication)
```http
POST http://localhost:5000/api/posts
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "title": "My Blog Post",
  "body": "Post content here...",
  "category": "javascript",
  "tags": ["javascript", "tutorial"],
  "published": true
}
```

**Update Post** (requires authentication)
```http
PUT http://localhost:5000/api/posts/{postId}
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "title": "Updated Title",
  "body": "Updated content..."
}
```

**Delete Post** (requires authentication)
```
DELETE http://localhost:5000/api/posts/{postId}
Authorization: Bearer {accessToken}
```

## 🧪 Sample Test Accounts (after seeding)

```
Email: john@example.com      | Password: Password123  | Role: Admin
Email: jane@example.com      | Password: Password123  | Role: User
Email: mike@example.com      | Password: Password123  | Role: User
```

To create these accounts, run:
```bash
cd backend
npm run seed
```

## 📊 Database Seeding

The backend includes a seed script to populate the database with sample data:

```bash
cd backend
npm run seed
```

This will create:
- 3 sample users (1 admin, 2 regular users)
- 20 sample blog posts across different categories
- Random likes and views for each post

## 🚀 Running Both Servers

You need two terminal windows/tabs:

**Terminal 1 - Backend**
```bash
cd backend
npm run dev
# Runs on http://localhost:5000
```

**Terminal 2 - Frontend**
```bash
cd my-project
npm run dev
# Runs on http://localhost:5173
```

Both servers must be running for the application to work properly.

## 🐛 Troubleshooting

### Backend won't connect to MongoDB

**Problem**: `Error: connect ECONNREFUSED 127.0.0.1:27017`

**Solutions**:
1. **Local MongoDB**: Make sure `mongod` service is running
   ```bash
   # Windows: Check Services app or run
   mongod
   ```

2. **MongoDB Atlas**: 
   - Verify connection string in `.env`
   - Check IP is whitelisted in Network Access
   - Check username/password are correct

### CORS Error in Frontend

**Problem**: `Access to XMLHttpRequest blocked by CORS`

**Solution**: Ensure `FRONTEND_URL` in backend `.env` matches your frontend URL

### Port Already in Use

**Problem**: `Port 5000 already in use` or `Port 5173 already in use`

**Solution**: Change port in `.env` or kill process using that port

### Token Expired Error

**Problem**: Get 401 error after login

**Solution**: 
- Tokens auto-refresh, but if issue persists, log out and log back in
- Check `JWT_ACCESS_EXPIRY` is reasonable (15m is standard)

### Database Connection Timeout

**Problem**: `MongooseError: ServerSelectionTimeoutMS`

**Solutions**:
- Check MongoDB is running
- Verify connection string format
- For atlas: Check IP whitelist (0.0.0.0/0 for development)
- Check network connectivity

## 📚 Technology Stack

### Frontend
- React 18 with hooks
- Vite (fast build tool)
- Tailwind CSS (styling)
- React Router (navigation)
- Axios (HTTP client)

### Backend
- Node.js 18+
- Express.js (web framework)
- MongoDB + Mongoose (database)
- JWT (authentication)
- bcryptjs (password hashing)
- Zod (validation)
- Winston (logging)

## 🔐 Security Notes

- Change JWT secrets in production!
- Use environment variables for all secrets
- Enable HTTPS in production
- Use strong database credentials
- Implement rate limiting (included)
- Add input validation (included)
- Use helmet for security headers (included)

## 🚀 Production Deployment

### Deploy Backend

**Option 1: Render.com** (Recommended)

```bash
# Push to GitHub
git add .
git commit -m "Ready for deployment"
git push origin main

# Go to render.com
# Connect repository
# Add environment variables
# Deploy
```

**Option 2: Railway.app**

```bash
npm install -g @railway/cli
railway login
railway init
railway up
```

### Deploy Frontend

**Vercel** (Recommended)

```bash
# Vercel CLI
npm install -g vercel
vercel

# Or connect GitHub repo via web interface
```

**Netlify**

```bash
npm run build
# Drag and drop dist folder to Netlify
```

## 📞 Support & Help

### Common Issues

1. **Check logs**: 
   - Backend: `backend/logs/` directory
   - Frontend: Browser console (F12)

2. **Check network**: 
   - Open DevTools (F12)
   - Go to Network tab
   - Look for failed requests

3. **Check credentials**:
   - Verify email/password are correct
   - Check `.env` files are configured

### Useful Commands

```bash
# Backend
npm run dev      # Development server
npm start        # Production server
npm run seed     # Seed database
npm run lint     # Check code style

# Frontend
npm run dev      # Development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## 📝 Next Steps

1. ✅ Setup complete!
2. Try creating posts
3. Explore all features
4. Customize styling/functionality as needed
5. Deploy to production when ready

---

**Happy coding! 🎉**
