// Animation System for Blog Posts

document.addEventListener('DOMContentLoaded', function() {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        // If user prefers reduced motion, simply show all elements without animation
        document.querySelectorAll('.animate-element, .staggered-children').forEach(el => {
            el.classList.add('animate-active');
        });
        return;
    }
    
    // Initial page load animation sequence
    setTimeout(() => {
        // Animate header elements first
        animateElement('.header .logo', 'from-top');
        animateElement('.header .main-nav', 'from-top', 200);
        animateElement('.header .header-icons', 'from-top', 300);
        
        // Then animate main content elements
        setTimeout(() => {
            // Blog title and description
            animateElement('.blog-title', 'from-left', 100);
            animateElement('.blog-description', 'from-left', 200);
            
            // Table of contents
            animateElement('.table-of-contents', 'from-right', 300);
            
            // Make table of contents items staggered
            document.querySelector('.table-of-contents ul').classList.add('staggered-children');
            setTimeout(() => {
                document.querySelector('.table-of-contents ul').classList.add('animate-active');
            }, 500);
            
            // Blog content sections
            const sectionElements = document.querySelectorAll('.blog-section');
            sectionElements.forEach((section, index) => {
                const delay = 400 + (index * 150);
                animateElement(section, 'from-bottom', delay);
            });
            
            // CTA Section - special animation with scale effect
            animateElement('.cta-section', 'from-center', 600);
            
            // Email subscription
            animateElement('.email-subscription-bar', 'from-bottom', 700);
            
            // Footer
            animateElement('.footer .footer-logo', 'from-bottom', 800);
            animateElement('.footer .footer-links', 'from-bottom', 900);
            animateElement('.footer .footer-bottom', 'from-bottom', 1000);
        }, 400);
        
    }, 100);
    
    // Function to handle the animation of individual elements
    function animateElement(selector, direction = 'from-bottom', delay = 0) {
        const elements = document.querySelectorAll(selector);
        
        elements.forEach(element => {
            // Add animation classes
            element.classList.add('animate-element');
            element.classList.add(direction);
            
            // Add delay if specified
            if (delay > 0) {
                element.style.transitionDelay = `${delay}ms`;
            }
            
            // Trigger animation after a small delay to ensure CSS has been applied
            setTimeout(() => {
                element.classList.add('animate-active');
            }, 10);
        });
    }
    
    // Handle animations for elements that enter viewport during scrolling
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // If it's a staggered children container
                if (element.classList.contains('staggered-children')) {
                    element.classList.add('animate-active');
                } 
                // Regular animated element
                else if (element.classList.contains('animate-element')) {
                    element.classList.add('animate-active');
                }
                
                // Unobserve after animation is triggered
                observer.unobserve(element);
            }
        });
    }, observerOptions);
    
    // Observe all elements with animation classes that aren't already activated
    document.querySelectorAll('.animate-element:not(.animate-active), .staggered-children:not(.animate-active)').forEach(element => {
        observer.observe(element);
    });
}); 