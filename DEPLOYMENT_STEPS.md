# Complete Deployment Guide: Git Repository + Vercel

## ✅ Step 1: Git Repository Setup (COMPLETED)

Your local Git repository has been initialized and your first commit is ready!

## 🔄 Step 2: Create GitHub Repository

### Option A: Using GitHub Web Interface (Recommended)

1. **Go to GitHub.com**
   - Visit [github.com](https://github.com)
   - Sign in to your account

2. **Create New Repository**
   - Click the "+" icon in the top right
   - Select "New repository"

3. **Repository Settings**
   - **Repository name**: `recipe-suggestion-tool`
   - **Description**: `A comprehensive recipe planning and tracking tool with daily notifications`
   - **Visibility**: Choose Public or Private
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)

4. **Create Repository**
   - Click "Create repository"

5. **Copy Repository URL**
   - GitHub will show you the repository URL
   - Copy it (it will look like: `https://github.com/yourusername/recipe-suggestion-tool.git`)

### Option B: Using GitHub CLI (if installed)

```bash
gh repo create recipe-suggestion-tool --public --description "A comprehensive recipe planning and tracking tool with daily notifications"
```

## 🔗 Step 3: Connect Local Repository to GitHub

Replace `YOUR_USERNAME` with your actual GitHub username:

```bash
git remote add origin https://github.com/YOUR_USERNAME/recipe-suggestion-tool.git
git branch -M main
git push -u origin main
```

## 🚀 Step 4: Deploy to Vercel

### Option A: Connect GitHub Repository (Recommended)

1. **Go to Vercel.com**
   - Visit [vercel.com](https://vercel.com)
   - Sign in with your GitHub account

2. **Import Project**
   - Click "New Project"
   - Select "Import Git Repository"
   - Find and select your `recipe-suggestion-tool` repository

3. **Configure Project**
   - **Project Name**: `recipe-suggestion-tool` (or your preferred name)
   - **Framework Preset**: Vite (should auto-detect)
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run build` (should auto-detect)
   - **Output Directory**: `dist` (should auto-detect)
   - **Install Command**: `npm install` (should auto-detect)

4. **Environment Variables**
   - No environment variables needed for this project
   - Click "Deploy"

5. **Wait for Deployment**
   - Vercel will build and deploy your app
   - You'll get a URL like: `https://recipe-suggestion-tool-xyz.vercel.app`

### Option B: Manual Upload (Alternative)

1. **Build Locally**
   ```bash
   npm run build
   ```

2. **Upload to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Select "Upload"
   - Drag and drop the `dist` folder
   - Configure project settings
   - Deploy

## 🔧 Step 5: Configure Vercel Settings

### Domain Settings
1. **Go to Project Dashboard**
   - Click on your project in Vercel dashboard

2. **Custom Domain (Optional)**
   - Go to "Settings" → "Domains"
   - Add your custom domain if you have one

### Build Settings
1. **Verify Build Configuration**
   - Go to "Settings" → "General"
   - Ensure build settings are correct:
     - Build Command: `npm run build`
     - Output Directory: `dist`
     - Install Command: `npm install`

## 🧪 Step 6: Test Your Deployment

### Test the App
1. **Visit Your App**
   - Go to your Vercel URL
   - Test all features including notifications

2. **Test Notifications**
   - Click "Notifications" in the top navigation
   - Enable notifications
   - Set time to current time + 1 minute
   - Test notification functionality

3. **Test All Pages**
   - Dashboard
   - Weekly Plan
   - Recipe Library
   - Monthly Review

## 🔄 Step 7: Future Updates

### Making Changes and Deploying Updates

1. **Make Your Changes**
   ```bash
   # Edit your files
   # Test locally with: npm run dev
   ```

2. **Commit and Push**
   ```bash
   git add .
   git commit -m "Description of your changes"
   git push origin main
   ```

3. **Automatic Deployment**
   - Vercel will automatically detect the push
   - Build and deploy the updated version
   - Your app will be updated automatically

## 🛠 Troubleshooting

### Common Issues

#### Build Failures
- **Check Build Logs**: Go to Vercel dashboard → Project → Deployments → Click on failed deployment
- **Local Build Test**: Run `npm run build` locally to catch issues
- **Dependencies**: Ensure all dependencies are in `package.json`

#### Notification Issues
- **HTTPS Required**: Notifications only work on HTTPS (Vercel provides this)
- **Browser Permissions**: Users must allow notifications
- **Test Locally**: Test notifications in development first

#### Git Issues
- **Authentication**: Use GitHub CLI or personal access tokens
- **Repository Access**: Ensure you have write access to the repository

### Useful Commands

```bash
# Check Git status
git status

# Check remote repository
git remote -v

# View build logs locally
npm run build

# Test locally
npm run dev

# Check for issues
npm run lint
```

## 📱 Mobile Deployment

### PWA Features
Your app includes PWA features:
- **Manifest**: `public/manifest.json`
- **Service Worker**: Ready for offline functionality
- **Mobile Optimized**: Responsive design for all devices

### Mobile Testing
1. **Test on Mobile Devices**
   - Visit your Vercel URL on mobile
   - Test notifications on mobile browsers
   - Verify responsive design

2. **Add to Home Screen**
   - Users can add the app to their home screen
   - Works like a native app

## 🎯 Success Checklist

- [ ] GitHub repository created
- [ ] Local repository connected to GitHub
- [ ] Vercel project created
- [ ] App deployed successfully
- [ ] All features working (including notifications)
- [ ] Mobile testing completed
- [ ] Custom domain configured (optional)

## 📞 Support

If you encounter any issues:

1. **Check Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
2. **Check Build Logs**: Vercel dashboard → Deployments
3. **Test Locally**: Always test changes locally first
4. **GitHub Issues**: Check for similar issues on GitHub

---

**Your Recipe Suggestion Tool with notifications is now ready for deployment!** 🚀 