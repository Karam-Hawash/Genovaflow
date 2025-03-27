// Background parallax effect with smoothing
document.addEventListener("mousemove", (event) => {
    const background = document.querySelector(".background");
    const xOffset = (event.clientX / window.innerWidth - 0.5) * 20;
    const yOffset = (event.clientY / window.innerHeight - 0.5) * 20;
    
    // Use requestAnimationFrame for smoother animation
    requestAnimationFrame(() => {
        background.style.transform = `translate(${xOffset}px, ${yOffset}px) scale(1.05)`;
    });
    
    // Update the purple blur cursor position
    updatePurpleBlurCursor(event.clientX, event.clientY);
});

// Function to update the purple blur cursor position
function updatePurpleBlurCursor(x, y) {
    // Only update if menu is open
    if (!document.body.classList.contains('menu-open')) return;
    
    // Get or create the purple blur element
    let purpleBlur = document.querySelector('.purple-cursor-blur');
    
    if (!purpleBlur) {
        purpleBlur = document.createElement('div');
        purpleBlur.className = 'purple-cursor-blur';
        document.body.appendChild(purpleBlur);
    }
    
    // Position the blur at the cursor
    purpleBlur.style.left = `${x}px`;
    purpleBlur.style.top = `${y}px`;
}

// Create particle effect 
document.addEventListener("DOMContentLoaded", () => {
    createParticles();
    initWidgetEffects();
    setupExpandingWidgets();
    createBottomShadow();
    setupMenu();
    standardizeWidgetHoverAreas();
});

function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    document.body.appendChild(particlesContainer);
    
    // Create particles
    for (let i = 0; i < 30; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random size between 3-8px
    const size = Math.random() * 3 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Random horizontal position
    particle.style.left = `${Math.random() * 100}%`;
    
    // Random starting position from bottom
    particle.style.bottom = '0';
    
    // Random delay
    const delay = Math.random() * 12;
    particle.style.animationDelay = `${delay}s`;
    
    // Random duration between 8-15s
    const duration = Math.random() * 7 + 8;
    particle.style.animationDuration = `${duration}s`;
    
    // Random opacity
    const opacity = Math.random() * 0.4 + 0.2;
    particle.style.opacity = opacity;
    
    container.appendChild(particle);
    
    // Remove and recreate particle after animation completes
    setTimeout(() => {
        particle.remove();
        createParticle(container);
    }, duration * 1000);
}

// New function to set up the expanding widgets
function setupExpandingWidgets() {
    const widgets = document.querySelectorAll(".widget");
    
    widgets.forEach(widget => {
        // Create expanded container for each widget
        const expandedContainer = document.createElement('div');
        expandedContainer.className = 'widget-expanded';
        
        // Create content for expanded container
        const expandedContent = document.createElement('div');
        expandedContent.className = 'expanded-content';
        
        // Get text from the widget hover element
        const hoverText = widget.querySelector('.widget-hover').textContent.trim();
        expandedContent.textContent = hoverText;
        
        // Create widget name card that appears below the widget
        const nameCard = document.createElement('div');
        nameCard.className = 'widget-name-card';
        nameCard.textContent = hoverText;
        widget.appendChild(nameCard);
        
        // Append content to container
        expandedContainer.appendChild(expandedContent);
        
        // Insert container as first child of widget so widget appears on top
        widget.insertBefore(expandedContainer, widget.firstChild);
        
        // Use simplified event handlers without nested timeouts for better performance
        widget.addEventListener('mouseenter', () => {
            // Force a reflow to ensure smooth animation
            void expandedContainer.offsetWidth;
            
            // Apply styles directly - show content almost simultaneously with container
            expandedContainer.style.width = 'auto';
            expandedContainer.style.opacity = '1';
            expandedContainer.style.transform = 'scaleX(1)';
            
            // Show content with minimal delay - immediate call without requestAnimationFrame
            expandedContent.style.opacity = '1';
            expandedContent.style.transform = 'translateX(0)';
            
            // Fade out the name card
            nameCard.style.opacity = '0';
            nameCard.style.transform = 'translateX(-50%) translateY(-5px)';
        });
        
        widget.addEventListener('mouseleave', () => {
            // Hide both simultaneously for a smoother exit animation
            expandedContent.style.opacity = '0';
            expandedContent.style.transform = 'translateX(-20px)';
            expandedContainer.style.opacity = '0';
            expandedContainer.style.transform = 'scaleX(0)';
            
            // Fade in the name card
            nameCard.style.opacity = '1';
            nameCard.style.transform = 'translateX(-50%) translateY(0)';
        });
    });
}

function initWidgetEffects() {
    const widgets = document.querySelectorAll(".widget");
    
    // Swap the initial transform positions of 'about' and 'services' widgets
    const aboutWidget = document.querySelector('#about');
    const servicesWidget = document.querySelector('#services');
    
    if (aboutWidget && servicesWidget) {
        aboutWidget.style.transform = 'translateY(10px)'; // Changed from -10px
        servicesWidget.style.transform = 'translateY(-10px)'; // Changed from 10px
    }

    // Handle navigation with enhanced transitions
    widgets.forEach(widget => {
        widget.addEventListener("click", (e) => {
            e.preventDefault();
            
            let url = "#";
            switch (widget.id) {
                case "about":
                    url = "team.html"; // Updated to directly link to team.html
                    break;
                case "services":
                    url = "services+/index.html";
                    break;
                case "contact":
                    url = "contact.html";
                    break;
                case "blog":
                    url = "/blog/blog.html";
                    break;
            }
            
            // Add page transition effect
            const transition = document.createElement('div');
            transition.className = 'page-transition';
            document.body.appendChild(transition);
            
            // Animate transition
            transition.style.opacity = '1';
            
            // Navigate after transition completes
            setTimeout(() => {
                window.location.href = url;
            }, 500);
        });
    });
}

// Create the bottom gradient shadow
function createBottomShadow() {
    const shadowElement = document.createElement('div');
    shadowElement.className = 'bottom-shadow';
    document.body.appendChild(shadowElement);
}

// Setup the menu functionality
function setupMenu() {
    // Create contact us button
    const contactBtn = document.createElement('a');
    contactBtn.href = 'contact.html';
    contactBtn.className = 'contact-us-btn';
    contactBtn.innerHTML = '<i class="fas fa-envelope"></i> Contact Us';
    document.body.appendChild(contactBtn);

    // Create menu icon with 3x3 grid of squares
    const menuIcon = document.createElement('div');
    menuIcon.className = 'menu-icon';
    
    // Create container for the grid
    const gridContainer = document.createElement('div');
    gridContainer.className = 'menu-grid-container';
    
    // Create 3x3 grid of squares
    for (let i = 0; i < 9; i++) {
        const square = document.createElement('div');
        square.className = 'menu-grid-square';
        gridContainer.appendChild(square);
    }
    
    menuIcon.appendChild(gridContainer);
    document.body.appendChild(menuIcon);
    
    // We no longer need the separate close button
    
    // Create side menu (left panel) and overlay
    const sideMenu = document.createElement('div');
    sideMenu.className = 'side-menu';
    
    // Create right panel with background
    const rightPanel = document.createElement('div');
    rightPanel.className = 'right-panel';
    
    // Create description panel for hover info
    const descriptionPanel = document.createElement('div');
    descriptionPanel.className = 'description-panel';
    
    // Create description title and text elements
    const descTitle = document.createElement('div');
    descTitle.className = 'description-title';
    
    const descText = document.createElement('div');
    descText.className = 'description-content';
    
    // Append description elements to panel
    descriptionPanel.appendChild(descTitle);
    descriptionPanel.appendChild(descText);
    rightPanel.appendChild(descriptionPanel);
    
    const overlay = document.createElement('div');
    overlay.className = 'side-menu-overlay';
    
    // Create menu content container
    const menuContent = document.createElement('div');
    menuContent.className = 'side-menu-content';
    
    // Create menu items with descriptions
    const menuItems = [
        { 
            id: 'contact', 
            text: 'Contact Us', 
            title: 'Get in Touch',
            description: 'Reach out to our dedicated team for personalized AI automation solutions. We\'re ready to discuss your project needs and how we can help transform your business processes.',
            url: 'contact.html' // Added URL
        },
        { 
            id: 'services', 
            text: 'Services', 
            title: 'Our Solutions',
            description: 'Explore our comprehensive range of AI automation services including AI chatbots, AI voice agents, and custom business process automation. We design tailored solutions that drive efficiency and innovation.',
            url: 'services+/index.html' // Added URL
        },
        { 
            id: 'about', 
            text: 'Team', 
            title: 'Who We Are',
            description: 'Meet the passionate experts behind Genovaflow. Our team combines deep technical knowledge with creative problem-solving to deliver cutting-edge AI solutions that exceed expectations.',
            url: 'team.html' // Added URL
        },
        { 
            id: 'blog', 
            text: 'Blog', 
            title: 'Genovaflow Blog',
            description: 'Stay updated with the latest trends and innovations in the AI automation space. Our blog features expert articles, case studies, and thought leadership pieces to keep you informed and inspired.',
            url: '/blog/blog.html' // Added URL
        }
    ];
    
    menuItems.forEach(item => {
        const menuItem = createMenuItem(item);
        menuContent.appendChild(menuItem);
    });
    
    // Append elements
    sideMenu.appendChild(menuContent);
    document.body.appendChild(overlay);
    document.body.appendChild(sideMenu);
    document.body.appendChild(rightPanel);
    
    // Add a subtle entrance animation for the menu icon
    setTimeout(() => {
        menuIcon.style.opacity = '1';
        menuIcon.style.transform = 'scale(1)';
    }, 500);
    
    // Get top logo element
    const topLogo = document.querySelector('.top-middle-logo');
    
    // Variable to track menu state
    let menuOpen = false;
    let activeMenuItem = null;
    
    // Add hover effect for menu icon when active
    menuIcon.addEventListener('mouseenter', () => {
        // Add a class to help detect hover state in CSS
        menuIcon.classList.add('icon-hover');
    });
    
    menuIcon.addEventListener('mouseleave', () => {
        // Remove the hover class
        menuIcon.classList.remove('icon-hover');
    });
    
    // Handle menu toggle - the menu icon now handles both open and close
    menuIcon.addEventListener('click', (event) => {
        if (!menuOpen) {
            // Open menu
            openMenu(event);
            // Add active class to transform into X
            menuIcon.classList.add('active');
        } else {
            // Close menu
            closeMenu();
            // Remove active class to transform back to menu icon
            menuIcon.classList.remove('active');
        }
    });
    
    // Close menu when clicking overlay
    overlay.addEventListener('click', () => {
        closeMenu();
        // Remove active class to transform back to menu icon
        menuIcon.classList.remove('active');
    });
    
    // Function to create floating particles in the description panel
    function createDescriptionPanelParticles() {
        // Clear any existing particles
        const existingParticles = descriptionPanel.querySelectorAll('.desc-particle');
        existingParticles.forEach(p => p.remove());
        
        // Create new particles
        for (let i = 0; i < 10; i++) {
            const particle = document.createElement('div');
            particle.className = 'desc-particle';
            particle.style.position = 'absolute';
            particle.style.width = `${Math.random() * 6 + 2}px`;
            particle.style.height = particle.style.width;
            particle.style.background = 'rgba(244, 147, 29, 0.4)';
            particle.style.borderRadius = '50%';
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.opacity = '0';
            particle.style.transform = 'translateY(0px)';
            particle.style.transition = `opacity 1s ease, transform ${Math.random() * 5 + 7}s ease-in-out`;
            
            descriptionPanel.appendChild(particle);
            
            // Animate particles after a small delay
            setTimeout(() => {
                particle.style.opacity = Math.random() * 0.5 + 0.1;
                particle.style.transform = `translateY(-${Math.random() * 100 + 50}px)`;
            }, 100);
            
            // Remove particles after animation
            setTimeout(() => {
                particle.style.opacity = '0';
                setTimeout(() => particle.remove(), 1000);
            }, (Math.random() * 5 + 5) * 1000);
        }
    }
    
    // Function to open menu
    function openMenu(event) {
        sideMenu.classList.add('open');
        rightPanel.classList.add('open');
        overlay.classList.add('open');
        menuOpen = true;
        
        // Add class to body for purple blur effect
        document.body.classList.add('menu-open');
        
        // Make the flow.svg logo vanish when menu opens
        if (topLogo) {
            topLogo.style.opacity = '0';
        }
        
        // Hide contact us button
        if (contactBtn) {
            contactBtn.style.opacity = '0';
            contactBtn.style.pointerEvents = 'none';
        }
        
        document.body.style.overflow = 'hidden'; // Prevent scrolling
        
        // Show menu items with staggered animation
        const menuItems = document.querySelectorAll('.menu-item');
        menuItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
                
                // Auto-select the first menu item
                if (index === 0) {
                    setTimeout(() => {
                        const enterEvent = new MouseEvent('mouseenter');
                        item.dispatchEvent(enterEvent);
                        activeMenuItem = item;
                        
                        // Create particle effects in the description panel
                        createDescriptionPanelParticles();
                        
                        // Start periodic particle creation
                        window.panelParticleInterval = setInterval(createDescriptionPanelParticles, 8000);
                    }, 500);
                }
            }, 80 + (index * 80));
        });
    }
    
    // Function to close menu
    function closeMenu() {
        sideMenu.classList.remove('open');
        rightPanel.classList.remove('open');
        overlay.classList.remove('open');
        menuOpen = false;
        
        // Remove class from body for purple blur effect
        document.body.classList.remove('menu-open');
        
        // Show the flow.svg logo again when menu closes
        if (topLogo) {
            topLogo.style.opacity = '1';
        }
        
        // Show contact us button again
        if (contactBtn) {
            contactBtn.style.opacity = '1';
            contactBtn.style.pointerEvents = 'auto';
        }
        
        // Clear the particle interval
        if (window.panelParticleInterval) {
            clearInterval(window.panelParticleInterval);
        }
        
        // Add fade-out effect to description panel
        descriptionPanel.classList.add('fade-out');
        
        // Wait for fade-out animation to complete before hiding completely
        setTimeout(() => {
            // Hide all menu descriptions and reset active states
            descriptionPanel.classList.remove('visible');
            descriptionPanel.classList.remove('fade-out');
            document.querySelectorAll('.menu-item').forEach(item => {
                item.classList.remove('active-menu-item');
            });
            
            // Reset active menu item
            activeMenuItem = null;
        }, 300);
        
        document.body.style.overflow = ''; // Re-enable scrolling
    }
    
    // Handle menu item creation and hover effects
    function createMenuItem(item) {
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item';
        menuItem.dataset.id = item.id;
        
        // Create text element
        const textElement = document.createElement('div');
        textElement.className = 'menu-item-text';
        
        // Wrap each character in a span for individual animation
        const chars = item.text.split('');
        chars.forEach((char, index) => {
            const span = document.createElement('span');
            span.className = 'menu-item-character';
            span.textContent = char;
            // Add staggered delay to each character
            span.style.animationDelay = `${index * 0.05}s`;
            textElement.appendChild(span);
        });
        
        // Append element
        menuItem.appendChild(textElement);
        
        // Add magnetic hover effect
        menuItem.addEventListener('mousemove', (e) => {
            const bounds = menuItem.getBoundingClientRect();
            const mouseX = e.clientX - bounds.left;
            const mouseY = e.clientY - bounds.top;
            
            const centerX = bounds.width / 2;
            const centerY = bounds.height / 2;
            
            // Reduced X movement by 50% (from 0.1 to 0.05)
            const deltaX = (mouseX - centerX) * 0.04;
            const deltaY = (mouseY - centerY) * 0.1;
            
            textElement.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
            
            // Make characters closest to cursor rise higher
            const characters = textElement.querySelectorAll('.menu-item-character');
            characters.forEach((char) => {
                const charBounds = char.getBoundingClientRect();
                const charCenterX = charBounds.left + charBounds.width / 2;
                const distance = Math.abs(e.clientX - charCenterX);
                const scale = Math.max(1, 1.1 - (distance / 100));
                
                // Reduced X influence on character movement
                char.style.transform = `translateY(${-5 * scale}px) scale(${scale})`;
            });
            
            // Generate particles on movement (every 70ms)
            if (!menuItem.lastParticleTime || Date.now() - menuItem.lastParticleTime > 70) {
                createMenuParticle(e.clientX, e.clientY);
                menuItem.lastParticleTime = Date.now();
            }
        });
        
        // Reset on mouse leave
        menuItem.addEventListener('mouseleave', () => {
            textElement.style.transform = '';
            const characters = textElement.querySelectorAll('.menu-item-character');
            characters.forEach(char => {
                char.style.transform = '';
            });
        });
        
        // Add hover event for showing description with enhanced effects
        menuItem.addEventListener('mouseenter', () => {
            if (!menuOpen) return;
            
            // Reset previous active item
            if (activeMenuItem && activeMenuItem !== menuItem) {
                activeMenuItem.classList.remove('active-menu-item');
            }
            
            // Set this as the active item
            menuItem.classList.add('active-menu-item');
            activeMenuItem = menuItem;
            
            // If there's already a visible description panel, add fade-out class first
            if (document.querySelector('.description-panel.visible')) {
                // Add fade-out class
                descriptionPanel.classList.add('fade-out');
                
                // Wait for fade out animation to complete before updating content and fading in
                setTimeout(() => {
                    // Update description content
                    descTitle.textContent = item.title;
                    descText.textContent = item.description;
                    
                    // Remove fade-out class
                    descriptionPanel.classList.remove('fade-out');
                    
                    // Show description panel
                    descriptionPanel.classList.add('visible');
                    
                    // Create new floating particles
                    createDescriptionPanelParticles();
                }, 300);
            } else {
                // No visible panel yet, just show it immediately
                // Update description content
                descTitle.textContent = item.title;
                descText.textContent = item.description;
                
                // Show description panel
                descriptionPanel.classList.add('visible');
                
                // Create floating particles
                createDescriptionPanelParticles();
            }
        });
        
        // Add click event with enhanced visual feedback
        menuItem.addEventListener('click', () => {
            // Add a brief highlight effect
            menuItem.style.background = 'rgba(244, 147, 29, 0.3)';
            
            setTimeout(() => {
                closeMenu();
                
                // Use the existing page transition effect
                const transition = document.createElement('div');
                transition.className = 'page-transition';
                document.body.appendChild(transition);
                
                // Animate transition
                transition.style.opacity = '1';
                
                // Navigate to the specified URL
                setTimeout(() => {
                    window.location.href = item.url;
                }, 500);
            }, 300);
        });
        
        return menuItem;
    }
}

// Function to standardize widget hover areas to circular boundaries
function standardizeWidgetHoverAreas() {
    const widgets = document.querySelectorAll(".widget");
    
    // Create a shared event listener for mouse movement to avoid duplicate handlers
    document.addEventListener("mousemove", (event) => {
        widgets.forEach(widget => {
            // Only check if we need to remove hover for performance
            if (widget.classList.contains('hover-active')) {
                const rect = widget.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const distX = event.clientX - centerX;
                const distY = event.clientY - centerY;
                const distance = Math.sqrt(distX * distX + distY * distY);
                const radius = rect.width / 2;
                
                if (distance > radius) {
                    widget.classList.remove('hover-active');
                    // Add an enhanced transition for smoother exit
                    widget.style.transition = "all 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)";
                    
                    // Get the name card and restore its visibility
                    const nameCard = widget.querySelector('.widget-name-card');
                    if (nameCard) {
                        nameCard.style.opacity = '1';
                        nameCard.style.transform = 'translateX(-50%) translateY(0)';
                    }
                    
                    // Create a synthetic mouseleave event
                    const leaveEvent = new MouseEvent('mouseleave');
                    widget.dispatchEvent(leaveEvent);
                }
            }
        });
    });
    
    widgets.forEach(widget => {
        widget.addEventListener("mousemove", (event) => {
            // Prevent event from bubbling to improve performance
            event.stopPropagation();
            
            // Get widget dimensions and position
            const rect = widget.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            // Calculate distance from center to mouse
            const distX = event.clientX - centerX;
            const distY = event.clientY - centerY;
            const distance = Math.sqrt(distX * distX + distY * distY);
            
            // If distance is greater than radius, mouse is outside the circle
            const radius = rect.width / 2;
            if (distance > radius) {
                // Trigger mouseleave if mouse is geometrically outside the circle
                if (widget.classList.contains('hover-active')) {
                    widget.classList.remove('hover-active');
                    
                    // Get the name card and restore its visibility
                    const nameCard = widget.querySelector('.widget-name-card');
                    if (nameCard) {
                        nameCard.style.opacity = '1';
                        nameCard.style.transform = 'translateX(-50%) translateY(0)';
                    }
                    
                    // Create a synthetic mouseleave event
                    const leaveEvent = new MouseEvent('mouseleave');
                    widget.dispatchEvent(leaveEvent);
                }
            } else if (!widget.classList.contains('hover-active')) {
                // Mouse is inside circle
                widget.classList.add('hover-active');
                
                // Get the name card and hide it
                const nameCard = widget.querySelector('.widget-name-card');
                if (nameCard) {
                    nameCard.style.opacity = '0';
                    nameCard.style.transform = 'translateX(-50%) translateY(-5px)';
                }
                
                // Create a synthetic mouseenter event
                const enterEvent = new MouseEvent('mouseenter');
                widget.dispatchEvent(enterEvent);
                
                // Add slight delay before applying hover effects for smoother transitions
                setTimeout(() => {
                    if (widget.classList.contains('hover-active')) {
                        // This ensures the hover effect is applied smoothly
                        widget.style.transition = "all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)";
                    }
                }, 10);
            }
        });
    });
}

// Create menu function for particle effect
function createMenuParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'menu-item-particle';
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    document.body.appendChild(particle);
    
    // Remove particle after animation completes
    setTimeout(() => {
        particle.remove();
    }, 1000);
}
// Original JavaScript content

/* ========== ADD THESE AT THE END ========== */
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints;

// Disable parallax on touch devices
document.addEventListener("mousemove", (event) => {
  if(isTouchDevice) return;
  // ... rest of parallax code ...
});

// Update widget initialization
function initWidgetEffects() {
  if(isTouchDevice) { /* Hide name cards */ }
  // ... rest of code ...
}
