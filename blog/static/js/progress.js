document.addEventListener("DOMContentLoaded", function() {
    // Progress bar functionality
    const progressBar = document.getElementById("myBar");
    if (progressBar) {
        window.addEventListener("scroll", function() {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + "%";
        });
    }
}); 