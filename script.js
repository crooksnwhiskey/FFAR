
let progress = 0;
const max = 100;
const add = 1;

function startGame() {
    document.getElementById("title").style.display = "none";
    document.getElementById("startGame").style.display = "block";
}

function updateProgressUI() {
    const fill = document.getElementById("progressFill");
    const label = document.getElementById("progressLabel");

    if (fill) {
        fill.style.width = `${progress}%`;
    }

}

function incrementProgress() {
    progress = Math.min(max, progress + add);
    updateProgressUI();
}

setInterval(() => {
    if (progress > 0) {
        progress = Math.max(0, progress - 0.3);
        updateProgressUI();
    }
}, 50);
