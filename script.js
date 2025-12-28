// Initialize Stripe (replace with your actual publishable key)
const stripe = Stripe('pk_test_your_publishable_key_here');

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Pricing toggle functionality
const pricingToggle = document.getElementById('pricing-toggle');
const monthlyPrices = document.querySelectorAll('.monthly-price');
const annualPrices = document.querySelectorAll('.annual-price');

pricingToggle?.addEventListener('change', () => {
    if (pricingToggle.checked) {
        // Show annual prices
        monthlyPrices.forEach(price => price.style.display = 'none');
        annualPrices.forEach(price => price.style.display = 'inline');
    } else {
        // Show monthly prices
        monthlyPrices.forEach(price => price.style.display = 'inline');
        annualPrices.forEach(price => price.style.display = 'none');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Subscription plan selection
function selectPlan(planType) {
    console.log('Selected plan:', planType);
    
    // Plan configuration
    const plans = {
        basic: {
            name: 'PocketFence Basic',
            price: 0,
            priceId: null, // Free plan
            features: ['1 Child Device', 'Basic Content Filtering', 'Screen Time Limits', 'Location Tracking']
        },
        family: {
            name: 'PocketFence Family',
            price: pricingToggle?.checked ? 8.33 : 9.99,
            priceId: pricingToggle?.checked ? 'price_premium_annual' : 'price_premium_monthly',
            features: ['Up to 5 Devices', 'Advanced AI Filtering', 'Smart Screen Time', 'Real-time Location', 'AI Threat Detection', 'Basic Analytics']
        },
        complete: {
            name: 'PocketFence Complete',
            price: pricingToggle?.checked ? 16.66 : 19.99,
            priceId: pricingToggle?.checked ? 'price_platinum_annual' : 'price_platinum_monthly',
            features: ['Unlimited Devices', 'Premium AI Features', 'Advanced Analytics', 'Priority Support', 'Custom Rules', 'Family Insights']
        }
    };
    
    const selectedPlan = plans[planType];
    
    if (!selectedPlan) {
        console.error('Invalid plan type');
        return;
    }
    
    if (planType === 'basic') {
        // Redirect to app download or signup
        window.open('https://your-app-download-link.com', '_blank');
        return;
    }
    
    // Create Stripe checkout session
    createCheckoutSession(selectedPlan);
}

// Create Stripe checkout session
async function createCheckoutSession(plan) {
    try {
        // This would typically call your backend to create a checkout session
        const response = await fetch('/api/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                priceId: plan.priceId,
                planName: plan.name
            })
        });
        
        const session = await response.json();
        
        // Redirect to Stripe Checkout
        const result = await stripe.redirectToCheckout({
            sessionId: session.id
        });
        
        if (result.error) {
            console.error('Stripe checkout error:', result.error.message);
            showNotification('Payment error. Please try again.', 'error');
        }
    } catch (error) {
        console.error('Error creating checkout session:', error);
        
        // For demo purposes, show a modal with plan details
        showPlanModal(plan);
    }
}

// Demo: Show plan selection modal (replace with actual Stripe integration)
function showPlanModal(plan) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
    `;
    
    modal.innerHTML = `
        <div style="
            background: white;
            padding: 3rem;
            border-radius: 16px;
            max-width: 500px;
            width: 90%;
            text-align: center;
        ">
            <h2 style="margin-bottom: 1rem; color: #4C6EF5;">${plan.name}</h2>
            <p style="font-size: 2rem; font-weight: bold; margin-bottom: 1rem;">$${plan.price}/month</p>
            <ul style="list-style: none; margin-bottom: 2rem; text-align: left;">
                ${plan.features.map(feature => `<li style="padding: 0.5rem 0; border-bottom: 1px solid #eee;">✅ ${feature}</li>`).join('')}
            </ul>
            <div style="display: flex; gap: 1rem; justify-content: center;">
                <button onclick="this.parentElement.parentElement.parentElement.remove()" style="
                    padding: 1rem 2rem;
                    background: #ccc;
                    color: #333;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                ">Cancel</button>
                <button onclick="proceedToPayment('${plan.priceId}')" style="
                    padding: 1rem 2rem;
                    background: #4C6EF5;
                    color: white;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                ">Start Free Trial</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function proceedToPayment(priceId) {
    showNotification('Demo: Stripe integration would process payment for ' + priceId, 'success');
    document.querySelector('[style*="position: fixed"]')?.remove();
}

// Start free trial
function startFreeTrial() {
    selectPlan('family'); // Default to Family plan for free trial
}

// Watch demo functionality
function watchDemo() {
    // This would open a demo video or redirect to a demo page
    showNotification('Demo video would play here', 'info');
}

// Contact form submission
const contactForm = document.querySelector('.contact-form form');
contactForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Simulate form submission
    showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
    e.target.reset();
});

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        z-index: 10001;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    // Set background color based on type
    const colors = {
        success: '#10B981',
        error: '#EF4444',
        warning: '#F59E0B',
        info: '#3B82F6'
    };
    
    notification.style.background = colors[type] || colors.info;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Slide in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Slide out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-card, .pricing-card, .about-text, .contact-form').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Update navbar on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    console.log('PocketFence website loaded successfully!');
    
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Customer testimonials rotation (if you add testimonials)
const testimonials = [
    {
        text: "PocketFence has revolutionized how we manage our children's screen time. The AI features are incredibly accurate!",
        author: "Sarah Johnson",
        role: "Mother of 3"
    },
    {
        text: "As a single dad, PocketFence gives me peace of mind knowing my kids are safe online even when I'm at work.",
        author: "Mike Chen",
        role: "Software Engineer"
    },
    {
        text: "The behavioral insights help us have better conversations with our teens about healthy digital habits.",
        author: "Lisa Rodriguez",
        role: "Teacher & Parent"
    }
];

// Export functions for global access
window.PocketFence = {
    selectPlan,
    startFreeTrial,
    watchDemo,
    showNotification
};