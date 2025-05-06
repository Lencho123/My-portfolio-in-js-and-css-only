// Mobile menu toggle functionality
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        navLinks.classList.remove('active');
        const menuIcon = menuToggle.querySelector('i');
        menuIcon.classList.add('fa-bars');
        menuIcon.classList.remove('fa-times');
    }
});

// Close menu when clicking a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const menuIcon = menuToggle.querySelector('i');
        menuIcon.classList.add('fa-bars');
        menuIcon.classList.remove('fa-times');
    });
});

// Dark mode toggle functionality
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.classList.toggle('light-mode', savedTheme === 'light');
    updateThemeIcon();
} else {
    // Set dark theme as default
    body.classList.remove('light-mode');
    updateThemeIcon();
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    updateThemeIcon();
    
    // Save theme preference
    const isLightMode = body.classList.contains('light-mode');
    localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
});

function updateThemeIcon() {
    const icon = themeToggle.querySelector('i');
    if (body.classList.contains('light-mode')) {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    } else {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
}

// Typing animation
const typedText = document.querySelector('.typed');
const texts = ['Beautiful Websites', 'User Experiences', 'Responsive Websites'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typedText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(type, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(type, 500);
    } else {
        setTimeout(type, isDeleting ? 100 : 200);
    }
}

// Start typing animation
type();

// Scroll to About section when clicking mouse icon
const scrollIndicator = document.querySelector('.scroll-indicator');
scrollIndicator.addEventListener('click', () => {
    const aboutSection = document.querySelector('#about');
    aboutSection.scrollIntoView({ behavior: 'smooth' });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scrolled');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scrolled')) {
        navbar.classList.add('scrolled');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scrolled')) {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Scroll to top button
const scrollTopBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

//  Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwr2GGq5zpzh-DAVBUdwapxGIHNEmgISdD4M-CJtDBI5LXgmDlqQ76GE8r775IHibH5rA/exec';

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Show loading state
    const submitButton = contactForm.querySelector('.submit-button');
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    try {
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Since we're using no-cors, we can't read the response
        // We'll assume success if no error is thrown
        formStatus.textContent = 'Message sent successfully!';
        formStatus.className = 'form-status success';
        contactForm.reset();
    } catch (error) {
        console.error('Error:', error);
        formStatus.textContent = 'Failed to send message. Please try again.';
        formStatus.className = 'form-status error';
    } finally {
        // Reset button state
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
    }

    // Show status message
    formStatus.style.display = 'block';

    // Hide status message after 5 seconds
    setTimeout(() => {
        formStatus.style.display = 'none';
    }, 5000);
});

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  
  var timestamp = new Date();
  var name = data.name;
  var email = data.email;
  var message = data.message;
  
  sheet.appendRow([timestamp, name, email, message]);
  
  return ContentService.createTextOutput(JSON.stringify({
    'result': 'success',
    'row': sheet.getLastRow()
  })).setMimeType(ContentService.MimeType.JSON);
} 