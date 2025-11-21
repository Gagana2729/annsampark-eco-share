# CORS Issue Fixed! 🎉

## What was the problem?

Your frontend is running on `http://localhost:8081` but the backend CORS was only configured for `http://localhost:5173`.

## What I fixed:

Updated `server/src/server.js` to allow multiple origins including:
- http://localhost:5173
- http://localhost:8081
- http://localhost:3000

## Next Steps:

### 1. Restart the Backend Server

**Stop the current backend** (press Ctrl+C in the terminal running the server)

Then restart it:
```bash
cd server
npm run dev
```

### 2. Test Registration

1. Open http://localhost:8081 (or whatever port your frontend is on)
2. Click "Register"
3. Fill in the form:
   - Full Name: Test User
   - Organization Name: (optional for donors, required for receivers)
   - Email: test@example.com
   - Password: password123
   - Role: Donor
4. Click "Register"

You should now see:
- ✅ Success message
- Redirect to Donor Dashboard

### 3. Test Login

1. Logout (if logged in)
2. Click "Login"
3. Enter:
   - Email: test@example.com
   - Password: password123
4. Click "Login"

You should be redirected to the appropriate dashboard!

## Still Having Issues?

If you still see CORS errors:

1. **Check the backend is running**: Open http://localhost:5000/health
   - Should show: `{"success":true,"message":"Server is running"}`

2. **Check browser console** (F12 → Console tab)
   - Look for any red errors
   - Share them with me

3. **Check Network tab** (F12 → Network tab)
   - Try to register
   - Click on the failed request
   - Check the "Response" tab
   - Share the error message

## Verify Everything Works

After restarting the backend, try this test:

**Open browser console and run:**
```javascript
fetch('http://localhost:5000/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'test2@example.com',
    password: 'password123',
    fullName: 'Test User 2',
    role: 'donor'
  })
})
.then(r => r.json())
.then(console.log)
```

You should see a success response with a token!
