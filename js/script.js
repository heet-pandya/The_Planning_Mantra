/**
 * The Planning Mantra - Interactive logic
 */

// ================= TESTIMONIAL GLOBAL FUNCTIONS =================
let currentIndex = 0;

function updateSlider() {
    const track = document.getElementById("testimonialsTrack");
    const dots = document.querySelectorAll(".t-dot");

    if (!track) return;

    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    dots.forEach(dot => dot.classList.remove("active"));
    if (dots[currentIndex]) {
        dots[currentIndex].classList.add("active");
    }
}

function nextTestimonial() {
    const totalSlides = document.querySelectorAll(".testimonial-slide").length;
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlider();
}

function prevTestimonial() {
    const totalSlides = document.querySelectorAll(".testimonial-slide").length;
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlider();
}

function goToTestimonial(index) {
    currentIndex = index;
    updateSlider();
}

// Auto slide (every 5 sec)
setInterval(nextTestimonial, 5000);


// ================= MAIN WEBSITE LOGIC =================
document.addEventListener('DOMContentLoaded', () => {

    // Set minimum event date to today
    const eventDateInput = document.getElementById('eventDate');
    if (eventDateInput) {
        const today = new Date().toISOString().split('T')[0];
        eventDateInput.setAttribute('min', today);
    }

    // Current Year for Footer
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Sticky Navbar on Scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const offsetPosition =
                    targetElement.getBoundingClientRect().top +
                    window.pageYOffset -
                    headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Scroll Animations
    const fadeElements = document.querySelectorAll(
        '.service-card, .portfolio-item, .section-title, .testimonial-card'
    );

    fadeElements.forEach(el => el.classList.add('animate-on-scroll'));

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    fadeElements.forEach(el => observer.observe(el));

});