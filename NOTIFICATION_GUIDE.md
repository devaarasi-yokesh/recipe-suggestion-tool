# Notification Feature Guide

## Overview
The Recipe Suggestion Tool now includes a comprehensive notification system that sends daily recipe reminders at your specified time. This feature helps you stay on track with your meal planning by reminding you about the day's scheduled recipe.

## Features

### 🕐 Daily Recipe Reminders
- Get notified about today's recipe at your preferred time
- Customizable notification time (default: 11:00 AM)
- Select which days of the week to receive notifications
- Browser-based notifications that work even when the app is closed

### ⚙️ Easy Configuration
- Toggle notifications on/off
- Set custom notification time
- Choose specific days for notifications
- Test notifications to ensure they work
- Visual indicator when notifications are enabled

### 🔔 Smart Notifications
- Only shows notifications when you have a recipe scheduled for that day
- Click the notification to open the weekly plan
- Auto-dismisses after 30 seconds
- Requires user interaction to close

## How to Use

### 1. Enable Notifications
1. Click the "Notifications" button in the top navigation bar
2. Toggle the "Daily Recipe Reminders" switch to ON
3. Grant browser permission when prompted
4. Set your preferred notification time
5. Select which days you want notifications
6. Click "Save"

### 2. Test Notifications
1. Open the notification settings
2. Click "Send Test Notification" to verify everything works
3. You should see a test notification appear

### 3. Daily Usage
- Once configured, you'll receive notifications automatically
- Notifications will show the recipe name scheduled for that day
- Click the notification to view your weekly plan
- The notification will auto-dismiss after 30 seconds

## Browser Requirements

### Supported Browsers
- Chrome (recommended)
- Firefox
- Safari
- Edge

### Requirements
- HTTPS connection (required for notifications)
- Browser notification permissions enabled
- Modern browser with Notification API support

## Troubleshooting

### Notifications Not Working?
1. **Check Browser Permissions**
   - Click the lock icon in your browser's address bar
   - Ensure notifications are set to "Allow"

2. **Check Notification Settings**
   - Verify notifications are enabled in the app
   - Confirm the time and days are set correctly

3. **Test Notifications**
   - Use the "Send Test Notification" button
   - If test fails, check browser permissions

4. **Browser-Specific Issues**
   - **Chrome**: Check chrome://settings/content/notifications
   - **Firefox**: Check about:preferences#privacy > Permissions
   - **Safari**: Check Safari > Preferences > Websites > Notifications

### Common Issues
- **Notifications blocked**: Enable in browser settings
- **Wrong time**: Check your system clock and timezone
- **No recipe shown**: Ensure you have a weekly plan generated
- **Notifications stop working**: Refresh the page or restart the browser

## Technical Details

### How It Works
1. The notification service runs in the background
2. Checks every minute if it's time to show a notification
3. Reads the current weekly plan from localStorage
4. Shows notification with today's recipe if scheduled
5. Handles user interaction and navigation

### Data Storage
- Notification settings are stored in localStorage
- Settings persist between browser sessions
- No server-side storage required

### Security
- Uses browser's built-in Notification API
- No external dependencies
- Respects user privacy and permissions

## Deployment with Vercel

### Updating Your Existing Deployment

Since you already have your app deployed on Vercel, here's how to update it with the new notification feature:

#### Method 1: Automatic Deployment (Recommended)
1. **Push to Git Repository**
   ```bash
   git add .
   git commit -m "Add notification feature for daily recipe reminders"
   git push origin main
   ```
   
2. **Vercel Auto-Deploy**
   - Vercel will automatically detect the changes
   - Build and deploy the updated version
   - Your app will be updated with the notification feature

#### Method 2: Manual Deployment
1. **Build Locally**
   ```bash
   npm run build
   ```
   
2. **Deploy to Vercel**
   ```bash
   # If you have Vercel CLI installed
   vercel --prod
   
   # Or drag and drop the dist folder to Vercel dashboard
   ```

### Important Notes for Vercel Deployment

#### HTTPS Requirement
- Notifications require HTTPS to work
- Vercel provides HTTPS by default
- No additional configuration needed

#### Environment Variables
- No environment variables required for notifications
- All settings are stored client-side

#### Build Configuration
- The build process remains the same
- No additional build steps required
- TypeScript compilation handles all new features

### Post-Deployment Checklist

1. **Test the Feature**
   - Visit your deployed app
   - Enable notifications
   - Send a test notification
   - Verify it works correctly

2. **User Communication**
   - Inform users about the new feature
   - Provide instructions for enabling notifications
   - Share the troubleshooting guide if needed

3. **Monitor Usage**
   - Check Vercel analytics for any issues
   - Monitor for any console errors
   - Gather user feedback

## Development

### Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Testing Notifications Locally
1. Start the development server
2. Enable notifications in the app
3. Set notification time to current time + 1 minute
4. Wait for the notification to appear
5. Test clicking and interaction

### File Structure
```
src/
├── services/
│   └── NotificationService.ts    # Core notification logic
├── components/
│   └── NotificationSettings.tsx  # Settings UI component
├── App.tsx                       # Main app with notification initialization
└── index.css                     # Notification animations
```

## Support

If you encounter any issues with the notification feature:

1. Check the troubleshooting section above
2. Verify browser compatibility
3. Test with different browsers
4. Check browser console for errors
5. Ensure HTTPS is enabled

## Future Enhancements

Potential improvements for the notification system:

- **Push Notifications**: Server-side notifications for mobile
- **Custom Sounds**: Different notification sounds
- **Recipe Details**: Show ingredients or cooking time in notification
- **Smart Timing**: Suggest optimal cooking times based on recipe
- **Multiple Reminders**: Morning prep and evening cooking reminders
- **Integration**: Calendar integration for meal planning

---

**Note**: This notification feature works entirely client-side and doesn't require any backend services. All data is stored locally in the user's browser. 