document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded - initializing all-posts.js');
    
    const filterButtons = document.querySelectorAll('.filter-btn');
    const postsGrid = document.getElementById('all-posts-grid');
    
    // New elements
    const searchInput = document.getElementById('filter-search');
    const sortButton = document.getElementById('sort-button');
    const sortOptions = document.getElementById('sort-options');
    const sortOptionElements = document.querySelectorAll('.sort-option');
    
    console.log('Elements found:', {
        filterButtons: filterButtons.length,
        postsGrid: !!postsGrid,
        searchInput: !!searchInput,
        sortButton: !!sortButton,
        sortOptions: !!sortOptions,
        sortOptionElements: sortOptionElements.length
    });
    
    let currentCategory = 'all';
    let currentSort = 'latest';
    let currentSearch = '';
    
    // Make all post cards clickable
    function makeCardsClickable() {
        const postCards = document.querySelectorAll('.post-card');
        console.log(`Making ${postCards.length} post cards clickable`);
        
        postCards.forEach(card => {
            // Find the link element inside the card
            const link = card.querySelector('.read-more');
            if (link && link.href) {
                // Store the URL
                const postUrl = link.href;
                
                // Make the card clickable
                card.style.cursor = 'pointer';
                card.addEventListener('click', function(e) {
                    // Don't trigger if the actual link was clicked (to avoid double navigation)
                    if (e.target === link || link.contains(e.target)) {
                        return;
                    }
                    
                    // Navigate to the post URL
                    window.location.href = postUrl;
                });
            }
        });
        
        // Also make featured cards clickable
        const featuredCards = document.querySelectorAll('.featured-card');
        featuredCards.forEach(card => {
            const link = card.querySelector('.featured-link');
            if (link && link.href) {
                card.style.cursor = 'pointer';
                card.addEventListener('click', function(e) {
                    if (e.target === link || link.contains(e.target)) {
                        return;
                    }
                    window.location.href = link.href;
                });
            }
        });
    }
    
    // Filter posts by category
    filterButtons.forEach((button, index) => {
        console.log(`Adding click listener to filter button ${index}: ${button.textContent}`);
        button.addEventListener('click', () => {
            console.log(`Filter button clicked: ${button.textContent}`);
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            currentCategory = button.getAttribute('data-category');
            applyFilters();
        });
    });
    
    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            console.log(`Search input: ${e.target.value}`);
            currentSearch = e.target.value.trim().toLowerCase();
            applyFilters();
        });
    } else {
        console.error('Search input element not found');
    }
    
    // Sort functionality - dropdown toggle
    if (sortButton) {
        sortButton.addEventListener('click', () => {
            console.log('Sort button clicked');
            sortOptions.classList.toggle('show');
        });
    } else {
        console.error('Sort button element not found');
    }
    
    // Close sort dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (sortButton && sortOptions && !sortButton.contains(e.target) && !sortOptions.contains(e.target)) {
            sortOptions.classList.remove('show');
        }
    });
    
    // Sort options selection
    sortOptionElements.forEach(option => {
        option.addEventListener('click', () => {
            console.log(`Sort option clicked: ${option.textContent}`);
            const value = option.getAttribute('data-value');
            sortButton.textContent = option.textContent;
            currentSort = value;
            sortOptions.classList.remove('show');
            applyFilters();
        });
    });
    
    // Function to apply all filters and sorting
    function applyFilters() {
        console.log('Applying filters:', { currentCategory, currentSort, currentSearch });
        const posts = Array.from(document.querySelectorAll('.post-card'));
        console.log(`Found ${posts.length} posts to filter`);
        
        // First filter by category and search
        posts.forEach(post => {
            const category = post.getAttribute('data-category');
            const title = post.querySelector('.post-title').textContent.toLowerCase();
            const excerpt = post.querySelector('.post-excerpt').textContent.toLowerCase();
            const postCategory = post.querySelector('.post-category').textContent.toLowerCase();
            
            const matchesCategory = currentCategory === 'all' || category === currentCategory;
            const matchesSearch = currentSearch === '' || 
                title.includes(currentSearch) || 
                excerpt.includes(currentSearch) || 
                postCategory.includes(currentSearch);
            
            if (matchesCategory && matchesSearch) {
                post.dataset.filtered = 'visible';
                post.style.display = 'flex';
            } else {
                post.dataset.filtered = 'hidden';
                post.style.display = 'none';
            }
        });
        
        // Then sort the filtered posts
        const filteredPosts = posts.filter(post => post.dataset.filtered === 'visible');
        console.log(`${filteredPosts.length} posts match the filters`);
        
        // Sort posts based on selected option
        filteredPosts.sort((a, b) => {
            switch (currentSort) {
                case 'latest':
                    // For demonstration, assuming newer posts are first in the DOM
                    return -1;
                case 'oldest':
                    // For demonstration, assuming older posts are last in the DOM
                    return 1;
                default:
                    return 0;
            }
        });
        
        // Remove all posts from the grid
        postsGrid.innerHTML = '';
        
        // First add filtered and sorted posts
        filteredPosts.forEach((post, index) => {
            postsGrid.appendChild(post);
            
            // Add staggered animation
            post.style.opacity = '0';
            post.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                post.style.opacity = '1';
                post.style.transform = 'translateY(0)';
            }, 50 + (index * 30));
        });
        
        // Then add hidden posts to preserve the DOM
        posts.filter(post => post.dataset.filtered === 'hidden').forEach(post => {
            postsGrid.appendChild(post);
        });
        
        // Show "no results" message if needed
        const noResultsElement = document.getElementById('no-results-message');
        if (filteredPosts.length === 0) {
            if (!noResultsElement) {
                const noResults = document.createElement('div');
                noResults.id = 'no-results-message';
                noResults.className = 'no-results-message';
                noResults.textContent = 'No posts match your current filters.';
                postsGrid.appendChild(noResults);
            }
        } else if (noResultsElement) {
            noResultsElement.remove();
        }
        
        // Make cards clickable again after reordering
        makeCardsClickable();
    }
    
    // Initialize clickable cards
    makeCardsClickable();
    
    console.log('all-posts.js initialization complete');
}); 