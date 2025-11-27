// Define variables at the top, but DO NOT assign them yet
let canvas, ctx;
let width, height;
let petals = [];

// 1. Petal Class
class Petal {
    constructor() { this.reset(); }
    reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * -height;
        this.size = Math.random() * 15 + 2;
        this.speed = Math.random() * 0.8 + 0.2;
        this.opacity = Math.random() * 0.4 + 0.2;
        this.color = Math.random() > 0.6 ? '220, 20, 60' : (Math.random() > 0.5 ? '255, 182, 193' : '255, 255, 255');
        this.rotation = Math.random() * Math.PI * 2;
        this.rotSpeed = (Math.random() - 0.5) * 0.02;
    }
    update() {
        this.y += this.speed;
        this.rotation += this.rotSpeed;
        this.x += Math.sin(this.y * 0.005 + this.rotation) * 0.5;
        if (this.y > height) this.reset();
    }
    draw() {
        if (!ctx) return; // Safety check
        ctx.save(); ctx.translate(this.x, this.y); ctx.rotate(this.rotation);
        ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
        ctx.beginPath();
        ctx.moveTo(0, 0); ctx.quadraticCurveTo(this.size / 2, -this.size, this.size, 0); ctx.quadraticCurveTo(this.size / 2, this.size / 2, 0, 0);
        ctx.fill(); ctx.restore();
    }
}

// 2. Resize Function
function resize() {
    if (!canvas) return;
    width = canvas.width = canvas.parentElement.offsetWidth;
    height = canvas.height = canvas.parentElement.offsetHeight;
}

// 3. Animation Loop
function animate() {
    if (!ctx) return;

    // Only animate if tab is visible to save battery
    if (!document.hidden) {
        ctx.clearRect(0, 0, width, height);
        petals.forEach(p => {
            p.update();
            p.draw();
        });
    }
    requestAnimationFrame(animate);
}

// 4. Fireflies Logic
function createFireflies() {
    const container = document.getElementById('fireflies');
    if (!container) return; // Safety check

    const isMobile = window.innerWidth < 768;
    const fireflyCount = isMobile ? 15 : 40;

    for (let i = 0; i < fireflyCount; i++) {
        const div = document.createElement('div');
        div.classList.add('firefly');
        div.style.left = Math.random() * 100 + '%';
        div.style.top = Math.random() * 100 + '%';
        const size = Math.random() * 60 + 15;
        div.style.width = size + 'px'; div.style.height = size + 'px';
        div.style.animationDuration = (Math.random() * 15 + 10) + 's';
        div.style.animationDelay = Math.random() * 5 + 's';
        container.appendChild(div);
    }
}

// 5. MASTER INITIALIZATION (Runs only when page is fully loaded)
window.onload = () => {
    // A. Start Text Animations
    document.querySelectorAll('.fade-in').forEach(el => el.classList.add('visible'));

    // B. Setup Canvas (NOW IT IS SAFE)
    canvas = document.getElementById('petals');
    if (canvas) {
        ctx = canvas.getContext('2d');
        resize();

        // Create Petals
        petals = [];
        for (let i = 0; i < 30; i++) petals.push(new Petal());

        // Start Animation Loop
        animate();
    }

    // C. Setup Window Resize Listener
    window.addEventListener('resize', resize);

    // D. Start Fireflies
    createFireflies();

    setTimeout(() => {
        // 1. Hide Welcome Screen
        const screen = document.getElementById('welcome-screen');
        if (screen) {
            screen.classList.add('hidden-overlay');
        }

        // 2. TRIGGER THE NAME ANIMATION HERE
        const names = document.querySelector('h1.names');
        if (names) {
            names.classList.add('run-animation');
        }

    }, 3000); // 3 seconds wait time
};