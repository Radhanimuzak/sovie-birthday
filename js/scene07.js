const memorySceneElement = document.getElementById("memory-scene");
const memoryBackButton = document.getElementById("back-to-birthday");
const memoryPhotoCards = document.querySelectorAll("#memory-scene .memory-photo-card");
const memoryLightbox = document.getElementById("memory-lightbox");
const memoryLightboxImage = document.getElementById("memory-lightbox-image");
const memoryLightboxCaption = document.getElementById("memory-lightbox-caption");
const memoryLightboxClose = document.getElementById("memory-lightbox-close");
const memoryStoryBlocks = document.querySelectorAll("#memory-scene .memory-story-block");

let memoryStoryObserver = null;

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

if (memorySceneElement) {
    new MutationObserver(() => {
        if (memorySceneElement.classList.contains("active")) initializeMemoryScene();
        else closeMemoryLightbox();
    }).observe(memorySceneElement, { attributes: true, attributeFilter: ["class"] });
}
