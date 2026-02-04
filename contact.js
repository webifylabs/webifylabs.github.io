// Contact Form Handler
class ContactFormHandler {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.submitButton = this.form.querySelector('.btn-submit');
        this.formMessage = document.getElementById('formMessage');
        this.init();
    }

    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Add real-time validation
        const inputs = this.form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    this.validateField(input);
                }
            });
        });
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;

        // Reset error state
        field.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        field.classList.remove('error');

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
        }

        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
            }
        }

        // Phone validation (basic)
        if (field.type === 'tel' && value) {
            const phoneRegex = /^[\d\s\-\+\(\)]+$/;
            if (!phoneRegex.test(value)) {
                isValid = false;
            }
        }

        if (!isValid) {
            field.style.borderColor = '#ef4444';
            field.classList.add('error');
        }

        return isValid;
    }

    validateForm() {
        const inputs = this.form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        return isValid;
    }

    async handleSubmit(e) {
        e.preventDefault();

        // Validate form
        if (!this.validateForm()) {
            this.showMessage('Please fill in all required fields correctly.', 'error');
            return;
        }

        // Get form data
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);

        // Show loading state
        this.submitButton.classList.add('loading');
        this.submitButton.disabled = true;
        this.hideMessage();

        // Simulate form submission (replace with actual API call)
        try {
            await this.submitForm(data);
            this.showMessage('Thank you! Your message has been sent successfully. We\'ll get back to you soon.', 'success');
            this.form.reset();
        } catch (error) {
            this.showMessage('Oops! Something went wrong. Please try again later.', 'error');
        } finally {
            this.submitButton.classList.remove('loading');
            this.submitButton.disabled = false;
        }
    }

    async submitForm(data) {
        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Form submitted:', data);
                resolve();
            }, 2000);
        });

        // In production, replace with actual API call:
        // const response = await fetch('/api/contact', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(data)
        // });
        // if (!response.ok) throw new Error('Submission failed');
        // return response.json();
    }

    showMessage(message, type) {
        this.formMessage.textContent = message;
        this.formMessage.className = `form-message ${type}`;
        
        // Auto-hide success message after 5 seconds
        if (type === 'success') {
            setTimeout(() => this.hideMessage(), 5000);
        }
    }

    hideMessage() {
        this.formMessage.style.display = 'none';
        setTimeout(() => {
            this.formMessage.className = 'form-message';
        }, 300);
    }
}

// Input animations
class InputAnimations {
    constructor() {
        this.inputs = document.querySelectorAll('input, textarea, select');
        this.init();
    }

    init() {
        this.inputs.forEach(input => {
            // Add focus effect
            input.addEventListener('focus', (e) => {
                this.addFocusEffect(e.target);
            });

            input.addEventListener('blur', (e) => {
                this.removeFocusEffect(e.target);
            });
        });
    }

    addFocusEffect(element) {
        element.style.transform = 'scale(1.01)';
    }

    removeFocusEffect(element) {
        element.style.transform = 'scale(1)';
    }
}

// Floating labels effect
class FloatingLabels {
    constructor() {
        this.formGroups = document.querySelectorAll('.form-group');
        this.init();
    }

    init() {
        this.formGroups.forEach(group => {
            const input = group.querySelector('input, textarea, select');
            const label = group.querySelector('label');

            if (input && label) {
                input.addEventListener('focus', () => {
                    label.style.color = 'var(--primary-color)';
                    label.style.transform = 'translateY(-2px)';
                });

                input.addEventListener('blur', () => {
                    label.style.color = 'var(--text-primary)';
                    label.style.transform = 'translateY(0)';
                });
            }
        });
    }
}

// FAQ Accordion (optional enhancement)
class FAQAccordion {
    constructor() {
        this.faqItems = document.querySelectorAll('.faq-item');
        this.init();
    }

    init() {
        this.faqItems.forEach(item => {
            item.addEventListener('click', () => {
                // Add subtle pulse effect on click
                item.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    item.style.transform = '';
                }, 150);
            });
        });
    }
}

// Navbar scroll effect
class NavbarScroll {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                this.navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
            } else {
                this.navbar.style.boxShadow = 'none';
            }
        });
    }
}

// Initialize all components
document.addEventListener('DOMContentLoaded', () => {
    new ContactFormHandler();
    new InputAnimations();
    new FloatingLabels();
    new FAQAccordion();
    new NavbarScroll();

    // Add page load animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});
