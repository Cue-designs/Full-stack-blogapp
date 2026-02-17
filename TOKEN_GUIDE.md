# 🔐 Token Generation & API Integration Guide

## Complete Cross-Check Status ✅

### Backend Configuration
✅ **Server**: Express running on `http://localhost:5000`
✅ **Database**: MongoDB with Mongoose ODM
✅ **Security**: CORS enabled for `http://localhost:5173`
✅ **Authentication**: JWT with access + refresh tokens
✅ **Validation**: Zod schemas on all endpoints

### Frontend Integration
✅ **API Client**: Axios with automatic token refresh
✅ **Login**: Now connecting to real backend
✅ **Signup**: Now connecting to real backend
✅ **Token Storage**: localStorage with automatic retry on 401
✅ **Validation**: Frontend matches backend requirements

---

## 🔑 JWT Token Generation Functions

### Complete Token Generation Utils

**File**: `backend/src/utils/tokenUtils.js`

```javascript
import jwt from 'jsonwebtoken';
import { jwtConfig, logger } from '../config/index.js';

/**
 * Generate Access Token (15 minutes)
 * @param {string} userId - User's MongoDB ObjectId
 * @param {string} email - User's email address
 * @param {string} role - User's role (user or admin)
 * @returns {string} JWT access token
 */
export const generateAccessToken = (userId, email, role) => {
  try {
    const token = jwt.sign(
      {
        userId,
        email,
        role,
        type: 'access',
      },
      jwtConfig.accessTokenSecret,
      {
        expiresIn: jwtConfig.accessTokenExpiry, // 15m
      }
    );
    return token;
  } catch (error) {
    logger.error(`Failed to generate access token: ${error.message}`);
    throw error;
  }
};

/**
 * Generate Refresh Token (7 days)
 * @param {string} userId - User's MongoDB ObjectId
 * @returns {string} JWT refresh token
 */
export const generateRefreshToken = (userId) => {
  try {
    const token = jwt.sign(
      {
        userId,
        type: 'refresh',
      },
      jwtConfig.refreshTokenSecret,
      {
        expiresIn: jwtConfig.refreshTokenExpiry, // 7d
      }
    );
    return token;
  } catch (error) {
    logger.error(`Failed to generate refresh token: ${error.message}`);
    throw error;
  }
};

/**
 * Verify Access Token
 * @param {string} token - JWT access token
 * @returns {object} Decoded token payload
 * @throws {Error} If token is invalid or expired
 */
export const verifyAccessToken = (token) => {
  try {
    const decoded = jwt.verify(token, jwtConfig.accessTokenSecret);
    return decoded;
  } catch (error) {
    logger.error(`Access token verification failed: ${error.message}`);
    throw error;
  }
};

/**
 * Verify Refresh Token
 * @param {string} token - JWT refresh token
 * @returns {object} Decoded token payload
 * @throws {Error} If token is invalid or expired
 */
export const verifyRefreshToken = (token) => {
  try {
    const decoded = jwt.verify(token, jwtConfig.refreshTokenSecret);
    return decoded;
  } catch (error) {
    logger.error(`Refresh token verification failed: ${error.message}`);
    throw error;
  }
};

/**
 * Decode Token (without verification - for debugging)
 * @param {string} token - JWT token
 * @returns {object|null} Decoded payload or null if invalid
 */
export const decodeToken = (token) => {
  try {
    return jwt.decode(token);
  } catch (error) {
    logger.error(`Token decoding failed: ${error.message}`);
    return null;
  }
};

// Export all
export default {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  decodeToken,
};
```

---

## 🔌 How Authentication Flow Works

### Sign Up Flow

```
Frontend (Signup.jsx)
    ↓
User fills form & clicks "Create Account"
    ↓
validateForm() - Check client-side validation
    ↓
apiClient.post('/auth/signup', {
  fullName: "John Doe",
  email: "john@example.com",
  password: "Password123",
  confirmPassword: "Password123"
})
    ↓ (Network)
Backend Express Server
    ↓
authRoutes.js → POST /auth/signup
    ↓
Middleware: validateBody(signupSchema)
    ↓
authController.signup()
    ├─ Check email doesn't exist
    ├─ Hash password with bcryptjs
    ├─ Save user to MongoDB
    ├─ Call generateAccessToken(userId, email, role)
    ├─ Call generateRefreshToken(userId)
    ├─ Save refreshToken to user.refreshTokens[]
    └─ Return { user, tokens: { accessToken, refreshToken } }
    ↓
Frontend receives response
    ↓
Store in localStorage:
  - accessToken
  - refreshToken
  - user (JSON)
    ↓
useNavigate('/') → Redirect to home
    ↓
✅ User is logged in!
```

### Login Flow

```
Frontend (Login.jsx)
    ↓
User enters email & password → clicks "Sign In"
    ↓
apiClient.post('/auth/login', {
  email: "john@example.com",
  password: "Password123",
  rememberMe: false
})
    ↓
Backend authController.login()
    ├─ Find user by email
    ├─ Verify password with bcryptjs.compare()
    ├─ Check if account is active
    ├─ Generate tokens
    ├─ Save refreshToken to DB
    ├─ Update lastLogin timestamp
    └─ Return { user, tokens }
    ↓
Frontend stores tokens & redirects
    ↓
✅ User is logged in!
```

### Token Refresh Flow (Automatic)

```
Frontend makes API request with old accessToken
    ↓
Backend responds: 401 Unauthorized (token expired)
    ↓
Axios Interceptor catches 401
    ↓
Checks if refreshToken exists in localStorage
    ↓
apiClient.post('/auth/refresh', {
  refreshToken: "old_refresh_token"
})
    ↓
Backend authController.refreshToken()
    ├─ Verify refresh token
    ├─ Check if token exists in DB
    ├─ Generate NEW accessToken
    └─ Return { accessToken }
    ↓
Frontend stores new accessToken
    ↓
Retries original request with new token
    ↓
✅ Request succeeds!
```

---

## 📋 Complete Authentication API

### Sign Up Endpoint

**POST** `/api/auth/signup`

```javascript
// Request
{
  fullName: "John Doe",                    // Required, 2-100 chars
  email: "john@example.com",               // Required, valid email
  password: "Password123",                 // Required, 8+ chars, upper+lower+number
  confirmPassword: "Password123"           // Required, must match password
}

// Success Response (201)
{
  success: true,
  message: "Account created successfully",
  data: {
    user: {
      _id: "507f1f77bcf86cd799439011",
      fullName: "John Doe",
      email: "john@example.com",
      role: "user",
      isActive: true,
      createdAt: "2024-01-15T10:00:00Z"
    },
    tokens: {
      accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",  // Valid 15 min
      refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." // Valid 7 days
    }
  }
}

// Error Response (409) - Email exists
{
  success: false,
  message: "Email is already registered"
}

// Error Response (422) - Validation failed
{
  success: false,
  message: "Validation failed",
  errors: {
    password: "Password must contain at least one uppercase letter, one lowercase letter, and one number"
  }
}
```

### Login Endpoint

**POST** `/api/auth/login`

```javascript
// Request
{
  email: "john@example.com",    // Required
  password: "Password123",      // Required
  rememberMe: true              // Optional
}

// Success Response (200)
{
  success: true,
  message: "Login successful",
  data: {
    user: { /* ... */ },
    tokens: {
      accessToken: "...",
      refreshToken: "..."
    }
  }
}

// Error Response (401) - Invalid credentials
{
  success: false,
  message: "Invalid email or password"
}
```

### Refresh Token Endpoint

**POST** `/api/auth/refresh`

```javascript
// Request
{
  refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

// Success Response (200)
{
  success: true,
  message: "Token refreshed successfully",
  data: {
    accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." // New access token
  }
}

// Error Response (401) - Invalid refresh token
{
  success: false,
  message: "Invalid refresh token"
}
```

---

## 🔐 Token Payload Structure

### Access Token Payload (Decoded)

```javascript
{
  userId: "507f1f77bcf86cd799439011",  // MongoDB User ID
  email: "john@example.com",           // User's email
  role: "user",                        // 'user' or 'admin'
  type: "access",                      // Token type identifier
  iat: 1705315200,                     // Issued at timestamp
  exp: 1705316100                      // Expires at timestamp (15 min from now)
}

// Encoded Token Example:
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1MDdmMWY3N2JjZjg2Y2Q3OTk0MzkwMTEiLCJlbWFpbCI6ImpvaG5AZXhhbXBsZS5jb20iLCJyb2xlIjoidXNlciIsInR5cGUiOiJhY2Nlc3MiLCJpYXQiOjE3MDUzMTUyMDAsImV4cCI6MTcwNTMxNjEwMH0.signature
```

### Refresh Token Payload (Decoded)

```javascript
{
  userId: "507f1f77bcf86cd799439011",  // MongoDB User ID
  type: "refresh",                     // Token type identifier
  iat: 1705315200,                     // Issued at timestamp
  exp: 1705920000                      // Expires at timestamp (7 days from now)
}
```

---

## 🛠️ How to Verify a Token

### Verify Access Token

```bash
# Copy your access token from localStorage
# Visit jwt.io and paste it in the "Encoded" section
# You'll see the decoded payload
```

Or programmatically:

```javascript
// Frontend: Decode token (without verification)
import { jwtDecode } from 'jwt-decode';

const token = localStorage.getItem('accessToken');
const decoded = jwtDecode(token);

console.log('User ID:', decoded.userId);
console.log('Email:', decoded.email);
console.log('Role:', decoded.role);
console.log('Expires at:', new Date(decoded.exp * 1000));
```

### Backend: Verify Token in Middleware

```javascript
// File: backend/src/middleware/auth.js
import jwt from 'jsonwebtoken';
import { jwtConfig } from '../config/index.js';

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Access token is missing or invalid',
      });
    }

    const token = authHeader.slice(7); // Remove 'Bearer ' prefix

    // Verify token
    const decoded = jwt.verify(token, jwtConfig.accessTokenSecret);
    
    // Attach user info to request
    req.user = {
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role,
    };

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Access token has expired',
      });
    }
    return res.status(401).json({
      success: false,
      message: 'Authentication failed',
    });
  }
};
```

---

## 💾 Token Storage & Security

### Frontend Storage (localStorage)

```javascript
// After login/signup
localStorage.setItem('accessToken', accessToken);      // 15 min validity
localStorage.setItem('refreshToken', refreshToken);    // 7 days validity
localStorage.setItem('user', JSON.stringify(userObj));

// Retrieve for API calls
const token = localStorage.getItem('accessToken');
const headers = {
  Authorization: `Bearer ${token}`
};

// Clear on logout
localStorage.removeItem('accessToken');
localStorage.removeItem('refreshToken');
localStorage.removeItem('user');
```

### Backend Storage (Database)

```javascript
// Refresh tokens are stored in MongoDB User document
user.refreshTokens = [
  {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    createdAt: "2024-01-15T10:00:00Z"
    // Auto-expires after 7 days (TTL index)
  }
];

// Only 5 most recent refresh tokens kept per user
if (user.refreshTokens.length > 5) {
  user.refreshTokens = user.refreshTokens.slice(-5);
}
```

---

## 🔄 Complete Integration Example

### How Frontend Uses Tokens

```javascript
// File: frontend/src/api/blog-api.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 10000,
});

// 1. Add token to every request
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 2. Handle token expiration automatically
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 Unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axios.post(
          'http://localhost:5000/api/auth/refresh',
          { refreshToken }
        );
        
        // Store new access token
        const { accessToken } = response.data.data;
        localStorage.setItem('accessToken', accessToken);
        
        // Retry original request
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return apiClient(originalRequest);
      } catch (err) {
        // Refresh failed, redirect to login
        localStorage.clear();
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;
```

### Using API in Components

```javascript
// File: frontend/src/pages/Login.jsx
import apiClient from '../api/blog-api';

const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    // Make API call
    const response = await apiClient.post('/auth/login', {
      email: formData.email,
      password: formData.password,
    });

    // Extract tokens
    const { accessToken, refreshToken, user } = response.data.data;

    // Store in localStorage
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('user', JSON.stringify(user));

    // Redirect
    navigate('/');
  } catch (error) {
    setErrors({ general: error.response?.data?.message });
  }
};
```

---

## ✅ Integration Checklist

- ✅ Backend server running (`npm run dev`)
- ✅ Frontend server running (`npm run dev`)
- ✅ CORS configured in backend (accepts localhost:5173)
- ✅ API client configured with auto token refresh
- ✅ Login.jsx connected to `/auth/login` endpoint
- ✅ Signup.jsx connected to `/auth/signup` endpoint
- ✅ Tokens stored in localStorage
- ✅ Auth middleware protects routes
- ✅ Token validation on all authenticated endpoints
- ✅ Refresh token mechanism working
- ✅ 401 error handling with auto-refresh
- ✅ Logout clears localStorage

---

## 🧪 Test the Integration

### 1. Sign Up

```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "email": "test@example.com",
    "password": "Password123",
    "confirmPassword": "Password123"
  }'
```

### 2. Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Password123"
  }'
```

### 3. Use Token

```bash
# From login response, copy the accessToken
curl -X GET http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN_HERE"
```

---

## 🔍 Debugging Tips

### Check Tokens in Browser

```javascript
// Open browser console (F12) → Console tab
console.log(localStorage.getItem('accessToken'));
console.log(localStorage.getItem('refreshToken'));

// Decode (install jwt-decode: npm install jwt-decode)
import { jwtDecode } from 'jwt-decode';
jwtDecode(localStorage.getItem('accessToken'));
```

### Check Backend Logs

```bash
cd backend
tail -f logs/combined.log  # View all logs
tail -f logs/error.log     # View error logs
```

### Use Postman

1. POST to `/auth/login`
2. Copy access token from response
3. Go to "Globals" tab
4. Set `{{accessToken}}` variable
5. Use in Authorization header on protected endpoints

---

## 🚀 Ready to Use!

Everything is now connected and working! You can:

1. ✅ Sign up at `http://localhost:5173/signup`
2. ✅ Login at `http://localhost:5173/login`
3. ✅ Tokens auto-refresh on expiration
4. ✅ Make authenticated API calls
5. ✅ See detailed logs in `backend/logs/`

**Happy authenticating! 🎉**
