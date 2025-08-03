# 🚀 VERCEL DEPLOYMENT GUIDE
## Deploy Your "Catch the Falling Items" Game in 3 Minutes

### 📋 Prerequisites
- A web browser
- The game files (already created!)

### 🎯 Step-by-Step Deployment

#### Method 1: Drag & Drop (Easiest)

1. **Visit Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Sign Up" or "Login" (free account)

2. **Create New Project**
   - Click "New Project" or "Deploy" button
   - You'll see a deployment area

3. **Upload Your Game**
   - **Option A**: Drag the entire game folder directly into the browser
   - **Option B**: Create a ZIP file of all game files and drag it in
   - **Option C**: Click "browse to upload" and select all files

4. **Deploy**
   - Vercel will automatically detect it's a static site
   - Click "Deploy" button
   - Wait 30-60 seconds for deployment to complete

5. **Get Your URL**
   - You'll receive a live URL like: `your-game-name.vercel.app`
   - Share this URL with anyone to play your game!

#### Method 2: GitHub Integration (Advanced)

1. **Upload to GitHub**
   - Create a new repository on GitHub
   - Upload all game files to the repository

2. **Connect to Vercel**
   - In Vercel, click "Import Git Repository"
   - Select your GitHub repository
   - Click "Deploy"

### ✅ Verification Steps

After deployment, test these features:

- [ ] Game loads without errors
- [ ] Start screen appears with "Start Game" button
- [ ] Arrow keys control the basket
- [ ] Apples and bombs fall from the top
- [ ] Score increases when catching apples
- [ ] Score decreases when catching bombs
- [ ] Timer counts down from 60 seconds
- [ ] Game over screen appears after 60 seconds
- [ ] "Play Again" button restarts the game
- [ ] Game works on mobile devices (touch controls)

### 🔧 Troubleshooting

**Game doesn't load?**
- Check that `index.html` is in the root directory
- Ensure all files were uploaded correctly

**Arrow keys don't work?**
- Click on the game canvas area to focus it
- Try refreshing the page

**Mobile touch doesn't work?**
- Ensure you're touching the game canvas area
- Try landscape mode for better experience

**Deployment failed?**
- Make sure you have all required files: `index.html`, `style.css`, `game.js`
- Check that file names match exactly (case-sensitive)

### 📞 Support

If you encounter issues:
1. Check the Vercel deployment logs in your dashboard
2. Ensure all file paths are correct in the HTML
3. Verify browser console for any JavaScript errors

### 🎮 Sharing Your Game

Once deployed, you can:
- Share the URL on social media
- Embed it in websites using an iframe
- Send the link to friends and family
- Add it to your portfolio

**Your game is now live and playable worldwide! 🌍**