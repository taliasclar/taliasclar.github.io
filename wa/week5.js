const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

var menu_show = false;

function showMenu() {
    var shown = navMenu.classList.toggle("show");
    navMenu.classList.toggle("hide")

    if (shown) {
        navToggle.setAttribute("aria-expanded", "true");
    }
    else {
        navToggle.setAttribute("aria-expanded", "false");
    }

    navToggle.classList.toggle('open', shown);

    menu_show = shown;
}

navToggle.addEventListener("click", showMenu);

