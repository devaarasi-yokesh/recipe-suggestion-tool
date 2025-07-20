# 🚀 Quick Deployment Reference

## Essential Commands

### After creating GitHub repository:

```bash
# Replace YOUR_USERNAME with your actual GitHub username
git remote add origin https://github.com/YOUR_USERNAME/recipe-suggestion-tool.git
git branch -M main
git push -u origin main
```

### For future updates:

```bash
git add .
git commit -m "Your update description"
git push origin main
```

## 📋 Quick Checklist

- [ ] Create GitHub repository (don't initialize with README)
- [ ] Run the 3 commands above to connect and push
- [ ] Go to [vercel.com](https://vercel.com)
- [ ] Import your GitHub repository
- [ ] Deploy (Vercel will auto-detect settings)
- [ ] Test notifications on your live app

## 🔗 Important URLs

- **GitHub**: [github.com](https://github.com)
- **Vercel**: [vercel.com](https://vercel.com)
- **Your App**: Will be `https://recipe-suggestion-tool-xyz.vercel.app`

## ⚡ Quick Test

After deployment, test notifications:
1. Click "Notifications" in your app
2. Enable notifications
3. Set time to current time + 1 minute
4. Wait for notification to appear

---

**Need help?** Check `DEPLOYMENT_STEPS.md` for detailed instructions. 