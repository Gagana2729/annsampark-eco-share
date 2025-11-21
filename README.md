# AnnSampark - Eco-Share Platform

**Smart Redistribution of Surplus Food, Books & Clothes**

AnnSampark is a full-stack web platform that connects donors (individuals, restaurants, businesses) with receivers (NGOs, charities, individuals in need) to facilitate the redistribution of surplus resources, promoting zero-waste sustainability.

## 🌟 Features

### Core Functionality
- **Multi-Category Donations**: Support for food, books, and clothes
- **Role-Based System**: Separate dashboards for donors, receivers, and admins
- **Real-Time Tracking**: Track donation status from posting to completion
- **GPS-Enabled**: Find nearby donations based on location
- **Image Uploads**: Upload multiple images for each donation
- **Impact Metrics**: Track your contribution and platform statistics
- **Notifications**: In-app notifications for donation updates

### Technology Stack

**Frontend**:
- React 18 with TypeScript
- Vite for build tooling
- shadcn-ui components
- Tailwind CSS for styling
- React Router for navigation
- Axios for API calls
- React Hook Form + Zod for form validation

**Backend**:
- Node.js with Express
- MongoDB with Mongoose ODM
- JWT authentication
- Cloudinary for image storage
- Bcrypt for password hashing
- Express middleware for security (Helmet, CORS, Rate Limiting)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)
- **Cloudinary account** (for image uploads - free tier available)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd annsampark-eco-share
```

### 2. Backend Setup

#### Install Dependencies
```bash
cd server
npm install
```

#### Configure Environment Variables
Create a `.env` file in the `server` directory:

```env
# Environment
NODE_ENV=development
PORT=5000

# MongoDB
MONGODB_URI=mongodb://localhost:27017/annsampark
# For MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/annsampark

# JWT Secrets (change these in production!)
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_REFRESH_SECRET=your_super_secret_refresh_key_change_this
JWT_EXPIRE=1h
JWT_REFRESH_EXPIRE=7d

# Cloudinary (get from https://cloudinary.com)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email (optional, for notifications)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password

# Frontend URL
CLIENT_URL=http://localhost:5173

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

#### Start MongoDB
If using local MongoDB:
```bash
# On Windows
net start MongoDB

# On macOS/Linux
sudo systemctl start mongod
```

#### Run Backend Server
```bash
npm run dev
```

The backend server will start on `http://localhost:5000`

### 3. Frontend Setup

#### Install Dependencies
```bash
cd ..  # Return to root directory
npm install
```

#### Configure Environment Variables
Create/update `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:5000/api
```

#### Run Frontend
```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

## 📱 Usage

### For Donors

1. **Register**: Create an account as a "Donor"
2. **Post Donation**: Navigate to donor dashboard and create a new donation
   - Select category (food/books/clothes)
   - Add item details and quantity
   - Upload images
   - Set location (GPS or manual)
   - For food: Set expiry time
3. **Track Donations**: View all your donations and their status
4. **Complete Donations**: Mark donations as completed after successful handover

### For Receivers (NGOs/Charities)

1. **Register**: Create an account as a "Receiver" with organization details
2. **Browse Donations**: View available donations
   - Filter by category
   - Search by location
   - View nearby donations
3. **Claim Donations**: Request donations you need
4. **Track Requests**: Monitor your claimed donations

### For Admins

1. **User Management**: Verify receiver organizations
2. **Platform Analytics**: View overall statistics
3. **Moderation**: Monitor donations and users

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile

### Donations
- `POST /api/donations` - Create donation (donor only)
- `GET /api/donations` - Get all donations (with filters)
- `GET /api/donations/:id` - Get single donation
- `PUT /api/donations/:id` - Update donation (donor only)
- `DELETE /api/donations/:id` - Delete donation (donor only)
- `GET /api/donations/my/donations` - Get user's donations
- `POST /api/donations/:id/claim` - Claim donation (receiver only)
- `PUT /api/donations/:id/complete` - Complete donation (donor only)

### Users
- `GET /api/users/profile/:id` - Get user profile
- `GET /api/users/stats` - Get user statistics
- `GET /api/users` - Get all users (admin only)
- `PUT /api/users/verify/:id` - Verify user (admin only)

### Notifications
- `GET /api/notifications` - Get notifications
- `PUT /api/notifications/:id/read` - Mark as read
- `PUT /api/notifications/read-all` - Mark all as read
- `DELETE /api/notifications/:id` - Delete notification

## 🗄️ Database Schema

### Users Collection
- Email, password (hashed), full name, role
- Organization name (for receivers)
- Address with GPS coordinates
- Verification status, impact score

### Donations Collection
- Donor reference, item details, quantity
- Images array (Cloudinary URLs)
- Location with coordinates
- Status tracking (available, claimed, in-transit, completed)
- Expiry time (for food items)

### Notifications Collection
- User reference, notification type, message
- Related donation/user references
- Read status

## 🚢 Deployment

### Backend Deployment (Render/Railway/Heroku)

1. Create account on deployment platform
2. Connect your GitHub repository
3. Set environment variables
4. Deploy from `server` directory

### Frontend Deployment (Vercel/Netlify)

1. Create account on deployment platform
2. Connect your GitHub repository
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Add environment variable: `VITE_API_URL=<your-backend-url>/api`

### Database (MongoDB Atlas)

1. Create free cluster at mongodb.com/atlas
2. Get connection string
3. Update `MONGODB_URI` in backend environment variables

### Image Storage (Cloudinary)

1. Create free account at cloudinary.com
2. Get cloud name, API key, and API secret
3. Update Cloudinary variables in backend environment

## 🧪 Testing

### Backend Tests
```bash
cd server
npm test
```

### Frontend Tests
```bash
npm run test
```

## 📝 Project Structure

```
annsampark-eco-share/
├── server/                 # Backend (Node.js/Express)
│   ├── src/
│   │   ├── config/        # Database & Cloudinary config
│   │   ├── models/        # Mongoose models
│   │   ├── routes/        # API routes
│   │   ├── controllers/   # Route controllers
│   │   ├── middleware/    # Auth, upload, etc.
│   │   └── server.js      # Entry point
│   ├── package.json
│   └── .env
├── src/                   # Frontend (React)
│   ├── components/        # UI components
│   ├── pages/            # Page components
│   ├── hooks/            # Custom hooks
│   ├── services/         # API services
│   └── lib/              # Utilities
├── public/               # Static assets
├── package.json
└── README.md
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with React, Express, and MongoDB
- UI components from shadcn-ui
- Icons from Lucide React

## 📞 Support

For support, email your-email@example.com or open an issue in the repository.

---

**Made with ❤️ for a sustainable future**
