# ⚡ Quick Start - 5 Minutes to Running Application

**Prerequisites**: Node.js 18+, MongoDB (local or Atlas)

## Step 1: Setup Backend (2 minutes)

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Copy environment template and configure
cp .env.example .env

# Edit .env with your MongoDB connection:
# MONGODB_URI=mongodb://localhost:27017/blog-db
# OR use MongoDB Atlas connection string

# Seed sample data (optional but recommended)
npm run seed

# Start backend
npm run dev
```

✅ Backend running on `http://localhost:5000`

## Step 2: Setup Frontend (2 minutes)

**Open a new terminal/tab**

```bash
# Navigate to frontend
cd my-project

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Start frontend
npm run dev
```

✅ Frontend running on `http://localhost:5173`

## Step 3: Test It! (1 minute)

1. Open `http://localhost:5173` in your browser
2. Sign up: Use any email/password (password must have uppercase, lowercase, number)
3. Create a blog post
4. View public posts
5. Like, comment, and explore!

## 📝 Default Test Account (if you seeded)

```
Email: john@example.com
Password: Password123
```

## 🛑 Stop Servers

```
Ctrl+C in each terminal (or Cmd+C on Mac)
```

## 🐛 Common Issues

**MongoDB Connection Failed**
- Ensure MongoDB is running (`mongod`)
- For Atlas: Check connection string in `.env`

**CORS Error**
- Both servers must be running
- Check `FRONTEND_URL` in backend `.env`

**Port Already in Use**
- Change PORT in `.env`
- Or kill process: `lsof -ti:5000` (Mac/Linux)

## 📚 Full Setup Guide

For detailed instructions, see [SETUP.md](./SETUP.md)

---

**You're all set! Happy coding! 🚀**
