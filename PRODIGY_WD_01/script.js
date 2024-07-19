document.addEventListener('DOMContentLoaded', () => {
    const nav = document.getElementById('main-nav');
    const scrollThreshold = 100;

    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollThreshold) {
            nav.style.backgroundColor = '#1a252f';
        } else {
            nav.style.backgroundColor = '#2c3e50';
        }
    });

    const navLinks = document.querySelectorAll('#main-nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('mouseover', () => {
            link.style.color = '#3498db';
        });
        link.addEventListener('mouseout', () => {
            link.style.color = '#fff';
        });
    });
});