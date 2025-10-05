// Nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    const shown = navMenu.classList.toggle("show");
    navMenu.classList.toggle("hide");
    navToggle.classList.toggle('open', shown);
    navToggle.setAttribute("aria-expanded", shown ? "true" : "false");
});

// ------------------------------
// Resource Filtering
// ------------------------------
const filterButtons = document.querySelectorAll('.filter-controls button');
const resourceCards = document.querySelectorAll('.resource-cards .card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.dataset.category;

        // Update active state on buttons
        filterButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-selected', 'false');
        });
        button.classList.add('active');
        button.setAttribute('aria-selected', 'true');

        // Show/hide cards
        resourceCards.forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

resourceCards.forEach(card => {
    const expandable = card.querySelector('.expandable');

    // Keyboard interaction
    expandable.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault(); // Prevent scrolling for Space
            card.classList.toggle('expanded');
        }
    });

    // Mouse click interaction
    expandable.addEventListener('click', () => {
        card.classList.toggle('expanded');
    });
});

// Save user's theme choice
let btn = document.querySelector('#theme-btn');

// Initialize theme on page load using saved value
const savedTheme = localStorage.getItem('userTheme') || 'light';
document.body.className = savedTheme;
btn.textContent = savedTheme === 'light' ? " Dark Mode" : " Light Mode";

btn.addEventListener('click', theme);
function theme() {
    // Check current theme
    const currentTheme = document.body.className;
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    // Apply new theme
    document.body.className = newTheme;

    // Save new theme in localStorage
    localStorage.setItem('userTheme', newTheme);

    // Update button text
    btn.textContent = newTheme === 'light' ? " Dark Mode" : " Light Mode";
}
const privacyBtn = document.getElementById("privacy-btn");
const popup = document.getElementById("privacy-popup");
const closeBtn = document.getElementById("close-popup");
const clearBtn = document.getElementById("clear-data");

// Show popup
privacyBtn.addEventListener("click", () => {
    popup.style.display = "block";
});

// Close popup
closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
});

// Clear localStorage (theme + any other saved data)
clearBtn.addEventListener("click", () => {
    localStorage.clear();
    alert("Your data has been cleared!");
    popup.style.display = "none";

    // Reset theme to default after clearing
    document.body.className = 'light';
    btn.textContent = " Dark Mode";
});