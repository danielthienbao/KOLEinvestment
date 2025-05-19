// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu');
const navMenu = document.querySelector('.nav-menu');

mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-container')) {
        navMenu.classList.remove('active');
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu after clicking a link
            navMenu.classList.remove('active');
        }
    });
});

// FAQ Toggle
const faqItems = document.querySelectorAll('.faq-item h4');

faqItems.forEach(item => {
    item.addEventListener('click', () => {
        const parent = item.parentElement;
        parent.classList.toggle('active');
        
        // Close other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.parentElement.classList.remove('active');
            }
        });
    });
});

// Form validation
const quoteForm = document.getElementById('quoteForm');
if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Basic form validation
        const name = quoteForm.querySelector('input[type="text"]').value;
        const phone = quoteForm.querySelector('input[type="tel"]').value;
        const service = quoteForm.querySelector('select').value;
        
        if (!name || !phone || !service) {
            alert('Please fill in all required fields');
            return;
        }
        
        // Phone number validation
        const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if (!phoneRegex.test(phone)) {
            alert('Please enter a valid phone number');
            return;
        }
        
        // Here you would typically send the form data to your server
        alert('Thank you for your interest! We will contact you shortly to schedule your consultation.');
        quoteForm.reset();
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add animation to elements
document.querySelectorAll('.service-card, .step, .testimonial-card').forEach(el => {
    observer.observe(el);
});

// Add CSS class for animation
const style = document.createElement('style');
style.textContent = `
    .service-card, .step, .testimonial-card {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    
    .service-card.animate, .step.animate, .testimonial-card.animate {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Basic testimonial slider
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial');

function showTestimonial(index) {
  testimonials.forEach((testimonial, i) => {
    testimonial.style.display = i === index ? 'block' : 'none';
  });
}

function nextTestimonial() {
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  showTestimonial(currentTestimonial);
}

// Initialize testimonial display
showTestimonial(0);

// Auto rotate testimonials every 5 seconds
setInterval(nextTestimonial, 5000);

// Project image lazy loading
const projectImages = document.querySelectorAll('.project-card img');
const imageOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px 50px 0px'
};

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            observer.unobserve(img);
        }
    });
}, imageOptions);

projectImages.forEach(img => {
    imageObserver.observe(img);
});
