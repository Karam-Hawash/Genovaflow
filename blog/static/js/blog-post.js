document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const header = document.querySelector('.header');
    const progressContainer = document.getElementById('progress-container');
    const progressBar = document.getElementById('myBar');
    const searchToggle = document.getElementById('search-toggle');
    const searchOverlay = document.getElementById('search-overlay');
    const closeSearch = document.getElementById('close-search');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const searchResults = document.getElementById('search-results');
    const subscribeToggle = document.getElementById('subscribe-toggle');
    const subscriptionOverlay = document.getElementById('subscription-overlay');
    const closeSubscription = document.getElementById('close-subscription');
    const subscriptionForm = document.getElementById('subscription-form');
    
    // Sample blog post data for search
    const blogPosts = [
        {
            id: 1,
            title: 'GPT-4 Advances: Breaking New Ground in AI',
            category: 'AI Advancements',
            image: '../../static/images/gpt4-header.jpg',
            description: 'Explore the technical innovations and real-world applications of OpenAI\'s most advanced language model.',
            link: '../tech-innovations/gpt-4-advances.html'
        },
        {
            id: 2,
            title: 'Neural Networks: The Building Blocks of Modern AI',
            category: 'AI Fundamentals',
            image: '../../static/images/neural-networks.jpg',
            description: 'Discover how neural networks form the foundation of today\'s most advanced AI systems.',
            link: '../tech-innovations/neural-networks.html'
        },
        {
            id: 3,
            title: 'AI Ethics: Navigating the Moral Landscape',
            category: 'Ethics & Society',
            image: '../../static/images/ai-ethics.jpg',
            description: 'Examining the ethical challenges posed by advanced AI systems and frameworks for responsible innovation.',
            link: '../tech-innovations/ai-ethics.html'
        },
        {
            id: 4,
            title: 'Autonomous Systems: When AI Takes the Wheel',
            category: 'AI Applications',
            image: '../../static/images/ai-automation.jpg',
            description: 'How autonomous AI systems are transforming transportation, manufacturing, and beyond.',
            link: '../ai-tutorials/ai-automation-tools.html'
        },
        {
            id: 5,
            title: 'RAG: Enhancing AI with Retrieval-Augmented Generation',
            category: 'Tech Innovations',
            image: '../../static/images/rag-concept.jpg',
            description: 'How RAG systems combine language models with information retrieval for more accurate AI.',
            link: '../ai-tutorials/rag.html'
        },
        {
            id: 6,
            title: 'AI in Healthcare: Transforming Modern Medicine',
            category: 'AI in Industry',
            image: '../../static/images/ai-healthcare.jpg',
            description: 'How artificial intelligence is revolutionizing patient care, diagnosis, and medical research.',
            link: '../ai-in-industry/ai-in-healthcare.html'
        }
    ];
    
    // Initialize - safely check if elements exist before initializing
    if (header) initScrollEvents();
    if (searchToggle && searchOverlay) initSearchEvents();
    if (subscribeToggle && subscriptionOverlay) initSubscriptionEvents();
    setupShareButtons();
    initInlineSubscription();
    
    // Scroll Progress Bar
    function initScrollEvents() {
        window.addEventListener('scroll', function() {
            // Header shadow on scroll
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Update progress bar
            if (progressBar && progressContainer) {
                updateProgressBar();
            }
        });
    }
    
    function updateProgressBar() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + "%";
        
        // Debug - log info in console to help troubleshoot
        console.log(`Progress: ${scrolled.toFixed(2)}%, Height: ${height}, Scroll: ${winScroll}`);
    }
    
    // Search Functionality
    function initSearchEvents() {
        searchToggle.addEventListener('click', function(e) {
            e.preventDefault();
            openSearchOverlay();
            
            // Display suggested articles
            displaySearchResults(blogPosts, "Suggested Articles");
        });
        
        if (closeSearch) {
            closeSearch.addEventListener('click', closeSearchOverlay);
        }
        
        if (searchButton && searchInput) {
            searchButton.addEventListener('click', function() {
                performSearch();
            });
            
            searchInput.addEventListener('input', performSearch);
        }
        
        // Close overlay when clicking outside the container
        searchOverlay.addEventListener('click', function(e) {
            if (e.target === searchOverlay) {
                closeSearchOverlay();
            }
        });
    }
    
    function openSearchOverlay() {
        document.body.classList.add('overlay-open');
        searchOverlay.style.display = 'flex';
        setTimeout(() => {
            searchOverlay.classList.add('active');
            if (searchInput) searchInput.focus();
        }, 10);
    }
    
    function closeSearchOverlay() {
        searchOverlay.classList.remove('active');
        setTimeout(() => {
            searchOverlay.style.display = 'none';
            document.body.classList.remove('overlay-open');
        }, 300);
    }
    
    function performSearch() {
        if (!searchInput || !searchResults) return;
        
        const query = searchInput.value.trim().toLowerCase();
        
        if (query === '') {
            // If empty search, show suggested articles
            displaySearchResults(blogPosts, "Suggested Articles");
            return;
        }
        
        // Filter blog posts based on search query
        const results = blogPosts.filter(post => 
            post.title.toLowerCase().includes(query) || 
            post.category.toLowerCase().includes(query) ||
            post.description.toLowerCase().includes(query)
        );
        
        // Display search results
        const title = results.length > 0 ? `Search Results for "${query}"` : `No results found for "${query}"`;
        displaySearchResults(results, title);
    }
    
    function displaySearchResults(results, title) {
        if (!searchResults) return;
        
        // Clear previous results
        searchResults.innerHTML = '';
        
        // Add title
        const resultsHeader = document.createElement('h3');
        resultsHeader.textContent = title;
        searchResults.appendChild(resultsHeader);
        
        if (results.length === 0) {
            const noResults = document.createElement('p');
            noResults.className = 'no-results';
            noResults.textContent = 'Try different keywords or browse our suggested articles below.';
            searchResults.appendChild(noResults);
            return;
        }
        
        // Create results grid
        const resultsGrid = document.createElement('div');
        resultsGrid.className = 'search-results-grid';
        
        results.forEach(post => {
            const card = createSearchCard(post);
            resultsGrid.appendChild(card);
        });
        
        searchResults.appendChild(resultsGrid);
    }
    
    function createSearchCard(post) {
        const card = document.createElement('a');
        card.href = post.link;
        card.className = 'search-card';
        
        card.innerHTML = `
            <div class="search-card-img">
                <img src="${post.image}" alt="${post.title}">
            </div>
            <div class="search-card-content">
                <span class="search-card-category">${post.category}</span>
                <h3 class="search-card-title">${post.title}</h3>
                <p>${post.description}</p>
            </div>
        `;
        
        return card;
    }
    
    // Subscription Functionality
    function initSubscriptionEvents() {
        subscribeToggle.addEventListener('click', function(e) {
            e.preventDefault();
            openSubscriptionOverlay();
        });
        
        if (closeSubscription) {
            closeSubscription.addEventListener('click', closeSubscriptionOverlay);
        }
        
        // Close overlay when clicking outside the container
        if (subscriptionOverlay) {
            subscriptionOverlay.addEventListener('click', function(e) {
                if (e.target === subscriptionOverlay) {
                    closeSubscriptionOverlay();
                }
            });
        }
        
        if (subscriptionForm) {
            subscriptionForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const emailInput = subscriptionForm.querySelector('input[type="email"]');
                if (emailInput && emailInput.value.trim()) {
                    handleSubscription(emailInput.value.trim());
                }
            });
        }
        
        // Inline subscription form handler
        const inlineSubscriptionForm = document.querySelector('.subscription-form-inline');
        if (inlineSubscriptionForm) {
            const subscribeButton = inlineSubscriptionForm.querySelector('.subscribe-btn-inline');
            const emailInput = inlineSubscriptionForm.querySelector('input[type="email"]');
            
            if (subscribeButton && emailInput) {
                subscribeButton.addEventListener('click', function(e) {
                    e.preventDefault();
                    if (emailInput.value.trim()) {
                        handleInlineSubscription(emailInput.value.trim());
                    } else {
                        // Visual feedback for empty input
                        emailInput.classList.add('shake');
                        setTimeout(() => {
                            emailInput.classList.remove('shake');
                        }, 500);
                        emailInput.focus();
                    }
                });
            }
        }
    }
    
    function openSubscriptionOverlay() {
        if (!subscriptionOverlay) return;
        
        subscriptionOverlay.style.display = 'flex';
        setTimeout(() => {
            subscriptionOverlay.classList.add('overlay-visible');
            const container = document.querySelector('.subscription-container');
            if (container) container.classList.add('container-visible');
            
            if (subscriptionForm) {
                const emailInput = subscriptionForm.querySelector('input[type="email"]');
                if (emailInput) emailInput.focus();
            }
        }, 10);
        document.body.style.overflow = 'hidden';
    }
    
    function closeSubscriptionOverlay() {
        if (!subscriptionOverlay) return;
        
        subscriptionOverlay.classList.remove('overlay-visible');
        const container = document.querySelector('.subscription-container');
        if (container) container.classList.remove('container-visible');
        
        setTimeout(() => {
            subscriptionOverlay.style.display = 'none';
            document.body.style.overflow = '';
        }, 300);
    }
    
    function handleSubscription(email) {
        if (!subscriptionForm) return;
        
        // In a real application, this would send the email to a server
        console.log('Subscription request for email:', email);
        
        // Show success message
        const form = subscriptionForm;
        form.innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <div style="color: var(--accent-color); font-size: 3rem; margin-bottom: 1rem;">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h3>Thank You for Subscribing!</h3>
                <p>We've sent a confirmation email to <strong>${email}</strong></p>
            </div>
        `;
        
        // Close the overlay after a delay
        setTimeout(closeSubscriptionOverlay, 3000);
    }
    
    // Share Buttons
    function setupShareButtons() {
        const shareButtons = document.querySelectorAll('.share-button');
        
        shareButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                const url = encodeURIComponent(window.location.href);
                const title = encodeURIComponent(document.title);
                
                let shareUrl;
                if (button.classList.contains('x') || button.classList.contains('twitter') || button.querySelector('.fa-twitter')) {
                    shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
                } else if (button.classList.contains('facebook') || button.querySelector('.fa-facebook-f')) {
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                } else if (button.classList.contains('linkedin') || button.querySelector('.fa-linkedin-in')) {
                    shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
                } else if (button.classList.contains('reddit') || button.querySelector('.fa-reddit-alien')) {
                    shareUrl = `https://www.reddit.com/submit?url=${url}&title=${title}`;
                } else if (button.classList.contains('email')) {
                    shareUrl = `mailto:?subject=${title}&body=Check out this article: ${url}`;
                }
                
                if (shareUrl) {
                    window.open(shareUrl, '_blank', 'width=600,height=400');
                }
            });
        });
    }
    
    // Inline Subscription Functionality
    function initInlineSubscription() {
        const inlineSubscriptionForm = document.querySelector('.subscription-form-inline');
        if (inlineSubscriptionForm) {
            const subscribeButton = inlineSubscriptionForm.querySelector('.subscribe-btn-inline');
            const emailInput = inlineSubscriptionForm.querySelector('input[type="email"]');
            
            if (subscribeButton && emailInput) {
                subscribeButton.addEventListener('click', function(e) {
                    e.preventDefault();
                    if (emailInput.value.trim()) {
                        handleInlineSubscription(emailInput.value.trim());
                    } else {
                        // Add a gentle shake animation to indicate required field
                        emailInput.classList.add('shake');
                        setTimeout(() => {
                            emailInput.classList.remove('shake');
                        }, 500);
                        emailInput.focus();
                    }
                });
            }
        }
    }
    
    function handleInlineSubscription(email) {
        // In a real application, this would send the email to a server
        console.log('Inline subscription request for email:', email);
        
        // Show success message
        const formContainer = document.querySelector('.subscription-form-inline');
        if (!formContainer) return;
        
        const originalContent = formContainer.innerHTML;
        
        formContainer.innerHTML = `
            <div class="subscription-success">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" fill="#4CAF50"/>
                </svg>
                <span>Thank you! You're now subscribed.</span>
            </div>
        `;
        
        // Reset form after a delay
        setTimeout(() => {
            formContainer.innerHTML = originalContent;
            
            // Re-attach event listener
            const newSubscribeButton = formContainer.querySelector('.subscribe-btn-inline');
            const newEmailInput = formContainer.querySelector('input[type="email"]');
            
            if (newSubscribeButton && newEmailInput) {
                newSubscribeButton.addEventListener('click', function(e) {
                    e.preventDefault();
                    if (newEmailInput.value.trim()) {
                        handleInlineSubscription(newEmailInput.value.trim());
                    }
                });
            }
        }, 3000);
    }
    
    // Table of Contents - Smooth Scrolling
    const tocLinks = document.querySelectorAll('.table-of-contents a');
    
    tocLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Scroll to target element with smooth scrolling
                targetElement.scrollIntoView({ behavior: 'smooth' });
                
                // Update URL hash without jumping
                history.pushState(null, null, targetId);
            }
        });
    });
    
    // Update active section in table of contents based on scroll position
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('.blog-section');
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 200) {
                currentSection = '#' + section.getAttribute('id');
            }
        });
        
        tocLinks.forEach(link => {
            link.parentElement.classList.remove('active');
            if (link.getAttribute('href') === currentSection) {
                link.parentElement.classList.add('active');
            }
        });
    });
    
    // Debug - check if progress bar initializes correctly
    if (progressBar && progressContainer) {
        console.log("Progress bar initialized");
    } else {
        console.error("Progress bar elements not found:", { 
            progressContainer: !!progressContainer, 
            progressBar: !!progressBar 
        });
    }
}); 