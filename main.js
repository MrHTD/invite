function enterSite() {
    const screen = document.getElementById('welcome-screen');
    screen.classList.add('hidden-overlay');
}

window.onload = () => { document.querySelectorAll('.fade-in').forEach(el => el.classList.add('visible')); };

const canvas = document.getElementById('petals');
const ctx = canvas.getContext('2d');
let width, height;
let petals = [];

function resize() {
    width = canvas.width = canvas.parentElement.offsetWidth;
    height = canvas.height = canvas.parentElement.offsetHeight;
}

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

const isMobile = window.innerWidth < 768;
const fireflyCount = isMobile ? 15 : 40;

function createFireflies() {
    const container = document.getElementById('fireflies');
    for (let i = 0; i < 40; i++) {
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
createFireflies();

function init() {
    resize();
    for (let i = 0; i < 30; i++) petals.push(new Petal());
    animate();
}
function animate() {
    // Check if the user is looking at the tab
    if (!document.hidden) {
        ctx.clearRect(0, 0, width, height);
        petals.forEach(p => {
            p.update();
            p.draw();
        });
    }
    requestAnimationFrame(animate);
}

window.addEventListener('resize', resize);
init();