/**
 * Ty Real Estate - Premium JavaScript
 * Dark mode, animations, mortgage calculator, exit intent, mobile features
 */

// Dark Mode Toggle
(function() {
  const themeToggle = document.createElement('button');
  themeToggle.className = 'theme-toggle';
  themeToggle.innerHTML = '🌙';
  themeToggle.setAttribute('aria-label', 'Toggle dark mode');
  document.body.appendChild(themeToggle);

  // Check for saved theme preference
  const currentTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateToggleIcon(currentTheme);

  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateToggleIcon(newTheme);
  });

  function updateToggleIcon(theme) {
    themeToggle.innerHTML = theme === 'light' ? '🌙' : '☀️';
  }
})();

// Intersection Observer for Scroll Reveals
(function() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();

// Exit Intent Popup
(function() {
  let exitIntentShown = false;
  
  // Create popup HTML
  const popup = document.createElement('div');
  popup.className = 'exit-popup';
  popup.id = 'exitPopup';
  popup.innerHTML = `
    <div class="exit-popup-content">
      <h2 style="color: var(--accent); margin-bottom: 1rem;">Wait! Before You Go...</h2>
      <p style="margin-bottom: 1.5rem; color: var(--text-secondary);">
        Get our exclusive Prescott Relocation Guide with insider tips on the best communities for retirees.
      </p>
      <form action="https://formsubmit.co/kabbott622@gmail.com" method="POST" style="text-align: left;">
        <input type="hidden" name="_next" value="https://kabbs622.github.io/ty-realestate/thanks.html">
        <input type="hidden" name="_subject" value="Exit Intent - Relocation Guide Request">
        <input type="text" name="name" placeholder="Your Name" required style="width: 100%; padding: 0.75rem; margin-bottom: 0.75rem; border-radius: 8px; border: 1px solid var(--border); background: var(--bg-primary);">
        <input type="email" name="email" placeholder="Your Email" required style="width: 100%; padding: 0.75rem; margin-bottom: 1rem; border-radius: 8px; border: 1px solid var(--border); background: var(--bg-primary);">
        <button type="submit" class="btn-premium btn-premium-primary" style="width: 100%;">Send Me The Guide!</button>
      </form>
      <button onclick="closeExitPopup()" style="margin-top: 1rem; background: none; border: none; color: var(--text-secondary); cursor: pointer; text-decoration: underline;">
        No thanks, I'll browse more
      </button>
    </div>
  `;
  document.body.appendChild(popup);

  // Detect exit intent (mouse leaving top of viewport)
  document.addEventListener('mouseleave', (e) => {
    if (e.clientY < 10 && !exitIntentShown && !sessionStorage.getItem('exitIntentShown')) {
      showExitPopup();
    }
  });

  // Also show after 30 seconds if user hasn't scrolled much
  setTimeout(() => {
    if (!exitIntentShown && !sessionStorage.getItem('exitIntentShown') && window.scrollY < 500) {
      showExitPopup();
    }
  }, 30000);

  function showExitPopup() {
    popup.classList.add('active');
    exitIntentShown = true;
    sessionStorage.setItem('exitIntentShown', 'true');
  }

  window.closeExitPopup = function() {
    popup.classList.remove('active');
  };

  // Close on backdrop click
  popup.addEventListener('click', (e) => {
    if (e.target === popup) closeExitPopup();
  });
})();

// Sticky Mobile Navigation Bar
(function() {
  if (window.innerWidth <= 768) {
    const stickyBar = document.createElement('div');
    stickyBar.className = 'sticky-mobile-bar';
    stickyBar.innerHTML = `
      <a href="tel:+18015550123" class="sticky-mobile-btn">
        <span>📞</span>
        <span>Call</span>
      </a>
      <a href="sms:+18015550123" class="sticky-mobile-btn">
        <span>💬</span>
        <span>Text</span>
      </a>
      <a href="#contact" class="sticky-mobile-btn">
        <span>✉️</span>
        <span>Email</span>
      </a>
      <a href="retire-in-prescott.html" class="sticky-mobile-btn">
        <span>📋</span>
        <span>Guide</span>
      </a>
    `;
    document.body.appendChild(stickyBar);
    
    // Add padding to body to prevent content from being hidden
    document.body.style.paddingBottom = '80px';
  }
})();

// Floating Chat Button
(function() {
  const chatBtn = document.createElement('div');
  chatBtn.className = 'chat-button';
  chatBtn.innerHTML = '💬';
  chatBtn.title = 'Chat with Ty';
  document.body.appendChild(chatBtn);

  chatBtn.addEventListener('click', () => {
    // Placeholder for chat functionality
    alert('Chat feature coming soon! Call or text (801) 555-0123 for now.');
  });
})();

// Mortgage Calculator
(function() {
  // Only initialize if calculator exists on page
  const calculator = document.getElementById('mortgageCalculator');
  if (!calculator) return;

  const homePriceInput = document.getElementById('homePrice');
  const downPaymentInput = document.getElementById('downPayment');
  const interestRateInput = document.getElementById('interestRate');
  const loanTermInput = document.getElementById('loanTerm');
  const monthlyPaymentDisplay = document.getElementById('monthlyPayment');

  function calculateMortgage() {
    const homePrice = parseFloat(homePriceInput?.value) || 500000;
    const downPayment = parseFloat(downPaymentInput?.value) || 100000;
    const interestRate = parseFloat(interestRateInput?.value) || 6.5;
    const loanTerm = parseInt(loanTermInput?.value) || 30;

    const loanAmount = homePrice - downPayment;
    const monthlyRate = (interestRate / 100) / 12;
    const numberOfPayments = loanTerm * 12;

    let monthlyPayment;
    if (interestRate === 0) {
      monthlyPayment = loanAmount / numberOfPayments;
    } else {
      monthlyPayment = loanAmount * (
        (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
      );
    }

    // Add estimated taxes and insurance (roughly 1.2% annually)
    const monthlyTaxesInsurance = (homePrice * 0.012) / 12;
    const totalMonthly = monthlyPayment + monthlyTaxesInsurance;

    if (monthlyPaymentDisplay) {
      monthlyPaymentDisplay.textContent = '$' + totalMonthly.toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
    }
  }

  // Add event listeners
  [homePriceInput, downPaymentInput, interestRateInput, loanTermInput].forEach(input => {
    if (input) {
      input.addEventListener('input', calculateMortgage);
    }
  });

  // Initial calculation
  calculateMortgage();
})();

// Before/After Slider
(function() {
  const sliders = document.querySelectorAll('.before-after-container');
  
  sliders.forEach(container => {
    const slider = container.querySelector('.before-after-slider');
    const handle = container.querySelector('.before-after-handle');
    
    if (!slider || !handle) return;

    let isDragging = false;

    const updateSlider = (x) => {
      const rect = container.getBoundingClientRect();
      let percentage = ((x - rect.left) / rect.width) * 100;
      percentage = Math.max(0, Math.min(100, percentage));
      slider.style.width = percentage + '%';
      handle.style.left = percentage + '%';
    };

    handle.addEventListener('mousedown', () => isDragging = true);
    document.addEventListener('mouseup', () => isDragging = false);
    document.addEventListener('mousemove', (e) => {
      if (isDragging) updateSlider(e.clientX);
    });

    // Touch support
    handle.addEventListener('touchstart', () => isDragging = true);
    document.addEventListener('touchend', () => isDragging = false);
    document.addEventListener('touchmove', (e) => {
      if (isDragging) updateSlider(e.touches[0].clientX);
    });

    // Click to position
    container.addEventListener('click', (e) => {
      updateSlider(e.clientX);
    });
  });
})();

// Smooth Scroll for Anchor Links
(function() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
})();

// Parallax Effect on Scroll
(function() {
  const parallaxElements = document.querySelectorAll('.parallax');
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    parallaxElements.forEach(el => {
      const speed = el.dataset.speed || 0.5;
      el.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });
})();

// Lazy Loading Images
(function() {
  const lazyImages = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });

  lazyImages.forEach(img => imageObserver.observe(img));
})();

// Counter Animation for Stats
(function() {
  const counters = document.querySelectorAll('.counter');
  
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.dataset.target);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
          current += step;
          if (current < target) {
            counter.textContent = Math.floor(current).toLocaleString();
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target.toLocaleString();
          }
        };

        updateCounter();
        counterObserver.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));
})();

// Form Validation Enhancement
(function() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      const requiredFields = form.querySelectorAll('[required]');
      let isValid = true;

      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.style.borderColor = '#ef4444';
        } else {
          field.style.borderColor = '';
        }
      });

      if (!isValid) {
        e.preventDefault();
        alert('Please fill in all required fields.');
      }
    });
  });
})();

// Header Scroll Effect
(function() {
  const header = document.querySelector('.header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      header?.classList.add('header-scrolled');
    } else {
      header?.classList.remove('header-scrolled');
    }

    lastScroll = currentScroll;
  });
})();

// Mobile Menu Toggle
function toggleMobileMenu() {
  const navLinks = document.querySelector('.nav-links');
  if (navLinks) {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
  }
}

// Community Comparison Tool
(function() {
  const comparisonSelect = document.getElementById('compareCommunity1');
  if (!comparisonSelect) return;

  const communityData = {
    'granite-dells': {
      name: 'Granite Dells Estates',
      price: 'From $949,900',
      beds: '3-5 + Study',
      sqft: '2,189-3,760',
      features: ['Gated', 'Clubhouse', 'Pool', 'Pickleball']
    },
    'hidden-hills': {
      name: 'Hidden Hills',
      price: 'From $949,900',
      beds: '3 + Study',
      sqft: '2,189-3,251',
      features: ['Forest Views', 'Private', '0.25 Acre Lots']
    },
    'jasper-7': {
      name: 'Jasper 7',
      price: 'From $459,900',
      beds: '2-4',
      sqft: '1,281-1,958',
      features: ['J Club', 'Modern Design', 'Affordable']
    }
  };

  comparisonSelect.addEventListener('change', function() {
    const community = communityData[this.value];
    if (community) {
      document.getElementById('compareName1').textContent = community.name;
      document.getElementById('comparePrice1').textContent = community.price;
      document.getElementById('compareBeds1').textContent = community.beds;
      document.getElementById('compareSqft1').textContent = community.sqft;
      document.getElementById('compareFeatures1').textContent = community.features.join(', ');
    }
  });
})();

// Initialize all features when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  console.log('🎉 Ty Real Estate Premium - All features initialized');
});
