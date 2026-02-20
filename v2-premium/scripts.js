// Ty Real Estate V2 Premium - Interactive Features

// ============================================
// EXIT INTENT POPUP
// ============================================
(function() {
    let shown = false;
    
    // Create popup HTML
    const popup = document.createElement('div');
    popup.id = 'exitPopup';
    popup.innerHTML = `
        <div style="
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.8);
            z-index: 9999;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(5px);
        ">
            <div style="
                background: var(--bg-primary);
                border-radius: 24px;
                padding: 40px;
                max-width: 500px;
                width: 90%;
                text-align: center;
                animation: slideUp 0.3s ease;
                border: 1px solid var(--border);
            ">
                <div style="font-size: 48px; margin-bottom: 16px;">📦</div>
                <h2 style="font-size: 28px; font-weight: bold; margin-bottom: 12px; color: var(--text-primary);">Wait! Before You Go...</h2>
                <p style="color: var(--text-secondary); margin-bottom: 24px; font-size: 16px;">
                    Get our exclusive Prescott Relocation Guide with insider tips on the best communities, cost of living breakdown, and local secrets.
                </p>
                <form action="https://formsubmit.co/kabbott622@gmail.com" method="POST" style="text-align: left;">
                    <input type="hidden" name="_next" value="https://kabbs622.github.io/ty-realestate/thanks.html">
                    <input type="hidden" name="_subject" value="Exit Intent - Relocation Guide Request">
                    <input type="text" name="name" placeholder="Your Name" required style="
                        width: 100%;
                        padding: 12px 16px;
                        margin-bottom: 12px;
                        border-radius: 12px;
                        border: 1px solid var(--border);
                        background: var(--bg-secondary);
                        color: var(--text-primary);
                        font-size: 16px;
                    ">
                    <input type="email" name="email" placeholder="Your Email" required style="
                        width: 100%;
                        padding: 12px 16px;
                        margin-bottom: 16px;
                        border-radius: 12px;
                        border: 1px solid var(--border);
                        background: var(--bg-secondary);
                        color: var(--text-primary);
                        font-size: 16px;
                    ">
                    <button type="submit" style="
                        width: 100%;
                        padding: 14px;
                        background: var(--accent);
                        color: white;
                        border: none;
                        border-radius: 12px;
                        font-size: 16px;
                        font-weight: 600;
                        cursor: pointer;
                        transition: opacity 0.3s;
                    " onmouseover="this.style.opacity='0.9'" onmouseout="this.style.opacity='1'">
                        Send Me The Guide!
                    </button>
                </form>
                <button onclick="closeExitPopup()" style="
                    margin-top: 16px;
                    background: none;
                    border: none;
                    color: var(--text-secondary);
                    cursor: pointer;
                    font-size: 14px;
                    text-decoration: underline;
                ">
                    No thanks, I'll browse more
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(popup);
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideUp {
            from { opacity: 0; transform: translateY(50px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
    
    // Show popup function
    window.showExitPopup = function() {
        if (!shown && !sessionStorage.getItem('exitPopupShown')) {
            popup.querySelector('div').style.display = 'flex';
            shown = true;
            sessionStorage.setItem('exitPopupShown', 'true');
        }
    };
    
    // Close popup function
    window.closeExitPopup = function() {
        popup.querySelector('div').style.display = 'none';
    };
    
    // Exit intent detection
    document.addEventListener('mouseleave', (e) => {
        if (e.clientY < 10) {
            window.showExitPopup();
        }
    });
    
    // Close on backdrop click
    popup.addEventListener('click', (e) => {
        if (e.target === popup.querySelector('div')) {
            window.closeExitPopup();
        }
    });
    
    // Also show after 45 seconds if user hasn't scrolled much
    setTimeout(() => {
        if (window.scrollY < 300) {
            window.showExitPopup();
        }
    }, 45000);
})();

// ============================================
// MORTGAGE CALCULATOR
// ============================================
function initMortgageCalculator() {
    const container = document.getElementById('mortgageCalculator');
    if (!container) return;
    
    container.innerHTML = `
        <div style="background: var(--glass-bg, rgba(255,255,255,0.1)); backdrop-filter: blur(20px); border-radius: 24px; padding: 32px; border: 1px solid var(--border);">
            <h3 style="font-size: 24px; font-weight: bold; margin-bottom: 24px; text-align: center;">Mortgage Calculator</h3>
            
            <div style="display: grid; gap: 16px; margin-bottom: 24px;">
                <div>
                    <label style="display: block; margin-bottom: 8px; font-size: 14px; font-weight: 500;">Home Price</label>
                    <input type="range" id="calcPrice" min="400000" max="1500000" step="10000" value="600000" style="width: 100%; margin-bottom: 8px;">
                    <div style="text-align: right; font-weight: 600; color: var(--accent);">$<span id="displayPrice">600,000</span></div>
                </div>
                
                <div>
                    <label style="display: block; margin-bottom: 8px; font-size: 14px; font-weight: 500;">Down Payment (<span id="displayDownPercent">20</span>%)</label>
                    <input type="range" id="calcDown" min="0" max="50" step="5" value="20" style="width: 100%; margin-bottom: 8px;">
                    <div style="text-align: right; font-weight: 600;">$<span id="displayDown">120,000</span></div>
                </div>
                
                <div>
                    <label style="display: block; margin-bottom: 8px; font-size: 14px; font-weight: 500;">Interest Rate</label>
                    <input type="range" id="calcRate" min="3" max="10" step="0.1" value="6.5" style="width: 100%; margin-bottom: 8px;">
                    <div style="text-align: right; font-weight: 600;"><span id="displayRate">6.5</span>%</div>
                </div>
                
                <div>
                    <label style="display: block; margin-bottom: 8px; font-size: 14px; font-weight: 500;">Loan Term</label>
                    <select id="calcTerm" style="width: 100%; padding: 12px; border-radius: 8px; border: 1px solid var(--border); background: var(--bg-secondary); color: var(--text-primary);">
                        <option value="30">30 years</option>
                        <option value="20">20 years</option>
                        <option value="15">15 years</option>
                    </select>
                </div>
            </div>
            
            <div style="background: linear-gradient(135deg, var(--accent), #D67347); color: white; padding: 24px; border-radius: 16px; text-align: center;">
                <div style="font-size: 14px; opacity: 0.9; margin-bottom: 8px;">Estimated Monthly Payment</div>
                <div style="font-size: 42px; font-weight: 800;" id="monthlyPayment">$3,042</div>
                <div style="font-size: 12px; opacity: 0.8; margin-top: 8px;">Principal, interest, taxes & insurance</div>
            </div>
        </div>
    `;
    
    // Calculator logic
    const calcPrice = document.getElementById('calcPrice');
    const calcDown = document.getElementById('calcDown');
    const calcRate = document.getElementById('calcRate');
    const calcTerm = document.getElementById('calcTerm');
    
    function updateCalculation() {
        const price = parseFloat(calcPrice.value);
        const downPercent = parseFloat(calcDown.value);
        const rate = parseFloat(calcRate.value);
        const term = parseInt(calcTerm.value);
        
        const downPayment = price * (downPercent / 100);
        const loanAmount = price - downPayment;
        const monthlyRate = (rate / 100) / 12;
        const numPayments = term * 12;
        
        let monthlyPrincipalInterest;
        if (rate === 0) {
            monthlyPrincipalInterest = loanAmount / numPayments;
        } else {
            monthlyPrincipalInterest = loanAmount * (
                (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
                (Math.pow(1 + monthlyRate, numPayments) - 1)
            );
        }
        
        // Add estimated taxes and insurance (1.2% annually)
        const monthlyTaxesInsurance = (price * 0.012) / 12;
        const totalMonthly = monthlyPrincipalInterest + monthlyTaxesInsurance;
        
        // Update displays
        document.getElementById('displayPrice').textContent = price.toLocaleString();
        document.getElementById('displayDownPercent').textContent = downPercent;
        document.getElementById('displayDown').textContent = downPayment.toLocaleString();
        document.getElementById('displayRate').textContent = rate;
        document.getElementById('monthlyPayment').textContent = '$' + Math.round(totalMonthly).toLocaleString();
    }
    
    // Add event listeners
    [calcPrice, calcDown, calcRate, calcTerm].forEach(input => {
        input.addEventListener('input', updateCalculation);
    });
    
    // Initial calculation
    updateCalculation();
}

// ============================================
// MOBILE STICKY BAR
// ============================================
function initMobileStickyBar() {
    if (window.innerWidth > 768) return;
    
    const stickyBar = document.createElement('div');
    stickyBar.style.cssText = `
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: var(--bg-primary);
        border-top: 1px solid var(--border);
        padding: 12px 16px;
        z-index: 1000;
        display: flex;
        justify-content: space-around;
        align-items: center;
        box-shadow: 0 -4px 20px rgba(0,0,0,0.1);
    `;
    
    stickyBar.innerHTML = `
        <a href="tel:+18015550123" style="display: flex; flex-direction: column; align-items: center; color: var(--text-primary); text-decoration: none; gap: 4px;">
            <span style="font-size: 20px;">📞</span>
            <span style="font-size: 11px;">Call</span>
        </a>
        <a href="sms:+18015550123" style="display: flex; flex-direction: column; align-items: center; color: var(--text-primary); text-decoration: none; gap: 4px;">
            <span style="font-size: 20px;">💬</span>
            <span style="font-size: 11px;">Text</span>
        </a>
        <a href="#contact" style="display: flex; flex-direction: column; align-items: center; color: var(--text-primary); text-decoration: none; gap: 4px;">
            <span style="font-size: 20px;">✉️</span>
            <span style="font-size: 11px;">Email</span>
        </a>
        <a href="retire-in-prescott.html" style="display: flex; flex-direction: column; align-items: center; color: var(--text-primary); text-decoration: none; gap: 4px;">
            <span style="font-size: 20px;">📋</span>
            <span style="font-size: 11px;">Guide</span>
        </a>
    `;
    
    document.body.appendChild(stickyBar);
    document.body.style.paddingBottom = '80px';
}

// ============================================
// FLOATING CHAT BUTTON
// ============================================
function initChatButton() {
    const chatBtn = document.createElement('button');
    chatBtn.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 20px;
        width: 56px;
        height: 56px;
        background: linear-gradient(135deg, var(--accent), #D67347);
        border: none;
        border-radius: 50%;
        color: white;
        font-size: 24px;
        cursor: pointer;
        box-shadow: 0 4px 20px rgba(196, 97, 58, 0.4);
        z-index: 999;
        transition: transform 0.3s;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    chatBtn.innerHTML = '💬';
    chatBtn.setAttribute('aria-label', 'Chat with Ty');
    
    chatBtn.addEventListener('mouseenter', () => chatBtn.style.transform = 'scale(1.1)');
    chatBtn.addEventListener('mouseleave', () => chatBtn.style.transform = 'scale(1)');
    chatBtn.addEventListener('click', () => {
        alert('Chat coming soon! Call or text (801) 555-0123 for now.');
    });
    
    document.body.appendChild(chatBtn);
}

// ============================================
// COUNTER ANIMATION
// ============================================
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    const observer = new IntersectionObserver((entries) => {
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
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

// ============================================
// LAZY LOADING
// ============================================
function initLazyLoading() {
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
}

// ============================================
// NAVIGATION SCROLL EFFECT
// ============================================
function initNavScroll() {
    const nav = document.querySelector('nav');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            nav.style.background = 'rgba(var(--bg-primary-rgb), 0.9)';
            nav.style.backdropFilter = 'blur(20px)';
        } else {
            nav.style.background = 'transparent';
            nav.style.backdropFilter = 'none';
        }
        
        lastScroll = currentScroll;
    });
}

// ============================================
// INITIALIZE ALL
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initMortgageCalculator();
    initMobileStickyBar();
    initChatButton();
    initCounters();
    initLazyLoading();
    initNavScroll();
    
    console.log('🎉 Ty Real Estate V2 Premium - All features loaded');
});
