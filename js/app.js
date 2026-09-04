const TESTING_MODE = false;


// ========================================
// BIRTHDAY SURPRISE STATE
// ========================================

let birthdaySurpriseTriggered = false;


// ========================================
// FIREWORKS STATE
// ========================================

let fireworksRunning = false;
let fireworksAnimation = null;
let fireworksInterval = null;


// ========================================
// ACTIVE SCENE PERSISTENCE
// ========================================

const activeSceneStorageKey = "sovie-birthday-active-scene";

const persistableSceneIds = [
    "countdown-scene",
    "gift-scene",
    "code-scene",
    "greeting-scene",
    "flower-scene",
    "birthday-scene",
    "memory-scene",
    "our-memories-scene",
    "music-scene",
    "final-message-scene"
];

// One shared background track. Foreground scene players use this small
// coordinator so music never overlaps and the background position is retained.
const backgroundAudio = new Audio("assets/music/Nat%20King%20Cole%20-%20L-O-V-E%20(Sax%20Cover)%20Brendan%20Mills.mp3");
backgroundAudio.loop = true;
backgroundAudio.volume = 0.18;

window.audioManager = {
    backgroundAudio,
    foregroundAudio: null,
    foregroundSceneId: null,
    resumeBackground: false,
    startBackground() {
        if (this.foregroundAudio && !this.foregroundAudio.paused) return;
        backgroundAudio.play().catch(() => {});
    },
    playForeground(audio, sceneId) {
        if (this.foregroundAudio && this.foregroundAudio !== audio) {
            this.foregroundAudio.pause();
        }
        this.resumeBackground = !backgroundAudio.paused;
        backgroundAudio.pause();
        this.foregroundAudio = audio;
        this.foregroundSceneId = sceneId;
        return audio.play().catch((error) => {
            if (this.foregroundAudio === audio) {
                this.foregroundAudio = null;
                this.foregroundSceneId = null;
                if (this.resumeBackground) this.startBackground();
            }
            throw error;
        });
    },
    pauseForeground(audio) {
        if (!audio) return;
        audio.pause();
        if (this.foregroundAudio === audio && this.resumeBackground) {
            this.startBackground();
        }
    },
    leaveScene(sceneId) {
        if (this.foregroundSceneId !== sceneId || !this.foregroundAudio) return;
        this.foregroundAudio.pause();
        this.foregroundAudio = null;
        this.foregroundSceneId = null;
        if (this.resumeBackground) this.startBackground();
    }
};

document.addEventListener("pointerdown", () => window.audioManager.startBackground(), { once: true });
document.addEventListener("keydown", () => window.audioManager.startBackground(), { once: true });

function persistActiveScene() {

    const activeScene = document.querySelector("#app .scene.active");

    if (!activeScene || !persistableSceneIds.includes(activeScene.id)) {
        return;
    }

    localStorage.setItem(activeSceneStorageKey, activeScene.id);
}

function restorePersistedScene() {

    const persistedSceneId = localStorage.getItem(activeSceneStorageKey);

    if (!persistableSceneIds.includes(persistedSceneId)) {
        return;
    }

    const persistedScene = document.getElementById(persistedSceneId);

    if (!persistedScene) {
        return;
    }

    document.querySelectorAll("#app .scene.active").forEach((scene) => {
        scene.classList.remove("active");
    });

    persistedScene.classList.add("active");

    if (persistedSceneId === "code-scene" && typeof startBirthdayCodeAnimation === "function") {
        startBirthdayCodeAnimation();
    }

    if (persistedSceneId === "greeting-scene" && typeof startGreetingAnimation === "function") {
        startGreetingAnimation();
    }

    if (persistedSceneId === "birthday-scene" && typeof initializeBirthdayScene === "function") {
        initializeBirthdayScene();
    }

    if (persistedSceneId === "memory-scene" && typeof initializeMemoryScene === "function") {
        initializeMemoryScene();
    }

    if (persistedSceneId === "our-memories-scene" && typeof initializeOurMemoriesScene === "function") {
        initializeOurMemoriesScene();
    }

    if (persistedSceneId === "music-scene" && typeof initializeMusicScene === "function") {
        initializeMusicScene();
    }

    if (persistedSceneId === "final-message-scene" && typeof initializeFinalMessageScene === "function") {
        initializeFinalMessageScene();
    }
}

function isPageReload() {
    const navigationEntry = performance.getEntriesByType("navigation")[0];

    if (navigationEntry) {
        return navigationEntry.type === "reload";
    }

    return performance.navigation && performance.navigation.type === performance.navigation.TYPE_RELOAD;
}

function observeActiveScene() {

    const app = document.getElementById("app");

    if (!app) {
        return;
    }

    new MutationObserver(() => {
        persistActiveScene();

        const activeScene = document.querySelector("#app .scene.active");
        if (activeScene && window.audioManager) {
            const activeSceneId = activeScene.id;
            if (window.audioManager.foregroundSceneId && window.audioManager.foregroundSceneId !== activeSceneId) {
                window.audioManager.leaveScene(window.audioManager.foregroundSceneId);
            }
        }
    }).observe(app, {
        subtree: true,
        attributes: true,
        attributeFilter: ["class"]
    });
}

function initializeAppElements() {

    window.countdownScene = document.getElementById("countdown-scene");
    window.giftScene = document.getElementById("gift-scene");
    window.codeScene = document.getElementById("code-scene");
    window.greetingScene = document.getElementById("greeting-scene");
    window.flowerScene = document.getElementById("flower-scene");
    window.birthdayScene = document.getElementById("birthday-scene");
    window.memoryScene = document.getElementById("memory-scene");
    window.ourMemoriesScene = document.getElementById("our-memories-scene");
    window.musicScene = document.getElementById("music-scene");
    window.finalMessageScene = document.getElementById("final-message-scene");

    window.continueButton = document.getElementById("continue-button");
    window.backButton = document.getElementById("back-to-countdown");
    window.openGiftButton = document.getElementById("open-gift-button");
    window.continueCodeButton = document.getElementById("continue-code-button");
    window.greetingContinueButton = document.getElementById("greeting-continue-button");
    window.backToCodeButton = document.getElementById("back-to-code");
    window.backToGreetingButton = document.getElementById("back-to-greeting");

}
function showGiftScene() {

    if (!countdownScene || !giftScene) {
        return;
    }


    countdownScene.classList.remove(
        "active"
    );

    giftScene.classList.add(
        "active"
    );

}


// ========================================
// SHOW COUNTDOWN SCENE
// ========================================

function showCountdownScene() {

    if (!countdownScene || !giftScene) {
        return;
    }


    giftScene.classList.remove(
        "active"
    );

    countdownScene.classList.add(
        "active"
    );

}


// ========================================
// SHOW CODE SCENE
// ========================================

function showCodeScene() {

    if (!giftScene || !codeScene) {

        console.error(
            "Scene Gift atau Scene Code tidak ditemukan!"
        );

        return;
    }


    // Hide Gift

    giftScene.classList.remove(
        "active"
    );


    // Show Code

    codeScene.classList.add(
        "active"
    );


    // Start Birthday Code animation

    startBirthdayCodeAnimation();

}


// ========================================
// SHOW GREETING SCENE
// ========================================

function showGreetingScene() {

    if (!codeScene || !greetingScene) {

        console.error(
            "Scene Code atau Scene Greeting tidak ditemukan!"
        );

        return;
    }


    // ========================================
    // HIDE SCENE 03
    // ========================================

    codeScene.classList.remove(
        "active"
    );


    // ========================================
    // SHOW SCENE 04
    // ========================================

    greetingScene.classList.add(
        "active"
    );


    // ========================================
    // START GREETING ANIMATION
    // ========================================

    startGreetingAnimation();

}


// ========================================
// SHOW FLOWER SCENE
// ========================================

function showFlowerScene() {

    if (!greetingScene || !flowerScene) {

        console.error(
            "Scene Greeting atau Scene Flower tidak ditemukan!"
        );

        return;
    }


    // ========================================
    // HIDE SCENE 04
    // ========================================

    greetingScene.classList.remove(
        "active"
    );


    // ========================================
    // SHOW SCENE 05
    // ========================================

    flowerScene.classList.add(
        "active"
    );


    console.log(
        "Scene 04 → Scene 05"
    );

}


// ========================================
// SHOW SCENE 06
// ========================================

function showBirthdayScene() {

    if (!flowerScene || !birthdayScene) {

        return;

    }

    flowerScene.classList.remove(
        "active"
    );

    birthdayScene.classList.add(
        "active"
    );

    initializeBirthdayScene();

}

function showMemoryScene() {

    if (!birthdayScene || !memoryScene) return;

    birthdayScene.classList.remove("active");

    // Scene 08 can remain active after a previous visit. Hide it before
    // displaying Scene 07 so the later DOM element cannot cover Scene 07.
    if (ourMemoriesScene) {
        ourMemoriesScene.classList.remove("active");
    }

    memoryScene.classList.add("active");

    if (typeof initializeMemoryScene === "function") {
        initializeMemoryScene();
    }
}

function showOurMemoriesScene() {

    if (!memoryScene || !ourMemoriesScene) return;

    memoryScene.classList.remove("active");
    ourMemoriesScene.classList.add("active");

    if (typeof initializeOurMemoriesScene === "function") {
        initializeOurMemoriesScene();
    }
}

function showMusicScene() {
    if (!ourMemoriesScene || !musicScene) return;
    ourMemoriesScene.classList.remove("active");
    musicScene.classList.add("active");
    if (typeof initializeMusicScene === "function") initializeMusicScene();
}

function showFinalMessageScene() {
    if (!musicScene || !finalMessageScene) return;
    musicScene.classList.remove("active");
    finalMessageScene.classList.add("active");
    if (typeof initializeFinalMessageScene === "function") initializeFinalMessageScene();
}


// ========================================

const sceneFiles = [
    "scenes/scene01.html",
    "scenes/scene02.html",
    "scenes/scene03.html",
    "scenes/scene04.html",
    "scenes/scene05.html",
    "scenes/scene06.html",
    "scenes/scene07.html",
    "scenes/scene08.html",
    "scenes/scene09.html",
    "scenes/scene10.html"
];

const sceneScripts = [
    "js/scene01.js",
    "js/scene02.js",
    "js/scene03.js",
    "js/scene04.js",
    "js/scene05.js",
    "js/scene06.js",
    "js/scene07.js",
    "js/scene08.js",
    "js/scene09.js",
    "js/scene10.js"
];

function loadSceneScript(source) {

    return new Promise(
        (resolve, reject) => {

            const script = document.createElement("script");

            script.src = source;
            script.onload = resolve;
            script.onerror = reject;

            document.body.appendChild(script);

        }
    );

}

async function loadBirthdayScenes() {

    const app = document.getElementById("app");

    try {

        const sceneMarkup = await Promise.all(
            sceneFiles.map(
                async (source) => {

                    const response = await fetch(source);

                    if (!response.ok) {

                        throw new Error(`Unable to load ${source}`);

                    }

                    return response.text();

                }
            )
        );

        app.innerHTML = sceneMarkup.join("\n\n");

        initializeAppElements();

        for (const source of sceneScripts) {

            await loadSceneScript(source);

        }

        // A direct Live Server visit is a new session and always starts at
        // Scene 01. Only an actual browser reload restores the active scene.
        if (isPageReload()) {
            restorePersistedScene();
        } else {
            localStorage.setItem(activeSceneStorageKey, "countdown-scene");
        }
        observeActiveScene();

    } catch (error) {

        console.error("Birthday scenes could not be loaded.", error);

    }

}

loadBirthdayScenes();
