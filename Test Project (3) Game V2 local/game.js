// Game Configuration
const GAME_CONFIG = {
    canvas: {
        width: 800,
        height: 600
    },
    player: {
        width: 80,
        height: 60,
        speed: 8,
        color: '#8B4513'
    },
    apple: {
        width: 30,
        height: 30,
        speed: 3,
        points: 10,
        color: '#FF0000',
        spawnRate: 0.02
    },
    bomb: {
        width: 25,
        height: 25,
        speed: 4,
        points: -20,
        color: '#000000',
        spawnRate: 0.008
    },
    game: {
        duration: 60000, // 60 seconds in milliseconds
        gravity: 0.1
    }
};

// Game State
class GameState {
    constructor() {
        this.reset();
    }
    
    reset() {
        this.score = 0;
        this.timeLeft = GAME_CONFIG.game.duration;
        this.gameRunning = false;
        this.gameStarted = false;
        this.lastTime = 0;
        this.items = [];
        this.player = {
            x: GAME_CONFIG.canvas.width / 2 - GAME_CONFIG.player.width / 2,
            y: GAME_CONFIG.canvas.height - GAME_CONFIG.player.height - 10,
            width: GAME_CONFIG.player.width,
            height: GAME_CONFIG.player.height
        };
        this.keys = {
            left: false,
            right: false
        };
    }
}

// Game Item Class
class GameItem {
    constructor(type, x, y) {
        this.type = type; // 'apple' or 'bomb'
        this.x = x;
        this.y = y;
        this.width = GAME_CONFIG[type].width;
        this.height = GAME_CONFIG[type].height;
        this.speed = GAME_CONFIG[type].speed;
        this.points = GAME_CONFIG[type].points;
        this.color = GAME_CONFIG[type].color;
        this.velocity = 0;
    }
    
    update(deltaTime) {
        this.velocity += GAME_CONFIG.game.gravity;
        this.y += this.speed + this.velocity;
    }
    
    draw(ctx) {
        if (this.type === 'apple') {
            this.drawApple(ctx);
        } else if (this.type === 'bomb') {
            this.drawBomb(ctx);
        }
    }
    
    drawApple(ctx) {
        // Apple body
        ctx.fillStyle = '#FF4444';
        ctx.fillRect(this.x, this.y + 5, this.width, this.height - 5);
        
        // Apple highlight
        ctx.fillStyle = '#FF6666';
        ctx.fillRect(this.x + 5, this.y + 8, this.width - 15, this.height - 15);
        
        // Apple stem
        ctx.fillStyle = '#4B2C20';
        ctx.fillRect(this.x + this.width/2 - 2, this.y, 4, 8);
        
        // Apple leaf
        ctx.fillStyle = '#228B22';
        ctx.fillRect(this.x + this.width/2 + 2, this.y + 1, 6, 4);
    }
    
    drawBomb(ctx) {
        // Bomb body (circle)
        ctx.fillStyle = '#1a1a1a';
        ctx.beginPath();
        ctx.arc(this.x + this.width/2, this.y + this.height/2, this.width/2, 0, Math.PI * 2);
        ctx.fill();
        
        // Bomb highlight
        ctx.fillStyle = '#333333';
        ctx.beginPath();
        ctx.arc(this.x + this.width/2 - 3, this.y + this.height/2 - 3, this.width/4, 0, Math.PI * 2);
        ctx.fill();
        
        // Fuse
        ctx.strokeStyle = '#8B4513';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(this.x + this.width/2, this.y);
        ctx.lineTo(this.x + this.width/2 + 5, this.y - 8);
        ctx.stroke();
        
        // Spark
        ctx.fillStyle = '#FF4444';
        ctx.beginPath();
        ctx.arc(this.x + this.width/2 + 5, this.y - 8, 2, 0, Math.PI * 2);
        ctx.fill();
    }
    
    isOffScreen() {
        return this.y > GAME_CONFIG.canvas.height;
    }
    
    collidesWith(player) {
        return this.x < player.x + player.width &&
               this.x + this.width > player.x &&
               this.y < player.y + player.height &&
               this.y + this.height > player.y;
    }
}

// Main Game Class
class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.state = new GameState();
        
        this.scoreElement = document.getElementById('score');
        this.timerElement = document.getElementById('timer');
        this.finalScoreElement = document.getElementById('finalScore');
        this.startScreen = document.getElementById('startScreen');
        this.gameOverScreen = document.getElementById('gameOverScreen');
        this.startBtn = document.getElementById('startBtn');
        this.restartBtn = document.getElementById('restartBtn');
        
        this.setupEventListeners();
        this.adjustCanvasSize();
        this.gameLoop();
    }
    
    setupEventListeners() {
        // Keyboard events
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
        document.addEventListener('keyup', (e) => this.handleKeyUp(e));
        
        // Button events
        this.startBtn.addEventListener('click', () => this.startGame());
        this.restartBtn.addEventListener('click', () => this.restartGame());
        
        // Window resize
        window.addEventListener('resize', () => this.adjustCanvasSize());
        
        // Touch events for mobile
        this.canvas.addEventListener('touchstart', (e) => this.handleTouch(e));
        this.canvas.addEventListener('touchmove', (e) => this.handleTouch(e));
    }
    
    adjustCanvasSize() {
        const container = this.canvas.parentElement;
        const maxWidth = Math.min(container.clientWidth - 40, GAME_CONFIG.canvas.width);
        const scale = maxWidth / GAME_CONFIG.canvas.width;
        
        this.canvas.style.width = maxWidth + 'px';
        this.canvas.style.height = (GAME_CONFIG.canvas.height * scale) + 'px';
    }
    
    handleKeyDown(e) {
        if (!this.state.gameRunning) return;
        
        switch(e.code) {
            case 'ArrowLeft':
                this.state.keys.left = true;
                e.preventDefault();
                break;
            case 'ArrowRight':
                this.state.keys.right = true;
                e.preventDefault();
                break;
        }
    }
    
    handleKeyUp(e) {
        switch(e.code) {
            case 'ArrowLeft':
                this.state.keys.left = false;
                e.preventDefault();
                break;
            case 'ArrowRight':
                this.state.keys.right = false;
                e.preventDefault();
                break;
        }
    }
    
    handleTouch(e) {
        if (!this.state.gameRunning) return;
        
        e.preventDefault();
        const rect = this.canvas.getBoundingClientRect();
        const touch = e.touches[0];
        const x = (touch.clientX - rect.left) * (GAME_CONFIG.canvas.width / rect.width);
        
        // Move player towards touch position
        const playerCenter = this.state.player.x + this.state.player.width / 2;
        if (x < playerCenter) {
            this.state.keys.left = true;
            this.state.keys.right = false;
        } else {
            this.state.keys.right = true;
            this.state.keys.left = false;
        }
    }
    
    startGame() {
        this.state.reset();
        this.state.gameRunning = true;
        this.state.gameStarted = true;
        this.startScreen.classList.add('hidden');
        this.gameOverScreen.classList.add('hidden');
    }
    
    restartGame() {
        this.startGame();
    }
    
    endGame() {
        this.state.gameRunning = false;
        this.finalScoreElement.textContent = this.state.score;
        this.gameOverScreen.classList.remove('hidden');
        
        // Stop touch movement
        this.state.keys.left = false;
        this.state.keys.right = false;
    }
    
    updatePlayer(deltaTime) {
        // Handle player movement
        if (this.state.keys.left && this.state.player.x > 0) {
            this.state.player.x -= GAME_CONFIG.player.speed;
        }
        if (this.state.keys.right && this.state.player.x < GAME_CONFIG.canvas.width - this.state.player.width) {
            this.state.player.x += GAME_CONFIG.player.speed;
        }
    }
    
    spawnItems() {
        // Spawn apples
        if (Math.random() < GAME_CONFIG.apple.spawnRate) {
            const x = Math.random() * (GAME_CONFIG.canvas.width - GAME_CONFIG.apple.width);
            this.state.items.push(new GameItem('apple', x, -GAME_CONFIG.apple.height));
        }
        
        // Spawn bombs
        if (Math.random() < GAME_CONFIG.bomb.spawnRate) {
            const x = Math.random() * (GAME_CONFIG.canvas.width - GAME_CONFIG.bomb.width);
            this.state.items.push(new GameItem('bomb', x, -GAME_CONFIG.bomb.height));
        }
    }
    
    updateItems(deltaTime) {
        for (let i = this.state.items.length - 1; i >= 0; i--) {
            const item = this.state.items[i];
            item.update(deltaTime);
            
            // Check collision with player
            if (item.collidesWith(this.state.player)) {
                this.state.score += item.points;
                this.state.items.splice(i, 1);
                continue;
            }
            
            // Remove items that are off screen
            if (item.isOffScreen()) {
                this.state.items.splice(i, 1);
            }
        }
    }
    
    drawPlayer() {
        const player = this.state.player;
        
        // Basket base
        this.ctx.fillStyle = '#8B4513';
        this.ctx.fillRect(player.x, player.y + 30, player.width, 30);
        
        // Basket rim
        this.ctx.fillStyle = '#654321';
        this.ctx.fillRect(player.x - 5, player.y + 25, player.width + 10, 10);
        
        // Basket weave pattern
        this.ctx.fillStyle = '#A0522D';
        for (let i = 0; i < 4; i++) {
            this.ctx.fillRect(player.x + 10 + i * 15, player.y + 35, 8, 20);
        }
        
        // Basket handle
        this.ctx.strokeStyle = '#654321';
        this.ctx.lineWidth = 4;
        this.ctx.beginPath();
        this.ctx.arc(player.x + player.width/2, player.y + 20, 20, 0, Math.PI);
        this.ctx.stroke();
    }
    
    drawItems() {
        this.state.items.forEach(item => item.draw(this.ctx));
    }
    
    updateUI() {
        this.scoreElement.textContent = this.state.score;
        this.timerElement.textContent = Math.ceil(this.state.timeLeft / 1000);
    }
    
    gameLoop(currentTime = 0) {
        const deltaTime = currentTime - this.state.lastTime;
        this.state.lastTime = currentTime;
        
        // Clear canvas
        this.ctx.clearRect(0, 0, GAME_CONFIG.canvas.width, GAME_CONFIG.canvas.height);
        
        if (this.state.gameRunning) {
            // Update timer
            this.state.timeLeft -= deltaTime;
            
            // Check if time is up
            if (this.state.timeLeft <= 0) {
                this.endGame();
            } else {
                // Update game logic
                this.updatePlayer(deltaTime);
                this.spawnItems();
                this.updateItems(deltaTime);
                
                // Update UI
                this.updateUI();
            }
        }
        
        // Always draw game elements
        if (this.state.gameStarted) {
            this.drawPlayer();
            this.drawItems();
        }
        
        requestAnimationFrame((time) => this.gameLoop(time));
    }
}

// Initialize game when page loads
window.addEventListener('load', () => {
    new Game();
});