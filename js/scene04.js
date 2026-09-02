// GREETING ANIMATION
// ========================================

function startGreetingAnimation() {

    const line1 =
        document.getElementById(
            "greeting-line-1"
        );

    const line2 =
        document.getElementById(
            "greeting-line-2"
        );

    const line3 =
        document.getElementById(
            "greeting-line-3"
        );

    const line4 =
        document.getElementById(
            "greeting-line-4"
        );

    const birthday =
        document.getElementById(
            "greeting-birthday"
        );

    const button =
        document.getElementById(
            "greeting-continue-button"
        );

    const backButton =
        document.getElementById(
            "back-to-code"
        );


    // ========================================
    // CHECK ELEMENT
    // ========================================

    if (
        !line1 ||
        !line2 ||
        !line3 ||
        !line4 ||
        !birthday ||
        !button ||
        !backButton
    ) {

        console.error(
            "Greeting element tidak ditemukan!"
        );

        return;

    }


    // ========================================
    // RESET
    // ========================================

    const elements = [
        line1,
        line2,
        line3,
        line4,
        birthday,
        button,
        backButton
    ];


    elements.forEach(
        (element) => {

            element.classList.remove(
                "visible"
            );

        }
    );


    // ========================================
    // FORCE REFLOW
    // ========================================

    void line1.offsetWidth;


    // ========================================
    // LINE 1
    // Hey, Sovie...
    // ========================================

    setTimeout(
        () => {

            line1.classList.add(
                "visible"
            );

        },
        300
    );


    // ========================================
    // LINE 2
    // Today is different.
    // ========================================

    setTimeout(
        () => {

            line2.classList.add(
                "visible"
            );

        },
        1300
    );


    // ========================================
    // LINE 3
    // Because...
    // ========================================

    setTimeout(
        () => {

            line3.classList.add(
                "visible"
            );

        },
        2300
    );


    // ========================================
    // LINE 4
    // it's YOU.
    // ========================================

    setTimeout(
        () => {

            line4.classList.add(
                "visible"
            );

        },
        3300
    );


    // ========================================
    // HAPPY BIRTHDAY
    // ========================================

    setTimeout(
        () => {

            birthday.classList.add(
                "visible"
            );

        },
        4600
    );


    // ========================================
    // LET'S BEGIN
    // ========================================

    setTimeout(
        () => {

            button.classList.add(
                "visible"
            );

        },
        5800
    );


    // ========================================
    // BACK BUTTON
    // ========================================

    setTimeout(
        () => {

            backButton.classList.add(
                "visible"
            );

        },
        5800
    );

}


// ========================================
// RESET GREETING
// ========================================

function resetGreeting() {

    const line1 =
        document.getElementById(
            "greeting-line-1"
        );

    const line2 =
        document.getElementById(
            "greeting-line-2"
        );

    const line3 =
        document.getElementById(
            "greeting-line-3"
        );

    const line4 =
        document.getElementById(
            "greeting-line-4"
        );

    const birthday =
        document.getElementById(
            "greeting-birthday"
        );

    const button =
        document.getElementById(
            "greeting-continue-button"
        );

    const backButton =
        document.getElementById(
            "back-to-code"
        );


    const elements = [
        line1,
        line2,
        line3,
        line4,
        birthday,
        button,
        backButton
    ];


    elements.forEach(
        (element) => {

            if (!element) {
                return;
            }


            element.classList.remove(
                "visible"
            );

        }
    );

}


// ========================================
// LET'S BEGIN — SCENE 04 → SCENE 05
// ========================================

if (greetingContinueButton) {

    greetingContinueButton.addEventListener(
        "click",
        () => {

            console.log(
                "Scene 04 → Scene 05"
            );


            showFlowerScene();

        }
    );

}


// ========================================
// BACK — SCENE 04 → SCENE 03
// ========================================

if (backToCodeButton) {

    backToCodeButton.addEventListener(
        "click",
        () => {

            console.log(
                "Scene 04 → Scene 03"
            );


            // ========================================
            // RESET SCENE 04
            // ========================================

            resetGreeting();


            // ========================================
            // HIDE SCENE 04
            // ========================================

            if (greetingScene) {

                greetingScene.classList.remove(
                    "active"
                );

            }


            // ========================================
            // SHOW SCENE 03
            // ========================================

            if (codeScene) {

                codeScene.classList.add(
                    "active"
                );

            }


            // ========================================
            // RESTART BIRTHDAY CODE
            // ========================================

            startBirthdayCodeAnimation();

        }
    );

}


// ========================================
// BIRTHDAY SURPRISE
// ========================================

function triggerBirthdaySurprise() {

    // Jangan jalankan berkali-kali

    if (
        birthdaySurpriseTriggered
    ) {

        return;

    }


    birthdaySurpriseTriggered =
        true;


    // ========================================
    // START CONTINUOUS FIREWORKS
    // ========================================

    startFireworks(true);

}


// ========================================
// FIREWORKS ENGINE
// ========================================

function startFireworks(
    continuous = false
) {

    const canvas =
        document.getElementById(
            "fireworks-canvas"
        );


    if (!canvas) {

        console.error(
            "Canvas fireworks tidak ditemukan!"
        );

        return;

    }


    const ctx =
        canvas.getContext(
            "2d"
        );


    // ========================================
    // CANVAS SIZE
    // ========================================

    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;


    // ========================================
    // SHOW CANVAS
    // ========================================

    canvas.classList.add(
        "active"
    );


    // ========================================
    // COLORS
    // ========================================

    const colors = [

        "#ff4f9a",
        "#ff78b7",
        "#ffd166",
        "#c77dff",
        "#8ec5ff",
        "#ffffff"

    ];


    // ========================================
    // PARTICLES
    // ========================================

    const particles = [];


    // ========================================
    // RUNNING STATE
    // ========================================

    fireworksRunning =
        true;


    // ========================================
    // CREATE EXPLOSION
    // ========================================

    function createExplosion(
        x,
        y
    ) {

        const particleCount =
            130;


        for (
            let i = 0;
            i < particleCount;
            i++
        ) {

            const angle =
                Math.random() *
                Math.PI *
                2;


            const speed =
                Math.random() *
                7 +
                2;


            const color =
                colors[
                    Math.floor(
                        Math.random() *
                        colors.length
                    )
                ];


            particles.push({

                x: x,

                y: y,

                vx:
                    Math.cos(angle) *
                    speed,

                vy:
                    Math.sin(angle) *
                    speed,

                life: 1,

                decay:
                    Math.random() *
                    0.015 +
                    0.008,

                size:
                    Math.random() *
                    3 +
                    1,

                color:
                    color

            });

        }

    }


    // ========================================
    // RANDOM EXPLOSION
    // ========================================

    function createRandomExplosion() {

        if (!fireworksRunning) {
            return;
        }


        const x =
            Math.random() *
            canvas.width;


        const y =
            Math.random() *
            canvas.height *
            0.5;


        createExplosion(
            x,
            y
        );

    }


    // ========================================
    // INITIAL EXPLOSIONS
    // ========================================

    createExplosion(
        canvas.width * 0.50,
        canvas.height * 0.30
    );


    setTimeout(
        () => {

            if (fireworksRunning) {

                createExplosion(
                    canvas.width * 0.25,
                    canvas.height * 0.40
                );

            }

        },
        400
    );


    setTimeout(
        () => {

            if (fireworksRunning) {

                createExplosion(
                    canvas.width * 0.75,
                    canvas.height * 0.35
                );

            }

        },
        800
    );


    setTimeout(
        () => {

            if (fireworksRunning) {

                createExplosion(
                    canvas.width * 0.50,
                    canvas.height * 0.18
                );

            }

        },
        1200
    );


    // ========================================
    // CONTINUOUS FIREWORKS
    // ========================================

    if (continuous) {

        if (fireworksInterval) {

            clearInterval(
                fireworksInterval
            );

        }


        fireworksInterval =
            setInterval(
                () => {

                    createRandomExplosion();

                },
                900
            );

    }


    // ========================================
    // ANIMATION
    // ========================================

    function animate() {

        if (!fireworksRunning) {

            ctx.clearRect(
                0,
                0,
                canvas.width,
                canvas.height
            );

            return;

        }


        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        particles.forEach(
            (
                particle,
                index
            ) => {


                // ========================================
                // MOVEMENT
                // ========================================

                particle.x +=
                    particle.vx;

                particle.y +=
                    particle.vy;


                // Gravity

                particle.vy +=
                    0.07;


                // Friction

                particle.vx *=
                    0.99;

                particle.vy *=
                    0.99;


                // Fade

                particle.life -=
                    particle.decay;


                // ========================================
                // PARTICLE
                // ========================================

                ctx.beginPath();


                ctx.arc(
                    particle.x,
                    particle.y,
                    particle.size,
                    0,
                    Math.PI * 2
                );


                ctx.fillStyle =
                    particle.color;

                ctx.globalAlpha =
                    particle.life;

                ctx.shadowBlur =
                    20;

                ctx.shadowColor =
                    particle.color;

                ctx.fill();


                // ========================================
                // TRAIL
                // ========================================

                ctx.beginPath();


                ctx.moveTo(
                    particle.x,
                    particle.y
                );


                ctx.lineTo(
                    particle.x -
                    particle.vx * 2,

                    particle.y -
                    particle.vy * 2
                );


                ctx.strokeStyle =
                    particle.color;

                ctx.globalAlpha =
                    particle.life *
                    0.5;

                ctx.lineWidth =
                    1.5;

                ctx.stroke();


                // Reset alpha

                ctx.globalAlpha =
                    1;


                // ========================================
                // REMOVE PARTICLE
                // ========================================

                if (
                    particle.life <= 0
                ) {

                    particles.splice(
                        index,
                        1
                    );

                }

            }
        );


        // ========================================
        // CONTINUE ANIMATION
        // ========================================

        fireworksAnimation =
            requestAnimationFrame(
                animate
            );

    }


    animate();

}


// ========================================
// STOP FIREWORKS
// ========================================

function stopFireworks() {

    fireworksRunning =
        false;


    // ========================================
    // STOP INTERVAL
    // ========================================

    if (fireworksInterval) {

        clearInterval(
            fireworksInterval
        );

        fireworksInterval =
            null;

    }


    // ========================================
    // STOP ANIMATION
    // ========================================

    if (fireworksAnimation) {

        cancelAnimationFrame(
            fireworksAnimation
        );

        fireworksAnimation =
            null;

    }


    // ========================================
    // CLEAR CANVAS
    // ========================================

    const canvas =
        document.getElementById(
            "fireworks-canvas"
        );


    if (canvas) {

        const ctx =
            canvas.getContext(
                "2d"
            );


        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        canvas.classList.remove(
            "active"
        );

    }

}


// ========================================
// RESIZE FIREWORKS
// ========================================

window.addEventListener(
    "resize",
    () => {

        const canvas =
            document.getElementById(
                "fireworks-canvas"
            );


        if (!canvas) {
            return;
        }


        canvas.width =
            window.innerWidth;

        canvas.height =
            window.innerHeight;

    }
);

// ========================================