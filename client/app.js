// Frontend navigation and button click event handler
document.addEventListener('DOMContentLoaded', () => {
    // Dark mode toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    // Theme toggle button event listener
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }
    
    function updateThemeIcon(theme) {
        if (themeToggle) {
            themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
        }
    }

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
