document.addEventListener("DOMContentLoaded", () => {
    const music = document.getElementById("music");
    const dancer = document.getElementById("dancer");
    const startButton = document.getElementById("startButton");
    const svg = document.getElementById("stickman");

    let isPlaying = false;
    let audioContext = null;

    // Initial dancer position
    let targetX = 50;
    let targetY = 50;
    let currentX = 50;
    let currentY = 50;

    function initAudio() {
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const analyzer = audioContext.createAnalyser();
            const source = audioContext.createMediaElementSource(music);
            source.connect(analyzer);
            analyzer.connect(audioContext.destination);
        }
    }

    // move and rotate dancer toward mouse
    document.addEventListener("mousemove", (e) => {
        if (!isPlaying) return;

        const rect = svg.getBoundingClientRect();

        targetX = ((e.clientX - rect.left) / rect.width) * 100;
        targetY = ((e.clientY - rect.top) / rect.height) * 100;

        const angle = Math.atan2(targetY - currentY, targetX - currentX) * (180 / Math.PI);
        dancer.style.transform = `translate(${currentX - 50}px, ${currentY - 50}px) rotate(${angle}deg)`;
        dancer.style.transformOrigin = "50% 50%";
    });

    function animate() {
        if (!isPlaying) return;

        currentX += (targetX - currentX) * 0.1;
        currentY += (targetY - currentY) * 0.1;

        requestAnimationFrame(animate);
    }

    startButton.addEventListener("click", () => {
        if (!audioContext) initAudio();

        if (!isPlaying) {
            if (audioContext.state === "suspended") audioContext.resume();

            music.play().catch((err) => console.error(err));
            isPlaying = true;

            dancer.classList.add("dancing"); // head bob / glow
            startButton.classList.add("playing");
            startButton.textContent = "Stop Dancing";

            animate(); // start smooth movement
        } else {
            music.pause();
            music.currentTime = 0;

            isPlaying = false;
            dancer.classList.remove("dancing");
            startButton.classList.remove("playing");
            startButton.textContent = "Start Dancing!";

            // Reset position
            currentX = 50;
            currentY = 50;
            targetX = 50;
            targetY = 50;
            dancer.style.transform = "translate(0,0) rotate(0deg)";
        }
    });
});
