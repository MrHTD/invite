// Function to handle resizing
function resize() {
    // Check if canvas exists to avoid errors
    if (!canvas) return;
    width = canvas.width = canvas.parentElement.offsetWidth;
    height = canvas.height = canvas.parentElement.offsetHeight;
}

// 1. Setup Canvas Variables
const canvas = document.getElementById('petals');
const ctx = canvas.getContext('2d');
let width, height;
let petals = [];

// 2. Petal Class
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
        ctx.save(); ctx.translate(this.x, this.y); ctx.rotate(this.rotation);
        ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
        ctx.beginPath();
        ctx.moveTo(0, 0); ctx.quadraticCurveTo(this.size / 2, -this.size, this.size, 0); ctx.quadraticCurveTo(this.size / 2, this.size / 2, 0, 0);
        ctx.fill(); ctx.restore();
    }
}

// 3. Fireflies Logic
// Fix: We define the count but we must use it in the loop
const isMobile = window.innerWidth < 768;
const fireflyCount = isMobile ? 15 : 40;

function createFireflies() {
    const container = document.getElementById('fireflies');
    // FIX: Use 'fireflyCount' variable, not the hardcoded number 40
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

// 4. Animation Loop
function animate() {
    if (!document.hidden) {
        ctx.clearRect(0, 0, width, height);
        petals.forEach(p => {
            p.update();
            p.draw();
        });
    }
    requestAnimationFrame(animate);
}

// 5. Initialize Everything ONCE
function init() {
    resize();
    for (let i = 0; i < 30; i++) petals.push(new Petal());
    animate();
}

// 7. Countdown Timer

const weddingDate = new Date("March 27, 2026 13:00:00").getTime();

const x = setInterval(function () {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const countdownElement = document.getElementById("countdown");

    if (distance < 0) {
        clearInterval(x);
        countdownElement.innerHTML = "We are married!";
    } else {
        countdownElement.innerHTML = `Remaining: ${days}d ${hours}h ${seconds}s`;
    }
}, 1000);

window.addEventListener('resize', resize);

// 6. Master Window Load
window.onload = () => {
    // Start animations
    document.querySelectorAll('.fade-in').forEach(el => el.classList.add('visible'));

    // CALL THESE ONLY HERE (Removed the duplicate calls at the bottom)
    init();
    createFireflies();

    // Auto-hide Welcome Screen
    setTimeout(() => {
        const screen = document.getElementById('welcome-screen');
        if (screen) {
            screen.classList.add('hidden-overlay');
        }
        const names = document.querySelector('h1.names');
        if (names) {
            names.classList.add('run-animation');
        }
    }, 3000);
};