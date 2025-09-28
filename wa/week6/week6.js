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

