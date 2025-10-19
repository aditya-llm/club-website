document.addEventListener('DOMContentLoaded', function() {

    // Mobile navigation toggle (hamburger menu)
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });

    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevents the form from actually submitting

        // You can add form validation logic here

        // Show a confirmation message
        alert('Thank you for your message! We will get back to you soon.');
        
        // Clear the form fields
        contactForm.reset();
    });

});

/**
 * Counter Animation Functionality (Run on scroll-in)
 */
function startCounterAnimation(entries, observer) {
    entries.forEach(entry => {
        // Check if the section is intersecting (visible)
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat-number');
            
            counters.forEach(counter => {
                const updateCount = () => {
                    // Get the final target number from the data-target attribute
                    const target = +counter.getAttribute('data-target'); 
                    // Get the current number displayed
                    const count = +counter.innerText;
                    
                    // Set a stepping increment (adjust for speed/smoothness)
                    // The larger the number, the faster the count. 
                    const increment = target / 300; 
                    
                    if (count < target) {
                        // Increase the count and round up
                        counter.innerText = Math.ceil(count + increment);
                        // Call updateCount again after a short delay (e.g., 1ms)
                        setTimeout(updateCount, 1);
                    } else {
                        // Ensure the final target number is exactly displayed
                        counter.innerText = target;
                    }
                };
                updateCount();
            });

            // Stop observing once the animation has started
            observer.unobserve(entry.target);
        }
    });
}

// Ensure the main DOMContentLoaded block contains the logic to start the observer
document.addEventListener('DOMContentLoaded', () => {
    // ... (Your existing JavaScript logic) ...

    const statsSection = document.querySelector('.stats-counter-section');
    
    if (statsSection) {
        // Create a new Intersection Observer
        const observerOptions = {
            root: null, // relative to the viewport
            rootMargin: '0px',
            threshold: 0.5 // trigger when 50% of the section is visible
        };

        const counterObserver = new IntersectionObserver(startCounterAnimation, observerOptions);
        
        // Start observing the stats section
        counterObserver.observe(statsSection);
    }
});