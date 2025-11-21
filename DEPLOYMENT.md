# AnnSampark Deployment Guide

## Quick Deployment Checklist

### Prerequisites
- [ ] MongoDB Atlas account created
- [ ] Cloudinary account created
- [ ] Backend deployment platform account (Render/Railway/Heroku)
- [ ] Frontend deployment platform account (Vercel/Netlify)

---

## 1. MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user:
   - Database Access → Add New Database User
   - Set username and password
4. Whitelist IP addresses:
   - Network Access → Add IP Address
   - Allow access from anywhere: `0.0.0.0/0`
5. Get connection string:
   - Clusters → Connect → Connect your application
   - Copy connection string
   - Replace `<password>` with your database password

**Connection String Format**:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/annsampark?retryWrites=true&w=majority
```

---

## 2. Cloudinary Setup

1. Go to [Cloudinary](https://cloudinary.com/)
2. Sign up for free account
3. Go to Dashboard
4. Copy your credentials:
   - Cloud Name
   - API Key
   - API Secret

---

## 3. Backend Deployment (Render)

### Option A: Using Render

1. Go to [Render](https://render.com/)
2. Sign up and connect GitHub
3. Create New → Web Service
4. Connect your repository
5. Configure:
   - **Name**: `annsampark-backend`
   - **Root Directory**: `server`
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

6. Add Environment Variables:
   ```
   NODE_ENV=production
   PORT=10000
   MONGODB_URI=<your-mongodb-atlas-connection-string>
   JWT_SECRET=<generate-random-string>
   JWT_REFRESH_SECRET=<generate-random-string>
   JWT_EXPIRE=1h
   JWT_REFRESH_EXPIRE=7d
   CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
   CLOUDINARY_API_KEY=<your-cloudinary-api-key>
   CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
   CLIENT_URL=<your-frontend-url>
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100
   ```

7. Click "Create Web Service"
8. Wait for deployment (5-10 minutes)
9. Copy your backend URL (e.g., `https://annsampark-backend.onrender.com`)

### Option B: Using Railway

1. Go to [Railway](https://railway.app/)
2. Sign up with GitHub
3. New Project → Deploy from GitHub repo
4. Select your repository
5. Add service → Select `server` directory
6. Add environment variables (same as above)
7. Deploy

### Option C: Using Heroku

1. Install Heroku CLI
2. Login: `heroku login`
3. Create app: `heroku create annsampark-backend`
4. Set buildpack: `heroku buildpacks:set heroku/nodejs`
5. Set root directory:
   ```bash
   heroku config:set PROJECT_PATH=server
   ```
6. Add environment variables:
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set MONGODB_URI=<your-connection-string>
   # ... add all other variables
   ```
7. Deploy:
   ```bash
   git subtree push --prefix server heroku main
   ```

---

## 4. Frontend Deployment (Vercel)

### Option A: Using Vercel

1. Go to [Vercel](https://vercel.com/)
2. Sign up with GitHub
3. Import Project → Select your repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (leave as root)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

5. Add Environment Variable:
   ```
   VITE_API_URL=<your-backend-url>/api
   ```
   Example: `https://annsampark-backend.onrender.com/api`

6. Click "Deploy"
7. Wait for deployment (2-5 minutes)
8. Copy your frontend URL

### Option B: Using Netlify

1. Go to [Netlify](https://www.netlify.com/)
2. Sign up with GitHub
3. New site from Git → Select repository
4. Configure:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Add environment variable:
   ```
   VITE_API_URL=<your-backend-url>/api
   ```
6. Deploy site

---

## 5. Update Backend CORS

After deploying frontend, update backend environment variable:

```
CLIENT_URL=<your-frontend-url>
```

Example: `https://annsampark.vercel.app`

Redeploy backend for changes to take effect.

---

## 6. Testing Deployment

1. **Backend Health Check**:
   - Visit: `https://your-backend-url/health`
   - Should return: `{"success":true,"message":"Server is running"}`

2. **Frontend**:
   - Visit your frontend URL
   - Try registering a new account
   - Try logging in
   - Test creating a donation

3. **Database**:
   - Check MongoDB Atlas → Collections
   - Verify users and donations are being created

---

## 7. Post-Deployment Setup

### Create Admin Account

1. Register a new account on your deployed site
2. Go to MongoDB Atlas → Browse Collections
3. Find your user in the `users` collection
4. Edit the document and change `role` to `"admin"`
5. Set `verified` to `true`

### Test All Features

- [ ] User registration (donor, receiver)
- [ ] User login
- [ ] Create donation with images
- [ ] View donations
- [ ] Claim donation (as receiver)
- [ ] Complete donation (as donor)
- [ ] View notifications
- [ ] Admin dashboard

---

## 8. Custom Domain (Optional)

### For Vercel:
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

### For Render:
1. Go to Dashboard → Settings → Custom Domain
2. Add your domain
3. Update DNS records

---

## 9. Monitoring & Maintenance

### Backend Monitoring
- Render: Check logs in Dashboard → Logs
- Set up uptime monitoring (e.g., UptimeRobot)

### Database Monitoring
- MongoDB Atlas: Monitor → Performance
- Set up alerts for storage and connections

### Error Tracking
- Consider adding Sentry for error tracking:
  ```bash
  npm install @sentry/node
  ```

---

## 10. Scaling Considerations

### Free Tier Limitations
- **Render**: Spins down after 15 min inactivity
- **MongoDB Atlas**: 512MB storage limit
- **Cloudinary**: 25GB storage, 25GB bandwidth/month

### Upgrade When Needed
- Backend: Upgrade to paid Render plan ($7/month)
- Database: Upgrade MongoDB Atlas cluster
- Images: Upgrade Cloudinary plan

---

## 11. Security Checklist

- [ ] Change all default JWT secrets
- [ ] Use strong database passwords
- [ ] Enable HTTPS (automatic on Vercel/Render)
- [ ] Set up rate limiting (already configured)
- [ ] Regular security updates: `npm audit fix`
- [ ] Monitor for suspicious activity

---

## 12. Backup Strategy

### Database Backups
- MongoDB Atlas: Automated backups on paid tiers
- Manual export: Atlas → Collections → Export Collection

### Code Backups
- Keep GitHub repository updated
- Tag releases: `git tag v1.0.0`

---

## Troubleshooting

### Backend won't start
- Check environment variables are set correctly
- Check MongoDB connection string
- View deployment logs

### Frontend can't connect to backend
- Verify `VITE_API_URL` is correct
- Check CORS settings in backend
- Check browser console for errors

### Images not uploading
- Verify Cloudinary credentials
- Check file size limits (5MB default)
- Check network tab for upload errors

### Database connection fails
- Verify MongoDB Atlas IP whitelist
- Check connection string format
- Ensure database user has correct permissions

---

## Support Resources

- **MongoDB Atlas**: https://docs.atlas.mongodb.com/
- **Render**: https://render.com/docs
- **Vercel**: https://vercel.com/docs
- **Cloudinary**: https://cloudinary.com/documentation

---

**Deployment Complete! 🎉**

Your AnnSampark platform is now live and ready to make an impact!
