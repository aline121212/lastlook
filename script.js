/**
 * Padlock App Logic
 * Organizes navigation behavior, dropdown interactions, and layout management.
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollEffect();
    initRegisterForm();
    initSigninForm();
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