# Opportunity Cost Extension 💰⏳

**Stop spending money. Start spending time.**

We've all been there—mindlessly adding $20 items to our Amazon cart. It doesn't feel like "real money." But what if you saw the *real* cost?

This Chrome extension replaces the price tag on Amazon with **how many hours you have to work to pay for it**. Suddenly, that $200 gadget isn't just "$200"—it's **2 days of your life**.

## ✨ What it does
- **Real-Time Conversion:** Instantly converts prices into "Work Hours" based on your salary.
- **Investment Forecaster:** Shows you how much that money would grow if invested in the S&P 500 instead.
- **Smart Formatting:** Small purchases show as "Hours", big purchases (like laptops) show as "Days".
- **Privately Stored:** Your salary data stays in your browser (Chrome Sync). It never leaves your device.

## 🛠️ Tech Stack
- **Manifest V3:** Built on the latest secure Chrome standards.
- **MutationObserver:** Uses efficient DOM observing to handle Amazon's infinite-scroll and dynamic page loading without slowing down the browser.
- **Pure JavaScript (No Frameworks):** Lightweight implementation (~5kb) for maximum performance.
- **CSS3:** Clean, native-feeling UI that creates a seamless experience.

## 🚀 How to Install
1. **Clone/Download** this repository.
2. Open Chrome and go to `chrome://extensions`.
3. Toggle **Developer Mode** (top right corner).
4. Click **Load Unpacked**.
5. Select this folder. Done!

## ⚙️ Configuration
Click the extension icon in your toolbar to set your:
- **Hourly Wage:** How much is your time worth?
- **Investment Rate:** Expected return (default is 8%).
- **Time Horizon:** How many years to project growth.

---
*Built as a weekend project to understand the psychology of spending.*
