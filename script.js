/**
 * Padlock App Logic
 * Organizes navigation behavior, dropdown interactions, and layout management.
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollEffect();
    initRegisterForm();
    initSigninForm();
    initMovieCarousel();
});

/**
 * Initializes navbar dropdowns and interactivity.
 */
function initNavigation() {
    const header = document.getElementById('mainHeader');
    const trigger = document.getElementById('mediaDropdownTrigger');
    const overlay = document.getElementById('dropdownOverlay');

    if (!header || !trigger || !overlay) return;

    // Handles the hover opening of the full-width dropdown
    trigger.addEventListener('mouseenter', () => {
        header.classList.add('header--dropdown-open');
    });

    // Handles the mouse exit behavior
    trigger.addEventListener('mouseleave', () => {
        header.classList.remove('header--dropdown-open');
    });

    // Close dropdown and header overlay when clicking outside
    overlay.addEventListener('click', () => {
        header.classList.remove('header--dropdown-open');
    });
}

/**
 * Adds active scroll detection to style the header dynamically.
 */
function initScrollEffect() {
    const header = document.getElementById('mainHeader');
    if (!header) return;

    const handleScroll = () => {
        if (window.scrollY > 20) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }
    };

    // Run once on load and listen for scroll events
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
}

/**
 * Handles the registration form mock submission with smooth transitions.
 */
function initRegisterForm() {
    const form = document.getElementById('registerForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('.btn-register');
        if (!submitBtn) return;

        // Add loading state
        submitBtn.disabled = true;
        submitBtn.textContent = 'Creating account...';
        submitBtn.style.opacity = '0.7';

        setTimeout(() => {
            // Show successful status
            submitBtn.textContent = 'Success! Redirecting...';
            submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            submitBtn.style.boxShadow = '0 6px 20px rgba(16, 185, 129, 0.4)';

            setTimeout(() => {
                window.location.href = './index.html';
            }, 1500);
        }, 1500);
    });
}

/**
 * Handles the sign-in form mock submission with smooth transitions.
 */
function initSigninForm() {
    const form = document.getElementById('signinForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('.btn-register');
        if (!submitBtn) return;

        // Add loading state
        submitBtn.disabled = true;
        submitBtn.textContent = 'Signing in...';
        submitBtn.style.opacity = '0.7';

        setTimeout(() => {
            // Show successful status
            submitBtn.textContent = 'Welcome back! Redirecting...';
            submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            submitBtn.style.boxShadow = '0 6px 20px rgba(16, 185, 129, 0.4)';

            setTimeout(() => {
                window.location.href = './index.html';
            }, 1500);
        }, 1500);
    });
}

/**
 * Initializes and manages the movie carousel with infinite auto-scrolling
 * and interactive prev/next navigation controls.
 */
function initMovieCarousel() {
    const track = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    
    if (!track || !prevBtn || !nextBtn) return;

    let isPaused = false;
    let scrollSpeed = 0.75; // Pixels per frame (smooth slow crawl)
    let scrollPosition = 0;
    let transitionTimeout;

    // Helper to calculate translation offset based on card width + gap dynamically
    const getShiftAmount = () => {
        const firstCard = track.querySelector('.movie-card');
        if (!firstCard) return 326;
        const style = window.getComputedStyle(track);
        const gap = parseInt(style.gap) || 36;
        return firstCard.offsetWidth + gap;
    };

    // Calculate loop width (half of the track since we duplicated the cards)
    const getLoopWidth = () => {
        return track.scrollWidth / 2;
    };

    // Listeners to pause autoscroll when user hovers over track or controls
    const pauseElements = [track, prevBtn, nextBtn];
    pauseElements.forEach(element => {
        element.addEventListener('mouseenter', () => { isPaused = true; });
        element.addEventListener('mouseleave', () => { isPaused = false; });
    });

    // Animation frame crawl loop
    function step() {
        if (!isPaused) {
            scrollPosition += scrollSpeed;
            const loopWidth = getLoopWidth();
            if (scrollPosition >= loopWidth) {
                scrollPosition = 0;
            }
            track.style.transform = `translateX(-${scrollPosition}px)`;
        }
        requestAnimationFrame(step);
    }

    // Start autoscroll
    requestAnimationFrame(step);

    // Click handler helper with smooth animation transitions
    const handleShift = (direction) => {
        // Clear any ongoing transition timeouts
        clearTimeout(transitionTimeout);

        const shift = getShiftAmount();
        const loopWidth = getLoopWidth();

        if (direction === 'next') {
            scrollPosition += shift;
            if (scrollPosition >= loopWidth) {
                // Instantly wrap around but keep the offset delta to prevent jumpiness
                scrollPosition -= loopWidth;
            }
        } else {
            scrollPosition -= shift;
            if (scrollPosition < 0) {
                scrollPosition += loopWidth;
            }
        }

        // Apply smooth transition
        track.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
        track.style.transform = `translateX(-${scrollPosition}px)`;

        // Disable transition after it completes to maintain seamless linear frame rate
        transitionTimeout = setTimeout(() => {
            track.style.transition = 'none';
        }, 500);
    };

    prevBtn.addEventListener('click', () => handleShift('prev'));
    nextBtn.addEventListener('click', () => handleShift('next'));
}


const track = document.getElementById("carouselTrack");
const prevBtn = document.getElementById("carouselPrev");
const nextBtn = document.getElementById("carouselNext");

const cards = [...track.children];
const cardWidth = cards[0].offsetWidth + 32; // card width + gap

// Duplicate all cards
cards.forEach(card => {
    const clone = card.cloneNode(true);
    track.appendChild(clone);
});

let currentPosition = 0;

nextBtn.addEventListener("click", () => {
    currentPosition += cardWidth;

    track.style.transition = "transform 0.5s ease";
    track.style.transform = `translateX(-${currentPosition}px)`;

    // Reset when halfway through
    if (currentPosition >= (track.scrollWidth / 2)) {
        setTimeout(() => {
            track.style.transition = "none";
            currentPosition = 0;
            track.style.transform = `translateX(0px)`;
        }, 500);
    }
});

prevBtn.addEventListener("click", () => {
    if (currentPosition <= 0) {
        track.style.transition = "none";
        currentPosition = track.scrollWidth / 2 - cardWidth;
        track.style.transform = `translateX(-${currentPosition}px)`;

        setTimeout(() => {
            track.style.transition = "transform 0.5s ease";
            currentPosition -= cardWidth;
            track.style.transform = `translateX(-${currentPosition}px)`;
        }, 10);
    } else {
        currentPosition -= cardWidth;
        track.style.transition = "transform 0.5s ease";
        track.style.transform = `translateX(-${currentPosition}px)`;
    }
});
