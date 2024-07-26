document.addEventListener('DOMContentLoaded', () => {
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
    var imageitem = document.getElementsByClassName("image-item");
    imageitem.onclick = function(){
        window.location.href="sproduct.html";
    }
    var MainImg = document.getElementById("MainImg");
    var smallimg = document.getElementsByClassName("small_img");

    function updateMainImage(imageSrc) {
            document.getElementById('MainImg').src = imageSrc;
            updateThumbnails(imageSrc);
        }

    function updateThumbnails(excludeImage) {
        const allImages = ['image1.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg', 'image5.jpg'];
        const thumbnails = document.querySelectorAll('.thumbnail');

        // Remove the main image from the list of thumbnails
        const images = allImages.filter(image => image !== excludeImage);

        // Shuffle the images array
        for (let i = images.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [images[i], images[j]] = [images[j], images[i]];
        }

        // Update the thumbnail images
        thumbnails.forEach((thumbnail, index) => {
            thumbnail.src = images[index];
        });
    }
    
    smallimg[0].onclick = function(){
        MainImg.src = smallimg[0].src;
    }
    smallimg[1].onclick = function(){
        MainImg.src = smallimg[1].src;
    }
    smallimg[2].onclick = function(){
        MainImg.src = smallimg[2].src;
    }
    smallimg[3].onclick = function(){
        MainImg.src = smallimg[3].src;
    }

    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();
            alert('Message sent!');
        });
    }

    const checkoutButton = document.getElementById('checkout-button');

    if (checkoutButton) {
        checkoutButton.addEventListener('click', () => {
            alert('Proceeding to checkout...');
        });
    }
});
