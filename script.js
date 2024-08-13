document.addEventListener("DOMContentLoaded", function () {
    const loadingScreen = document.getElementById('loading-screen');
    
    
    setTimeout(function () {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.visibility = 'hidden';
    }, 5000); // 5 seconds delay to allow the text to animate

    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    menuToggle.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navMenu.classList.add('inactive');
        } else {
            navMenu.classList.remove('inactive');
            navMenu.classList.add('active');
        }
        menuToggle.classList.toggle('change');
    });

    const images = document.querySelectorAll("#hc2 img");
    let currentIndex = 0;

    function showNextImage() {
        images[currentIndex].classList.remove("active");
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].classList.add("active");
    }

    setInterval(showNextImage, 3000); // Change image every 3 seconds
});
