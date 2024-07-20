document.addEventListener('DOMContentLoaded', function () {
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function () {
        if (window.scrolly > 50) {
            navbar.classList.add('scrolled');
        }
        else{
            navbar.classList.remove('scrolled');

        }
    });
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();
        alert('Thank you for contacting us! We will get back to you soon.');
        contactForm.reset();
    });

});