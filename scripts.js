// Ty Real Estate - Main JavaScript

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
      navLinks.classList.toggle('active');
    });
  }
  
  // Close mobile menu when clicking a link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });
});

// Mortgage Calculator
function initMortgageCalculator() {
  const homePrice = document.getElementById('homePrice');
  const downPayment = document.getElementById('downPayment');
  const interestRate = document.getElementById('interestRate');
  const loanTerm = document.getElementById('loanTerm');
  const monthlyPayment = document.getElementById('monthlyPayment');
  const calcBtn = document.getElementById('calcButton');
  
  if (!homePrice || !monthlyPayment) return;
  
  function calculateMortgage() {
    const principal = parseFloat(homePrice.value) - parseFloat(downPayment.value);
    const rate = parseFloat(interestRate.value) / 100 / 12;
    const payments = parseFloat(loanTerm.value) * 12;
    
    if (principal <= 0 || rate <= 0 || payments <= 0) {
      monthlyPayment.textContent = '$0';
      return;
    }
    
    const monthly = (principal * rate * Math.pow(1 + rate, payments)) / 
                    (Math.pow(1 + rate, payments) - 1);
    
    monthlyPayment.textContent = '$' + monthly.toLocaleString('en-US', {
      maximumFractionDigits: 0
    });
  }
  
  if (calcBtn) {
    calcBtn.addEventListener('click', calculateMortgage);
  }
  
  // Auto-calculate on input change
  [homePrice, downPayment, interestRate, loanTerm].forEach(input => {
    if (input) {
      input.addEventListener('change', calculateMortgage);
      input.addEventListener('input', calculateMortgage);
    }
  });
  
  // Initial calculation
  calculateMortgage();
}

// Exit Intent Popup
function initExitPopup() {
  const popup = document.getElementById('exitPopup');
  const closeBtn = document.querySelector('.exit-popup-close');
  
  if (!popup) return;
  
  let shown = false;
  
  function showPopup() {
    if (!shown && !sessionStorage.getItem('exitPopupShown')) {
      popup.classList.add('active');
      shown = true;
      sessionStorage.setItem('exitPopupShown', 'true');
    }
  }
  
  // Show when mouse leaves the page (desktop)
  document.addEventListener('mouseout', function(e) {
    if (e.clientY < 0 && window.innerWidth > 768) {
      showPopup();
    }
  });
  
  // Close button
  if (closeBtn) {
    closeBtn.addEventListener('click', function() {
      popup.classList.remove('active');
    });
  }
  
  // Close on backdrop click
  popup.addEventListener('click', function(e) {
    if (e.target === popup) {
      popup.classList.remove('active');
    }
  });
  
  // Show after 30 seconds if not already shown
  setTimeout(function() {
    if (!shown) {
      showPopup();
    }
  }, 30000);
}

// Form Validation & Submission
function initForms() {
  const forms = document.querySelectorAll('form[data-form]');
  
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      const requiredFields = form.querySelectorAll('[required]');
      let valid = true;
      
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          valid = false;
          field.style.borderColor = '#e74c3c';
        } else {
          field.style.borderColor = '';
        }
      });
      
      // Email validation
      const emailField = form.querySelector('input[type="email"]');
      if (emailField && emailField.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailField.value)) {
          valid = false;
          emailField.style.borderColor = '#e74c3c';
        }
      }
      
      if (!valid) {
        e.preventDefault();
        alert('Please fill in all required fields correctly.');
      }
    });
    
    // Clear error on input
    form.querySelectorAll('input, textarea, select').forEach(field => {
      field.addEventListener('input', function() {
        this.style.borderColor = '';
      });
    });
  });
}

// Smooth Scroll for anchor links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Lazy Loading Images
function initLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  } else {
    // Fallback for older browsers
    images.forEach(img => {
      img.src = img.dataset.src;
    });
  }
}

// Home Valuation Estimator
function initValuationCalculator() {
  const address = document.getElementById('propertyAddress');
  const bedrooms = document.getElementById('bedrooms');
  const bathrooms = document.getElementById('bathrooms');
  const sqft = document.getElementById('squareFeet');
  const condition = document.getElementById('condition');
  const estimateBtn = document.getElementById('estimateBtn');
  const estimateResult = document.getElementById('estimateResult');
  const estimateRange = document.getElementById('estimateRange');
  
  if (!estimateBtn || !estimateResult) return;
  
  estimateBtn.addEventListener('click', function() {
    if (!address.value || !bedrooms.value || !bathrooms.value || !sqft.value) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Simple estimation formula based on sqft and condition
    const basePrice = 280; // per sqft in Prescott area
    const sqftValue = parseInt(sqft.value);
    let conditionMultiplier = 1;
    
    switch(condition.value) {
      case 'excellent': conditionMultiplier = 1.15; break;
      case 'good': conditionMultiplier = 1; break;
      case 'fair': conditionMultiplier = 0.85; break;
      case 'needs-work': conditionMultiplier = 0.7; break;
      default: conditionMultiplier = 1;
    }
    
    const estimatedValue = Math.round(sqftValue * basePrice * conditionMultiplier);
    const lowEstimate = Math.round(estimatedValue * 0.92);
    const highEstimate = Math.round(estimatedValue * 1.08);
    
    estimateResult.textContent = '$' + estimatedValue.toLocaleString();
    estimateRange.textContent = `Estimated range: $${lowEstimate.toLocaleString()} - $${highEstimate.toLocaleString()}`;
    
    estimateResult.parentElement.scrollIntoView({ behavior: 'smooth' });
  });
}

// Gallery Lightbox
function initGallery() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  galleryItems.forEach(item => {
    item.addEventListener('click', function() {
      const img = this.querySelector('img');
      if (!img) return;
      
      // Create lightbox
      const lightbox = document.createElement('div');
      lightbox.className = 'lightbox';
      lightbox.innerHTML = `
        <div class="lightbox-content">
          <button class="lightbox-close">&times;</button>
          <img src="${img.src}" alt="${img.alt}">
        </div>
      `;
      
      // Add styles
      lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        padding: 20px;
      `;
      
      lightbox.querySelector('.lightbox-content').style.cssText = `
        position: relative;
        max-width: 90%;
        max-height: 90%;
      `;
      
      lightbox.querySelector('img').style.cssText = `
        max-width: 100%;
        max-height: 85vh;
        border-radius: 8px;
      `;
      
      lightbox.querySelector('.lightbox-close').style.cssText = `
        position: absolute;
        top: -40px;
        right: 0;
        background: none;
        border: none;
        color: white;
        font-size: 36px;
        cursor: pointer;
      `;
      
      document.body.appendChild(lightbox);
      document.body.style.overflow = 'hidden';
      
      // Close handlers
      lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
      lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) closeLightbox();
      });
      
      function closeLightbox() {
        document.body.removeChild(lightbox);
        document.body.style.overflow = '';
      }
      
      // Close on escape key
      document.addEventListener('keydown', function handler(e) {
        if (e.key === 'Escape') {
          closeLightbox();
          document.removeEventListener('keydown', handler);
        }
      });
    });
  });
}

// Navbar scroll effect
function initNavbarScroll() {
  const header = document.querySelector('header');
  if (!header) return;
  
  let lastScroll = 0;
  
  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
    } else {
      header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
    }
    
    lastScroll = currentScroll;
  });
}

// Initialize all functions when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  initMortgageCalculator();
  initExitPopup();
  initForms();
  initSmoothScroll();
  initLazyLoading();
  initValuationCalculator();
  initGallery();
  initNavbarScroll();
  
  console.log('Ty Real Estate website initialized');
});

// Re-initialize after dynamic content loads (if needed)
window.reinit = function() {
  initGallery();
  initForms();
};
