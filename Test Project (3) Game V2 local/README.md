# 🍎 Catch the Falling Items - Browser Game

A playful, cartoonish arcade game where you control a basket to catch falling apples and avoid bombs!

## 🎮 Game Features

- **Simple Controls**: Use arrow keys (← →) to move your basket
- **Scoring System**: 
  - 🍎 Catch apples = +10 points
  - 💣 Avoid bombs = -20 points if caught
- **Time Challenge**: 60-second time limit
- **Responsive Design**: Works on desktop and mobile devices
- **Cartoon Graphics**: Hand-drawn style sprites

## 🚀 Deployment Instructions

### Option 1: Vercel (Recommended)
1. Visit [vercel.com](https://vercel.com) and sign up/login
2. Click "New Project"
3. Drag and drop this entire folder OR upload as ZIP
4. Click "Deploy"
5. Your game will be live at the provided URL!

### Option 2: Netlify
1. Visit [netlify.com](https://netlify.com) and sign up/login
2. Drag and drop this folder into the deployment area
3. Your game will be deployed instantly!

### Option 3: Local Testing
1. Open terminal in this folder
2. Run: `python -m http.server 3000` (Python 3) or `python -m SimpleHTTPServer 3000` (Python 2)
3. Open browser to `http://localhost:3000`

## 📁 File Structure

```
/
├── index.html      # Main game HTML structure
├── style.css       # Game styling and responsive design
├── game.js         # Core game logic and mechanics
├── vercel.json     # Vercel deployment configuration
└── README.md       # This file
```

## 🎯 How to Play

1. Click "Start Game" to begin
2. Use ← → arrow keys to move the basket left and right
3. Catch falling apples (🍎) to gain 10 points each
4. Avoid falling bombs (💣) - they cost you 20 points!
5. Survive for 60 seconds and try to get the highest score
6. Click "Play Again" to restart

## 📱 Mobile Support

The game includes touch controls for mobile devices:
- Touch the left side of the screen to move left
- Touch the right side of the screen to move right

## ⚡ Performance

- **File Size**: Under 15KB total (extremely lightweight)
- **Load Time**: Sub-second on most connections
- **Browser Support**: Works on all modern browsers
- **Mobile Responsive**: Optimized for all screen sizes

## 🔧 Technical Details

- **Technology**: Pure HTML5, CSS3, and Vanilla JavaScript
- **Graphics**: Canvas-based rendering with custom sprite drawing
- **Dependencies**: None (completely self-contained)
- **Framework**: None (lightweight and fast)

## 🎨 Customization

The game is easily customizable by modifying the `GAME_CONFIG` object in `game.js`:

```javascript
const GAME_CONFIG = {
    // Adjust game duration, speeds, scoring, etc.
    game: {
        duration: 60000, // Game length in milliseconds
    },
    apple: {
        points: 10,      // Points for catching apples
        spawnRate: 0.02  // How often apples spawn
    },
    bomb: {
        points: -20,     // Points lost for catching bombs
        spawnRate: 0.008 // How often bombs spawn
    }
};
```

## 🏆 High Score Tips

1. Stay near the center of the screen for better coverage
2. Prioritize avoiding bombs over catching apples
3. Watch the falling patterns - items speed up as they fall
4. Use smooth movements rather than rapid key tapping

Enjoy the game! 🎮