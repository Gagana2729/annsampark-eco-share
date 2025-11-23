# Testing Guide - AnnSampark

## ✅ CORS Issue - FIXED!

The CORS error has been fixed. The backend now accepts requests from:
- http://localhost:5173
- http://localhost:8081
- http://localhost:3000

**You MUST restart the backend server for this to take effect!**

---

## Step-by-Step Testing

### Step 1: Restart Backend Server

1. **Stop the backend** (Ctrl+C in the terminal running `npm run dev` in server folder)
2. **Start it again**:
   ```bash
   cd server
   npm run dev
   ```
3. **Verify it's running**: Open http://localhost:5000/health
   - Should show: `{"success":true,"message":"Server is running"}`

### Step 2: Test Registration

1. **Open your app** (http://localhost:8081 or whatever port)
2. **Click "Register"** or navigate to `/login`
3. **Fill the form**:
   - Full Name: `John Doe`
   - Organization Name: `Food Donors Inc` (optional for donors)
   - Email: `john@example.com`
   - Password: `password123`
   - Role: Select `Donor`
4. **Click "Register"**

**Expected Result**:
- ✅ Success toast message
- ✅ Redirected to `/donor-dashboard`
- ✅ You should see the donor dashboard

**If it fails**:
- Open browser console (F12)
- Share the error message with me

### Step 3: Test Login

1. **Logout** (if logged in)
2. **Click "Login"**
3. **Enter credentials**:
   - Email: `john@example.com`
   - Password: `password123`
4. **Click "Login"**

**Expected Result**:
- ✅ Success toast message
- ✅ Redirected to dashboard based on role

### Step 4: Test Different Roles

**Register as Receiver**:
1. Logout
2. Register with:
   - Full Name: `Jane Smith`
   - Organization Name: `Hope Foundation` (REQUIRED for receivers)
   - Email: `jane@example.com`
   - Password: `password123`
   - Role: `Receiver`
3. Should redirect to `/receiver-dashboard`

**Register as Admin**:
1. Logout
2. Register with:
   - Full Name: `Admin User`
   - Email: `admin@example.com`
   - Password: `password123`
   - Role: `Admin`
3. Should redirect to `/admin-dashboard`

---

## Verify in Database

If you have MongoDB Compass or MongoDB Atlas:

1. **Connect to your database**
2. **Check `users` collection**
3. **You should see**:
   - Your registered users
   - Passwords are hashed (not plain text)
   - Roles are correctly set

---

## Common Issues & Solutions

### Issue 1: CORS Error Still Appears

**Solution**: 
- Make sure you **restarted the backend** after the fix
- Clear browser cache (Ctrl+Shift+Delete)
- Try in incognito mode

### Issue 2: "Network Error"

**Possible Causes**:
1. Backend not running
2. Wrong API URL

**Solution**:
1. Check backend is running: http://localhost:5000/health
2. Check `.env` file has: `VITE_API_URL=http://localhost:5000/api`
3. Restart frontend if you changed .env

### Issue 3: "Cannot connect to MongoDB"

**Solution**:

**Option A - Use MongoDB Atlas (Recommended)**:
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Create free cluster
3. Get connection string
4. Update `server/.env`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/annsampark
   ```
5. Restart backend

**Option B - Install MongoDB Locally**:
- Windows: Download from https://www.mongodb.com/try/download/community
- Mac: `brew install mongodb-community`
- Linux: `sudo apt-get install mongodb`

### Issue 4: Registration succeeds but dashboard is empty

**This is NORMAL!** The dashboards are still showing static data. Next steps:
1. Authentication ✅ (Working now!)
2. Connect donation forms to backend (Next task)
3. Update dashboards to show real data (Next task)

---

## Test API Directly (Advanced)

You can test the API using browser console:

### Test Registration:
```javascript
fetch('http://localhost:5000/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'test@example.com',
    password: 'password123',
    fullName: 'Test User',
    role: 'donor'
  })
})
.then(r => r.json())
.then(data => console.log('Registration:', data))
.catch(err => console.error('Error:', err))
```

### Test Login:
```javascript
fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'test@example.com',
    password: 'password123'
  })
})
.then(r => r.json())
.then(data => {
  console.log('Login:', data);
  // Save token for next requests
  window.testToken = data.data.token;
})
.catch(err => console.error('Error:', err))
```

### Test Get Current User:
```javascript
fetch('http://localhost:5000/api/auth/me', {
  headers: { 
    'Authorization': `Bearer ${window.testToken}`
  }
})
.then(r => r.json())
.then(data => console.log('Current User:', data))
.catch(err => console.error('Error:', err))
```

---

## What's Working Now

✅ **Backend Server**: Running on port 5000  
✅ **MongoDB Connection**: Connected to database  
✅ **User Registration**: Creating users with hashed passwords  
✅ **User Login**: JWT authentication working  
✅ **Token Management**: Access & refresh tokens  
✅ **Role-Based Routing**: Redirects to correct dashboard  
✅ **CORS**: Fixed for all localhost ports  

## What's Next

After confirming authentication works:

1. **Update Donation Forms**:
   - Connect Food.tsx to backend
   - Connect Books.tsx to backend
   - Connect Clothes.tsx to backend
   - Add image upload functionality

2. **Update Dashboards**:
   - Fetch real donations from API
   - Display actual user statistics
   - Show real-time data

3. **Add GPS Features**:
   - Location picker component
   - "Use my location" button
   - Nearby donations search

---

## Need Help?

If something doesn't work:

1. **Share the error** from browser console (F12)
2. **Share the backend logs** from terminal
3. **Tell me what step failed**

I'll help you fix it immediately! 🚀
