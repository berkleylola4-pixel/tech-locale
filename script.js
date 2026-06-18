/* ========================================
   Tech Locale - JavaScript
   Infogérance MSP Haute-Savoie
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // Pricing Toggle Solo/Multi
    const pricingToggle = document.getElementById('pricing-toggle');
    const pricingSolo = document.getElementById('pricing-solo');
    const pricingMulti = document.getElementById('pricing-multi');
    const labelSolo = document.getElementById('label-solo');
    const labelMulti = document.getElementById('label-multi');
    
    if (pricingToggle && pricingSolo && pricingMulti) {
        // Set initial state
        labelSolo.classList.add('active');
        
        pricingToggle.addEventListener('change', function() {
            if (this.checked) {
                // Show Multi, Hide Solo
                pricingSolo.style.display = 'none';
                pricingMulti.style.display = 'grid';
                labelSolo.classList.remove('active');
                labelMulti.classList.add('active');
            } else {
                // Show Solo, Hide Multi
                pricingSolo.style.display = 'grid';
                pricingMulti.style.display = 'none';
                labelSolo.classList.add('active');
                labelMulti.classList.remove('active');
            }
        });
    }
    
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            
            if (this.classList.contains('active')) {
                // Create mobile menu
                const mobileNav = document.createElement('div');
                mobileNav.className = 'mobile-nav';
                mobileNav.innerHTML = `
                    <a href="#services">Services</a>
                    <a href="#offres">Offres</a>
                    <a href="#apropos">À propos</a>
                    <a href="#contact">Contact</a>
                `;
                document.body.appendChild(mobileNav);
                mobileNav.style.cssText = `
                    position: fixed;
                    top: 80px;
                    left: 0;
                    right: 0;
                    background: white;
                    padding: 20px;
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                    z-index: 999;
                `;
                
                const mobileLinks = mobileNav.querySelectorAll('a');
                mobileLinks.forEach(link => {
                    link.style.cssText = `
                        padding: 12px;
                        font-weight: 500;
                        border-radius: 8px;
                    `;
                    link.addEventListener('click', () => {
                        mobileNav.remove();
                        mobileMenuBtn.classList.remove('active');
                    });
                });
            } else {
                const mobileNav = document.querySelector('.mobile-nav');
                if (mobileNav) mobileNav.remove();
            }
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());
            
            // Basic validation
            if (!data.name || !data.email || !data.phone || !data.message) {
                alert('Veuillez remplir tous les champs obligatoires.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                alert('Veuillez entrer une adresse email valide.');
                return;
            }
            
            // Show success message (in production, this would send to a server)
            const btn = this.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            btn.textContent = '✓ Message envoyé !';
            btn.disabled = true;
            btn.style.background = '#28a745';
            btn.style.borderColor = '#28a745';
            
            // Reset form after 3 seconds
            setTimeout(() => {
                this.reset();
                btn.textContent = originalText;
                btn.disabled = false;
                btn.style.background = '';
                btn.style.borderColor = '';
                
                alert('Merci pour votre message ! Nous vous contacterons sous 24h.');
            }, 1500);
        });
    }
    
    // Scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Add fade-in class to elements
    document.querySelectorAll('.service-card, .pricing-card, .faq-item').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });
    
    // Pricing card hover effect
    document.querySelectorAll('.pricing-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            document.querySelectorAll('.pricing-card').forEach(c => {
                if (c !== this) {
                    c.style.opacity = '0.7';
                }
            });
        });
        
        card.addEventListener('mouseleave', function() {
            document.querySelectorAll('.pricing-card').forEach(c => {
                c.style.opacity = '1';
            });
        });
    });
    
    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = sectionId;
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Phone number click tracking (optional analytics)
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('Phone click:', this.href);
            // Add analytics tracking here
        });
    });
    
    // FAQ accordion (optional enhancement)
    document.querySelectorAll('.faq-item').forEach(item => {
        item.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    });
    
    // Lazy loading for images (if added later)
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Console message for development
    console.log('%c🚀 Tech Locale - Site MSP Haute-Savoie', 'font-size: 16px; font-weight: bold; color: #0056b3;');
    console.log('%cDéveloppé pour Scionzier et la Haute-Savoie', 'color: #6c757d;');
    
});

/* Google Analytics placeholder - à activer si nécessaire */
/*
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'GA_MEASUREMENT_ID');
*/