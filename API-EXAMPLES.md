# 🔌 API Examples - Testing the Blog Backend

This file contains real-world examples of how to test and use the Blog API.

## 📌 Base URL

```
http://localhost:5000/api
```

## 🔑 Authentication Flow

### 1. Sign Up (Create Account)

```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "email": "john@example.com",
    "password": "Password123",
    "confirmPassword": "Password123"
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "Account created successfully",
  "data": {
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "fullName": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "isActive": true,
      "createdAt": "2024-01-15T10:00:00.000Z"
    },
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
  }
}
```

### 2. Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "Password123",
    "rememberMe": true
  }'
```

**Save the tokens for authenticated requests!**

### 3. Refresh Access Token

```bash
curl -X POST http://localhost:5000/api/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }'
```

## 📰 Post Operations

### Get All Posts (Public, No Auth Required)

```bash
# Get first 10 posts, sorted by newest
curl http://localhost:5000/api/posts?page=1&limit=10&sort=newest

# Filter by category
curl http://localhost:5000/api/posts?category=javascript&limit=20

# Search posts
curl http://localhost:5000/api/posts?search=react&sort=popular

# Combine filters
curl "http://localhost:5000/api/posts?page=2&limit=15&category=react&sort=newest"
```

**Response:**
```json
{
  "success": true,
  "message": "Posts retrieved successfully",
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Getting Started with React",
      "body": "React is a JavaScript library for building user interfaces...",
      "author": {
        "_id": "507f1f77bcf86cd799439010",
        "fullName": "Jane Smith",
        "avatar": "https://i.pravatar.cc/150?img=2",
        "email": "jane@example.com"
      },
      "category": "react",
      "tags": ["react", "javascript", "ui"],
      "likes": 42,
      "views": 156,
      "readTime": 5,
      "datetime": "January 15, 2024 10:30 AM",
      "published": true,
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 47,
    "pages": 5
  }
}
```

### Get Single Post

```bash
# Without authentication
curl http://localhost:5000/api/posts/507f1f77bcf86cd799439011

# With authentication (for tracking)
curl http://localhost:5000/api/posts/507f1f77bcf86cd799439011 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Create Post (Requires Authentication)

```bash
curl -X POST http://localhost:5000/api/posts \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My First Blog Post",
    "body": "This is my first blog post. It contains valuable content about web development...",
    "category": "web-development",
    "tags": ["web", "development", "nodejs"],
    "published": true,
    "readTime": 7
  }'
```

### Update Post (Author or Admin Only)

```bash
curl -X PUT http://localhost:5000/api/posts/507f1f77bcf86cd799439011 \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Title",
    "body": "Updated content here...",
    "category": "backend"
  }'
```

### Delete Post (Author or Admin Only)

```bash
curl -X DELETE http://localhost:5000/api/posts/507f1f77bcf86cd799439011 \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## 💬 Comments

### Add Comment to Post

```bash
curl -X POST http://localhost:5000/api/posts/507f1f77bcf86cd799439011/comments \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Great post! Really helpful."
  }'
```

## 👍 Likes

### Like a Post

```bash
curl -X POST http://localhost:5000/api/posts/507f1f77bcf86cd799439011/like \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

Response:
```json
{
  "success": true,
  "message": "Post liked successfully",
  "data": {
    "likes": 43
  }
}
```

## 👤 User Profile

### Get Current User Profile

```bash
curl http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### Update Profile

```bash
curl -X PUT http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Smith",
    "bio": "Full-stack developer and tech enthusiast",
    "avatar": "https://i.pravatar.cc/150?img=5"
  }'
```

## 🚪 Logout

### Logout Current Session

```bash
curl -X POST http://localhost:5000/api/auth/logout \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### Logout From All Devices

```bash
curl -X POST http://localhost:5000/api/auth/logout-all \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## 🧪 JavaScript/Fetch Examples

### Sign Up with Fetch

```javascript
async function signup() {
  const response = await fetch('http://localhost:5000/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      fullName: 'John Doe',
      email: 'john@example.com',
      password: 'Password123',
      confirmPassword: 'Password123'
    })
  });

  const data = await response.json();
  console.log(data);
  
  if (data.success) {
    // Save tokens
    localStorage.setItem('accessToken', data.data.tokens.accessToken);
    localStorage.setItem('refreshToken', data.data.tokens.refreshToken);
  }
}
```

### Create Post with Fetch

```javascript
async function createPost(title, body, category) {
  const accessToken = localStorage.getItem('accessToken');
  
  const response = await fetch('http://localhost:5000/api/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify({
      title,
      body,
      category,
      tags: ['tag1', 'tag2'],
      published: true
    })
  });

  const data = await response.json();
  return data;
}
```

### Get Posts with Fetch

```javascript
async function getPosts(page = 1, limit = 10, category = null) {
  let url = `http://localhost:5000/api/posts?page=${page}&limit=${limit}`;
  
  if (category) {
    url += `&category=${category}`;
  }

  const response = await fetch(url);
  const data = await response.json();
  return data;
}
```

### Axios Examples

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

// Login
async function login(email, password) {
  const { data } = await api.post('/auth/login', {
    email,
    password
  });
  return data;
}

// Get all posts
async function getAllPosts(page = 1, limit = 10) {
  const { data } = await api.get('/posts', {
    params: { page, limit }
  });
  return data;
}

// Create post (with auth)
async function createPost(postData, token) {
  const { data } = await api.post('/posts', postData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return data;
}

// Like a post
async function likePost(postId, token) {
  const { data } = await api.post(`/posts/${postId}/like`, {}, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return data;
}
```

## 🔐 HTTP Status Codes

| Code | Meaning | Example |
|------|---------|---------|
| 200 | OK | Successful request |
| 201 | Created | New post created |
| 400 | Bad Request | Invalid input |
| 401 | Unauthorized | Missing/invalid token |
| 403 | Forbidden | Don't have permission |
| 404 | Not Found | Post doesn't exist |
| 409 | Conflict | Email already registered |
| 422 | Unprocessable Entity | Validation failed |
| 500 | Server Error | Server issue |

## 📋 Query Parameters

### Pagination
- `page` (default: 1) - Page number
- `limit` (default: 10, max: 100) - Results per page

### Filtering & Search
- `category` - Filter by category
- `search` - Search in title, body, and tags
- `sort` - `newest`, `oldest`, or `popular`

### Example
```bash
http://localhost:5000/api/posts?page=2&limit=20&category=javascript&search=async&sort=popular
```

## ❌ Error Response Example

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "email": "Invalid email address",
    "password": "Password must contain at least one uppercase letter, one lowercase letter, and one number"
  }
}
```

---

**Ready to test? Start with Sign Up! 🚀**
