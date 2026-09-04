const memorySceneElement = document.getElementById("memory-scene");
const memoryBackButton = document.getElementById("back-to-birthday");
const continueToOurMemoriesButton = document.getElementById(
    "continue-to-our-memories"
);
const memoryPhotoCards = document.querySelectorAll("#memory-scene .memory-photo-card");
const memoryLightbox = document.getElementById("memory-lightbox");
const memoryLightboxImage = document.getElementById("memory-lightbox-image");
const memoryLightboxCaption = document.getElementById("memory-lightbox-caption");
const memoryLightboxClose = document.getElementById("memory-lightbox-close");
const memoryStoryBlocks = document.querySelectorAll("#memory-scene .memory-story-block");

let memoryStoryObserver = null;
const memoryAudio = new Audio("assets/music/Boys_To_Men_-_ON_BENDED_KNEE_(mp3.pm).mp3");
const memoryAudioToggle = document.getElementById("memory-audio-toggle");
const memoryAudioProgress = document.getElementById("memory-audio-progress");
const memoryAudioTime = document.getElementById("memory-audio-time");

function formatMemoryAudioTime(seconds) {
    const total = Math.floor(Number.isFinite(seconds) ? seconds : 0);
    return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}

function updateMemoryAudioUi() {
    if (memoryAudioToggle) memoryAudioToggle.textContent = memoryAudio.paused ? "▶" : "❚❚";
    if (memoryAudioProgress) {
        memoryAudioProgress.max = Number.isFinite(memoryAudio.duration) ? memoryAudio.duration : 0;
        memoryAudioProgress.value = memoryAudio.currentTime;
    }
    if (memoryAudioTime) memoryAudioTime.textContent = formatMemoryAudioTime(memoryAudio.currentTime);
}

if (memoryAudioToggle) memoryAudioToggle.addEventListener("click", () => {
    if (memoryAudio.paused) window.audioManager.playForeground(memoryAudio, "memory-scene").catch(() => {});
    else window.audioManager.pauseForeground(memoryAudio);
    updateMemoryAudioUi();
});
if (memoryAudioProgress) memoryAudioProgress.addEventListener("input", () => { memoryAudio.currentTime = Number(memoryAudioProgress.value); updateMemoryAudioUi(); });
memoryAudio.addEventListener("timeupdate", updateMemoryAudioUi);
memoryAudio.addEventListener("loadedmetadata", updateMemoryAudioUi);
memoryAudio.addEventListener("ended", () => { window.audioManager.pauseForeground(memoryAudio); updateMemoryAudioUi(); });

function closeMemoryLightbox() {
    if (!memoryLightbox) return;
    memoryLightbox.classList.remove("is-open");
    memoryLightbox.setAttribute("aria-hidden", "true");
}

function openMemoryLightbox(card) {
    const image = card.querySelector("img");
    if (!image || !memoryLightbox || !memoryLightboxImage) return;

    memoryLightboxImage.src = image.currentSrc || image.src;
    memoryLightboxImage.alt = image.alt;
    memoryLightboxCaption.textContent = card.dataset.photoCaption || image.alt;
    memoryLightbox.classList.add("is-open");
    memoryLightbox.setAttribute("aria-hidden", "false");
    memoryLightboxClose.focus();
}

function initializeMemoryScene() {
    if (!memorySceneElement) return;

    closeMemoryLightbox();

    if (memoryStoryObserver) memoryStoryObserver.disconnect();

    memoryStoryBlocks.forEach((block) => block.classList.remove("is-visible"));

    memoryStoryObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            memoryStoryObserver.unobserve(entry.target);
        });
    }, { threshold: 0.14 });

    memoryStoryBlocks.forEach((block, index) => {
        block.style.transitionDelay = `${Math.min(index * 55, 220)}ms`;
        memoryStoryObserver.observe(block);
    });
}

memoryPhotoCards.forEach((card) => {
    card.addEventListener("click", () => openMemoryLightbox(card));
});

if (memoryLightboxClose) {
    memoryLightboxClose.addEventListener("click", closeMemoryLightbox);
}

if (memoryLightbox) {
    memoryLightbox.addEventListener("click", (event) => {
        if (event.target === memoryLightbox) closeMemoryLightbox();
    });
}

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMemoryLightbox();
});

if (memoryBackButton) {
    memoryBackButton.addEventListener("click", () => {
        if (!memorySceneElement || !birthdayScene) return;
        memorySceneElement.classList.remove("active");
        birthdayScene.classList.add("active");
        if (typeof initializeBirthdayScene === "function") initializeBirthdayScene();
    });
}

if (continueToOurMemoriesButton) {
    continueToOurMemoriesButton.addEventListener("click", (event) => {
        event.preventDefault();

        if (typeof showOurMemoriesScene === "function") {
            showOurMemoriesScene();
        }
    });
}

if (memorySceneElement) {
    new MutationObserver(() => {
        if (memorySceneElement.classList.contains("active")) initializeMemoryScene();
        else closeMemoryLightbox();
    }).observe(memorySceneElement, { attributes: true, attributeFilter: ["class"] });
}
