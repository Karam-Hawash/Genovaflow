// Smooth scrolling function for general sections
function scrollToSection(sectionId) {
  document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

// Function specifically to scroll to the contact form
function scrollToContact() {
  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}

// Enhanced reveal function for service cards
function reveal() {
  const cards = document.querySelectorAll('.service-card');
  const windowHeight = window.innerHeight;
  
  cards.forEach(card => {
    const cardTop = card.getBoundingClientRect().top;
    const cardVisible = 150;
    
    if (cardTop < windowHeight - cardVisible) {
      card.classList.add('active');
    }
  });
}

// Header scroll effect
function handleHeaderScroll() {
  const header = document.querySelector('header');
  const scrollPosition = window.scrollY;
  
  if (scrollPosition > 50) {
    header.style.padding = '8px 0';
    header.style.background = 'rgba(23, 22, 22, 0.95)';
  } else {
    header.style.padding = '10px 0';
    header.style.background = 'rgba(23, 22, 22, 0.8)';
  }
}

// Initialize animations with loading state
function initAnimations() {
  const cards = document.querySelectorAll('.service-card');
  
  // Add loading animation initially
  cards.forEach(card => {
    card.classList.add('loading-animation');
  });
  
  // Trigger initial card animations immediately
  requestAnimationFrame(() => {
    cards.forEach(card => {
      card.classList.add('active');
    });
  });
  
  // Remove loading animation after content is loaded
  window.addEventListener('load', () => {
    cards.forEach(card => {
      card.classList.remove('loading-animation');
    });
  });
  
  // Add gradient text effect
  const headings = document.querySelectorAll('h2, h3');
  headings.forEach(heading => heading.classList.add('gradient-text'));
}

// Enhanced parallax effect for service cards
function parallaxEffect() {
  const cards = document.querySelectorAll('.service-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      if (!card.classList.contains('active')) return;
      
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Update CSS variables for the glow effect
      card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
      card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
      
      // Calculate the tilt
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      card.style.transform = `
        perspective(1000px) 
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg)
        scale(1.02)
      `;
    });
    
    card.addEventListener('mouseleave', () => {
      if (!card.classList.contains('active')) return;
      
      card.style.transform = 'translateX(0)';
      card.style.setProperty('--mouse-x', '50%');
      card.style.setProperty('--mouse-y', '50%');
    });
  });
}

// Form validation and enhanced feedback
function setupForm() {
  const form = document.getElementById('contactForm');
  const inputs = form.querySelectorAll('input, select, textarea');
  
  inputs.forEach(input => {
    // Add focus effects
    input.addEventListener('focus', () => {
      input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
      if (!input.value) {
        input.parentElement.classList.remove('focused');
      }
    });
    
    // Add validation feedback
    input.addEventListener('input', () => {
      if (input.checkValidity()) {
        input.classList.remove('invalid');
        input.classList.add('valid');
      } else {
        input.classList.remove('valid');
        input.classList.add('invalid');
      }
    });
  });
  
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Animated button feedback
      const button = form.querySelector('button');
      button.innerHTML = '<span class="loading"></span>Sending...';
      button.disabled = true;
      
      // Simulate form submission
      setTimeout(() => {
        button.innerHTML = '✓ Message Sent!';
        button.classList.add('success');
        
        // Reset form after delay
        setTimeout(() => {
          form.reset();
          button.innerHTML = 'Book a Free Consultation';
          button.disabled = false;
          button.classList.remove('success');
        }, 3000);
      }, 1500);
    });
  }
}

// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all animations
  initAnimations();
  parallaxEffect();
  setupForm();
  
  // Add scroll event listeners
  window.addEventListener('scroll', reveal);
  window.addEventListener('scroll', handleHeaderScroll);
  
  // Trigger initial states
  handleHeaderScroll();
  
  // Add header shadow on scroll
  window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 10) {
      header.classList.add('shadow');
    } else {
      header.classList.remove('shadow');
    }
  });
  
  // Add smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        
        window.scrollTo({
          top: targetPosition - headerHeight - 20, // Account for header height and add some padding
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Handle form submission
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
  }
  
  // Initialize service card animations
  initServiceCards();
});

// Function to handle service card animations
function initServiceCards() {
  const cards = document.querySelectorAll('.service-card');
  
  function checkCardScroll() {
    cards.forEach(card => {
      const cardTop = card.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (cardTop < windowHeight * 0.8) {
        card.style.opacity = '1';
        card.style.transform = 'translateX(0)';
      }
    });
  }
  
  // Check scroll position on load
  checkCardScroll();
  
  // Check scroll position during scroll
  window.addEventListener('scroll', checkCardScroll);
}
