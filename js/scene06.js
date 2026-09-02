// ========================================
// SCENE 06 — HAPPY BIRTHDAY, SOVIE
// ========================================

const backToFlowersButton =
    document.getElementById("back-to-flowers");

const birthdayPhotoFrame =
    document.getElementById("birthday-photo-frame");

const birthdayContainer =
    document.querySelector(".birthday-container");

const birthdaySceneElement =
    document.getElementById("birthday-scene");


// ========================================
// BIRTHDAY SPARKLE CONFIG
// ========================================

const birthdaySparkleSymbols = [
    "✦",
    "✧",
    "·",
    "✦",
    "✧"
];


// ========================================
// CREATE SINGLE SPARKLE
// ========================================

function createBirthdaySparkle(
    parent,
    left,
    top,
    index
) {
    const sparkle =
        document.createElement("span");

    sparkle.className =
        "birthday-sparkle";

    sparkle.textContent =
        birthdaySparkleSymbols[
            index %
            birthdaySparkleSymbols.length
        ];

    sparkle.style.left =
        `${left}%`;

    sparkle.style.top =
        `${top}%`;

    sparkle.style.setProperty(
        "--twinkle-duration",
        `${2.6 + Math.random() * 2.8}s`
    );

    sparkle.style.setProperty(
        "--twinkle-delay",
        `${Math.random() * -4}s`
    );

    parent.appendChild(sparkle);

    return sparkle;
}


// ========================================
// CREATE SPARKLES AROUND PHOTO
// ========================================

function createPhotoSparkles() {
    if (!birthdayPhotoFrame) {
        return;
    }

    /*
        Hapus sparkle lama terlebih dahulu.
        Ini penting supaya sparkle tidak double
        ketika Scene 06 dibuka berkali-kali.
    */

    birthdayPhotoFrame
        .querySelectorAll(".birthday-sparkle")
        .forEach((sparkle) => {
            sparkle.remove();
        });


    /*
        Sparkle ditempatkan mengelilingi frame,
        bukan semuanya di tengah foto.

        Beberapa berada sedikit di luar frame
        supaya terlihat seperti efek magical glow.
    */

    const photoSparklePositions = [
        [-4, 18],
        [3, -5],
        [22, -7],
        [49, -6],
        [76, -5],
        [101, 15],

        [104, 43],
        [102, 70],

        [92, 104],
        [66, 106],
        [39, 104],
        [12, 104],

        [-5, 82],
        [-7, 55],
        [-6, 32]
    ];


    photoSparklePositions.forEach(
        ([left, top], index) => {
            createBirthdaySparkle(
                birthdayPhotoFrame,
                left,
                top,
                index
            );
        }
    );


    /*
        Tambahan beberapa sparkle kecil
        di area dalam frame.

        Dibuat sangat sedikit agar tidak
        menutupi wajah/foto.
    */

    const subtlePhotoSparkles = [
        [12, 22],
        [88, 29],
        [91, 74],
        [10, 78]
    ];


    subtlePhotoSparkles.forEach(
        ([left, top], index) => {
            createBirthdaySparkle(
                birthdayPhotoFrame,
                left,
                top,
                index + 15
            );
        }
    );
}


// ========================================
// CREATE SPARKLES AROUND MESSAGE
// ========================================

function createMessageSparkles() {
    if (!birthdayContainer) {
        return;
    }


    /*
        Hapus sparkle message lama.
    */

    birthdayContainer
        .querySelectorAll(
            ".birthday-message-sparkle"
        )
        .forEach((sparkle) => {
            sparkle.remove();
        });


    /*
        Sparkle di sekitar area ucapan.
        Tidak terlalu banyak supaya tetap elegant.
    */

    const messageSparklePositions = [
        {
            left: 5,
            top: 69
        },
        {
            left: 94,
            top: 69
        },
        {
            left: 1,
            top: 78
        },
        {
            left: 98,
            top: 81
        },
        {
            left: 9,
            top: 90
        },
        {
            left: 91,
            top: 91
        }
    ];


    messageSparklePositions.forEach(
        (position, index) => {
            const sparkle =
                createBirthdaySparkle(
                    birthdayContainer,
                    position.left,
                    position.top,
                    index + 20
                );

            sparkle.classList.add(
                "birthday-message-sparkle"
            );

            sparkle.style.fontSize =
                `${8 + Math.random() * 5}px`;
        }
    );
}


// ========================================
// RESET ANIMATION
// ========================================

function resetBirthdayAnimations() {
    if (!birthdaySceneElement) {
        return;
    }


    /*
        Semua elemen yang memiliki
        entrance animation.
    */

    const animatedElements = [
        birthdaySceneElement.querySelector(
            ".birthday-eyebrow"
        ),

        birthdaySceneElement.querySelector(
            ".birthday-title"
        ),

        birthdaySceneElement.querySelector(
            ".birthday-photo-frame"
        ),

        birthdaySceneElement.querySelector(
            ".birthday-message"
        ),

        birthdaySceneElement.querySelector(
            ".birthday-actions"
        ),

        ...birthdaySceneElement.querySelectorAll(
            ".birthday-message p"
        )
    ].filter(Boolean);


    /*
        Matikan animation sementara.
    */

    animatedElements.forEach(
        (element) => {
            element.style.animation = "none";
        }
    );


    /*
        Force browser melakukan reflow.
        Ini membuat CSS animation bisa
        dimainkan kembali dari awal.
    */

    void birthdaySceneElement.offsetWidth;


    /*
        Kembalikan animation ke CSS.
    */

    animatedElements.forEach(
        (element) => {
            element.style.animation = "";
        }
    );


    /*
        Sparkle juga dibuat ulang.
    */

    createPhotoSparkles();
    createMessageSparkles();
}


// ========================================
// INITIALIZE BIRTHDAY SCENE
// ========================================

function initializeBirthdayScene() {
    if (!birthdaySceneElement) {
        return;
    }

    /*
        Jalankan reset pada frame berikutnya
        supaya class "active" sudah terpasang.
    */

    requestAnimationFrame(() => {
        resetBirthdayAnimations();
    });
}


// ========================================
// WATCH SCENE ACTIVE STATE
// ========================================

function setupBirthdaySceneObserver() {
    if (!birthdaySceneElement) {
        return;
    }


    /*
        Jika sistem website kamu mengaktifkan
        Scene 06 dengan:

        birthdayScene.classList.add("active")

        maka observer ini akan otomatis
        menjalankan animasi.
    */

    const observer =
        new MutationObserver(
            (mutations) => {

                mutations.forEach(
                    (mutation) => {

                        if (
                            mutation.type ===
                            "attributes" &&
                            mutation.attributeName ===
                            "class"
                        ) {

                            const sceneIsActive =
                                birthdaySceneElement
                                    .classList
                                    .contains("active");


                            if (sceneIsActive) {
                                initializeBirthdayScene();
                            }
                        }
                    }
                );
            }
        );


    observer.observe(
        birthdaySceneElement,
        {
            attributes: true,
            attributeFilter: ["class"]
        }
    );


    /*
        Kalau Scene 06 memang sudah active
        ketika halaman pertama kali dibuka.
    */

    if (
        birthdaySceneElement
            .classList
            .contains("active")
    ) {
        initializeBirthdayScene();
    }
}


// ========================================
// BACK TO FLOWERS
// ========================================

if (backToFlowersButton) {

    backToFlowersButton.addEventListener(
        "click",
        () => {

            /*
                Tutup Scene 06.
            */

            if (birthdaySceneElement) {
                birthdaySceneElement.classList.remove(
                    "active"
                );
            }


            /*
                Kembali ke Scene 05.
            */

            if (flowerScene) {
                flowerScene.classList.add(
                    "active"
                );
            }
        }
    );
}


// ========================================
// START SCENE 06 SYSTEM
// ========================================

setupBirthdaySceneObserver();


// ========================================
// CONTINUE TO SCENE 07
// ========================================

const continueToMemoriesButton = document.getElementById(
    "continue-to-memories"
);

if (continueToMemoriesButton) {
    continueToMemoriesButton.addEventListener("click", (event) => {
        event.preventDefault();

        if (typeof showMemoryScene === "function") {
            showMemoryScene();
        }
    });
}
