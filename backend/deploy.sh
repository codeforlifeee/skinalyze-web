#!/bin/bash

# Quick Deploy to Render.com
# This script helps you deploy your backend to Render

echo "🚀 SkinAlyze Backend Deployment Helper"
echo "========================================"
echo ""

# Check if git repo is clean
if [[ -n $(git status -s) ]]; then
    echo "⚠️  You have uncommitted changes. Committing them now..."
    git add .
    git commit -m "Deploy backend to production"
fi

# Push to GitHub
echo "📤 Pushing to GitHub..."
git push origin main

echo ""
echo "✅ Code pushed to GitHub!"
echo ""
echo "📋 Next Steps:"
echo ""
echo "1. Go to https://dashboard.render.com"
echo "2. Click 'New +' → 'Web Service'"
echo "3. Connect your GitHub repo: codeforlifeee/skinalyze-web"
echo "4. Configure:"
echo "   - Name: skinalyze-backend"
echo "   - Root Directory: backend"
echo "   - Environment: Docker"
echo "   - Region: Choose closest to users"
echo "   - Plan: Free (or paid)"
echo ""
echo "5. Add Environment Variables:"
echo "   DATABASE_URL=<from PostgreSQL service>"
echo "   AUTH0_DOMAIN=your-domain.auth0.com"
echo "   AUTH0_API_AUDIENCE=https://your-api-audience"
echo "   SECRET_KEY=<generate random secure key>"
echo "   DEBUG=False"
echo "   CORS_ORIGINS=https://skinalyze-web.vercel.app"
echo ""
echo "6. Click 'Create Web Service'"
echo ""
echo "7. Once deployed, copy your backend URL (e.g., https://skinalyze-backend.onrender.com)"
echo ""
echo "8. Update your frontend on Vercel:"
echo "   - Go to Vercel project settings"
echo "   - Add environment variable: VITE_API_BASE_URL=<your-backend-url>"
echo "   - Redeploy frontend"
echo ""
echo "🎉 Your backend will be live!"
