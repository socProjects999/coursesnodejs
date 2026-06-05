// Frontend navigation and button click event handler
document.addEventListener('DOMContentLoaded', () => {
    // Get all register buttons
    const registerButtons = document.querySelectorAll('.register-btn');
    
    // Add click event listeners to each button
    registerButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const course = e.target.getAttribute('data-course');
            if (course) {
                // Redirect to the specific course page
                window.location.href = `/courses/${course}`;
            }
        });
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});
