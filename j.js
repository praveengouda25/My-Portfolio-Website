const toggleBtn = document.getElementById('theme-toggle');
toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        toggleBtn.textContent = "☀️"; // Light mode icon
    } else {
        toggleBtn.textContent = "🌙"; // Dark mode icon
    }
});

// Particle Animation
const canvas = document.createElement('canvas');
canvas.id = 'particle-canvas';
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const particlesArray = [];
const particleCount = 100;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.size > 0.2) this.size -= 0.01;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw() {
        const particleColor = getComputedStyle(document.documentElement).getPropertyValue('--particle-color').trim();
        ctx.fillStyle = particleColor;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particlesArray.length = 0;
    for (let i = 0; i < particleCount; i++) {
        particlesArray.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();

        for (let j = i; j < particlesArray.length; j++) {
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 100) {
                const particleColor = getComputedStyle(document.documentElement).getPropertyValue('--particle-color').trim();
                ctx.beginPath();
                ctx.strokeStyle = particleColor;
                ctx.lineWidth = 0.2;
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                ctx.stroke();
            }
        }

        if (particlesArray[i].size <= 0.2) {
            particlesArray.splice(i, 1);
            i--;
            particlesArray.push(new Particle());
        }
    }
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

// Reinitialize particles on theme change to reset positions
toggleBtn.addEventListener('click', initParticles);

// Initialize AOS with smoother animation
AOS.init({
    duration: 1000,
    easing: 'ease-in-out-back',
    once: false, // Allow animations to replay on scroll
    mirror: true, // Animate on scroll up and down
    anchorPlacement: 'top-bottom',
    disable: '.slider-image'
});

// Preload images to avoid loading delays
const images = document.querySelectorAll('.slider-image');
images.forEach(img => {
    const src = img.getAttribute('src');
    const preloadImg = new Image();
    preloadImg.src = src;
});

// Initialize Typed.js for typing animation and sync with image slider

const typed = new Typed('#typed-text', {
    strings: [
        "AI Engineer",
        "Software Engineer",
        "Data Scientist",
        "Web Developer",
        "Data Analyst",
        "Prompt Engineer",
        "Database Engineer",
        "Machine Learning Engineer",
        "Deep Learning Engineer",
        "Gen AI Engineer",
        "Frontend Developer"
    ],
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 2000,
    loop: true,
    preStringTyped: (arrayPos, self) => {
        const currentText = self.strings[arrayPos];
        images.forEach(img => {
            img.classList.remove('active');
            if (img.getAttribute('data-domain') === currentText) {
                img.classList.add('active');
            }
        });
    }
});

// Set initial image
images[0].classList.add('active');

// Smooth scrolling for nav links
document.querySelectorAll('.nav-links, .footer-link').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// Mobile hamburger toggle
const hamburgerBtn = document.querySelector('.hamburger-btn');
const mobileNav = document.querySelector('.mobile-nav');

hamburgerBtn.addEventListener('click', () => {
    hamburgerBtn.classList.toggle('active');
    if (mobileNav.style.display === 'flex') {
        mobileNav.style.display = 'none';
    } else {
        mobileNav.style.display = 'flex';
    }
});

// Smooth scroll on mobile nav links
mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileNav.style.display = 'none';
        hamburgerBtn.classList.remove('active');
    });
});


// Popup functionality for projects and experiences
// const theoryButtons = document.querySelectorAll('.theory-button');
// const experienceButtons = document.querySelectorAll('.experience-button');
// const popup = document.getElementById('project-popup');
// const popupDescription = document.getElementById('popup-description');
// const closePopup = document.querySelector('.popup-close');

// theoryButtons.forEach(button => {
//     button.addEventListener('click', () => {
//         popupDescription.textContent = button.getAttribute('data-description');
//         popup.style.display = 'flex';
//     });
// });

// experienceButtons.forEach(button => {
//     button.addEventListener('click', () => {
//         popupDescription.textContent = button.getAttribute('data-description');
//         popup.style.display = 'flex';
//     });
// });

// closePopup.addEventListener('click', () => {
//     popup.style.display = 'none';
// });

// window.addEventListener('click', (e) => {
//     if (e.target === popup) {
//         popup.style.display = 'none';
//     }
// });
const theoryButtons = document.querySelectorAll('.theory-button');
const experienceButtons = document.querySelectorAll('.experience-button');
const popup = document.getElementById('project-popup');
const popupContent = document.querySelector('.popup-content');

theoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        const aim = button.getAttribute('data-aim');
        const existing = button.getAttribute('data-existing');
        const proposed = button.getAttribute('data-proposed');
        const tools = button.getAttribute('data-tools').split(', ').map(tool => `<span>${tool}</span>`).join('');

        popupContent.innerHTML = `
            <span class="popup-close">&times;</span>
            <h3>Project Details</h3>
            <div>
                <h4>Project Aim</h4>
                <p>${aim}</p>
            </div>
            <div>
                <h4>Existing System</h4>
                <p>${existing}</p>
            </div>
            <div>
                <h4>Proposed System</h4>
                <p>${proposed}</p>
            </div>
            <div>
                <h4>Skills/Tools Used</h4>
                <div class="popup-tools">${tools}</div>
            </div>
        `;

        popup.style.display = 'flex';

        document.querySelector('.popup-close').addEventListener('click', () => {
            popup.style.display = 'none';
        });
    });
});

experienceButtons.forEach(button => {
    button.addEventListener('click', () => {
        const role = button.getAttribute('data-role');
        const contributions = button.getAttribute('data-contributions');
        const skills = button.getAttribute('data-skills').split(', ').map(skill => `<span>${skill}</span>`).join('');
        const duration = button.getAttribute('data-duration');
        const location = button.getAttribute('data-location');
        const workingType = button.getAttribute('data-working-type');

        popupContent.innerHTML = `
            <span class="popup-close">&times;</span>
            <h3>Experience Details</h3>
            <div>
                <h4>Role</h4>
                <p>${role}</p>
            </div>
            <div>
                <h4>Contributions</h4>
                <p>${contributions}</p>
            </div>
            <div>
                <h4>Skills/Tools Used</h4>
                <div class="popup-tools">${skills}</div>
            </div>
            <div>
                <h4>Duration</h4>
                <p>${duration}</p>
            </div>
            <div>
                <h4>Location</h4>
                <p>${location}</p>
            </div>
            <div>
                <h4>Working Type</h4>
                <p>${workingType}</p>
            </div>
        `;

        popup.style.display = 'flex';

        document.querySelector('.popup-close').addEventListener('click', () => {
            popup.style.display = 'none';
        });
    });
});

popup.addEventListener('click', (e) => {
    if (e.target === popup) {
        popup.style.display = 'none';
    }
});