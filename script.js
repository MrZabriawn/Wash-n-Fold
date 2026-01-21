// Pricing and Form Logic
const pricing = {
    perPound: 1.5,
    perBag: 0.5,
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

// Service Type Change
serviceTypeSelect.addEventListener('change', () => {
    const isCommercial = serviceTypeSelect.value === 'Commercial';
    businessField.classList.toggle('hidden', !isCommercial);
    submitBtn.innerHTML = isCommercial ? 'Request Quote &rarr;' : 'Schedule Pickup &rarr;';
});

// Timezone Check (Same Day Cutoff)
function checkSameDayCutoff() {
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
checkSameDayCutoff();
