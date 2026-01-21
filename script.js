// Feature Toggles
const features = {
    expressServiceEnabled: false // Change to true to enable Same-Day / Express
};

// Pricing and Form Logic
const pricing = {
    perPound: 1.5,
    perBag: 0.5,
    expressPremium: 10,
    delivery: {
        aliquippa: 5,
        beaver_county: 8
    }
};

const form = document.getElementById('orderForm');
const serviceTypeSelect = document.getElementById('serviceType');
const submitBtn = document.getElementById('submitBtn');
const distanceSelect = document.getElementById('distance');
const businessField = document.getElementById('businessField');
const sameDayToggle = document.getElementById('sameDayToggle');
const cutoffWarning = document.getElementById('cutoffWarning');
const expressStatus = document.getElementById('expressStatus');
const expressPricingText = document.getElementById('expressPricingText');
const faqExpressText = document.getElementById('faqExpressText');

// Service Type Change
serviceTypeSelect.addEventListener('change', () => {
    const isCommercial = serviceTypeSelect.value === 'Commercial';
    businessField.classList.toggle('hidden', !isCommercial);
    submitBtn.innerHTML = isCommercial ? 'Request Quote &rarr;' : 'Schedule Pickup &rarr;';
});

// Timezone Check (Same Day Cutoff)
function checkSameDayCutoff() {
    if (!features.expressServiceEnabled) return;
    
    const now = new Date();
    const etTime = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/New_York",
        hour: "numeric",
        hour12: false,
    }).format(now);
    
    const hour = parseInt(etTime, 10);
    if (hour >= 9) {
        sameDayToggle.disabled = true;
        sameDayToggle.checked = false;
        cutoffWarning.classList.remove('hidden');
    }
}

// Update UI based on features
function updateFeatureUI() {
    if (!features.expressServiceEnabled) {
        if (sameDayToggle) {
            sameDayToggle.disabled = true;
            sameDayToggle.checked = false;
        }
        if (expressStatus) {
            expressStatus.textContent = '(Coming soon)';
            expressStatus.className = 'text-[10px] font-bold text-gray-400 ml-auto';
        }
        if (expressPricingText) {
            expressPricingText.textContent = 'Coming soon';
            expressPricingText.className = 'font-bold text-gray-400 italic';
        }
        if (faqExpressText) {
            faqExpressText.textContent = 'Express / Same-day: Coming soon';
        }
        if (cutoffWarning) cutoffWarning.classList.add('hidden');
    } else {
        if (sameDayToggle) sameDayToggle.disabled = false;
        if (expressStatus) {
            expressStatus.textContent = '(order by 9 AM)';
            expressStatus.className = 'text-[10px] font-bold text-[#145C39] ml-auto';
        }
        if (expressPricingText) {
            expressPricingText.textContent = `+$${pricing.expressPremium.toFixed(2)} per order`;
            expressPricingText.className = 'font-bold';
        }
        if (faqExpressText) {
            faqExpressText.textContent = `Express / Same-day: +$${pricing.expressPremium.toFixed(2)} per order`;
        }
        checkSameDayCutoff();
    }
}

// Form Submit Handling
form.addEventListener('submit', (e) => {
    const company = form.querySelector('[name="company"]').value;
    if (company) {
        e.preventDefault();
        alert('Spam detected.');
        return;
    }
});

// Init
updateFeatureUI();
