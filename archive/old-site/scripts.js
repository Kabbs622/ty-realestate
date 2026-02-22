        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe all fade-in elements
        document.addEventListener('DOMContentLoaded', function() {
            const fadeElements = document.querySelectorAll('.fade-in');
            fadeElements.forEach(el => observer.observe(el));

            // Community filter functionality
            const filterBtns = document.querySelectorAll('.filter-btn');
            const communityCards = document.querySelectorAll('.community-card');

            filterBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    // Remove active class from all buttons
                    filterBtns.forEach(b => b.classList.remove('active'));
                    // Add active class to clicked button
                    btn.classList.add('active');

                    const filter = btn.getAttribute('data-filter');

                    communityCards.forEach(card => {
                        if (filter === 'all') {
                            card.style.display = 'block';
                            // Re-trigger animation
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'translateY(0)';
                            }, 100);
                        } else {
                            const cardBuilder = card.getAttribute('data-builder');
                            if (cardBuilder === filter) {
                                card.style.display = 'block';
                                setTimeout(() => {
                                    card.style.opacity = '1';
                                    card.style.transform = 'translateY(0)';
                                }, 100);
                            } else {
                                card.style.opacity = '0';
                                card.style.transform = 'translateY(30px)';
                                setTimeout(() => {
                                    card.style.display = 'none';
                                }, 300);
                            }
                        }
                    });
                });
            });

            // Mobile menu toggle (basic functionality)
            const mobileMenu = document.querySelector('.mobile-menu');
            const navLinks = document.querySelector('.nav-links');

            mobileMenu.addEventListener('click', () => {
                navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            });

            // Smooth scrolling for navigation links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        const headerHeight = document.querySelector('.header').offsetHeight;
                        const targetPosition = target.offsetTop - headerHeight;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                });
            });

            // Header scroll effect and mobile CTA bar
            let lastScrollTop = 0;
            const header = document.querySelector('.header');
            const mobileCTA = document.getElementById('mobileCTA');
            const heroSection = document.querySelector('#hero');
            
            window.addEventListener('scroll', () => {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                // Header scroll effect
                if (scrollTop > lastScrollTop && scrollTop > 100) {
                    // Scrolling down
                    header.style.transform = 'translateY(-100%)';
                } else {
                    // Scrolling up
                    header.style.transform = 'translateY(0)';
                }
                
                // Mobile CTA bar visibility (only on mobile)
                if (window.innerWidth <= 768) {
                    const heroHeight = heroSection.offsetHeight;
                    if (scrollTop > heroHeight) {
                        mobileCTA.classList.add('visible');
                    } else {
                        mobileCTA.classList.remove('visible');
                    }
                }
                
                lastScrollTop = scrollTop;
            });

            // Handle window resize for mobile CTA
            window.addEventListener('resize', () => {
                if (window.innerWidth > 768) {
                    mobileCTA.classList.remove('visible');
                }
            });

            // Home inquiry pre-filling
            document.addEventListener('click', (e) => {
                if (e.target.classList.contains('home-cta-link')) {
                    const community = e.target.getAttribute('data-community');
                    if (community) {
                        // Pre-fill the community dropdown when user reaches contact form
                        setTimeout(() => {
                            const communitySelect = document.getElementById('community');
                            if (communitySelect) {
                                communitySelect.value = community;
                            }
                        }, 500);
                    }
                }
            });
        });
