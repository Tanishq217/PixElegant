# PixElegant Deployment Guide

## 🚀 Complete Deployment Instructions

This guide will help you deploy PixElegant to production using Render (Backend) and Netlify (Frontend & Admin).

## 📋 Prerequisites

- GitHub repository with your code
- Render account (free tier available)
- Netlify account (free tier available)
- MongoDB Atlas database (already configured)

## 🔧 Backend Deployment (Render)

### Step 1: Prepare Backend for Render

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Create Render Service**:
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the repository containing your backend code

### Step 2: Configure Render Service

**Service Settings**:
- **Name**: `pixelegant-backend`
- **Environment**: `Node`
- **Region**: `Oregon (US West)`
- **Branch**: `main`
- **Root Directory**: `backend`
- **Build Command**: `npm install`
- **Start Command**: `npm start`

**Environment Variables**:
```
NODE_ENV=production
PORT=4000
MONGODB_URL=mongodb+srv://tanishq2127tanishq_db_user:PixElegant123@cluster0.nl9xgnl.mongodb.net/PixElegant
ADMIN_EMAIL=pixelegant@gmail.com
ADMIN_PASSWORD=PixElegant21272127
JWT_SECRET=WFYVVDFBGVHBUUGDUD
CLOUDINARY_NAME=dtfjdad4fd
CLOUDINARY_API_KEY=935529896649521
CLOUDINARY_API_SECRET=_BE5Bj15IP3FRePlzfMnlnOpqbA
VITE_FIREBASE_APIKEY=AIzaSyCBTQ4Y-7B_LiwIVIOl7GzrBmVddO3jvHM
```

### Step 3: Deploy Backend

1. Click "Create Web Service"
2. Wait for deployment to complete
3. Note the service URL (e.g., `https://pixelegant-clothing-app.onrender.com`)

## 🌐 Frontend Deployment (Netlify)

### Step 1: Prepare Frontend

1. **Update Environment Variables**:
   - After backend deployment, update the server URL in your frontend
   - The server URL will be your Render backend URL

2. **Build Frontend**:
   ```bash
   cd frontend
   npm run build
   ```

### Step 2: Deploy to Netlify

1. **Via Netlify Dashboard**:
   - Go to [Netlify Dashboard](https://app.netlify.com/)
   - Click "New site from Git"
   - Connect GitHub and select your repository
   - Configure build settings:
     - **Base directory**: `frontend`
     - **Build command**: `npm run build`
     - **Publish directory**: `frontend/dist`

2. **Environment Variables** (in Netlify):
   ```
   VITE_SERVER_URL=https://pixelegant-clothing-app.onrender.com
   ```

3. **Deploy**:
   - Click "Deploy site"
   - Wait for deployment to complete
   - Note the frontend URL (e.g., `https://pixelegant-frontend.netlify.app`)

## 🔧 Admin Panel Deployment (Netlify)

### Step 1: Deploy Admin Panel

1. **Create New Site**:
   - Go to Netlify Dashboard
   - Click "New site from Git"
   - Connect GitHub and select your repository
   - Configure build settings:
     - **Base directory**: `admin`
     - **Build command**: `npm run build`
     - **Publish directory**: `admin/dist`

2. **Environment Variables** (in Netlify):
   ```
   VITE_SERVER_URL=https://pixelegant-clothing-app.onrender.com
   ```

3. **Deploy**:
   - Click "Deploy site"
   - Wait for deployment to complete
   - Note the admin URL (e.g., `https://pixelegant-admin.netlify.app`)

## 🔄 Update CORS Settings

After deploying all services, update the backend CORS settings:

1. **Update Backend CORS**:
   - Go to your Render service
   - Update environment variables or code
   - Add your actual Netlify URLs to the CORS origins

2. **Redeploy Backend**:
   - Trigger a new deployment
   - Wait for it to complete

## ✅ Post-Deployment Checklist

### Backend Verification:
- [ ] Backend is accessible at Render URL
- [ ] API endpoints are working
- [ ] Database connection is established
- [ ] Environment variables are set correctly

### Frontend Verification:
- [ ] Frontend is accessible at Netlify URL
- [ ] Can connect to backend API
- [ ] User registration/login works
- [ ] Product browsing works
- [ ] Shopping cart functions properly

### Admin Panel Verification:
- [ ] Admin panel is accessible at Netlify URL
- [ ] Admin login works
- [ ] Can add/edit/delete products
- [ ] Can view orders
- [ ] Image uploads work

## 🔧 Troubleshooting

### Common Issues:

1. **CORS Errors**:
   - Ensure backend CORS includes your Netlify URLs
   - Check that credentials are enabled

2. **Environment Variables**:
   - Verify all environment variables are set correctly
   - Check that VITE_SERVER_URL points to your Render backend

3. **Build Failures**:
   - Check Node.js version compatibility
   - Ensure all dependencies are in package.json
   - Check build logs for specific errors

4. **Database Connection**:
   - Verify MongoDB Atlas connection string
   - Check IP whitelist in MongoDB Atlas
   - Ensure database user has proper permissions

## 📱 Final URLs

After successful deployment, you'll have:

- **Backend API**: `https://pixelegant-clothing-app.onrender.com`
- **Frontend**: `https://pixelegant-frontend.netlify.app`
- **Admin Panel**: `https://pixelegant-admin.netlify.app`

## 🎉 Success!

Your PixElegant e-commerce platform is now live and ready for production use!

### Admin Credentials:
- **Email**: pixelegant@gmail.com
- **Password**: PixElegant21272127

### Features Available:
- ✅ User registration and authentication
- ✅ Product browsing and shopping
- ✅ Shopping cart and checkout
- ✅ Order management
- ✅ Admin product management
- ✅ Image uploads and storage
- ✅ Responsive design
- ✅ Professional black and white theme

## 📞 Support

If you encounter any issues during deployment, check:
1. Render service logs
2. Netlify build logs
3. Browser console for errors
4. Network tab for API calls

---

**Happy Deploying! 🚀**
