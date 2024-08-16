document.addEventListener("DOMContentLoaded", function () {
    // Loading screen functionality
    const loadingScreen = document.getElementById('loading-screen');

    setTimeout(function () {
        loadingScreen.style.transition = 'opacity 1s ease-out';
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.visibility = 'hidden';
        }, 1000); // Matches the transition duration
    }, 5000); // 5 seconds delay to allow the text to animate

    // Video hover functionality
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    portfolioItems.forEach(item => {
        const video = item.querySelector('video');
        if (!video) return; // Skip if no video element found

        const poster = video.getAttribute('poster') || '';

        item.addEventListener('mouseenter', () => {
            video.currentTime = 0;
            video.play();
            video.style.opacity = '1';
            video.classList.add('playing');
        });

        item.addEventListener('mouseleave', () => {
            video.pause();
            video.currentTime = 0;
            if (video.getAttribute('poster') !== poster) {
                video.setAttribute('poster', poster);
            }
            video.classList.remove('playing');
        });
    });

    // Hamburger menu functionality
    const hamburger = document.getElementById('hamburger-menu');
    const navMenu = document.querySelector('nav');

    function toggleMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('open');
    }

    // Toggle the menu when hamburger button is clicked
    hamburger.addEventListener('click', toggleMenu);

    // Close the menu when a navigation link is clicked
    navMenu.addEventListener('click', function(event) {
        if (event.target.tagName === 'A' || event.target === navMenu) {
            toggleMenu();
        }
    });
});
