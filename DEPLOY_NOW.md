# 🚀 Quick Deployment Guide for SkinAlyze Backend

## Your Backend is Ready to Deploy! 

Your frontend is at: **https://skinalyze-web.vercel.app/**

Now let's deploy your backend so they work together.

---

## 🎯 Fastest Way: Deploy to Render.com (5 minutes)

### Step 1: Push to GitHub ✅
```powershell
cd C:\Users\LENOVO\Desktop\skinalyze_\skinalyze
git add .
git commit -m "Prepare backend for deployment"
git push origin main
```

### Step 2: Deploy on Render

1. **Go to**: https://dashboard.render.com/
2. **Sign in** with your GitHub account
3. Click **"New +"** → **"Web Service"**
4. **Connect your repository**: `codeforlifeee/skinalyze-web`
5. **Configure the service**:

   | Setting | Value |
   |---------|-------|
   | Name | `skinalyze-backend` |
   | Root Directory | `backend` |
   | Environment | `Docker` |
   | Region | Oregon (or closest to you) |
   | Branch | `main` |
   | Plan | **Free** |

6. **Add Environment Variables** (click "Advanced" → "Add Environment Variable"):

   ```
   DATABASE_URL = <Leave blank for now, we'll add PostgreSQL next>
   AUTH0_DOMAIN = your-auth0-domain.auth0.com
   AUTH0_API_AUDIENCE = https://your-api-audience
   SECRET_KEY = generate-a-long-random-string-here
   DEBUG = False
   CORS_ORIGINS = https://skinalyze-web.vercel.app
   ```

7. Click **"Create Web Service"**

### Step 3: Add PostgreSQL Database

1. In Render dashboard, click **"New +"** → **"PostgreSQL"**
2. Configure:
   - Name: `skinalyze-db`
   - Region: Same as your web service
   - Plan: **Free**
3. Click **"Create Database"**
4. Once created, copy the **"Internal Database URL"**
5. Go back to your web service → **Environment** tab
6. Update `DATABASE_URL` with the copied URL

### Step 4: Wait for Deployment

- Render will build your Docker container (takes 5-10 minutes first time)
- Watch the logs for any errors
- Once deployed, you'll get a URL like: `https://skinalyze-backend.onrender.com`

### Step 5: Update Your Frontend

1. Go to: https://vercel.com/dashboard
2. Select your `skinalyze-web` project
3. Go to **Settings** → **Environment Variables**
4. Add or update:
   ```
   VITE_API_BASE_URL = https://skinalyze-backend.onrender.com
   ```
5. Go to **Deployments** tab → Click ⋯ → **Redeploy**

### Step 6: Test Your Deployment

1. Visit: `https://skinalyze-backend.onrender.com/health`
   - Should return: `{"status": "healthy"}`
2. Visit: `https://skinalyze-backend.onrender.com/`
   - Should return API info
3. Visit your frontend: `https://skinalyze-web.vercel.app/`
   - Should now connect to your backend!

---

## 🎉 You're Done!

Your full-stack app is now live:
- **Frontend**: https://skinalyze-web.vercel.app/
- **Backend**: https://skinalyze-backend.onrender.com

---

## ⚠️ Important Notes

### Free Tier Limitations
- **Render Free Tier** spins down after 15 minutes of inactivity
- First request after spin-down may take 30-60 seconds (cold start)
- Consider upgrading to Starter plan ($7/month) for always-on service

### Database Backups
- Free PostgreSQL database expires after 90 days
- Upgrade to paid plan for persistence

### File Uploads
- Uploaded files are stored in container (ephemeral)
- They'll be lost when container restarts
- For production, integrate cloud storage (AWS S3, Cloudinary)

---

## 🔧 Troubleshooting

### "502 Bad Gateway" or "Service Unavailable"
- Wait a few minutes for deployment to complete
- Check Render logs for errors
- Verify all environment variables are set

### CORS Errors in Browser
- Ensure `CORS_ORIGINS` includes `https://skinalyze-web.vercel.app`
- No trailing slash issues
- Check browser console for exact error

### Database Connection Error
- Verify `DATABASE_URL` is set correctly
- Use the **Internal Database URL** from Render
- Check database service is running

### Import Errors or Module Not Found
- Check `requirements.txt` includes all dependencies
- Rebuild service on Render

### Cold Start Issues (Free Tier)
- First request after inactivity takes time
- Upgrade to paid plan or use a cron job to ping your API

---

## 📚 Additional Resources

- [Full Deployment Guide](../docs/DEPLOYMENT.md)
- [Render Documentation](https://render.com/docs)
- [FastAPI Deployment](https://fastapi.tiangolo.com/deployment/)

---

## 💡 Alternative: Deploy to Railway.app

If you prefer Railway:

1. Go to: https://railway.app
2. Sign in with GitHub
3. Click **"New Project"** → **"Deploy from GitHub repo"**
4. Select your repository
5. Set root directory to `backend`
6. Add same environment variables
7. Add PostgreSQL plugin
8. Deploy!

Railway auto-detects Dockerfile and is very easy to use.

---

## Need Help?

If you encounter issues:
1. Check Render/Railway logs
2. Verify all environment variables
3. Test endpoints with Postman
4. Check browser console for errors

Good luck! 🚀
