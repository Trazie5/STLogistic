/**
 * STLogistic - Main JavaScript
 * Professional animations and interactions
 */

document.addEventListener('DOMContentLoaded', function() {
    // ========================================
    // Loading Progress Bar
    // ========================================
    const loadingBar = document.createElement('div');
    loadingBar.className = 'loading-bar';
    loadingBar.style.width = '0%';
    document.body.appendChild(loadingBar);

    let progress = 0;
    const loadInterval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadInterval);
            setTimeout(() => {
                loadingBar.style.opacity = '0';
                setTimeout(() => loadingBar.remove(), 300);
            }, 300);
        }
        loadingBar.style.width = progress + '%';
    }, 100);

    // ========================================
    // Navbar Scroll Effect
    // ========================================
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    if (navbar) {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Hide/show navbar on scroll direction
            if (currentScroll > lastScroll && currentScroll > 500) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScroll = currentScroll;
        });
    }

    // ========================================
    // Mobile Menu Toggle
    // ========================================
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuClose = document.getElementById('mobile-menu-close');

    if (mobileMenuBtn && mobileMenu) {
        const mobileLinks = mobileMenu.querySelectorAll('a');

        function toggleMobileMenu() {
            mobileMenuBtn.classList.toggle('active');
            mobileMenu.classList.toggle('open');
            document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
        }

        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
        if (mobileMenuClose) mobileMenuClose.addEventListener('click', toggleMobileMenu);
        
        mobileLinks.forEach(link => {
            link.addEventListener('click', toggleMobileMenu);
        });
    }

    // ========================================
    // Scroll Reveal Animation
    // ========================================
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ========================================
    // Counter Animation
    // ========================================
    const counters = document.querySelectorAll('.counter');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2500;
                const start = 0;
                const startTime = performance.now();

                function updateCounter(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    // Easing function (ease-out-quart)
                    const easeOut = 1 - Math.pow(1 - progress, 4);
                    const current = Math.floor(start + (target - start) * easeOut);
                    
                    counter.textContent = current.toLocaleString();
                    
                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target.toLocaleString();
                    }
                }
                
                requestAnimationFrame(updateCounter);
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    // ========================================
    // Testimonial Carousel
    // ========================================
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const testimonialDots = document.querySelectorAll('.testimonial-dot');
    const prevBtn = document.getElementById('prev-testimonial');
    const nextBtn = document.getElementById('next-testimonial');
    let currentSlide = 0;
    let autoSlideInterval;

    function showSlide(index) {
        testimonialSlides.forEach((slide, i) => {
            slide.style.opacity = '0';
            slide.style.transform = 'translateX(50px)';
            slide.style.position = 'absolute';
            slide.style.transition = 'all 0.5s ease';
            
            setTimeout(() => {
                if (i === index) {
                    slide.style.position = 'relative';
                    slide.style.opacity = '1';
                    slide.style.transform = 'translateX(0)';
                }
            }, 50);
        });

        testimonialDots.forEach((dot, i) => {
            dot.classList.toggle('bg-blue-500', i === index);
            dot.classList.toggle('bg-slate-600', i !== index);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % testimonialSlides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
        showSlide(currentSlide);
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            stopAutoSlide();
            nextSlide();
            startAutoSlide();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            stopAutoSlide();
            prevSlide();
            startAutoSlide();
        });
    }

    if (testimonialDots.length > 0) {
        testimonialDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                stopAutoSlide();
                currentSlide = index;
                showSlide(currentSlide);
                startAutoSlide();
            });
        });
    }

    // Initialize first slide only if elements exist
    if (testimonialSlides.length > 0) {
        showSlide(0);
        startAutoSlide();
    }

    // ========================================
    // Smooth Scroll for Anchor Links
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // Particle Background
    // ========================================
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 15 + 's';
            particle.style.animationDuration = (10 + Math.random() * 10) + 's';
            particle.style.width = (2 + Math.random() * 4) + 'px';
            particle.style.height = particle.style.width;
            particle.style.opacity = Math.random() * 0.5 + 0.1;
            particlesContainer.appendChild(particle);
        }
    }

    // ========================================
    // Parallax Effect for Hero
    // ========================================
    const heroSection = document.getElementById('hero');
    const heroImage = document.querySelector('.hero-image');

    if (heroSection && heroImage) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            heroImage.style.transform = `translateY(${rate}px)`;
        });
    }

    // ========================================
    // Service Card Tilt Effect
    // ========================================
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // ========================================
    // Contact Form Handling
    // ========================================
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = '<span class="inline-block animate-spin mr-2">&#9696;</span> Envoi en cours...';
            btn.disabled = true;
            
            setTimeout(() => {
                btn.innerHTML = '&#10003; Message envoye !';
                btn.classList.remove('bg-blue-600', 'hover:bg-blue-700');
                btn.classList.add('bg-green-600', 'hover:bg-green-700');
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.classList.remove('bg-green-600', 'hover:bg-green-700');
                    btn.classList.add('bg-blue-600', 'hover:bg-blue-700');
                    btn.disabled = false;
                    contactForm.reset();
                }, 3000);
            }, 2000);
        });
    }

    // ========================================
    // Newsletter Form
    // ========================================
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = newsletterForm.querySelector('input');
            const btn = newsletterForm.querySelector('button');
            
            btn.textContent = 'Inscrit!';
            btn.classList.add('bg-green-600');
            input.value = '';
            
            setTimeout(() => {
                btn.textContent = 'S\'inscrire';
                btn.classList.remove('bg-green-600');
            }, 3000);
        });
    }

    // ========================================
    // Process Step Animation
    // ========================================
    const processSteps = document.querySelectorAll('.process-step');
    
    const processObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, index * 200);
                processObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    processSteps.forEach(step => processObserver.observe(step));

    // ========================================
    // Back to Top Button
    // ========================================
    const backToTop = document.getElementById('back-to-top');
    
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ========================================
    // Typing Effect for Hero Title
    // ========================================
    const typingElement = document.querySelector('.typing-effect');
    if (typingElement) {
        const text = typingElement.getAttribute('data-text') || typingElement.textContent;
        typingElement.textContent = '';
        typingElement.style.opacity = '1';
        
        let charIndex = 0;
        function typeChar() {
            if (charIndex < text.length) {
                typingElement.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(typeChar, 50);
            }
        }
        
        setTimeout(typeChar, 500);
    }

    // ========================================
    // Stats Bar Animation
    // ========================================
    const statBars = document.querySelectorAll('.stat-bar');
    
    const statBarObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width');
                bar.style.width = width + '%';
                statBarObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });

    statBars.forEach(bar => statBarObserver.observe(bar));

    // ========================================
    // Image Lazy Loading with Fade
    // ========================================
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));

    // ========================================
    // Magnetic Button Effect
    // ========================================
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });

    // ========================================
    // Scroll Progress Indicator
    // ========================================
    const scrollProgress = document.getElementById('scroll-progress');
    if (scrollProgress) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            scrollProgress.style.width = scrollPercent + '%';
        });
    }

    // ========================================
    // Active Navigation Link on Scroll
    // ========================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('text-blue-400');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('text-blue-400');
            }
        });
    });

    // ========================================
    // Glitch Text Effect on Hover
    // ========================================
    const glitchTexts = document.querySelectorAll('.glitch-text');
    
    glitchTexts.forEach(text => {
        const originalText = text.textContent;
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        
        text.addEventListener('mouseenter', () => {
            let iterations = 0;
            const interval = setInterval(() => {
                text.textContent = originalText
                    .split('')
                    .map((char, index) => {
                        if (index < iterations) {
                            return originalText[index];
                        }
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join('');
                
                if (iterations >= originalText.length) {
                    clearInterval(interval);
                }
                
                iterations += 1/3;
            }, 30);
        });
    });

    // ========================================
    // Ripple Effect on Buttons
    // ========================================
    const rippleBtns = document.querySelectorAll('.ripple-btn');
    
    rippleBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // ========================================
    // Marquee Animation
    // ========================================
    const marqueeContent = document.querySelector('.marquee-content');
    if (marqueeContent) {
        const clone = marqueeContent.cloneNode(true);
        marqueeContent.parentElement.appendChild(clone);
    }

    // ========================================
    // 3D Card Flip on Click
    // ========================================
    const flipCards = document.querySelectorAll('.flip-card');
    
    flipCards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
    });

    // ========================================
    // Cursor Glow Effect
    // ========================================
    const cursorGlow = document.getElementById('cursor-glow');
    if (cursorGlow && window.matchMedia('(pointer: fine)').matches) {
        document.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top = e.clientY + 'px';
        });
    }

    // ========================================
    // Wave Text Animation
    // ========================================
    const waveTexts = document.querySelectorAll('.wave-text');
    
    waveTexts.forEach(text => {
        const content = text.textContent;
        text.textContent = '';
        
        content.split('').forEach((char, i) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.animationDelay = `${i * 0.05}s`;
            text.appendChild(span);
        });
    });

    // ========================================
    // Confetti on CTA Click
    // ========================================
    const confettiBtns = document.querySelectorAll('.confetti-btn');
    
    confettiBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            createConfetti(e.clientX, e.clientY);
        });
    });

    function createConfetti(x, y) {
        const colors = ['#3b82f6', '#60a5fa', '#93c5fd', '#1e40af', '#f59e0b', '#10b981'];
        
        for (let i = 0; i < 30; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                left: ${x}px;
                top: ${y}px;
                width: 8px;
                height: 8px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
                pointer-events: none;
                z-index: 9999;
            `;
            
            document.body.appendChild(confetti);
            
            const angle = (Math.PI * 2 * i) / 30;
            const velocity = 5 + Math.random() * 10;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity - 5;
            
            let posX = x;
            let posY = y;
            let opacity = 1;
            
            const animate = () => {
                posX += vx;
                posY += vy + 2;
                opacity -= 0.02;
                
                confetti.style.left = posX + 'px';
                confetti.style.top = posY + 'px';
                confetti.style.opacity = opacity;
                
                if (opacity > 0) {
                    requestAnimationFrame(animate);
                } else {
                    confetti.remove();
                }
            };
            
            requestAnimationFrame(animate);
        }
    }

    // ========================================
    // Floating Label for Inputs
    // ========================================
    const floatingInputs = document.querySelectorAll('.floating-input');
    
    floatingInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });

    // ========================================
    // Chatbot Toggle
    // ========================================
    window.toggleChatbot = function() {
        const chatbot = document.getElementById('chatbot');
        if (chatbot) {
            chatbot.classList.toggle('open');
        }
    };

    window.sendChatbotMessage = function() {
        const input = document.getElementById('chatbot-message');
        const body = document.getElementById('chatbot-body');

        if (!input || !body) {
            return;
        }

        const message = input.value.trim();
        if (!message) {
            return;
        }

        const userMessage = document.createElement('div');
        userMessage.className = 'chat-message user';
        userMessage.textContent = message;
        body.appendChild(userMessage);

        const botMessage = document.createElement('div');
        botMessage.className = 'chat-message bot';
        botMessage.textContent = 'Merci pour votre message. Notre equipe vous repondra tres bientot.';

        window.setTimeout(() => {
            body.appendChild(botMessage);
            body.scrollTop = body.scrollHeight;
        }, 400);

        input.value = '';
        body.scrollTop = body.scrollHeight;
    };

    const chatbotInput = document.getElementById('chatbot-message');
    if (chatbotInput) {
        chatbotInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                window.sendChatbotMessage();
            }
        });
    }

    // ========================================
    // Preloader Complete
    // ========================================
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
});

