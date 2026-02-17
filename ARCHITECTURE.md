# 🏗️ Backend Architecture Overview

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          CLIENT (React Frontend)                         │
│                      http://localhost:5173                              │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │
                    HTTP/CORS with JWT Auth Headers
                                     │
┌─────────────────────────────────────┴────────────────────────────────────┐
│                          EXPRESS BACKEND                                  │
│                      http://localhost:5000                               │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │                      Security Layer                              │   │
│  │  ├─ Helmet (Security Headers)                                    │   │
│  │  ├─ CORS (Cross-Origin)                                          │   │
│  │  ├─ Rate Limiter (5 req/15min on auth)                           │   │
│  │  └─ Compression (gzip)                                           │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                                     │                                     │
│  ┌──────────────────────────────────┴─────────────────────────────────┐  │
│  │              Router & Request Logging                              │  │
│  │  ├─ Morgan (HTTP Request Logger)                                   │  │
│  │  ├─ Route: /api/auth (Auth endpoints)                              │  │
│  │  └─ Route: /api/posts (Post endpoints)                             │  │
│  └──────────────────────────┬───────────────────────────────────────┘   │
│                              │                                            │
│  ┌──────────────────────────┴──────────────────────────────────────────┐ │
│  │           Middleware Pipeline (per request)                         │ │
│  │  1. Express JSON parser                                              │ │
│  │  2. Auth middleware (JWT verification)                              │ │
│  │  3. Validation middleware (Zod schema)                              │ │
│  │  4. Route handler (Controller)                                      │ │
│  │  5. Error handler (Global error middleware)                         │ │
│  └──────────────────────────┬──────────────────────────────────────────┘ │
│                              │                                            │
│  ┌──────────────────────────┴──────────────────────────────────────────┐ │
│  │                    Controllers                                       │ │
│  │  ├─ authController.js                                               │ │
│  │  │  ├─ signup()          │  ├─ logout()                             │ │
│  │  │  ├─ login()           │  ├─ logoutAll()                          │ │
│  │  │  ├─ refreshToken()    │  ├─ getProfile()                         │ │
│  │  │  └─ updateProfile()   │  └─                                      │ │
│  │  │                                                                   │ │
│  │  └─ postController.js                                               │ │
│  │     ├─ getAllPosts()        ├─ updatePost()                         │ │
│  │     ├─ getPostById()        ├─ deletePost()                         │ │
│  │     ├─ createPost()         ├─ addComment()                         │ │
│  │     └─ getMyPosts()         └─ likePost()                           │ │
│  └──────────────────────────┬──────────────────────────────────────────┘ │
│                              │                                            │
│  ┌──────────────────────────┴──────────────────────────────────────────┐ │
│  │                    Mongoose Models                                  │ │
│  │  ├─ User Schema                                                     │ │
│  │  │  ├─ fullName, email, password (hashed)                           │ │
│  │  │  ├─ role, profile, isActive                                      │ │
│  │  │  ├─ refreshTokens[], lastLogin                                   │ │
│  │  │  └─ Methods: comparePassword(), toJSON()                         │ │
│  │  │                                                                   │ │
│  │  └─ Post Schema                                                     │ │
│  │     ├─ title, body, author (ref: User)                              │ │
│  │     ├─ category, tags, published                                    │ │
│  │     ├─ likes, views, readTime, comments[]                           │ │
│  │     └─ Virtual: datetime (formatted date)                           │ │
│  └──────────────────────────┬──────────────────────────────────────────┘ │
│                              │                                            │
└──────────────────────────────┴────────────────────────────────────────────┘
                               │
                   MongoDB Connection
                               │
                   ┌───────────┴────────────┐
                   │                        │
        ┌──────────▼─────────┐   ┌─────────▼──────────┐
        │  MongoDB Atlas     │   │  Local MongoDB     │
        │  (Production)      │   │  (Development)     │
        │                    │   │                    │
        │ - Collections      │   │ - Collections      │
        │ - Users           │   │ - Users            │
        │ - Posts           │   │ - Posts            │
        └────────────────────┘   └────────────────────┘
```

## Request Flow Example: Create Post

```
1. Frontend (React)
   │
   ├─ User fills form & clicks "Create"
   │
   └─ POST /api/posts
      Header: Authorization: Bearer {accessToken}
      Body: { title, body, category, tags }
           │
           ▼
2. Backend Express Server
   │
   ├─ Helmet + CORS + Compression middleware
   │
   ├─ Morgan logging (log HTTP request)
   │
   ├─ Auth Middleware
   │  └─ Verify JWT token
   │
   ├─ Validation Middleware
   │  └─ Validate request body with Zod schema
   │
   ├─ Route Handler
   │  └─ Call authRoutes → postController.createPost()
   │
   ├─ Controller (authController.js)
   │  ├─ Extract validated data
   │  ├─ Create new Post document
   │  ├─ Save to MongoDB
   │  └─ Populate author reference
   │
   ├─ Response Handler
   │  └─ Return 201 with new post data
   │
   └─ Error Handling (if any)
      └─ Global error handler middleware
           │
           ▼
3. Database (MongoDB)
   │
   ├─ Connect to MongoDB
   │
   ├─ Validate with Mongoose schema
   │
   ├─ Execute indexes for fast queries
   │
   ├─ Save document
   │
   └─ Return result
```

## Data Flow: User Authentication

```
SIGNUP FLOW:
┌─────────────┐
│   Frontend  │
│  Sign Up    │
└──────┬──────┘
       │ POST /api/auth/signup
       ▼
┌─────────────────────────────┐
│  Backend JWT Generation     │
│  ├─ Validate input (Zod)    │
│  ├─ Check email exists      │
│  ├─ Hash password           │
│  ├─ Create User             │
│  ├─ Generate AccessToken    │
│  └─ Generate RefreshToken   │
└──────┬──────────────────────┘
       ▼
┌──────────────────────────┐
│   MongoDB Save           │
│  ├─ Save User            │
│  ├─ Store RefreshToken   │
│  └─ Return new user      │
└──────┬───────────────────┘
       │ Response: {user, tokens}
       ▼
┌────────────────────────────────┐
│   Frontend                      │
│  ├─ Store accessToken          │
│  ├─ Store refreshToken         │
│  ├─ Set auth header            │
│  └─ Redirect to dashboard      │
└────────────────────────────────┘


TOKEN REFRESH FLOW:
┌──────────────────────────┐
│   Frontend               │
│  Request with expired    │
│  accessToken             │
└──────┬───────────────────┘
       │ GET 401 Unauthorized
       │
       │ POST /api/auth/refresh
       │ Body: {refreshToken}
       ▼
┌─────────────────────────────┐
│  Backend Auth Middleware    │
│  ├─ Verify refreshToken     │
│  ├─ Find user in DB         │
│  ├─ Check if token exists   │
│  ├─ Generate new accessToken│
│  └─ Return new token        │
└──────┬──────────────────────┘
       │
       ▼
┌──────────────────────────────┐
│   Frontend                   │
│  ├─ Store new accessToken    │
│  ├─ Retry original request   │
│  └─ Continue normally        │
└──────────────────────────────┘
```

## Middleware Chain

```
Express Request
│
├─► helmet()                          [Security Headers]
│
├─► cors()                            [CORS Validation]
│
├─► compression()                     [GZIP Compression]
│
├─► express.json()                    [Parse JSON Body]
│
├─► rateLimit()                       [Rate Limiting]
│
├─► requestLogger (morgan)            [HTTP Logging]
│
├─► Router
│   │
│   ├─► Route Match
│   │   │
│   │   ├─► authMiddleware()          [JWT Verification]
│   │   │   or
│   │   ├─► authOptional()            [Optional JWT]
│   │   │
│   │   ├─► validateBody()            [Input Validation]
│   │   │
│   │   └─► Controller Handler        [Business Logic]
│   │
│   └─► notFoundHandler()             [404 Handler]
│
└─► errorHandler()                    [Global Error Handler]
     │
     └─► Response sent to Client
```

## Controller Architecture (Service Pattern Ready)

```
Route Request
│
└─► Controller (authController.js)
    │
    ├─ Extract & validate data
    │
    ├─ Call Business Logic
    │  │
    │  ├─ Check database
    │  ├─ Process data
    │  ├─ Generate tokens
    │  └─ Save to DB
    │
    ├─ Format Response
    │
    └─ Send via sendSuccess()/sendError()
       │
       └─ 200/201 - Success Response
          or
          400/401/404/500 - Error Response
```

## Data Models Relationships

```
User (MongoDB Collection)
├─ _id (ObjectId)
├─ fullName (String)
├─ email (String) - unique, indexed
├─ password (String) - hashed, excluded by default
├─ role (enum) - 'user' | 'admin'
├─ profile
│  ├─ bio (String)
│  └─ avatar (String - URL)
├─ isActive (Boolean)
├─ refreshTokens[] (Array)
│  └─ token (String)
├─ lastLogin (Date)
├─ createdAt (Date)
└─ updatedAt (Date)
        ▲
        │ Referenced by Post.author
        │
Post (MongoDB Collection)
├─ _id (ObjectId)
├─ title (String) - indexed
├─ body (String)
├─ author (ObjectId → User) - indexed
├─ category (enum) - indexed
├─ tags (Array of Strings) - indexed
├─ published (Boolean)
├─ likes (Number)
├─ views (Number)
├─ readTime (Number)
├─ comments[]
│  ├─ author (ObjectId → User)
│  └─ content (String)
├─ datetime (Virtual - formatted date)
├─ createdAt (Date)
└─ updatedAt (Date)
```

## Error Handling Flow

```
Error Occurs
│
├─► AppError(message, statusCode)
│   or
├─► Native Error
│   or
├─► Mongoose ValidationError
│   or
├─► JWT Error
│   or
├─► Database Error
│
│
└─► Global Error Handler Middleware
    │
    ├─ Normalize error format
    │
    ├─ Log error (Winston)
    │
    ├─ If development: include stack trace
    │
    └─ Response
       │
       └─ {
            success: false,
            message: "Error occurred",
            errors: { field: "error message" }  // if validation
          }
```

## Authentication & Authorization

```
PUBLIC Endpoints
├─ GET /api/posts              (Anyone can view)
├─ GET /api/posts/:id          (Anyone can view)
└─ POST /api/auth/login        (Anyone can login)


PROTECTED Endpoints (Requires Auth)
├─ POST /api/posts             (Any authenticated user)
├─ PUT /api/posts/:id          (Author or Admin only)
├─ DELETE /api/posts/:id       (Author or Admin only)
└─ GET /api/auth/profile       (Current user only)


ADMIN Endpoints (Requires Admin Role)
├─ DELETE /api/posts/:id       (Any user's posts)
└─ All other features as admin
```

## Environment Variables Flow

```
.env (Git Ignored - Local)
├─ NODE_ENV = development
├─ PORT = 5000
├─ MONGODB_URI = mongodb://...
├─ JWT_ACCESS_SECRET = secret...
└─ JWT_REFRESH_SECRET = secret...
     │
     │ import 'dotenv/config'
     ▼
process.env (Runtime)
     │
     ├─► config/database.js
     ├─► config/jwt.js
     ├─► middleware/auth.js
     └─► server.js
           │
           └─► Application Usage
```

## Deployment Architecture

```
Development Environment
┌─────────────────────────────────────────────┐
│  Local Machine                              │
│  ├─ React Dev Server (port 5173)            │
│  ├─ Express Server (port 5000)              │
│  ├─ Local MongoDB                           │
│  └─ Logs in /logs directory                 │
└─────────────────────────────────────────────┘

Production Environment (Render.com Example)
┌──────────────────────────────────────────────────┐
│  Frontend Deployment (Vercel)                    │
│  └─ Static React build → CDN                     │
└──────────┬───────────────────────────────────────┘
           │
         HTTPS
           │
┌──────────▼───────────────────────────────────────┐
│  Backend Deployment (Render.com)                 │
│  └─ Node.js Server + Express                     │
└──────────┬───────────────────────────────────────┘
           │
         MongoDB
           │
┌──────────▼───────────────────────────────────────┐
│  Database (MongoDB Atlas Cloud)                  │
│  ├─ Collections                                  │
│  ├─ Backups                                      │
│  └─ Monitoring                                   │
└──────────────────────────────────────────────────┘
```

---

**This architecture ensures scalability, maintainability, and production-ready quality! 🏗️**
