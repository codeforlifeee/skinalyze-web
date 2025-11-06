# Backend Deployment Guide

## Option 1: Deploy to Render.com (Recommended - Free Tier Available)

### Prerequisites
- GitHub account with your repository pushed
- Render.com account (sign up at https://render.com)

### Steps:

1. **Push your code to GitHub** (if not already done):
   ```bash
   git add .
   git commit -m "Prepare backend for deployment"
   git push origin main
   ```

2. **Create a New Web Service on Render**:
   - Go to https://dashboard.render.com
   - Click "New +" → "Web Service"
   - Connect your GitHub repository: `codeforlifeee/skinalyze-web`
   - Configure the service:
     - **Name**: `skinalyze-backend`
     - **Root Directory**: `backend`
     - **Environment**: `Docker`
     - **Region**: Choose closest to your users
     - **Branch**: `main`
     - **Plan**: Free (or paid for better performance)

3. **Add Environment Variables**:
   In the Render dashboard, add these environment variables:
   ```
   DATABASE_URL=<Render will provide this if you add PostgreSQL>
   AUTH0_DOMAIN=your-auth0-domain.auth0.com
   AUTH0_API_AUDIENCE=https://your-api-audience
   SECRET_KEY=<generate a strong random key>
   DEBUG=False
   CORS_ORIGINS=https://skinalyze-web.vercel.app
   ```

4. **Add PostgreSQL Database** (if needed):
   - In Render dashboard, click "New +" → "PostgreSQL"
   - Name it `skinalyze-db`
   - After creation, copy the "Internal Database URL"
   - Add it as `DATABASE_URL` environment variable to your web service

5. **Deploy**:
   - Click "Create Web Service"
   - Render will automatically build and deploy your Docker container
   - Your backend will be available at: `https://skinalyze-backend.onrender.com`

6. **Update Frontend**:
   - Update your Vercel environment variable:
   - `VITE_API_BASE_URL=https://skinalyze-backend.onrender.com`
   - Redeploy your frontend on Vercel

---

## Option 2: Deploy to Railway.app

### Steps:

1. **Install Railway CLI** (optional):
   ```bash
   npm install -g @railway/cli
   ```

2. **Deploy via GitHub**:
   - Go to https://railway.app
   - Sign in with GitHub
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository
   - Railway will auto-detect the Dockerfile

3. **Configure**:
   - Set root directory to `backend`
   - Add environment variables (same as Render)
   - Add PostgreSQL plugin if needed

4. **Get your URL**:
   - Railway will provide a URL like `https://your-app.up.railway.app`
   - Update your frontend's `VITE_API_BASE_URL`

---

## Option 3: Deploy to Google Cloud Run

### Prerequisites
- Google Cloud account with billing enabled
- gcloud CLI installed

### Steps:

1. **Build and push Docker image**:
   ```bash
   cd backend
   gcloud builds submit --tag gcr.io/YOUR-PROJECT-ID/skinalyze-backend
   ```

2. **Deploy to Cloud Run**:
   ```bash
   gcloud run deploy skinalyze-backend \
     --image gcr.io/YOUR-PROJECT-ID/skinalyze-backend \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated \
     --set-env-vars DATABASE_URL=YOUR_DB_URL,AUTH0_DOMAIN=YOUR_DOMAIN
   ```

3. **Update Frontend**:
   - Use the provided Cloud Run URL in your frontend

---

## Option 4: Deploy to Heroku

### Steps:

1. **Install Heroku CLI**:
   ```bash
   npm install -g heroku
   ```

2. **Login and create app**:
   ```bash
   heroku login
   cd backend
   heroku create skinalyze-backend
   ```

3. **Add PostgreSQL**:
   ```bash
   heroku addons:create heroku-postgresql:mini
   ```

4. **Set environment variables**:
   ```bash
   heroku config:set AUTH0_DOMAIN=your-domain.auth0.com
   heroku config:set AUTH0_API_AUDIENCE=https://your-api
   heroku config:set SECRET_KEY=your-secret-key
   heroku config:set DEBUG=False
   ```

5. **Deploy**:
   ```bash
   git subtree push --prefix backend heroku main
   ```

---

## Post-Deployment Checklist

✅ Backend is accessible at the deployment URL
✅ CORS is configured to allow your frontend URL
✅ Database is connected and migrations are run
✅ Environment variables are set correctly
✅ Frontend `.env` has `VITE_API_BASE_URL` set to backend URL
✅ Test API endpoints: `GET /health` should return `{"status": "healthy"}`
✅ Auth0 callback URLs include your backend URL

---

## Troubleshooting

### CORS Issues
If you get CORS errors, ensure:
- Backend `CORS_ORIGINS` includes your exact frontend URL (no trailing slash issues)
- Frontend is using the correct backend URL

### Database Connection Issues
- Check that `DATABASE_URL` is correctly formatted
- For Render/Railway, use the internal database URL
- Ensure database allows connections from your backend

### File Upload Issues
- Most platforms provide ephemeral storage
- Consider using cloud storage (AWS S3, Cloudinary, etc.) for production
- Current setup stores files locally (will be lost on container restart)

### Health Check Failures
- Ensure port binding is correct (`$PORT` environment variable)
- Check logs for startup errors
- Verify all dependencies are in `requirements.txt`

---

## Recommended: Render.com Free Tier

For a quick start with zero cost:
1. Push code to GitHub ✓ (you've already done this)
2. Sign up at Render.com
3. Create Web Service from your GitHub repo
4. Set root directory to `backend`
5. Add environment variables
6. Deploy!

Your backend will be at: `https://skinalyze-backend.onrender.com`

**Note**: Free tier spins down after inactivity (first request may be slow).
