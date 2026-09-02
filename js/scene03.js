// BIRTHDAY CODE ANIMATION
// ========================================

function startBirthdayCodeAnimation() {

    const day =
        document.getElementById(
            "birthday-day"
        );

    const month =
        document.getElementById(
            "birthday-month"
        );

    const year =
        document.getElementById(
            "birthday-year"
        );

    const message =
        document.getElementById(
            "birthday-code-message"
        );

    const button =
        document.getElementById(
            "continue-code-button"
        );


    // ========================================
    // CHECK ELEMENT
    // ========================================

    if (
        !day ||
        !month ||
        !year ||
        !message ||
        !button
    ) {

        console.error(
            "Birthday Code element tidak ditemukan!"
        );

        return;

    }


    // ========================================
    // RESET INLINE STYLE
    // ========================================

    day.style.animation =
        "none";

    month.style.animation =
        "none";

    year.style.animation =
        "none";

    message.style.animation =
        "none";

    button.style.animation =
        "none";


    day.style.opacity =
        "0";

    month.style.opacity =
        "0";

    year.style.opacity =
        "0";

    message.style.opacity =
        "0";

    button.style.opacity =
        "0";


    // ========================================
    // FORCE REFLOW
    // ========================================

    void day.offsetWidth;


    // ========================================
    // DAY — 06
    // ========================================

    setTimeout(
        () => {

            day.style.animation =
                "codeDateAppear 0.8s ease forwards";

        },
        300
    );


    // ========================================
    // MONTH — SEPTEMBER
    // ========================================

    setTimeout(
        () => {

            month.style.animation =
                "codeTextAppear 0.8s ease forwards";

        },
        700
    );


    // ========================================
    // YEAR — 2026
    // ========================================

    setTimeout(
        () => {

            year.style.animation =
                "codeTextAppear 0.8s ease forwards";

        },
        1000
    );


    // ========================================
    // MESSAGE
    // ========================================

    setTimeout(
        () => {

            message.style.animation =
                "codeMessageAppear 1s ease forwards";

        },
        1400
    );


    // ========================================
    // CONTINUE BUTTON
    // ========================================

    setTimeout(
        () => {

            button.style.animation =
                "codeButtonAppear 1s ease forwards";

        },
        2100
    );

}


// ========================================
// RESET BIRTHDAY CODE
// ========================================

function resetBirthdayCode() {

    const day =
        document.getElementById(
            "birthday-day"
        );

    const month =
        document.getElementById(
            "birthday-month"
        );

    const year =
        document.getElementById(
            "birthday-year"
        );

    const message =
        document.getElementById(
            "birthday-code-message"
        );

    const button =
        document.getElementById(
            "continue-code-button"
        );


    const elements = [
        day,
        month,
        year,
        message,
        button
    ];


    elements.forEach(
        (element) => {

            if (!element) {
                return;
            }


            element.style.animation =
                "none";

            element.style.opacity =
                "0";

        }
    );

}


// ========================================
// CONTINUE — SCENE 03 → SCENE 04
// ========================================

if (continueCodeButton) {

    continueCodeButton.addEventListener(
        "click",
        () => {

            console.log(
                "Scene 03 → Scene 04"
            );


            // Go to Birthday Greeting

            showGreetingScene();

        }
    );

}


// ========================================
// BACK — CODE → GIFT
// ========================================

if (backToGiftButton) {

    backToGiftButton.addEventListener(
        "click",
        () => {

            // Reset Birthday Code

            resetBirthdayCode();


            // Reset Greeting

            resetGreeting();


            // Reset Gift

            resetGift();


            // Hide Code

            if (codeScene) {

                codeScene.classList.remove(
                    "active"
                );

            }


            // Hide Greeting

            if (greetingScene) {

                greetingScene.classList.remove(
                    "active"
                );

            }


            // Hide Flower

            if (flowerScene) {

                flowerScene.classList.remove(
                    "active"
                );

            }


            // Show Gift

            if (giftScene) {

                giftScene.classList.add(
                    "active"
                );

            }

        }
    );

}


// ========================================