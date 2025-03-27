// Particle Animation
class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.color = '#F4931D';
        this.alpha = Math.random() * 0.5 + 0.1;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.alpha > 0.1) this.alpha -= 0.01;
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

// Canvas Setup
const canvas = document.querySelector('.particles');
const ctx = canvas.getContext('2d');
let particles = [];
let animationId;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Create Particles
function createParticles(e) {
    const mouseX = e.x;
    const mouseY = e.y;
    for (let i = 0; i < 5; i++) {
        particles.push(new Particle(mouseX, mouseY));
    }
}

// Animate Particles
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw(ctx);
        
        if (particles[i].alpha <= 0.1) {
            particles.splice(i, 1);
        }
    }
    
    animationId = requestAnimationFrame(animateParticles);
}

// Start Animation
animateParticles();

// Function to ensure mouse scroll indicator stays centered
function centerMouseScrollIndicator() {
    const heroSection = document.querySelector('.hero-section');
    const scrollIndicator = document.querySelector('.hero-scroll-indicator');
    
    if (heroSection && scrollIndicator) {
        // This ensures the indicator is correctly positioned relative to the hero section
        scrollIndicator.style.left = '45.8%';
        scrollIndicator.style.transform = 'translateX(-50%)';
    }
}

// Run on page load and whenever window is resized
window.addEventListener('load', centerMouseScrollIndicator);
window.addEventListener('resize', centerMouseScrollIndicator);

// Scroll Animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.vision-card, .stat-item, .ceo-image').forEach(el => {
    observer.observe(el);
});

// Parallax Effect - Only on desktop
const isDesktop = window.innerWidth > 1024;
if (isDesktop) {
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;
        
        gsap.to('.ceo-image', {
            duration: 1,
            rotateY: mouseX * 10,
            rotateX: -mouseY * 10,
            ease: 'power2.out'
        });
        
        gsap.to('.float-item', {
            duration: 1,
            x: mouseX * 50,
            y: mouseY * 50,
            ease: 'power2.out',
            stagger: 0.1
        });
    });
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// Mark active navigation link based on current page
const currentPath = window.location.pathname;
const navLinks = document.querySelectorAll('.nav-links .nav-link');

if (navLinks.length > 0) {
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (currentPath.endsWith(linkPath)) {
            link.classList.add('active');
        }
    });
}

// Stats Counter Animation
const stats = document.querySelectorAll('.stat-number');
stats.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-target'));
    let current = 0;
    const increment = target / 100;
    
    const updateCounter = () => {
        if (current < target) {
            current += increment;
            stat.textContent = Math.ceil(current);
            setTimeout(updateCounter, 10);
        } else {
            stat.textContent = target;
        }
    };
    
    const statObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            updateCounter();
            statObserver.unobserve(entries[0].target);
        }
    }, {
        threshold: 0.3
    });
    
    statObserver.observe(stat);
});

// Add hover effect for enlarged stats
const statItems = document.querySelectorAll('.enlarged-stats .stat-item');
statItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        gsap.to(item, {
            duration: 0.5,
            scale: 1.05,
            ease: 'power2.out'
        });
    });
    
    item.addEventListener('mouseleave', () => {
        gsap.to(item, {
            duration: 0.5,
            scale: 1,
            ease: 'power2.out'
        });
    });
});

// Header Scroll Effect - Modified to never hide the header
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Reset header styles to ensure visibility
    if (!header) return;
    
    // Ensure header is always visible regardless of scroll position
    header.style.visibility = 'visible';
    header.style.opacity = '1';
    
    // Only add shadow effect on scroll down
    if (currentScroll > 50) {
        header.classList.add('shadow');
    } else {
        header.classList.remove('shadow');
    }
    
    lastScroll = currentScroll;
});

// Ensure header is visible when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header');
    if (header) {
        header.style.visibility = 'visible';
        header.style.opacity = '1';
        
        // Also ensure logo is visible
        const logo = document.querySelector('.logo img');
        if (logo) {
            logo.style.visibility = 'visible';
            logo.style.display = 'block';
        }
    }
});

// Image Tilt Effect - Only on desktop
if (isDesktop && document.querySelector('.ceo-image')) {
    VanillaTilt.init(document.querySelector('.ceo-image'), {
        max: 10,
        speed: 400,
        glare: true,
        'max-glare': 0.3
    });
}

// Responsive Handling
function handleResize() {
    const width = window.innerWidth;
    
    // Disable certain effects on mobile
    if (width <= 768) {
        // Disable particles on mobile for better performance
        if (animationId) {
            cancelAnimationFrame(animationId);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles = [];
        }
        
        // Reset any desktop-specific styles
        if (document.querySelector('.ceo-image')) {
            gsap.set('.ceo-image', {
                rotateY: 0,
                rotateX: 0
            });
        }
        
        gsap.set('.float-item', {
            x: 0,
            y: 0
        });
    } else {
        // Re-enable particles on desktop
        if (!animationId) {
            animateParticles();
        }
    }
}

// Initial call and event listener for resize
handleResize();
window.addEventListener('resize', handleResize);

// Check for orientation change on mobile devices
window.addEventListener('orientationchange', () => {
    setTimeout(handleResize, 100);
}); 