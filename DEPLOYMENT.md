# Deployment Guide

## Quick Deploy to Vercel (Recommended)

### Method 1: GitHub + Vercel (Easiest - 2 minutes)

1. **Initialize Git and push to GitHub:**
   ```bash
   cd /Users/kmanimaran/shirin
   git init
   git add .
   git commit -m "Initial commit - Customer Analytics Dashboard"

   # Create a GitHub repo (requires gh CLI)
   gh repo create shirin-analytics --public --source=. --push
   ```

2. **Deploy on Vercel:**
   - Visit [vercel.com/new](https://vercel.com/new)
   - Sign up/login with GitHub
   - Click "Import Project"
   - Select your `shirin-analytics` repository
   - Vercel auto-detects Next.js settings ✓
   - Click "Deploy"
   - **Done!** Your URL: `https://shirin-analytics.vercel.app`

### Method 2: Vercel CLI

1. **Authenticate:**
   ```bash
   npx vercel login
   ```

2. **Deploy:**
   ```bash
   npx vercel --prod
   ```

3. **Follow prompts:**
   - Set up and deploy? Yes
   - Which scope? Select your account
   - Link to existing project? No
   - Project name? shirin-analytics
   - Directory? ./
   - Override settings? No

4. **Get your URL** - displayed after deployment completes!

---

## Alternative Deployment Options

### Option 2: Netlify

1. **Via Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   netlify login
   netlify deploy --prod
   ```

2. **Via Netlify Web UI:**
   - Go to [netlify.com](https://netlify.com)
   - "Add new site" → "Import from Git"
   - Connect GitHub repository
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Deploy!

### Option 3: Railway

1. **Install Railway CLI:**
   ```bash
   npm install -g @railway/cli
   ```

2. **Deploy:**
   ```bash
   railway login
   railway init
   railway up
   ```

### Option 4: Render

1. **Via Web UI:**
   - Go to [render.com](https://render.com)
   - "New" → "Web Service"
   - Connect repository
   - Build: `npm run build`
   - Start: `npm start`
   - Deploy!

---

## Environment Variables

Currently, no environment variables are required as the dashboard uses static data. When integrating real data sources, add:

```bash
# Example for future integrations
DATABASE_URL=your_database_url
API_KEY=your_api_key
NEXTAUTH_SECRET=your_secret_key
```

Add these in your deployment platform's dashboard (Vercel → Settings → Environment Variables).

---

## Custom Domain (Optional)

### On Vercel:
1. Project Settings → Domains
2. Add your custom domain
3. Update DNS records as shown
4. Wait for SSL certificate (automatic)

---

## Deployment Checklist

- [ ] Code is pushed to GitHub
- [ ] Deployment platform account created
- [ ] Project imported/connected
- [ ] Build successful
- [ ] Public URL generated
- [ ] Dashboard loads correctly
- [ ] All 22 metrics displaying
- [ ] Integration TODO panel working
- [ ] Export functionality tested

---

## Troubleshooting

### Build Fails

**Issue**: "Module not found" or build errors

**Solution**:
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run build
```

### Deployment Timeout

**Issue**: Deployment takes too long

**Solution**: Increase build timeout in platform settings
- Vercel: Project Settings → General → Build & Development Settings
- Netlify: Site Settings → Build & Deploy → Build Settings

### 404 Errors

**Issue**: Pages return 404 after deployment

**Solution**: Ensure `output: 'standalone'` is NOT set in next.config.js (already correct in our setup)

---

## Performance Optimization

After deployment, monitor:
- Load time (target: < 2s)
- Time to Interactive (target: < 3s)
- Core Web Vitals

Use [PageSpeed Insights](https://pagespeed.web.dev/) to analyze.

---

## Continuous Deployment

Once set up, any push to your main branch will automatically deploy:

```bash
# Make changes
git add .
git commit -m "Update metrics data"
git push origin main
# Automatic deployment triggered!
```

---

## Cost

All recommended platforms offer free tiers:
- **Vercel**: Free (hobby plan) - unlimited deployments
- **Netlify**: Free - 300 build minutes/month
- **Railway**: $5 credit/month free
- **Render**: Free tier available

Our dashboard easily fits within free tier limits.

---

**Last Updated**: March 2, 2026
