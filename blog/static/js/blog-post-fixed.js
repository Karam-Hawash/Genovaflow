document.addEventListener("DOMContentLoaded", function() {
    // DOM Elements
    const header = document.querySelector(".header");
    const progressContainer = document.getElementById("progress-container");
    const progressBar = document.getElementById("myBar");
    
    // Initialize
    initScrollEvents();
    
    // Scroll Progress Bar
    function initScrollEvents() {
        window.addEventListener("scroll", function() {
            // Header shadow on scroll
            if (window.scrollY > 50) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
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
        console.log("Progress updated: " + scrolled + "%");
    }
}); 