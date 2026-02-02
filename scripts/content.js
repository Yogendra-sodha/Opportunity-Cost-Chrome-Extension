/* 
  content.js
  The "Worker" script that modifies the Amazon page.
*/

// --- Helper Functions ---

// 1. Calculate work time (Smart formatting: Days + Hours)
function calculateWorkTime(price, hourlyWage) {
    if (!hourlyWage || hourlyWage <= 0) return "0 hrs";

    const totalHours = price / hourlyWage;

    // Rule: If it costs more than 10 hours of labor, show "Days"
    if (totalHours >= 10) {
        const days = (totalHours / 8).toFixed(1);
        // Returns format: "2.5 days (20 hrs)"
        // The span makes the hours part slightly smaller/lighter
        return `${days} days <span style="font-weight:normal; font-size:0.9em; color:#555">(${totalHours.toFixed(0)} hrs)</span>`;
    } else {
        // Just show hours
        return `${totalHours.toFixed(1)} hrs`;
    }
}

// 2. Calculate Future Value (Compound Interest)
function calculateFutureValue(price, annualRate, years) {
    const rateDecimal = annualRate / 100;
    const fv = price * Math.pow((1 + rateDecimal), years);
    return fv.toFixed(2);
}

// 3. Clean the Amazon price string
function parsePrice(priceString) {
    const cleanString = priceString.replace(/[^0-9.]/g, '');
    return parseFloat(cleanString);
}

// --- Display Logic ---

// 4. Create and insert the widget visually
function injectWidget(targetElement, timeString, futureValue, years, isCompact = false) {
    // Prevent duplicates
    if (targetElement.querySelector('.opportunity-cost-widget')) return;

    // Create the box
    const widget = document.createElement('div');
    widget.classList.add('opportunity-cost-widget');

    if (isCompact) {
        widget.classList.add('compact-view');
        // Compact: Just "2.5 days | $5,000"
        widget.innerHTML = `
            <div>⏱️ <strong>${timeString}</strong> | 📈 <strong>$${futureValue}</strong></div>
        `;
    } else {
        widget.classList.add('full-view');
        // Full: Detailed view
        widget.innerHTML = `
          <div class="widget-header">💰 Real Cost Analysis</div>
          <div>⏱️ Work Time: <strong>${timeString}</strong></div>
          <div>📈 Opportunity Cost: <strong>$${futureValue}</strong> <span style="font-size:10px; color:#555">(${years}y growth)</span></div>
      `;
    }

    // Insert it
    targetElement.appendChild(widget);
}


// --- Main Logic Handlers ---

// Handler A: Single Product Page
function processProductPage(settings) {
    const mainContainer = document.querySelector('#corePrice_feature_div')
        || document.querySelector('#corePriceDisplay_desktop_feature_div')
        || document.querySelector('#apex_desktop');

    let priceElement;

    if (mainContainer) {
        priceElement = mainContainer.querySelector('.a-price .a-offscreen');
    } else {
        priceElement = document.querySelector('.a-price .a-offscreen');
    }

    if (!priceElement) return;

    const numericPrice = parsePrice(priceElement.innerText);
    if (!numericPrice) return;

    // Use our new Helper Function
    const timeString = calculateWorkTime(numericPrice, settings.userWage);
    const fv = calculateFutureValue(numericPrice, settings.userRate, settings.userYears);

    const containerToInject = mainContainer || priceElement.parentElement;
    injectWidget(containerToInject, timeString, fv, settings.userYears, false);
}

// Handler B: Search Results Page
function processSearchPage(settings) {
    const searchResultItems = document.querySelectorAll('[data-component-type="s-search-result"]');

    searchResultItems.forEach(item => {
        const priceEl = item.querySelector('.a-price .a-offscreen');
        if (!priceEl) return;
        if (item.querySelector('.opportunity-cost-widget')) return;

        const numericPrice = parsePrice(priceEl.innerText);
        if (!numericPrice) return;

        const timeString = calculateWorkTime(numericPrice, settings.userWage);
        const fv = calculateFutureValue(numericPrice, settings.userRate, settings.userYears);

        const priceContainer = priceEl.closest('.a-price').parentElement;
        injectWidget(priceContainer, timeString, fv, settings.userYears, true);
    });
}

// --- Router ---

function runExtension() {
    chrome.storage.sync.get(
        { userWage: 20, userRate: 8, userYears: 10 },
        (settings) => {
            if (document.querySelector('[data-component-type="s-search-result"]')) {
                processSearchPage(settings);
            } else {
                processProductPage(settings);
            }
        }
    );
}

// 1. Run immediately
runExtension();

// 2. Watch for Dynamic Changes
let timeout;
const observer = new MutationObserver((mutations) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        runExtension();
    }, 500);
});

observer.observe(document.body, { childList: true, subtree: true });