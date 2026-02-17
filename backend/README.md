# Blog Backend API

A production-grade REST API backend for a modern React blog application. Built with Node.js, Express.js, and MongoDB with comprehensive authentication, validation, and error handling.

## 🚀 Features

- ✅ **User Authentication**: JWT-based with access & refresh tokens
- ✅ **Role-Based Access Control**: Admin and user roles
- ✅ **Complete CRUD Operations**: Posts, comments, and user profiles
- ✅ **Input Validation**: Zod schema validation on all endpoints
- ✅ **Error Handling**: Custom error classes and global error handler
- ✅ **Security**: Helmet, CORS, rate limiting, password hashing with bcryptjs
- ✅ **Logging**: Winston logger with file rotation
- ✅ **Database**: MongoDB with Mongoose ODM, indexes, and virtuals
- ✅ **Pagination**: Limit, offset pagination with metadata
- ✅ **Search & Filtering**: Filter by category, search by title/body/tags
- ✅ **Post Features**: Comments, likes, view count, read time estimates
- ✅ **Graceful Shutdown**: Proper cleanup on SIGTERM/SIGINT

## 📦 Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js 4.18+
- **Database**: MongoDB with Mongoose 8.0+
- **Validation**: Zod 3.22+
- **Authentication**: JWT (jsonwebtoken 9.1+)
- **Password Hashing**: bcryptjs 2.4+
- **Security**: Helmet 7.1+
- **Rate Limiting**: express-rate-limit 7.1+
- **Logging**: Winston 3.11+
- **HTTP Logging**: Morgan 1.10+
- **Compression**: compression 1.7+
- **CORS**: cors 2.8+

## 🛠️ Installation

### Prerequisites

- Node.js 18+ ([Download](https://nodejs.org/))
- npm 9+ or yarn
- MongoDB 5.0+ (Local or MongoDB Atlas)
- Git

### Local Setup

1. **Clone the repository**

```bash
cd my-project/../backend
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

```bash
# Copy the example env file
cp .env.example .env

# Edit .env with your configuration
```

4. **Local MongoDB Setup (if using local MongoDB)**

```bash
# Windows (with MongoDB installed)
mongod

# Or use MongoDB Atlas (see Configuration section)
```

5. **Start development server**

```bash
npm run dev
```

Server will run on `http://localhost:5000`

## 📋 Environment Variables

Create a `.env` file in the backend root with:

```env
# Server
NODE_ENV=development       # development or production
PORT=5000                  # Server port

# Database
MONGODB_URI=mongodb://localhost:27017/blog-db

# For MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/blog-db?retryWrites=true&w=majority

# JWT
JWT_ACCESS_SECRET=your_super_secret_access_key          # Change in production!
JWT_REFRESH_SECRET=your_super_secret_refresh_key        # Change in production!
JWT_ACCESS_EXPIRY=15m      # Access token expiration
JWT_REFRESH_EXPIRY=7d      # Refresh token expiration

# Frontend
FRONTEND_URL=http://localhost:5173     # Your React app URL

# Logging
LOG_LEVEL=info             # info, warn, error, debug
```

## 🚀 Running the Server

### Development Mode

```bash
npm run dev
```

Runs with `nodemon` for auto-restart on file changes.

### Production Mode

```bash
npm start
```

### Linting

```bash
npm run lint
```

### Testing

```bash
npm test
```

## 📊 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Health Check
```
GET /health
```

### Authentication Endpoints

#### Sign Up
```http
POST /auth/signup
Content-Type: application/json

{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "Password123",
  "confirmPassword": "Password123"
}

Response: 201
{
  "success": true,
  "message": "Account created successfully",
  "data": {
    "user": { ... },
    "tokens": {
      "accessToken": "...",
      "refreshToken": "..."
    }
  }
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "Password123",
  "rememberMe": false
}

Response: 200
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": { ... },
    "tokens": {
      "accessToken": "...",
      "refreshToken": "..."
    }
  }
}
```

#### Refresh Token
```http
POST /auth/refresh
Content-Type: application/json

{
  "refreshToken": "..."
}

Response: 200
{
  "success": true,
  "message": "Token refreshed successfully",
  "data": {
    "accessToken": "..."
  }
}
```

#### Logout
```http
POST /auth/logout
Authorization: Bearer <accessToken>

Response: 200
```

#### Logout All Devices
```http
POST /auth/logout-all
Authorization: Bearer <accessToken>

Response: 200
```

#### Get Profile
```http
GET /auth/profile
Authorization: Bearer <accessToken>

Response: 200
{
  "success": true,
  "message": "Profile retrieved successfully",
  "data": { ... }
}
```

#### Update Profile
```http
PUT /auth/profile
Authorization: Bearer <accessToken>
Content-Type: application/json

{
  "fullName": "John Doe",
  "bio": "I love web development",
  "avatar": "https://example.com/avatar.jpg"
}

Response: 200
```

### Post Endpoints

#### Get All Posts (Paginated & Filtered)
```http
GET /posts?page=1&limit=10&category=javascript&search=react&sort=newest
```

Query Parameters:
- `page` (default: 1)
- `limit` (default: 10, max: 100)
- `category` (optional): web-development, html, css, javascript, react, frontend, backend, database, devops, other
- `search` (optional): Search in title, body, and tags
- `sort` (optional): newest, oldest, popular

Response: 200
```json
{
  "success": true,
  "message": "Posts retrieved successfully",
  "data": [ ... ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "pages": 3
  }
}
```

#### Get Post by ID
```http
GET /posts/:id
Authorization: Bearer <accessToken> (optional, for view tracking)
```

Response: 200

#### Create Post
```http
POST /posts
Authorization: Bearer <accessToken>
Content-Type: application/json

{
  "title": "Getting Started with Express",
  "body": "Express is a minimal and flexible Node.js web application framework...",
  "category": "backend",
  "tags": ["express", "nodejs", "backend"],
  "published": true,
  "readTime": 5
}

Response: 201
```

#### Update Post
```http
PUT /posts/:id
Authorization: Bearer <accessToken>
Content-Type: application/json

{
  "title": "Updated Title",
  "body": "Updated content...",
  "published": true
}

Response: 200
```

#### Delete Post
```http
DELETE /posts/:id
Authorization: Bearer <accessToken>

Response: 200
```

#### Get My Posts
```http
GET /posts/user/my-posts?page=1&limit=10
Authorization: Bearer <accessToken>

Response: 200
```

#### Add Comment
```http
POST /posts/:id/comments
Authorization: Bearer <accessToken>
Content-Type: application/json

{
  "content": "Great article!"
}

Response: 201
```

#### Like Post
```http
POST /posts/:id/like
Authorization: Bearer <accessToken>

Response: 200
```

#### Get Posts by Category
```http
GET /posts/:category/category?page=1&limit=10
```

## 🔐 Authentication

All authenticated endpoints require the `Authorization` header:

```
Authorization: Bearer <accessToken>
```

### Token Workflow

1. **Sign Up or Login** → Receive both access & refresh tokens
2. **Use Access Token** → For authenticated requests (valid for 15 minutes)
3. **Token Expires** → Use refresh token to get new access token
4. **Call `/auth/refresh`** → Get new access token without re-logging in

### Password Requirements

- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number

## 📈 Database Schema

### User Model
```javascript
{
  _id: ObjectId,
  fullName: String (required, 2-100 chars),
  email: String (required, unique, lowercase),
  password: String (required, hashed),
  role: String (enum: ['user', 'admin'], default: 'user'),
  profile: {
    bio: String (max 500 chars),
    avatar: String (URL)
  },
  isActive: Boolean (default: true),
  refreshTokens: Array,
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Post Model
```javascript
{
  _id: ObjectId,
  title: String (required, 5-200 chars),
  body: String (required, min 20 chars),
  author: ObjectId (ref: User),
  category: String (enum: [...]),
  tags: [String],
  published: Boolean (default: true),
  likes: Number (min: 0),
  comments: [{
    author: ObjectId (ref: User),
    content: String,
    createdAt: Date
  }],
  views: Number (default: 0),
  readTime: Number (minutes, default: 5),
  datetime: String (virtual, formatted date),
  createdAt: Date,
  updatedAt: Date
}
```

## 🌐 CORS Configuration

By default, CORS is configured to allow requests from:

```
http://localhost:5173  (your React dev server)
```

Change the `FRONTEND_URL` environment variable to allow requests from different origins.

## 🚀 Deployment

### Deploy to Render.com (Recommended)

1. **Push code to GitHub**

```bash
git init
git add .
git commit -m "Initial commit"
git push -u origin main
```

2. **Create Render account** at [render.com](https://render.com)

3. **Create new Web Service**
   - Connect your GitHub repository
   - Environment: Node
   - Build command: `npm install`
   - Start command: `npm start`

4. **Add Environment Variables**
   - Go to Environment section
   - Add all variables from `.env.example`
   - Set `NODE_ENV=production`
   - Use MongoDB Atlas connection string

5. **Deploy**
   - Click "Create Web Service"
   - Render will automatically redeploy on push to main

### Deploy to Railway.app

1. **Install Railway CLI**

```bash
npm install -g @railway/cli
```

2. **Login and Deploy**

```bash
railway login
railway init
railway up
```

3. **Configure Environment Variables**

```bash
railway variables add NODE_ENV production
railway variables add MONGODB_URI "your_atlas_uri"
# Add other variables...
```

### Deploy to Vercel

Note: Vercel is primarily for serverless functions. For a traditional Node.js server, use Render or Railway instead.

### MongoDB Atlas Setup

1. **Create MongoDB Atlas account** at [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)

2. **Create a cluster**
   - Choose free tier
   - Select region closest to you

3. **Create database user**
   - Database Access → Add New Database User
   - Username: your-username
   - Password: strong-password

4. **Get connection string**
   - Clusters → Connect → Connect your application
   - Copy connection string
   - Replace `<username>` and `<password>`
   - Add to `.env` as `MONGODB_URI`

5. **Whitelist IPs**
   - Network Access → Add IP Address
   - Add `0.0.0.0/0` (allows all IPs)
   - Or add specific IP addresses

## 📝 File Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── database.js       # MongoDB connection
│   │   ├── jwt.js            # JWT configuration
│   │   ├── logger.js         # Winston logger setup
│   │   └── index.js          # Config exports
│   ├── controllers/
│   │   ├── authController.js # Auth logic
│   │   └── postController.js # Post logic
│   ├── middleware/
│   │   ├── auth.js           # JWT authentication
│   │   ├── validate.js       # Request validation
│   │   ├── errorHandler.js   # Error handling
│   │   └── logger.js         # HTTP logging
│   ├── models/
│   │   ├── User.js           # User schema
│   │   └── Post.js           # Post schema
│   ├── routes/
│   │   ├── authRoutes.js     # Auth endpoints
│   │   └── postRoutes.js     # Post endpoints
│   ├── validators/
│   │   └── index.js          # Zod schemas
│   ├── utils/
│   │   ├── tokenUtils.js     # JWT utilities
│   │   └── responseUtils.js  # Response helpers
│   └── server.js             # Main server file
├── .env.example              # Environment template
├── .gitignore
├── package.json
├── README.md
└── logs/                     # Generated log files
```

## 🛠️ Development Tips

### Testing Endpoints with cURL

```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"Password123"}'

# Get all posts
curl http://localhost:5000/api/posts

# Create post (requires token)
curl -X POST http://localhost:5000/api/posts \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Post",
    "body": "Post content here...",
    "category": "javascript"
  }'
```

### Testing with Postman

1. Import the API endpoints
2. Set up environment variables in Postman
3. Use `{{accessToken}}` variable in Authorization headers
4. Add scripts to automatically save tokens:

```javascript
// Tests tab
let response = pm.response.json();
if (response.data && response.data.tokens) {
  pm.environment.set("accessToken", response.data.tokens.accessToken);
  pm.environment.set("refreshToken", response.data.tokens.refreshToken);
}
```

### Viewing Logs

```bash
# View all logs
tail -f logs/combined.log

# View errors only
tail -f logs/error.log
```

## 🐛 Troubleshooting

### MongoDB Connection Error

**Error**: `MongooseError: Cannot connect to MongoDB`

**Solution**:
- Ensure MongoDB is running (`mongod` for local)
- Check `MONGODB_URI` format
- For MongoDB Atlas, check IP whitelist and credentials

### Rate Limited

**Error**: `Too many requests from this IP`

**Solution**:
- Wait 15 minutes or
- Modify `generalLimiter` in `server.js`
- In development, set very high limits

### Token Expired

**Error**: `Access token has expired`

**Solution**:
- Call `/auth/refresh` endpoint with refresh token
- Frontend should handle this automatically

### CORS Error

**Error**: `Access to XMLHttpRequest blocked by CORS`

**Solution**:
- Update `FRONTEND_URL` in `.env`
- Ensure correct port (5173 for Vite)
- Check `corsOptions` in `server.js`

## 📚 Learning Resources

- [Express.js Guide](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [JWT.io](https://jwt.io/)
- [Zod Validation](https://zod.dev/)
- [MongoDB Docs](https://docs.mongodb.com/)
- [REST API Best Practices](https://restfulapi.net/)

## 📄 License

MIT License - See LICENSE file for details

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📧 Support

For issues and questions, please open an issue on GitHub.

---

**Built with ❤️ for building amazing blog platforms**
