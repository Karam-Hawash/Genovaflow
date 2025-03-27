document.addEventListener("DOMContentLoaded", function() {
    // Mobile detection
    function isMobile() {
        return window.innerWidth <= 768;
    }

    // Get number of cards to show based on screen size - always show 2 cards
    function getCardsPerView() {
        return 2; // Always show 2 cards regardless of screen size
    }

    // Logo size adjustment for desktop
    function adjustLogoSize() {
        const logoImages = document.querySelectorAll('.logo-image img');
        const isDesktop = window.innerWidth >= 992;
        
        logoImages.forEach(img => {
            // Desktop scale is handled by CSS, but we add a class for any JavaScript effects
            if (isDesktop) {
                img.classList.add('desktop-scale');
            } else {
                img.classList.remove('desktop-scale');
            }
        });
    }
    
    // Initialize variables
    const carousel = document.querySelector('.carousel');
    const cards = document.querySelectorAll('.card');
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');
    const navDots = document.querySelectorAll('.nav-dot');
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mainNav = document.querySelector('.main-nav');
    const cardsContainer = document.querySelector('.cards-container');
    const descriptionText = document.querySelector('.description-text');
    
    let currentIndex = 0;
    let startX, moveX;
    let cardsPerView = getCardsPerView();
    let slideIncrement = 1; // Move just one card at a time
    
    // Handle window resize
    window.addEventListener('resize', function() {
        cardsPerView = getCardsPerView();
        updateCarousel();
        adjustLogoSize(); // Adjust logo size on window resize
    });
    
    // Initialize the logo size
    adjustLogoSize();
    
    // Hamburger menu toggle
    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', function() {
            this.classList.toggle('active');
            mainNav.classList.toggle('active');
        });
    }
    
    // Touch events for carousel
    if (carousel || cardsContainer) {
        const carouselElement = carousel || cardsContainer;
        
        carouselElement.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
        }, { passive: true });
        
        carouselElement.addEventListener('touchmove', function(e) {
            if (!startX) return;
            moveX = e.touches[0].clientX;
        }, { passive: true });
        
        carouselElement.addEventListener('touchend', function() {
            if (!startX || !moveX) return;
            
            let diffX = startX - moveX;
            if (Math.abs(diffX) > 50) { // Minimum swipe distance
                if (diffX > 0) {
                    // Swipe left - next slide (one card at a time)
                    if (currentIndex < cards.length - cardsPerView) {
                        currentIndex += slideIncrement;
                        updateCarousel();
                    }
                } else {
                    // Swipe right - previous slide (one card at a time)
                    if (currentIndex > 0) {
                        currentIndex -= slideIncrement;
                        updateCarousel();
                    }
                }
            }
            
            // Reset values
            startX = null;
            moveX = null;
        }, { passive: true });
    }
    
    // Navigation arrows - navigate one card at a time
    if (prevArrow) {
        prevArrow.addEventListener('click', function() {
            if (currentIndex > 0) {
                currentIndex -= slideIncrement;
                updateCarousel();
            }
        });
    }
    
    if (nextArrow) {
        nextArrow.addEventListener('click', function() {
            if (currentIndex < cards.length - cardsPerView) {
                currentIndex += slideIncrement;
                updateCarousel();
            }
        });
    }
    
    // Navigation dots
    if (navDots.length > 0) {
        navDots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                currentIndex = index;
                updateCarousel();
            });
        });
    }
    
    // Card hover effects - only for non-mobile
    if (!isMobile()) {
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                const cardTitle = this.querySelector('.card-title') || this.querySelector('.card-title-short');
                const cardDesc = this.querySelector('.card-description');
                
                if (cardTitle) cardTitle.style.transform = 'translateY(-10px)';
                if (cardDesc) {
                    cardDesc.style.transform = 'translateY(-10px)';
                    cardDesc.style.opacity = '1';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                const cardTitle = this.querySelector('.card-title') || this.querySelector('.card-title-short');
                const cardDesc = this.querySelector('.card-description');
                
                if (cardTitle) cardTitle.style.transform = 'translateY(0)';
                if (cardDesc) {
                    cardDesc.style.transform = 'translateY(0)';
                    cardDesc.style.opacity = '0';
                }
            });
        });
    } else {
        // For mobile, just show the title and description without hover
        cards.forEach(card => {
            const title = card.querySelector('.card-title') || card.querySelector('.card-title-short');
            const description = card.querySelector('.card-description');
            
            if (title) title.style.transform = 'translateY(-5px)';
            if (description) {
                description.style.transform = 'translateY(-5px)';
                description.style.opacity = '1';
            }
        });
    }
    
    // Update carousel position
    function updateCarousel() {
        const carouselElement = carousel || cardsContainer;
        if (!carouselElement || !cards.length) return;
        
        // Make sure we don't go beyond the bounds
        if (currentIndex < 0) currentIndex = 0;
        if (currentIndex > cards.length - cardsPerView) currentIndex = cards.length - cardsPerView;
        
        // Apply transforms
        const cardWidth = cards[0].offsetWidth;
        let gap = 20; // Default gap between cards
        
        // Adjust gap for smaller screens
        if (window.innerWidth <= 480) {
            gap = 10;
        }
        if (window.innerWidth <= 400) {
            gap = 5;
        }
        
        const offset = -(currentIndex * (cardWidth + gap));
        
        // Apply smooth transition
        carouselElement.style.transform = `translateX(${offset}px)`;
        
        // Update card visibility status and add animation classes
        cards.forEach((card, index) => {
            if (index >= currentIndex - 1 && index <= currentIndex + cardsPerView) {
                // Current and nearby cards - ensure visible
                card.style.visibility = 'visible';
                card.style.opacity = '1';
                
                // Add appropriate animation classes
                if (index >= currentIndex && index < currentIndex + cardsPerView) {
                    card.classList.add('active');
                } else {
                    card.classList.remove('active');
                }
            } else {
                // Further cards - can be hidden for performance
                card.style.visibility = 'hidden';
                card.style.opacity = '0';
                card.classList.remove('active');
            }
        });
        
        // Update active dot
        if (navDots.length > 0) {
            const activeDotIndex = Math.floor(currentIndex / slideIncrement);
            navDots.forEach((dot, index) => {
                if (index === activeDotIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
        
        // Update arrow states
        if (prevArrow) {
            prevArrow.classList.toggle('disabled', currentIndex === 0);
        }
        
        if (nextArrow) {
            nextArrow.classList.toggle('disabled', currentIndex >= cards.length - cardsPerView);
        }
        
        // Update page number if it exists
        const pageNumber = document.querySelector('.page-number');
        if (pageNumber) {
            // +1 because we want to display 1-based index to users
            let displayNumber = (currentIndex + 1).toString().padStart(2, '0');
            pageNumber.textContent = displayNumber;
        }
        
        // Update progress indicator if it exists
        const progressIndicator = document.querySelector('.progress-indicator');
        if (progressIndicator) {
            const progress = ((currentIndex) / (cards.length - cardsPerView)) * 100;
            progressIndicator.style.width = `${progress}%`;
        }
    }
    
    // Handle search and subscription functionality
    const searchIcon = document.getElementById('search-icon');
    const subscribeBtn = document.getElementById('subscribe-btn');
    const searchOverlay = document.getElementById('search-overlay');
    const subscriptionOverlay = document.getElementById('subscription-overlay');
    const closeSearchBtn = document.getElementById('close-search');
    const closeSubscriptionBtn = document.getElementById('close-subscription');
    
    if (searchIcon && searchOverlay) {
        searchIcon.addEventListener('click', function(e) {
            e.preventDefault();
            searchOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (closeSearchBtn && searchOverlay) {
        closeSearchBtn.addEventListener('click', function() {
            searchOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    if (subscribeBtn && subscriptionOverlay) {
        subscribeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            subscriptionOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (closeSubscriptionBtn && subscriptionOverlay) {
        closeSubscriptionBtn.addEventListener('click', function() {
            subscriptionOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Close overlays when clicking outside content
    document.addEventListener('click', function(e) {
        if (searchOverlay && e.target === searchOverlay) {
            searchOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        if (subscriptionOverlay && e.target === subscriptionOverlay) {
            subscriptionOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}); 