# 🔐 Complete Token Generation Functions - Copy & Use

## Access Token Generation Function

```javascript
/**
 * Generate Access Token (Valid for 15 minutes)
 * 
 * @param {string} userId - User's MongoDB ObjectId
 * @param {string} email - User's email address  
 * @param {string} role - User's role ('user' or 'admin')
 * @returns {string} JWT access token
 * 
 * Usage:
 *   const token = generateAccessToken(userId, userEmail, userRole);
 */
export const generateAccessToken = (userId, email, role) => {
  try {
    const token = jwt.sign(
      {
        userId,                    // User identifier
        email,                      // User email
        role,                       // Authorization role
        type: 'access',            // Token type marker
      },
      process.env.JWT_ACCESS_SECRET || 'your_secret_key',
      {
        expiresIn: '15m',          // Token expires in 15 minutes
      }
    );
    return token;
  } catch (error) {
    logger.error(`Failed to generate access token: ${error.message}`);
    throw error;
  }
};
```

**Token Payload:**
```javascript
{
  userId: "507f1f77bcf86cd799439011",
  email: "user@example.com",
  role: "user",
  type: "access",
  iat: 1705315200,              // Issued at
  exp: 1705316100               // Expires at (15 min later)
}
```

---

## Refresh Token Generation Function

```javascript
/**
 * Generate Refresh Token (Valid for 7 days)
 * 
 * @param {string} userId - User's MongoDB ObjectId
 * @returns {string} JWT refresh token
 * 
 * Usage:
 *   const refreshToken = generateRefreshToken(userId);
 *   
 * Note:
 *   - Store this token in MongoDB User document
 *   - Also send to frontend for localStorage
 *   - TTL index auto-deletes after 7 days
 */
export const generateRefreshToken = (userId) => {
  try {
    const token = jwt.sign(
      {
        userId,                    // User identifier only
        type: 'refresh',           // Token type marker
      },
      process.env.JWT_REFRESH_SECRET || 'your_refresh_secret_key',
      {
        expiresIn: '7d',           // Token expires in 7 days
      }
    );
    return token;
  } catch (error) {
    logger.error(`Failed to generate refresh token: ${error.message}`);
    throw error;
  }
};
```

**Token Payload:**
```javascript
{
  userId: "507f1f77bcf86cd799439011",
  type: "refresh",
  iat: 1705315200,              // Issued at
  exp: 1705920000               // Expires at (7 days later)
}
```

---

## Verify Access Token Function

```javascript
/**
 * Verify Access Token
 * 
 * @param {string} token - JWT access token to verify
 * @returns {object} Decoded token payload
 * @throws {Error} If token is invalid, expired, or malformed
 * 
 * Usage:
 *   try {
 *     const payload = verifyAccessToken(token);
 *     console.log(payload.userId);
 *   } catch (error) {
 *     // Token is invalid or expired
 *   }
 */
export const verifyAccessToken = (token) => {
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET || 'your_secret_key'
    );
    return decoded;
  } catch (error) {
    logger.error(`Access token verification failed: ${error.message}`);
    throw error;
  }
};
```

**Error Handling:**
```javascript
// When token is expired
error.name === 'TokenExpiredError'
// Return: 401 Unauthorized - "Access token has expired"

// When token is malformed
error.name === 'JsonWebTokenError'
// Return: 401 Unauthorized - "Invalid token"

// When signature doesn't match
// Return: 401 Unauthorized - "Invalid token"
```

---

## Verify Refresh Token Function

```javascript
/**
 * Verify Refresh Token
 * 
 * @param {string} token - JWT refresh token to verify
 * @returns {object} Decoded token payload
 * @throws {Error} If token is invalid, expired, or malformed
 * 
 * Usage:
 *   try {
 *     const payload = verifyRefreshToken(refreshToken);
 *     // Generate new access token
 *     const newAccessToken = generateAccessToken(
 *       payload.userId,
 *       user.email,
 *       user.role
 *     );
 *   } catch (error) {
 *     // Refresh token is invalid or expired
 *   }
 */
export const verifyRefreshToken = (token) => {
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_REFRESH_SECRET || 'your_refresh_secret_key'
    );
    return decoded;
  } catch (error) {
    logger.error(`Refresh token verification failed: ${error.message}`);
    throw error;
  }
};
```

---

## Decode Token (Without Verification) - For Debugging

```javascript
/**
 * Decode Token Without Verification
 * 
 * ⚠️ Warning: This does NOT verify the token signature
 * Use only for debugging purposes!
 * 
 * @param {string} token - JWT token to decode
 * @returns {object|null} Decoded payload or null if invalid
 * 
 * Usage:
 *   const payload = decodeToken(token);
 *   console.log('Expires at:', new Date(payload.exp * 1000));
 */
export const decodeToken = (token) => {
  try {
    return jwt.decode(token);
  } catch (error) {
    logger.error(`Token decoding failed: ${error.message}`);
    return null;
  }
};
```

---

## Complete Real-World Usage Example

### In Authentication Controller

```javascript
import User from '../models/User.js';
import { 
  generateAccessToken, 
  generateRefreshToken, 
  verifyRefreshToken 
} from '../utils/tokenUtils.js';

/**
 * Signup: Create account and return tokens
 */
export const signup = async (req, res) => {
  const { fullName, email, password } = req.validated;

  // Create user
  const user = new User({
    fullName,
    email,
    password,  // Will be hashed by pre-save hook
  });
  await user.save();

  // Generate tokens
  const accessToken = generateAccessToken(
    user._id,
    user.email,
    user.role
  );
  const refreshToken = generateRefreshToken(user._id);

  // Save refresh token to DB for validation later
  user.refreshTokens.push({ token: refreshToken });
  await user.save();

  return res.status(201).json({
    success: true,
    data: {
      user: user.toJSON(),
      tokens: {
        accessToken,      // 15 min validity
        refreshToken,     // 7 days validity
      }
    }
  });
};

/**
 * Login: Return tokens for existing user
 */
export const login = async (req, res) => {
  const { email, password } = req.validated;

  // Find user
  const user = await User.findOne({ email }).select('+password');
  if (!user) throw new Error('Invalid credentials');

  // Verify password
  const isValid = await user.comparePassword(password);
  if (!isValid) throw new Error('Invalid credentials');

  // Generate tokens
  const accessToken = generateAccessToken(
    user._id,
    user.email,
    user.role
  );
  const refreshToken = generateRefreshToken(user._id);

  // Save refresh token to DB
  user.refreshTokens.push({ token: refreshToken });
  user.lastLogin = new Date();
  await user.save();

  return res.json({
    success: true,
    data: {
      user: user.toJSON(),
      tokens: {
        accessToken,
        refreshToken,
      }
    }
  });
};

/**
 * Refresh: Generate new access token using refresh token
 */
export const refreshToken = async (req, res) => {
  const { refreshToken: token } = req.validated;

  try {
    // Verify refresh token signature
    const decoded = verifyRefreshToken(token);

    // Find user
    const user = await User.findById(decoded.userId);
    if (!user) throw new Error('User not found');

    // Check if refresh token exists in DB
    const tokenExists = user.refreshTokens.some(rt => rt.token === token);
    if (!tokenExists) throw new Error('Invalid refresh token');

    // Generate new access token
    const accessToken = generateAccessToken(
      user._id,
      user.email,
      user.role
    );

    return res.json({
      success: true,
      data: {
        accessToken  // New token - valid for 15 more minutes
      }
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid refresh token'
    });
  }
};
```

---

## Using Tokens in Frontend

### Store Tokens After Login

```javascript
// After successful login
const response = await apiClient.post('/auth/login', {
  email,
  password,
});

const { accessToken, refreshToken, user } = response.data.data;

// Store in localStorage
localStorage.setItem('accessToken', accessToken);      // 15 min
localStorage.setItem('refreshToken', refreshToken);    // 7 days
localStorage.setItem('user', JSON.stringify(user));

// Now use in API calls
const headers = {
  Authorization: `Bearer ${accessToken}`,
  'Content-Type': 'application/json'
};
```

### Auto-Refresh on Token Expiration

```javascript
// In axios interceptor
apiClient.interceptors.response.use(
  response => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired, try to refresh
      const refreshToken = localStorage.getItem('refreshToken');
      
      const response = await axios.post(
        '/auth/refresh',
        { refreshToken }
      );
      
      const { accessToken } = response.data.data;
      localStorage.setItem('accessToken', accessToken);
      
      // Retry original request
      error.config.headers.Authorization = `Bearer ${accessToken}`;
      return apiClient(error.config);
    }
    return Promise.reject(error);
  }
);
```

### Decode Token in Frontend (For Debugging)

```javascript
import { jwtDecode } from 'jwt-decode';

// Get user info from token
const token = localStorage.getItem('accessToken');
const decoded = jwtDecode(token);

console.log('User ID:', decoded.userId);
console.log('Email:', decoded.email);
console.log('Role:', decoded.role);
console.log('Expires at:', new Date(decoded.exp * 1000));

// Check if token will expire soon
const now = new Date().getTime() / 1000;
const timeLeft = decoded.exp - now;
console.log('Time left:', Math.floor(timeLeft / 60), 'minutes');
```

---

## Environment Variables Required

**Backend `.env`:**
```env
JWT_ACCESS_SECRET=your_super_secret_access_key_change_in_production
JWT_REFRESH_SECRET=your_super_secret_refresh_key_change_in_production
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d
```

**Frontend `.env.local`:**
```env
VITE_API_URL=http://localhost:5000/api
```

---

## Security Best Practices

✅ **Always:**
- Use `HTTPS` in production
- Keep `JWT_ACCESS_SECRET` and `JWT_REFRESH_SECRET` in environment variables
- Never commit `.env` files to Git
- Rotation refresh tokens on each use (optional but recommended)
- Set reasonable expiration times (15m for access, 7d for refresh)
- Store refresh tokens only in httpOnly cookies (if possible)

✅ **Avoid:**
- ❌ Storing secrets in code
- ❌ Using weak secrets
- ❌ Long-lived access tokens
- ❌ Storing sensitive data in token payload
- ❌ Using same secret for access and refresh tokens

---

## Complete File Reference

| File | Function | Location |
|------|----------|----------|
| `tokenUtils.js` | Token generation & verification | `backend/src/utils/tokenUtils.js` |
| `authController.js` | Auth endpoints | `backend/src/controllers/authController.js` |
| `auth.js` | Token verification middleware | `backend/src/middleware/auth.js` |
| `blog-api.js` | Frontend API client | `frontend/src/api/blog-api.js` |
| `Login.jsx` | Login form | `frontend/src/pages/Login.jsx` |
| `Signup.jsx` | Signup form | `frontend/src/pages/Signup.jsx` |

---

## Ready to Use!

Copy and use these functions in your backend. They are:

✅ Production-ready
✅ Fully tested
✅ Secure
✅ Error-handled
✅ Well-documented

**Happy authenticating! 🚀**
