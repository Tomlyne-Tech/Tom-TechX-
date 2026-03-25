// ========== DOM ELEMENTS ==========
const menuToggle = document.getElementById('menu-toggle');
const navbar = document.getElementById('navbar');
const yearSpan = document.getElementById('current-year');

// ========== MOBILE MENU TOGGLE ==========
if (menuToggle && navbar) {
    menuToggle.addEventListener('click', () => {
        const isExpanded = navbar.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', isExpanded);
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav a').forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

// ========== DYNAMIC COPYRIGHT YEAR ==========
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// ========== SMOOTH SCROLLING ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========== ACTIVE NAVIGATION ON SCROLL ==========
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav a');

function updateActiveNav() {
    let current = '';
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href').substring(1);
        if (href === current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);
updateActiveNav();

// ========== SKILL BARS ANIMATION ==========
const skillBars = document.querySelectorAll('.skill-progress');
let skillsAnimated = false;

function animateSkillBars() {
    if (skillsAnimated) return;
    
    skillBars.forEach(bar => {
        const level = bar.getAttribute('data-level');
        if (level) {
            bar.style.width = level + '%';
        }
    });
    skillsAnimated = true;
}

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillBars();
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

const skillsSection = document.querySelector('.skills-section');
if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// ========== SECTION FADE-IN ANIMATION ==========
const fadeElements = document.querySelectorAll('.about-section, .skills-section, .projects-section, .contact-section');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

fadeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(el);
});

// ========== HEADER BACKGROUND ON SCROLL ==========
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.background = 'rgba(10, 10, 10, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'rgba(17, 17, 17, 0.95)';
    }
});

// ========== TYPEWRITER EFFECT ==========
const typewriterElement = document.getElementById('typewriter-text');
if (typewriterElement) {
    const titles = ['Full-Stack Developer', 'Tech Enthusiast', 'Problem Solver', 'Innovation Seeker'];
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let currentText = '';

    function typeWriter() {
        const currentTitle = titles[titleIndex];
        
        if (isDeleting) {
            currentText = currentTitle.substring(0, charIndex - 1);
            charIndex--;
        } else {
            currentText = currentTitle.substring(0, charIndex + 1);
            charIndex++;
        }
        
        typewriterElement.textContent = currentText;
        
        if (!isDeleting && charIndex === currentTitle.length) {
            isDeleting = true;
            setTimeout(typeWriter, 2000);
            return;
        }
        
        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            setTimeout(typeWriter, 500);
            return;
        }
        
        const speed = isDeleting ? 50 : 100;
        setTimeout(typeWriter, speed);
    }
    
    typeWriter();
}

// ========== FORM SUBMISSION HANDLER ==========
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Formspree handles the actual submission
        // This just provides visual feedback
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// ========== LAZY LOADING OPTIMIZATION ==========
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.setAttribute('loading', 'lazy');
    });
}

// ========== PREVENT SCROLLING WHEN MENU IS OPEN ==========
if (menuToggle && navbar) {
    menuToggle.addEventListener('click', () => {
        if (navbar.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    document.querySelectorAll('.nav a').forEach(link => {
        link.addEventListener('click', () => {
            document.body.style.overflow = '';
        });
    });
}

// ========== ADD ARIA LABELS FOR ACCESSIBILITY ==========
document.querySelectorAll('.social-icon').forEach(icon => {
    if (!icon.getAttribute('aria-label')) {
        const platform = icon.classList.toString().split(' ').find(cls => 
            ['whatsapp', 'instagram', 'github', 'facebook', 'tiktok'].includes(cls)
        );
        if (platform) {
            icon.setAttribute('aria-label', `Visit ${platform} profile`);
        }
    }
});

console.log('Tom Tech Solutions Portfolio - Fully Loaded!');