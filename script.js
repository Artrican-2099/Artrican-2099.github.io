document.addEventListener("DOMContentLoaded", function () {
    // Loading screen functionality
    const loadingScreen = document.getElementById('loading-screen');

    setTimeout(function () {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.visibility = 'hidden';
    }, 5000); // 5 seconds delay to allow the text to animate

    // Image slideshow functionality
    const images = document.querySelectorAll("#hc2 img");
    let currentIndex = 0;

    function showNextImage() {
        images[currentIndex].classList.remove("active");
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].classList.add("active");
    }

    setInterval(showNextImage, 3000); // Change image every 3 seconds

    // Video hover functionality
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    portfolioItems.forEach(item => {
        const video = item.querySelector('video');
        const poster = video.getAttribute('poster'); // Store original poster

        item.addEventListener('mouseenter', () => {
            if (video) {
                video.currentTime = 0; // Reset the video to the start
                video.play(); // Play the video
                video.style.opacity = '1'; // Ensure the video is visible
                video.classList.add('playing'); // Add a class when playing
            }
        });

        item.addEventListener('mouseleave', () => {
            if (video) {
                video.pause(); // Pause the video
                video.currentTime = 0; // Reset the video to the start
                video.style.opacity = '0'; // Hide the video
                video.setAttribute('poster', poster); // Restore the poster
                video.classList.remove('playing'); // Remove the class when not playing
            }
        });
    });
});
