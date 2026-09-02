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

function initializeAppElements() {

    window.countdownScene = document.getElementById("countdown-scene");
    window.giftScene = document.getElementById("gift-scene");
    window.codeScene = document.getElementById("code-scene");
    window.greetingScene = document.getElementById("greeting-scene");
    window.flowerScene = document.getElementById("flower-scene");
    window.birthdayScene = document.getElementById("birthday-scene");
    window.memoryScene = document.getElementById("memory-scene");

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
    memoryScene.classList.add("active");

    if (typeof initializeMemoryScene === "function") {
        initializeMemoryScene();
    }
}


// ========================================

const sceneFiles = [
    "scenes/scene01.html",
    "scenes/scene02.html",
    "scenes/scene03.html",
    "scenes/scene04.html",
    "scenes/scene05.html",
    "scenes/scene06.html",
    "scenes/scene07.html"
];

const sceneScripts = [
    "js/scene01.js",
    "js/scene02.js",
    "js/scene03.js",
    "js/scene04.js",
    "js/scene05.js",
    "js/scene06.js",
    "js/scene07.js"
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

    } catch (error) {

        console.error("Birthday scenes could not be loaded.", error);

    }

}

loadBirthdayScenes();
