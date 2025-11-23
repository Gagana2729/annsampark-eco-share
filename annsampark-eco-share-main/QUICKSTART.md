# Quick Start Guide - AnnSampark

## Prerequisites Check

Before starting, ensure you have:
- [ ] Node.js installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] MongoDB installed OR MongoDB Atlas account

## Option 1: Using MongoDB Atlas (Recommended - No local install needed)

### Step 1: Create MongoDB Atlas Account

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Create a free account
3. Create a new cluster (free tier)
4. Create database user:
   - Username: `annsampark`
   - Password: (create a strong password)
5. Add IP Address: `0.0.0.0/0` (allow from anywhere)
6. Get connection string:
   - Click "Connect" → "Connect your application"
   - Copy the connection string
   - It looks like: `mongodb+srv://annsampark:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`

### Step 2: Update Backend .env

Open `server/.env` and update:

```env
MONGODB_URI=mongodb+srv://annsampark:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/annsampark?retryWrites=true&w=majority
```

Replace `YOUR_PASSWORD` with your actual password.

## Option 2: Using Local MongoDB

### Install MongoDB

**Windows**:
1. Download from https://www.mongodb.com/try/download/community
2. Install with default settings
3. MongoDB should start automatically

**macOS**:
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux**:
```bash
sudo apt-get install mongodb
sudo systemctl start mongod
```

## Starting the Application

### Terminal 1: Start Backend

```bash
cd server
npm install
npm run dev
```

You should see:
```
✅ MongoDB Connected: ...
🌱 AnnSampark Server Running
Port: 5000
```

### Terminal 2: Start Frontend

```bash
# In root directory
npm install
npm run dev
```

You should see:
```
VITE ready in XXX ms
Local: http://localhost:5173/
```

## Testing

1. Open browser: http://localhost:5173
2. Click "Register"
3. Fill in details:
   - Full Name: Test User
   - Email: test@example.com
   - Password: password123
   - Role: Donor
4. Click Register
5. You should be redirected to Donor Dashboard

## Troubleshooting

### Backend won't start

**Error**: `Cannot find module 'express'`
**Solution**: Run `npm install` in server directory

**Error**: `MongooseServerSelectionError`
**Solution**: 
- Check MongoDB is running: `mongod --version`
- Or use MongoDB Atlas (see Option 1)

### Frontend won't start

**Error**: `Cannot find module 'axios'`
**Solution**: Run `npm install` in root directory

### Login/Register not working

1. Open browser console (F12)
2. Check for errors
3. Verify backend is running on http://localhost:5000
4. Test backend: Open http://localhost:5000/health
   - Should show: `{"success":true,"message":"Server is running"}`

### CORS Error

If you see CORS error in console:
1. Check `server/.env` has: `CLIENT_URL=http://localhost:5173`
2. Restart backend server

## Quick Test Commands

### Test Backend Health
```bash
curl http://localhost:5000/health
```

### Test Registration
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","fullName":"Test User","role":"donor"}'
```

### Test Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

## Common Issues

### Issue: "Static" appearance
**Cause**: Backend not running or frontend not connected
**Solution**: 
1. Ensure backend is running (Terminal 1)
2. Check `.env` has `VITE_API_URL=http://localhost:5000/api`
3. Restart frontend

### Issue: Login button does nothing
**Cause**: JavaScript error or API not reachable
**Solution**:
1. Open browser console (F12)
2. Look for red errors
3. Check Network tab for failed requests
4. Ensure backend is running

### Issue: "Network Error"
**Cause**: Backend not running or wrong URL
**Solution**:
1. Verify backend is running: http://localhost:5000/health
2. Check `.env` file has correct `VITE_API_URL`
3. Restart both servers

## Need Help?

If you're still having issues:
1. Share the error message from browser console
2. Share the error from backend terminal
3. Confirm which step failed
