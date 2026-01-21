// Pricing and Form Logic
const pricing = {
    perPound: 1.5,
    perBag: 0.5,
    delivery: {
        less_than_5: 5,
        5_to_20: 10,
        more_than_20: 0 // Custom quote required
    },
    bags: {
        large: 10,
        xl: 15
    }
};

const tips = [
    { title: "Sort Before You Go", desc: "Save time by sorting your lights, darks, and towels at home. It makes loading washers a breeze!" },
    { title: "Check Your Pockets", desc: "Pens, coins, and tissues can ruin a whole load. Always double-check those pockets!" },
    { title: "The Dryer Rule", desc: "Clothes need room to tumble. A half-full dryer dries faster and leaves fewer wrinkles." },
    { title: "Cold Water Wins", desc: "Washing in cold water prevents shrinking and fading while saving energy at home." },
    { title: "Correct Detergent", desc: "Using too much soap can leave residue on your clothes. Follow the machine instructions for the best clean." }
];

let currentTip = 0;
const form = document.getElementById('orderForm');
const estTotalDisplay = document.getElementById('estTotal');
const serviceTypeSelect = document.getElementById('serviceType');
const submitBtn = document.getElementById('submitBtn');
const distanceSelect = document.getElementById('distance');
const businessField = document.getElementById('businessField');
const sameDayToggle = document.getElementById('sameDayToggle');
const sameDayBadge = document.getElementById('sameDayBadge');
const cutoffWarning = document.getElementById('cutoffWarning');
const pricingNote = document.getElementById('pricingNote');

// Update Estimate
function updateEstimate() {
    const serviceType = serviceTypeSelect.value;
    const distance = distanceSelect.value;
    const pounds = parseFloat(document.getElementById('pounds').value) || 0;
    const bags = parseInt(document.getElementById('bags').value) || 0;
    const largeBags = parseInt(document.getElementById('large_bags').value) || 0;
    const xlBags = parseInt(document.getElementById('xl_bags').value) || 0;
    const isSameDay = sameDayToggle.checked;

    if (serviceType === 'Commercial' || distance === 'more_than_20') {
        estTotalDisplay.textContent = 'Custom Quote Required';
        pricingNote.textContent = '*Pricing is customized based on volume and distance.';
        return;
    }

    pricingNote.textContent = '*Pricing: $1.50/lb + $0.50/bag + delivery fee. Final confirmed after weighing.';
    
    let total = (pounds * pricing.perPound) + (bags * pricing.perBag);
    total += pricing.delivery[distance] || 0;
    total += (largeBags * pricing.bags.large) + (xlBags * pricing.bags.xl);

    estTotalDisplay.textContent = `$${total.toFixed(2)}`;
    
    if (isSameDay) {
        sameDayBadge.classList.remove('hidden');
    } else {
        sameDayBadge.classList.add('hidden');
    }
}

// Service Type Change
serviceTypeSelect.addEventListener('change', () => {
    const isCommercial = serviceTypeSelect.value === 'Commercial';
    businessField.classList.toggle('hidden', !isCommercial);
    submitBtn.innerHTML = isCommercial ? 'Request Quote &rarr;' : 'Schedule Pickup &rarr;';
    updateEstimate();
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

// Carousel
function updateTip() {
    const content = document.getElementById('tipContent');
    content.style.opacity = '0';
    setTimeout(() => {
        document.getElementById('tipTitle').textContent = tips[currentTip].title;
        document.getElementById('tipDesc').textContent = tips[currentTip].desc;
        content.style.opacity = '1';
    }, 200);
}

document.getElementById('nextTip').addEventListener('click', () => {
    currentTip = (currentTip + 1) % tips.length;
    updateTip();
});

document.getElementById('prevTip').addEventListener('click', () => {
    currentTip = (currentTip - 1 + tips.length) % tips.length;
    updateTip();
});

// Auto-rotate tips
setInterval(() => {
    currentTip = (currentTip + 1) % tips.length;
    updateTip();
}, 6000);

// Form Submit Handling
form.addEventListener('submit', (e) => {
    const company = form.querySelector('[name="company"]').value;
    if (company) {
        e.preventDefault();
        alert('Spam detected.');
        return;
    }
});

// Event Listeners for inputs
['pounds', 'bags', 'distance', 'large_bags', 'xl_bags', 'sameDayToggle'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', updateEstimate);
});

// Init
checkSameDayCutoff();
updateTip();
updateEstimate();
