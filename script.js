/* ======================================================
   AKSHIT PAWAR — PORTFOLIO SCRIPTS
   ====================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ===================== LOADER ===================== */
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = 'auto';
        initRevealAnimations();
    }, 3000);

    // Prevent scroll during loader
    document.body.style.overflow = 'hidden';

    /* ===================== CURSOR GLOW ===================== */
    const cursorGlow = document.getElementById('cursorGlow');
    if (window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top = e.clientY + 'px';
        });
    }

    /* ===================== NAVBAR ===================== */
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const allNavLinks = document.querySelectorAll('.nav-link');

    // Scroll → add "scrolled" class
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
        updateActiveNav();
    });

    // Mobile toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('open');
    });

    // Close mobile nav on link click
    allNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });

    // Active nav link based on scroll position
    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.scrollY + 150;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            const link = document.querySelector(`.nav-link[href="#${id}"]`);

            if (link) {
                if (scrollY >= top && scrollY < top + height) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            }
        });
    }

    /* ===================== HERO TYPING EFFECT ===================== */
    const typingEl = document.getElementById('heroTyping');
    const phrases = [
        'Computer Engineering Student',
        'Web Developer',
        'Game Development Enthusiast',
        'Quick Learner & Team Player'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typingEl.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 40;
        } else {
            typingEl.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 80;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            typingSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 400; // Pause before next
        }

        setTimeout(typeEffect, typingSpeed);
    }

    // Start typing after loader
    setTimeout(typeEffect, 3200);

    /* ===================== HERO PARTICLES ===================== */
    const particlesContainer = document.getElementById('heroParticles');
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.classList.add('hero-particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (4 + Math.random() * 4) + 's';
        particlesContainer.appendChild(particle);
    }

    /* ===================== STAT COUNTER ===================== */
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 1500;
            const step = target / (duration / 16);
            let current = 0;

            const update = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.ceil(current);
                    requestAnimationFrame(update);
                } else {
                    counter.textContent = target;
                }
            };
            update();
        });
    }

    /* ===================== SCROLL REVEAL ===================== */
    function initRevealAnimations() {
        // Add reveal class to elements
        const revealTargets = [
            '.about-text',
            '.about-details',
            '.skill-category',
            '.project-card',
            '.timeline-item',
            '.achievement-card',
            '.contact-card'
        ];

        revealTargets.forEach(selector => {
            document.querySelectorAll(selector).forEach((el, i) => {
                el.classList.add('reveal');
                el.style.transitionDelay = (i * 0.1) + 's';
            });
        });

        // Intersection Observer for revealing
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');

                    // Trigger counters when about section is visible
                    if (entry.target.classList.contains('about-text')) {
                        animateCounters();
                    }

                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        document.querySelectorAll('.reveal').forEach(el => {
            observer.observe(el);
        });
    }

    /* ===================== SMOOTH SCROLL ===================== */
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    /* ===================== TILT EFFECT ON PROJECT CARDS ===================== */
    if (window.innerWidth > 768) {
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            });
        });
    }

});
