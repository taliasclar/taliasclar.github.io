export function initPopup() {
    const popup = document.getElementById("privacy-popup");
    const closeBtn = document.getElementById("close-popup");
    const clearBtn = document.getElementById("clear-data");
    const themeBtn = document.querySelector('#theme-btn');

    // Close popup
    closeBtn.addEventListener("click", () => {
        popup.style.display = "none";
    });

    // Clear localStorage (theme + any other saved data)
    clearBtn.addEventListener("click", () => {
        localStorage.clear();
        alert("Your data has been cleared!");
        popup.style.display = "none";

        // Reset theme to default
        document.body.className = 'light';
        themeBtn.textContent = " Dark Mode";
    });
}

export function showPopup() {
    const popup = document.getElementById("privacy-popup");
    popup.style.display = "block";
}