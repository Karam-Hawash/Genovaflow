document.addEventListener('DOMContentLoaded', function() {
    // Reference to contact form and subscription elements
    const contactForm = document.getElementById('contact-form');
    const subscriptionOverlay = document.getElementById('subscription-overlay');
    const searchOverlay = document.getElementById('search-overlay');
    const subscribeBtn = document.getElementById('subscribe-btn');
    const closeSubscription = document.getElementById('close-subscription');
    const searchIcon = document.getElementById('search-icon');
    const closeSearch = document.getElementById('close-search');
    const emailInput = document.getElementById('email-input');
    const confirmSubscribe = document.getElementById('confirm-subscribe');

    // Form submission handler
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Basic validation
            if (!name || !email || !message) {
                showNotification('Please complete all fields', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Your message has been sent successfully!', 'success');
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Subscription overlay handlers
    if (subscribeBtn && subscriptionOverlay) {
        subscribeBtn.addEventListener('click', function() {
            subscriptionOverlay.classList.add('active');
            document.body.classList.add('overlay-open');
        });
    }
    
    if (closeSubscription && subscriptionOverlay) {
        closeSubscription.addEventListener('click', function() {
            subscriptionOverlay.classList.remove('active');
            document.body.classList.remove('overlay-open');
        });
    }
    
    // Email input validation for subscription
    if (emailInput && confirmSubscribe) {
        emailInput.addEventListener('input', function() {
            const email = emailInput.value.trim();
            const isValid = validateEmail(email);
            confirmSubscribe.disabled = !isValid;
        });
        
        confirmSubscribe.addEventListener('click', function() {
            const email = emailInput.value.trim();
            showNotification('Thanks for subscribing!', 'success');
            emailInput.value = '';
            confirmSubscribe.disabled = true;
            
            setTimeout(function() {
                subscriptionOverlay.classList.remove('active');
                document.body.classList.remove('overlay-open');
            }, 2000);
        });
    }
    
    // Search overlay handlers
    if (searchIcon && searchOverlay) {
        searchIcon.addEventListener('click', function() {
            searchOverlay.classList.add('active');
            document.body.classList.add('overlay-open');
            
            // Focus on search input
            const searchInput = document.getElementById('search-input');
            if (searchInput) {
                setTimeout(() => searchInput.focus(), 100);
            }
        });
    }
    
    if (closeSearch && searchOverlay) {
        closeSearch.addEventListener('click', function() {
            searchOverlay.classList.remove('active');
            document.body.classList.remove('overlay-open');
        });
    }
    
    // Close overlays when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === subscriptionOverlay) {
            subscriptionOverlay.classList.remove('active');
            document.body.classList.remove('overlay-open');
        }
        
        if (e.target === searchOverlay) {
            searchOverlay.classList.remove('active');
            document.body.classList.remove('overlay-open');
        }
    });
    
    // Email validation helper function
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    
    // Notification system
    function showNotification(message, type) {
        // Remove any existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Add to body
        document.body.appendChild(notification);
        
        // Show the notification
        setTimeout(() => notification.classList.add('show'), 10);
        
        // Remove after delay
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    // Add notification styles if they don't exist
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 20px;
                border-radius: 4px;
                color: white;
                font-weight: 500;
                z-index: 1000;
                opacity: 0;
                transform: translateY(-20px);
                transition: opacity 0.3s, transform 0.3s;
                max-width: 300px;
            }
            
            .notification.show {
                opacity: 1;
                transform: translateY(0);
            }
            
            .notification.success {
                background-color: #4CAF50;
            }
            
            .notification.error {
                background-color: #F44336;
            }
        `;
        document.head.appendChild(style);
    }
}); 