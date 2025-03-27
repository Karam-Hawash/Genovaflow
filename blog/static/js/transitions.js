document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded - initializing transitions.js');
    
    const container = document.querySelector('.travel-container');
    const heroContent = document.querySelector('.hero-content');
    const destinationTitle = document.querySelector('.destination-title');
    const cardsContainer = document.querySelector('.cards-container');
    const cards = document.querySelectorAll('.card');
    const progressIndicator = document.querySelector('.progress-indicator');
    const pageNumber = document.querySelector('.page-number');
    const descriptionText = document.querySelector('.description-text');
    const cardOverlays = document.querySelectorAll('.card-overlay');

    // Subscription overlay elements
    const subscribeBtn = document.getElementById('subscribe-btn');
    const subscriptionOverlay = document.getElementById('subscription-overlay');
    const closeSubscriptionBtn = document.getElementById('close-subscription');
    const emailInput = document.getElementById('email-input');
    const confirmSubscribeBtn = document.getElementById('confirm-subscribe');

    // Search overlay elements
    const searchIcon = document.getElementById('search-icon');
    const searchOverlay = document.getElementById('search-overlay');
    const closeSearchBtn = document.getElementById('close-search');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const searchResultsGrid = document.getElementById('search-results-grid');
    const searchResultsTitle = document.getElementById('search-results-title');

    console.log('Overlay elements found:', {
        subscribeBtn: !!subscribeBtn,
        subscriptionOverlay: !!subscriptionOverlay,
        closeSubscriptionBtn: !!closeSubscriptionBtn,
        searchIcon: !!searchIcon,
        searchOverlay: !!searchOverlay,
        closeSearchBtn: !!closeSearchBtn
    });

    // Check if we're on a mobile device
    const isMobile = () => window.innerWidth <= 768;

    // Adjust cards per view based on screen size
    const getCardsPerView = () => {
        if (window.innerWidth <= 576) return 1;
        if (window.innerWidth <= 768) return 2;
        if (window.innerWidth <= 1024) return 3;
        return 4;
    };

    // Blog post data for search - updated with actual blog posts from the site
    const blogPosts = [
        {
            id: 1,
            title: 'AI Agentic: The Rise of Autonomous Systems',
            category: 'Tech Innovations',
            image: '/static/images/ai-image.jpg',
            description: 'The evolution of agentic systems, their technical foundations and emerging capabilities.',
            url: 'all-posts/tech-innovations/ai-agentic.html'
        },
        {
            id: 2,
            title: 'AI Robots: Future of Automation',
            category: 'Future Trends',
            image: '/static/images/529b6fa5-e118-4cc9-8a11-351e1069fc83.jpg',
            description: 'Explore the groundbreaking advancements in AI robotics and their real-world applications.',
            url: 'all-posts/future-trends/ai-future-robots.html'
        },
        {
            id: 3,
            title: 'AI in Finance: Revolutionizing Trading',
            category: 'AI in Industry',
            image: '/all-posts/posts-images/trading 2.jpg',
            description: 'Explore how AI technologies are reshaping financial services and their impact on market efficiency.',
            url: 'all-posts/ai-in-industry/ai-in-financial-services.html'
        },
        {
            id: 4,
            title: 'The Future of Companies Using AI',
            category: 'Future Trends',
            image: '/all-posts/posts-images/company 6.jpg',
            description: 'Explore how AI is transforming businesses and shaping a future where every task is enhanced by intelligent systems.',
            url: 'all-posts/future-trends/ai-company.html'
        },
        {
            id: 5,
            title: 'Automation Tools: AI Platforms',
            category: 'AI Tutorials',
            image: '/all-posts/posts-images/automation tools 2.jpg',
            description: 'Discover the cutting-edge platforms driving 300-400% ROI increases for enterprises worldwide.',
            url: 'all-posts/ai-tutorials/ai-automation-tools.html'
        },
        {
            id: 6,
            title: 'AI in Healthcare: Transforming Medicine',
            category: 'AI in Industry',
            image: '/all-posts/posts-images/healthcare-3.jpg',
            description: 'Explore how AI technologies are being integrated into medical practice, their impact on healthcare outcomes.',
            url: 'all-posts/ai-in-industry/ai-in-healthcare.html'
        },
        {
            id: 7,
            title: 'Neural Networks: Deep Learning',
            category: 'Tech Innovations',
            image: '/all-posts/posts-images/network 3.jpg',
            description: 'Discover how neural networks form the foundation of today\'s most advanced AI systems.',
            url: 'all-posts/tech-innovations/neural-networks.html'
        },
        {
            id: 8,
            title: 'LLMs Differences: Unique Strengths',
            category: 'AI Tutorials',
            image: '/all-posts/posts-images/llm.png',
            description: 'Explore the unique strengths of leading AI models.',
            url: 'all-posts/ai-tutorials/llm-differences.html'
        },
        {
            id: 9,
            title: 'AI in Real Estate: Transforming Markets',
            category: 'AI in Industry',
            image: '/all-posts/posts-images/realestate.jpg',
            description: 'AI technologies are reshaping property transactions and empowering real estate agents.',
            url: 'all-posts/ai-in-industry/ai-in-real-estate.html'
        },
        {
            id: 10,
            title: 'AI Brain Chips: Future of Human Potential',
            category: 'Tech Innovations',
            image: '/all-posts/posts-images/brain 8.jpg',
            description: 'Explore the transformative potential of AI brain chips, their real-world applications, and the exciting future they promise.',
            url: 'all-posts/tech-innovations/ai-brain-chips.html'
        }
    ];

    // Function to scan the page for any new blog posts
    function scanForBlogPosts() {
        const cardElements = document.querySelectorAll('.card:not(.see-more)');
        
        if (cardElements.length > 0) {
            console.log('Scanning for blog posts, found ' + cardElements.length + ' cards');
            
            // Look for new blog posts to add to the search index
            cardElements.forEach((card) => {
                if (card.tagName === 'A' && card.getAttribute('href')) {
                    const href = card.getAttribute('href');
                    const title = card.getAttribute('data-title') || '';
                    const category = card.getAttribute('data-location') || '';
                    const description = card.getAttribute('data-description') || '';
                    const img = card.querySelector('img');
                    const imgSrc = img ? img.src : '';
                    
                    // Check if this post is already in our array
                    const existingPost = blogPosts.find(post => post.url === href);
                    
                    if (!existingPost && href && title) {
                        // Add to the blog posts array
                        blogPosts.push({
                            id: blogPosts.length + 1,
                            title: title,
                            category: category,
                            image: imgSrc,
                            description: description,
                            url: href
                        });
                        
                        console.log('Added new blog post to search index:', title);
                    }
                }
            });
        }
    }

    let currentIndex = 0;
    let lastHoveredCardIndex = null;
    const totalCards = cards.length;
    let cardsPerView = getCardsPerView();
    let currentBackground = null;
    let isAnimating = false;
    let touchStartX = 0;
    let touchEndX = 0;

    // Update cards per view when window resizes
    window.addEventListener('resize', () => {
        cardsPerView = getCardsPerView();
        
        // Ensure the current index is valid with the new cardsPerView value
        if (currentIndex > totalCards - cardsPerView) {
            currentIndex = totalCards - cardsPerView;
            if (currentIndex < 0) currentIndex = 0;
            
            // Update the carousel position
            const cardWidth = cards[0].offsetWidth;
            const gapWidth = 20; // This should match the gap in CSS
            const translateX = -(currentIndex * (cardWidth + gapWidth));
            cardsContainer.style.transform = `translateX(${translateX}px)`;
            
            updateProgress(currentIndex);
        }
    });

    // Subscription overlay functionality
    if (subscribeBtn && subscriptionOverlay && closeSubscriptionBtn) {
        subscribeBtn.addEventListener('click', (e) => {
            console.log('Subscribe button clicked');
            e.preventDefault();
            document.body.classList.add('overlay-open');
            subscriptionOverlay.classList.add('active');
            setTimeout(() => {
                if (emailInput) emailInput.focus();
            }, 300);
        });

        closeSubscriptionBtn.addEventListener('click', () => {
            console.log('Close subscription button clicked');
            subscriptionOverlay.classList.remove('active');
            setTimeout(() => {
                document.body.classList.remove('overlay-open');
            }, 300);
        });

        // Close subscription overlay when clicking outside the container
        subscriptionOverlay.addEventListener('click', (e) => {
            if (e.target === subscriptionOverlay) {
                console.log('Clicked outside subscription container');
                subscriptionOverlay.classList.remove('active');
                setTimeout(() => {
                    document.body.classList.remove('overlay-open');
                }, 300);
            }
        });

        // Enable/disable subscribe button based on email input
        if (emailInput && confirmSubscribeBtn) {
            emailInput.addEventListener('input', () => {
                const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value);
                confirmSubscribeBtn.disabled = !isValidEmail;
            });

            // Handle subscription form submission
            confirmSubscribeBtn.addEventListener('click', () => {
                console.log('Confirm subscribe button clicked');
                // Here you would typically send the email to your server
                alert(`Thank you for subscribing with ${emailInput.value}!`);
                emailInput.value = '';
                confirmSubscribeBtn.disabled = true;
                subscriptionOverlay.classList.remove('active');
            });
        }
    }

    // Search overlay functionality
    if (searchIcon && searchOverlay && closeSearchBtn) {
        searchIcon.addEventListener('click', (e) => {
            console.log('Search icon clicked');
            e.preventDefault();
            document.body.classList.add('overlay-open');
            searchOverlay.classList.add('active');
            setTimeout(() => {
                if (searchInput) searchInput.focus();
            }, 300);
            
            // Run the scanner to pick up any new posts
            scanForBlogPosts();
            
            // Display suggested articles - use actual blog posts from our collection
            if (searchResultsGrid && searchResultsTitle) {
                // Show 4 random blog posts as suggestions
                const suggestedPosts = [...blogPosts].sort(() => 0.5 - Math.random()).slice(0, 4);
                displaySearchResults(suggestedPosts);
                searchResultsTitle.textContent = 'Suggested Articles';
            }
        });

        closeSearchBtn.addEventListener('click', () => {
            console.log('Close search button clicked');
            searchOverlay.classList.remove('active');
            setTimeout(() => {
                document.body.classList.remove('overlay-open');
            }, 300);
        });

        // Close search overlay when clicking outside the container
        searchOverlay.addEventListener('click', (e) => {
            if (e.target === searchOverlay) {
                console.log('Clicked outside search container');
                searchOverlay.classList.remove('active');
                setTimeout(() => {
                    document.body.classList.remove('overlay-open');
                }, 300);
            }
        });

        // Handle search input - real-time search with each keystroke
        if (searchInput) {
            searchInput.addEventListener('input', performSearch);
        }
        
        // Keep the button functionality as a fallback
        if (searchButton) {
            searchButton.addEventListener('click', performSearch);
        }
    }

    function performSearch() {
        if (!searchInput || !searchResultsGrid || !searchResultsTitle) return;
        
        const query = searchInput.value.toLowerCase().trim();
        console.log('Performing search for:', query);
        
        if (query === '') {
            // If empty search, show suggested articles - use the actual blog posts
            const suggestedPosts = [...blogPosts].sort(() => 0.5 - Math.random()).slice(0, 4);
            displaySearchResults(suggestedPosts);
            searchResultsTitle.textContent = 'Suggested Articles';
            return;
        }
        
        // Filter blog posts based on search query
        const results = blogPosts.filter(post => 
            post.title.toLowerCase().includes(query) || 
            post.category.toLowerCase().includes(query) ||
            post.description.toLowerCase().includes(query)
        );
        
        // Display search results
        displaySearchResults(results);
        searchResultsTitle.textContent = results.length > 0 ? 'Search Results' : 'No Results Found';
    }

    function displaySearchResults(results) {
        if (!searchResultsGrid) return;
        
        console.log(`Displaying ${results.length} search results`);
        // Clear previous results
        searchResultsGrid.innerHTML = '';
        
        if (results.length === 0) {
            // Display no results message
            searchResultsGrid.innerHTML = '<div class="no-results">No matching articles found. Try a different search term.</div>';
            return;
        }
        
        // Create and append cards for each result
        results.forEach(post => {
            const card = document.createElement('div');
            card.className = 'search-card';
            card.dataset.id = post.id;
            
            card.innerHTML = `
                <img src="${post.image}" alt="${post.title}" class="search-card-img">
                <div class="search-card-content">
                    <div class="search-card-title">${post.title}</div>
                    <div class="search-card-category">${post.category}</div>
                </div>
            `;
            
            // Add click event to the card to navigate to the post
            card.addEventListener('click', () => {
                // Navigate to the post URL
                window.location.href = post.url;
                
                // Close the search overlay
                searchOverlay.classList.remove('active');
                setTimeout(() => {
                    document.body.classList.remove('overlay-open');
                }, 300);
            });
            
            // Make it look clickable
            card.style.cursor = 'pointer';
            
            // Add to the results grid
            searchResultsGrid.appendChild(card);
        });
    }

    const createBackgroundElement = (imageSrc, originX = 50, originY = 50) => {
        // Create a div to hold the image
        const bg = document.createElement('div');
        bg.className = 'background-image';
        
        // Set the transform origin point based on card position
        bg.style.setProperty('--origin-x', originX + '%');
        bg.style.setProperty('--origin-y', originY + '%');
        
        // Create an actual image element instead of using background-image
        const imgElement = document.createElement('img');
        imgElement.src = imageSrc;
        imgElement.style.width = '100%';
        imgElement.style.height = '100%';
        imgElement.style.objectFit = 'cover';
        imgElement.style.position = 'absolute';
        imgElement.style.top = '0';
        imgElement.style.left = '0';
        
        // Add the image to the background div
        bg.appendChild(imgElement);
        
        console.log('Created background with origin:', originX, originY);
        
        return bg;
    };

    const updateProgress = (index) => {
        const progress = ((index + cardsPerView) / totalCards) * 100;
        progressIndicator.style.width = `${progress}%`;
        
        const currentCardNumber = index + 1;
        pageNumber.textContent = currentCardNumber < 10 ? `0${currentCardNumber}` : currentCardNumber;
    };

    const handleFadeTransitions = () => {
        destinationTitle.classList.remove('fade-in', 'slide-in-left');
        descriptionText.classList.remove('fade-in', 'slide-in-left');
        // Remove the cardOverlays fade handling since they're now visible by default
        // and handled via CSS

        setTimeout(() => {
            destinationTitle.classList.add('fade-in', 'slide-in-left');
            descriptionText.classList.add('fade-in', 'slide-in-left');
            // Don't add fade-in to card overlays anymore
        }, 100);
    };

    const navigateCarousel = (direction) => {
        if (isAnimating) return;
        
        const newIndex = currentIndex + direction;
        if (newIndex < 0 || newIndex > totalCards - cardsPerView) return;

        isAnimating = true;
        
        const cardWidth = cards[0].offsetWidth;
        const gapWidth = 20; // This should match the gap in CSS
        const translateX = -(newIndex * (cardWidth + gapWidth));
        
        cardsContainer.style.transform = `translateX(${translateX}px)`;
        
        currentIndex = newIndex;
        updateProgress(currentIndex);
        
        const firstVisibleCard = cards[currentIndex];
        if (firstVisibleCard) {
            handleCardTransition(firstVisibleCard);
        }

        setTimeout(() => {
            isAnimating = false;
        }, 500);
    };

    const handleCardTransition = (card) => {
        const img = card.querySelector('img');
        if (!img) return;
        
        // Remove selected class from all cards first
        cards.forEach(c => c.classList.remove('selected'));
        
        // Add selected class to the current card
        card.classList.add('selected');
        
        const imgSrc = img.src;
        const title = card.dataset.title || '';
        const description = card.dataset.description || '';
        
        // Calculate the position of the card relative to the viewport
        const cardRect = card.getBoundingClientRect();
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        
        // Calculate origin percentages (center of the card)
        const originX = ((cardRect.left + cardRect.width / 2) / windowWidth) * 100;
        const originY = ((cardRect.top + cardRect.height / 2) / windowHeight) * 100;
        
        // Remove old background with smooth transition
        if (currentBackground) {
            currentBackground.remove();
        }

        // Create new background with the origin point from the card position
        const newBackground = createBackgroundElement(imgSrc, originX, originY);
        
        // Initial state: transparent
        newBackground.style.opacity = '0';
        
        container.insertBefore(newBackground, container.firstChild);

        // Force reflow
        newBackground.offsetHeight;

        // Transition to visible with a slight delay
        setTimeout(() => {
            newBackground.style.opacity = '1';
            newBackground.classList.add('active');
        }, 10);

        currentBackground = newBackground;

        // Set the title, handling multi-word titles better for mobile
        if (title) {
            if (isMobile()) {
                destinationTitle.textContent = title;
            } else {
                destinationTitle.textContent = title.split(' ').join('\n');
            }
        }
        
        // Update description
        if (description) {
            descriptionText.innerHTML = description.split('&#10;').join('<br>');
        }
        
        handleFadeTransitions();
    };

    let originalPageNumber = null;

    cards.forEach((card, index) => {
        // Make cards clickable - navigate to the href attribute
        card.addEventListener('click', function(e) {
            // For "See More" card, allow the link to work normally
            if (card.classList.contains('see-more')) {
                return;
            }

            // Prevent default anchor behavior
            e.preventDefault();
            
            // Get the href attribute and navigate to it
            const href = card.getAttribute('href');
            if (href) {
                window.location.href = href;
            }
        });

        // Make card divs behave like links (cursor pointer)
        if (card.getAttribute('href')) {
            card.style.cursor = 'pointer';
        }

        // Only use hover effects on non-mobile devices
        if (!isMobile()) {
            card.addEventListener('mouseenter', () => {
                if (originalPageNumber === null) {
                    originalPageNumber = pageNumber.textContent;
                }
                
                const cardNumber = index + 1;
                pageNumber.textContent = cardNumber < 10 ? `0${cardNumber}` : cardNumber;
                lastHoveredCardIndex = index;
                
                // Remove selected class from all cards and add it to the hovered card
                cards.forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                
                handleCardTransition(card);
            });
            
            card.addEventListener('mouseleave', () => {
                setTimeout(() => {
                    if (lastHoveredCardIndex === index) {
                        if (originalPageNumber) {
                            pageNumber.textContent = originalPageNumber;
                            lastHoveredCardIndex = null;
                        }
                        
                        // Keep the card selected if it was the first visible one
                        if (index !== currentIndex) {
                            card.classList.remove('selected');
                            // Re-add selected class to the current card in view
                            const currentCard = cards[currentIndex];
                            if (currentCard) {
                                currentCard.classList.add('selected');
                            }
                        }
                    }
                }, 50);
            });
        }
    });

    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');

    prevArrow.addEventListener('click', () => {
        navigateCarousel(-1);
        originalPageNumber = pageNumber.textContent;
    });
    
    nextArrow.addEventListener('click', () => {
        navigateCarousel(1);
        originalPageNumber = pageNumber.textContent;
    });

    // Touch event handlers for swipe on the carousel
    const destinationCards = document.querySelector('.destination-cards');
    
    if (destinationCards) {
        destinationCards.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        destinationCards.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
    }
    
    function handleSwipe() {
        const swipeThreshold = 50; // Minimum swipe distance
        const swipeDistance = touchEndX - touchStartX;
        
        if (swipeDistance > swipeThreshold) {
            // Swiped right - navigate to previous
            navigateCarousel(-1);
        } else if (swipeDistance < -swipeThreshold) {
            // Swiped left - navigate to next
            navigateCarousel(1);
        }
    }

    // Initialize with the first card
    handleCardTransition(cards[0]);
    updateProgress(0);
    originalPageNumber = pageNumber.textContent;
    
    // Make sure the first card is marked as selected
    if (cards[0]) {
        cards[0].classList.add('selected');
    }

    // Set appropriate initial state for mobile
    if (isMobile()) {
        const firstCard = cards[0];
        if (firstCard && firstCard.dataset.title) {
            destinationTitle.textContent = firstCard.dataset.title;
        }
    }

    console.log('transitions.js initialization complete');
});
