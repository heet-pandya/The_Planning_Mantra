/**
 * The Planning Mantra - Interactive logic
 */

// Splash Screen Logic
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        const splash = document.getElementById('splash-screen');
        if (splash) {
            splash.classList.add('hidden');
            document.body.classList.remove('no-scroll');
        }
    }, 400);
});

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

    // Team Stack Click & Auto Shuffle Logic
    const teamStack = document.getElementById('teamStack');
    if (teamStack) {
        let shuffleInterval;

        const shuffleStack = () => {
            const topImage = teamStack.lastElementChild;
            if (topImage) {
                // Apply a quick transition effect
                topImage.style.transform = 'translateX(120%) rotate(15deg)';
                topImage.style.opacity = '0';
                
                setTimeout(() => {
                    teamStack.insertBefore(topImage, teamStack.firstElementChild);
                    // Reset inline styles so CSS takes over the new positions
                    topImage.style.transform = '';
                    topImage.style.opacity = '1';
                }, 300);
            }
        };

        const startShuffleInterval = () => {
            clearInterval(shuffleInterval);
            shuffleInterval = setInterval(shuffleStack, 1800);
        };

        teamStack.addEventListener('click', () => {
            shuffleStack();
            startShuffleInterval(); // Reset interval on manual tap
        });

        // Start auto-shuffle initially
        startShuffleInterval();
    }

    // Video Autoplay on Scroll Logic
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            if (entry.isIntersecting) {
                // Play video when it enters the viewport
                video.play().catch(error => {
                    console.log("Autoplay was prevented:", error);
                });
            } else {
                // Pause video when it leaves the viewport
                video.pause();
            }
        });
    }, {
        threshold: 0.3 // Play when 30% of the video is visible
    });

    document.querySelectorAll('.video-item video').forEach(video => {
        videoObserver.observe(video);
    });

    // Initialize Lucide Icons
    lucide.createIcons();
});