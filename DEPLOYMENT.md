# Recipe Suggestion Tool - Deployment Guide

This guide will help you deploy the Recipe Suggestion Tool to various platforms so you can access it from any device without running `npm run dev`.

## 🚀 Quick Deployment Options

### Option 1: Netlify (Recommended - Free)
1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Sign up/Login with GitHub
   - Click "New site from Git"
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `dist`
   - Click "Deploy site"

3. **Your app will be live at:** `https://your-app-name.netlify.app`

### Option 2: Vercel (Free)
1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/Login with GitHub
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect it's a Vite React app
   - Click "Deploy"

3. **Your app will be live at:** `https://your-app-name.vercel.app`

### Option 3: GitHub Pages (Free)
1. **Add GitHub Pages configuration to your repository**
2. **Build and deploy:**
   ```bash
   npm run build
   npm run deploy
   ```

### Option 4: Firebase Hosting (Free)
1. **Install Firebase CLI:**
   ```bash
   npm install -g firebase-tools
   ```

2. **Initialize Firebase:**
   ```bash
   firebase login
   firebase init hosting
   ```

3. **Build and deploy:**
   ```bash
   npm run build
   firebase deploy
   ```

## 📱 Mobile Access

Once deployed, you can:
- **Add to Home Screen** (iOS/Android) for app-like experience
- **Access from any browser** on mobile/tablet/desktop
- **Data persists** across devices using the same browser

## 🔧 Build Scripts

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "build": "tsc && vite build",
    "preview": "vite preview",
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

## 🌐 Environment Variables

Create a `.env` file for production settings:

```env
VITE_APP_TITLE=Recipe Suggestion Tool
VITE_APP_VERSION=1.0.0
```

## 📊 Data Persistence

The app uses **localStorage** for data persistence, which means:
- ✅ Data is saved locally in your browser
- ✅ No account creation required
- ✅ Works offline
- ⚠️ Data is device/browser specific
- ⚠️ Clearing browser data will remove your recipes

## 🔒 Security Considerations

- All data is stored locally (no server required)
- No personal data is transmitted
- No external API calls
- Safe for personal use

## 🛠️ Custom Domain (Optional)

After deployment, you can:
1. Purchase a domain (e.g., from Namecheap, GoDaddy)
2. Configure DNS settings to point to your deployment
3. Set up custom domain in your hosting platform

## 📈 Performance Optimization

The built app includes:
- ✅ Code splitting
- ✅ Tree shaking
- ✅ Minified assets
- ✅ Optimized images
- ✅ Service worker (PWA ready)

## 🔄 Auto-Deployment

Set up automatic deployments:
1. **Connect your GitHub repository** to your hosting platform
2. **Enable auto-deploy** on push to main branch
3. **Every code change** will automatically deploy

## 📱 PWA Features

The app is PWA-ready with:
- ✅ Offline support
- ✅ Add to home screen
- ✅ App-like experience
- ✅ Fast loading

## 🆘 Troubleshooting

### Build Issues
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Deployment Issues
- Check build logs in your hosting platform
- Ensure all dependencies are in `package.json`
- Verify build command and output directory

### Data Issues
- Data is stored in browser localStorage
- Different browsers/devices have separate data
- Export/import functionality can be added for data portability

## 📞 Support

If you encounter issues:
1. Check the build logs
2. Verify your deployment settings
3. Test locally with `npm run preview`
4. Check browser console for errors

---

**Happy Cooking! 🍳**

Your Recipe Suggestion Tool will be accessible from anywhere once deployed! 