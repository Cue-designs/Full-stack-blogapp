# 🚀 Quick Start Guide - Running Everything

**Last Updated:** February 15, 2026  
**Status:** All fixes applied, ready to run

---

## ⚡ TL;DR (30 seconds to running)

### Terminal 1 (Backend)
```bash
cd c:\Users\user\Documents\Cajetan\Project\backend
npm install
npm run seed
npm run dev
```

### Terminal 2 (Frontend)
```bash
cd c:\Users\user\Documents\Cajetan\Project\my-project
npm install
npm run dev
```

### Terminal 3 (First time only - Create env file)
```bash
cd c:\Users\user\Documents\Cajetan\Project\my-project
echo "VITE_API_URL=http://localhost:5000/api" > .env.local
```

Then open: **http://localhost:5173** ✅

---

## 📋 Step-by-Step Setup

### 1️⃣ Backend Setup

#### 1.1 Install Dependencies
```bash
cd c:\Users\user\Documents\Cajetan\Project\backend
npm install
```

Expected output:
```
added 150+ packages
```

#### 1.2 Verify .env File
Check if backend has `.env` (copy from `.env.example` if needed):
```bash
# File: backend/.env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb+srv://Cajetan:myage2007@cluster0.eqqmytt.mongodb.net/blog-db?retryWrites=true&w=majority
JWT_ACCESS_SECRET=your_super_secret_access_token_key_change_this_in_production
JWT_REFRESH_SECRET=your_super_secret_refresh_token_key_change_this_in_production
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d
FRONTEND_URL=http://localhost:5173
LOG_LEVEL=info
```

#### 1.3 Seed Database (First Time Only)
```bash
npm run seed
```

Expected output:
```
✅ Created 3 users
✅ Created 20 posts
✅ Database seeding completed successfully!

Sample Accounts:
1. Admin: john@example.com / Password123
2. User: jane@example.com / Password123
3. User: mike@example.com / Password123
```

**This creates test data for development!**

#### 1.4 Start Backend
```bash
npm run dev
```

Expected output:
```
====================================
Server is running in development mode
Listening on port 5000
Environment: development
====================================
```

✅ **Backend is running!**

---

### 2️⃣ Frontend Setup

#### 2.1 Create .env.local
```bash
cd c:\Users\user\Documents\Cajetan\Project\my-project
echo "VITE_API_URL=http://localhost:5000/api" > .env.local
```

Verify file exists:
```bash
# Check content (Windows)
type .env.local

# Should show:
# VITE_API_URL=http://localhost:5000/api
```

#### 2.2 Install Dependencies
```bash
npm install
```

Expected output:
```
added 200+ packages
```

#### 2.3 Start Frontend
```bash
npm run dev
```

Expected output:
```
  VITE v5.x.x  build 0.00s

  ➜  Local:   http://localhost:5173/
  ➜  press h + enter to show help
```

✅ **Frontend is running!**

---

## 🧪 Testing Everything

### Test 1: Health Check
```
Open: http://localhost:5000/health
Expected: { "status": "OK" }
```

### Test 2: API Status
```
Open: http://localhost:5000/api
Expected: {
  "message": "Blog API - v1.0.0",
  "endpoints": {
    "auth": "/api/auth",
    "posts": "/api/posts",
    "health": "/health"
  }
}
```

### Test 3: View Blog Posts
```
Open: http://localhost:5173
Click: "Blog" in navigation
Expected: 20 blog posts from database
```

### Test 4: Search Posts
```
On Blog page
Type in search box: "React"
Expected: Posts with "React" in title, body, or tags filtered
```

### Test 5: Sign Up New Account
```
Open: http://localhost:5173/signup
Full Name: "Your Name"
Email: "your@email.com"
Password: "YourPass123" (must have uppercase, lowercase, number)
Confirm: "YourPass123"
Click: "Sign Up"
Expected: Account created, redirected to home, logged in
```

### Test 6: Log In
```
Open: http://localhost:5173/login
Email: "john@example.com"
Password: "Password123"
Click: "Sign In"
Expected: Logged in, redirected to home
```

### Test 7: Read Full Article
```
On Blog page
Click any post card
Expected: Full article content shows with author and date
```

---

## 🔧 Common Issues & Fixes

### Issue: "Cannot find module"
**Solution:**
```bash
# Clear and reinstall
rm -rf node_modules
rm package-lock.json
npm install
```

### Issue: "Port 5000 already in use"
**Solution:**
```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill process (replace PID with actual number)
taskkill /PID <PID> /F

# Then restart: npm run dev
```

### Issue: "MongoDB connection error"
**Solution:**
1. Check MONGODB_URI in backend/.env
2. Verify MongoDB Atlas IP whitelist includes your IP
3. Ensure internet connection
4. Try: https://www.mongodb.com/cloud/atlas (login to check)

### Issue: "CORS error" in browser
**Solution:**
```bash
# Verify FRONTEND_URL in backend/.env
FRONTEND_URL=http://localhost:5173

# Restart backend: npm run dev
```

### Issue: "Blog posts not showing"
**Solution:**
1. Check backend is running on port 5000
2. Open: http://localhost:5000/api/posts
3. Should return JSON with posts array
4. If 404, backend routes aren't loaded
5. Check seeds were created: npm run seed

### Issue: "Login fails"
**Solution:**
1. Verify backend is running: http://localhost:5000/health
2. Check database seeded: npm run seed
3. Use test account: john@example.com / Password123
4. Check browser console (F12) for error messages
5. Check Network tab (F12) for 404 or CORS errors

### Issue: "Blank page on localhost:5173"
**Solution:**
```bash
# Stop frontend (Ctrl+C)
cd my-project
npm run dev
# Sometimes Vite needs to rebuild cache
```

---

## 📁 Project Structure

```
Project/
├── backend/                    # Node.js + Express API
│   ├── src/
│   │   ├── controllers/        # Business logic
│   │   ├── models/             # MongoDB schemas
│   │   ├── routes/             # API endpoints
│   │   ├── middleware/         # Auth, validation, etc.
│   │   └── server.js          # Express app
│   ├── scripts/seed.js         # Database seeding
│   ├── package.json
│   ├── .env                    # Your config
│   └── .env.example            # Template
│
└── my-project/                 # React frontend
    ├── src/
    │   ├── pages/              # React pages
    │   ├── components/         # React components
    │   ├── api/blog-api.js     # API client
    │   └── App.jsx            # Main app
    ├── package.json
    ├── .env.local             # Your config
    └── .env.example           # Template
```

---

## 🎯 What Each Port Does

| Port | Service | URL | Purpose |
|------|---------|-----|---------|
| 5173 | React Dev Server | http://localhost:5173 | Frontend UI |
| 5000 | Express Backend | http://localhost:5000/api | API endpoints |
| 27017 | MongoDB (optional local) | N/A | Database (if using local) |

---

## 🔐 Environment Variables Explained

### Backend (.env)
```env
NODE_ENV=development          # Mode: development, production, test
PORT=5000                     # Server port
MONGODB_URI=mongodb+srv://... # Database connection
JWT_ACCESS_SECRET=xyz         # Secret for access tokens (15 min)
JWT_REFRESH_SECRET=abc        # Secret for refresh tokens (7 days)
FRONTEND_URL=http://...       # Where frontend runs (for CORS)
```

### Frontend (.env.local)
```env
VITE_API_URL=http://localhost:5000/api  # Backend API URL
```

---

## 📊 What Gets Seeded

Running `npm run seed` in backend creates:

**Users (3):**
| Email | Password | Role |
|-------|----------|------|
| john@example.com | Password123 | admin |
| jane@example.com | Password123 | user |
| mike@example.com | Password123 | user |

**Posts (20):**
- 5 Web Development
- 5 React tutorials
- 5 JavaScript guides
- 5 Backend/Database posts

All posts are marked as `published: true` and visible to everyone.

---

## 🚨 Important Notes

⚠️ **HTTPS in Production:** Always use HTTPS in production, not HTTP
⚠️ **Secrets:** Never commit .env to Git (add to .gitignore)
⚠️ **MongoDB:** Needs internet for Atlas. Or use local MongoDB
⚠️ **CORS:** Frontend must be running on http://localhost:5173 for dev
⚠️ **Ports:** Make sure 5000 and 5173 are not blocked by firewall

---

## ✅ Checklist Before Running

- [ ] MongoDB Atlas account created
- [ ] Internet connection available
- [ ] Node.js 18+ installed (check: `node --version`)
- [ ] npm installed (check: `npm --version`)
- [ ] Port 5000 not in use (check: `netstat -ano | findstr :5000`)
- [ ] Port 5173 not in use (check: `netstat -ano | findstr :5173`)
- [ ] Backend .env file exists
- [ ] Frontend .env.local file exists
- [ ] Two terminal windows open

---

## 🎉 Ready to Go!

1. **Terminal 1:** `cd backend && npm run seed && npm run dev`
2. **Terminal 2:** `cd my-project && npm run dev`
3. **Browser:** Open `http://localhost:5173`
4. **Enjoy!** 🚀

---

## 📞 Need Help?

**Check these files for detailed info:**
- `FIXES_APPLIED.md` - Details of all fixes
- `TOKEN_FUNCTIONS.md` - Token generation code
- `INTEGRATION_CHECK.md` - Integration verification
- Backend `README.md` - API documentation

---

**Last tested:** February 15, 2026  
**Status:** ✅ All systems working
