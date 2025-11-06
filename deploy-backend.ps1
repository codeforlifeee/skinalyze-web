# SkinAlyze Backend Deployment Helper for Windows
# Run this in PowerShell

Write-Host "╔════════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║   🚀 SKINALYZE BACKEND DEPLOYMENT HELPER                     ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Check if git repo exists
if (Test-Path ".git") {
    Write-Host "✅ Git repository found" -ForegroundColor Green
} else {
    Write-Host "❌ Not a git repository" -ForegroundColor Red
    exit
}

# Check for uncommitted changes
$status = git status --short
if ($status) {
    Write-Host "⚠️  You have uncommitted changes" -ForegroundColor Yellow
    Write-Host "📦 Committing changes..." -ForegroundColor Yellow
    git add .
    git commit -m "Deploy backend to production"
}

# Push to GitHub
Write-Host "📤 Pushing to GitHub..." -ForegroundColor Cyan
git push origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Successfully pushed to GitHub!" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to push to GitHub" -ForegroundColor Red
    exit
}

Write-Host ""
Write-Host "╔════════════════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║   ✅ CODE IS READY TO DEPLOY!                                ║" -ForegroundColor Green
Write-Host "╚════════════════════════════════════════════════════════════════╝" -ForegroundColor Green
Write-Host ""
Write-Host "📋 NEXT STEPS:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Open Render Dashboard:" -ForegroundColor White
Write-Host "   https://dashboard.render.com" -ForegroundColor Yellow
Write-Host ""
Write-Host "2. Click: New + → Web Service" -ForegroundColor White
Write-Host ""
Write-Host "3. Connect GitHub repo: codeforlifeee/skinalyze-web" -ForegroundColor White
Write-Host ""
Write-Host "4. Configure:" -ForegroundColor White
Write-Host "   • Name: skinalyze-backend" -ForegroundColor Gray
Write-Host "   • Root Directory: backend" -ForegroundColor Gray
Write-Host "   • Environment: Docker" -ForegroundColor Gray
Write-Host "   • Plan: Free" -ForegroundColor Gray
Write-Host ""
Write-Host "5. Add Environment Variables:" -ForegroundColor White
Write-Host "   • AUTH0_DOMAIN=your-domain.auth0.com" -ForegroundColor Gray
Write-Host "   • AUTH0_API_AUDIENCE=https://your-api-audience" -ForegroundColor Gray
Write-Host "   • SECRET_KEY=$(python -c 'import secrets; print(secrets.token_urlsafe(32))' 2>$null)" -ForegroundColor Gray
Write-Host "   • DEBUG=False" -ForegroundColor Gray
Write-Host "   • CORS_ORIGINS=https://skinalyze-web.vercel.app" -ForegroundColor Gray
Write-Host ""
Write-Host "6. Create Service & Wait for Deployment" -ForegroundColor White
Write-Host ""
Write-Host "7. Update Frontend on Vercel:" -ForegroundColor White
Write-Host "   VITE_API_BASE_URL=<your-render-backend-url>" -ForegroundColor Gray
Write-Host ""
Write-Host "📖 Full guide: DEPLOY_NOW.md" -ForegroundColor Cyan
Write-Host ""
Write-Host "🎉 Good luck with your deployment!" -ForegroundColor Green
Write-Host ""

# Offer to open browser
$response = Read-Host "Would you like to open Render Dashboard now? (y/n)"
if ($response -eq "y" -or $response -eq "Y") {
    Start-Process "https://dashboard.render.com"
    Write-Host "🌐 Opening Render Dashboard..." -ForegroundColor Cyan
}
