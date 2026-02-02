/* popup/popup.js */

// 1. Restore data when popup opens
document.addEventListener('DOMContentLoaded', restoreOptions);

// 2. Save data when button is clicked
document.getElementById('save-btn').addEventListener('click', saveOptions);

function saveOptions() {
    const wage = document.getElementById('wage').value;
    const rate = document.getElementById('rate').value;
    const years = document.getElementById('years').value;

    chrome.storage.sync.set(
        { userWage: wage, userRate: rate, userYears: years },
        () => {
            // Success Feedback
            const status = document.getElementById('status-msg');

            // 1. Make it visible (Fade In)
            status.classList.add('visible');
            status.textContent = 'Settings Saved!';

            // 2. Hide it after 2 seconds (Fade Out)
            setTimeout(() => {
                status.classList.remove('visible');
            }, 2000);
        }
    );
}

function restoreOptions() {
    chrome.storage.sync.get(
        { userWage: 20, userRate: 8, userYears: 10 },
        (items) => {
            document.getElementById('wage').value = items.userWage;
            document.getElementById('rate').value = items.userRate;
            document.getElementById('years').value = items.userYears;
        }
    );
}