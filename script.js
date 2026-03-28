
let progress = 0;
const max = 100;
const add = 10;

const barMessages = [
    { min: 0, max: 20, text: "Back in my day, we would have been married already." },
    { min: 0, max: 20, text: "You aren't rich already?" },
    { min: 0, max: 20, text: "It's not that hard. You just don't want it enough." },

    { min: 20, max: 50, text: "Good. But someone else has been awake since 4am." },
    { min: 20, max: 50, text: "Progress is fine. Passion would look like more than this." },
    { min: 20, max: 50, text: "You're moving. Are you moving fast enough?" },

    { min: 50, max: 75, text: "This is where most people give up. Are you most people?" },
    { min: 50, max: 75, text: "You could be further along if you'd started earlier." },
    { min: 50, max: 75, text: "Halfway means nothing. Halfway is just slow failure." },

    { min: 75, max: 99, text: "You had it. What happened?" },
    { min: 75, max: 99, text: "This close and still falling. That's a choice you're making." },
    { min: 75, max: 99, text: "Other people don't have this problem. Think about that." },

    { min: 0, max: 15, text: "Back here again. Failure is a habit." },
    { min: 0, max: 15, text: "The bar doesn't lie. You just don't want it enough." },
    { min: 0, max: 15, text: "This used to be called bad luck. Now we call it lack of effort." },
];
function startGame() {
    var titleScreen = document.getElementById("title");
    var gameScreen = document.getElementById("startGame");

    titleScreen.classList.add("fade-out");

    setTimeout(function () {
        titleScreen.style.display = "none";
        gameScreen.classList.remove("hidden");
        gameScreen.style.opacity = 0;

        setTimeout(function () {
            gameScreen.style.opacity = 1;
        }, 80);

    }, 500);
}

function showInterruption() {
    const overlay = document.getElementById("interruptionOverlay");
    if (!overlay) return;
    if (!overlay.classList.contains("hidden")) return;

    overlay.classList.remove("hidden");
}

function hideInterruption() {
    const overlay = document.getElementById("interruptionOverlay");
    if (!overlay) return;
    overlay.classList.add("hidden");
}

function triggerInterruption() {
    showInterruption();
}

function updateProgressUI() {
    const fill = document.getElementById("progressFill");
    const label = document.getElementById("progressLabel");

    if (fill) {
        fill.style.width = `${progress}%`;
    }
    const vignette = document.getElementById("vignette");
    if (vignette) {
        var intensity = Math.min(1, progress);  // 0 at 50%, 1 at 0%
        vignette.style.boxShadow = `inset 0 300px 920px rgba(0, 0, 0, ${intensity * 5})`;
    }

}
function incrementProgress() {
    progress = Math.min(max, progress + add);
    updateProgressUI();
    if (progress >= 85) {
        triggerInterruption();
    }
}

setInterval(() => {
    if (progress > 0) {
        progress = Math.max(0, progress - 0.6);
        updateProgressUI();
    }
}, 50);
function getBarMessage() {
    var valid = barMessages.filter(function (m) {
        return progress >= m.min && progress < m.max;
    });
    var pick = valid[Math.floor(Math.random() * valid.length)];
    return pick ? pick.text : "";
}
setInterval(function () {
    const label = document.getElementById("progressLabel");
    if (label) {
        label.textContent = getBarMessage();
    }
}, 4000);

const interruptionCloseBtn = document.getElementById("interruptionCloseBtn");
if (interruptionCloseBtn) {
    interruptionCloseBtn.addEventListener("click", hideInterruption);
}
