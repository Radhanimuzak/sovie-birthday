// GIFT ELEMENT
// ========================================

const giftBox =
    document.querySelector(
        ".gift-box"
    );


// ========================================
// BACK TO GIFT
// ========================================

const backToGiftButton =
    document.getElementById(
        "back-to-gift"
    );


// ========================================
// SHOW GIFT SCENE
// ========================================

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
// CONTINUE — COUNTDOWN → GIFT
// ========================================

if (continueButton) {

    continueButton.addEventListener(
        "click",
        () => {

            // Stop fireworks

            stopFireworks();


            // Go to Scene 02

            showGiftScene();

        }
    );

}


// ========================================
// BACK — GIFT → COUNTDOWN
// ========================================

if (backButton) {

    backButton.addEventListener(
        "click",
        () => {

            // Reset Gift

            resetGift();


            // Reset Birthday Code

            resetBirthdayCode();


            // Reset Greeting

            resetGreeting();


            // Go back to Countdown

            showCountdownScene();


            // Restart fireworks if necessary

            if (
                birthdaySurpriseTriggered
            ) {

                startFireworks(true);

            }

        }
    );

}


// ========================================
// RESET GIFT
// ========================================

function resetGift() {

    if (!giftBox) {
        return;
    }


    giftBox.classList.remove(
        "opening"
    );

    giftBox.classList.remove(
        "opened"
    );

}


// ========================================
// OPEN GIFT
// ========================================

if (
    openGiftButton &&
    giftBox
) {

    openGiftButton.addEventListener(
        "click",
        () => {


            // ========================================
            // PREVENT DOUBLE CLICK
            // ========================================

            if (
                giftBox.classList.contains(
                    "opening"
                ) ||
                giftBox.classList.contains(
                    "opened"
                )
            ) {

                return;

            }


            // ========================================
            // STEP 1 — SHAKE
            // ========================================

            giftBox.classList.add(
                "opening"
            );


            // ========================================
            // STEP 2 — OPEN LID
            // ========================================

            setTimeout(
                () => {

                    giftBox.classList.remove(
                        "opening"
                    );

                    giftBox.classList.add(
                        "opened"
                    );

                },
                800
            );


            // ========================================
            // STEP 3 — GO TO SCENE 03
            // ========================================

            setTimeout(
                () => {

                    showCodeScene();

                },
                2000
            );

        }
    );

}


// ========================================