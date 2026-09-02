// ========================================
// SOVIE'S BIRTHDAY COUNTDOWN
// ========================================


// ========================================
// TESTING MODE
// ========================================

// true  = countdown beberapa detik untuk testing
// false = menggunakan tanggal asli 06 September 2026

// ========================================
// BIRTHDAY DATE
// ========================================

// 06 September 2026, 00:00:00

const birthdayDate = new Date(
    2026,
    8,
    6,
    0,
    0,
    0
).getTime();


// ========================================
// TESTING DATE
// ========================================

// Countdown dimulai dari 4 detik
// setelah website dibuka

const testingDate =
    new Date().getTime() + 4000;


// ========================================
// UPDATE COUNTDOWN
// ========================================

function updateCountdown() {

    const now =
        new Date().getTime();

    const difference =
        TESTING_MODE
            ? testingDate - now
            : birthdayDate - now;


    // ========================================
    // JIKA ULANG TAHUN SUDAH TIBA
    // ========================================

    if (difference <= 0) {

        document.getElementById("days").textContent =
            "00";

        document.getElementById("hours").textContent =
            "00";

        document.getElementById("minutes").textContent =
            "00";

        document.getElementById("seconds").textContent =
            "00";


        triggerBirthdaySurprise();

        return;
    }


    // ========================================
    // HITUNG HARI
    // ========================================

    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );


    // ========================================
    // HITUNG JAM
    // ========================================

    const hours =
        Math.floor(
            (
                difference /
                (1000 * 60 * 60)
            ) % 24
        );


    // ========================================
    // HITUNG MENIT
    // ========================================

    const minutes =
        Math.floor(
            (
                difference /
                (1000 * 60)
            ) % 60
        );


    // ========================================
    // HITUNG DETIK
    // ========================================

    const seconds =
        Math.floor(
            (
                difference /
                1000
            ) % 60
        );


    // ========================================
    // TAMPILKAN COUNTDOWN
    // ========================================

    document.getElementById("days").textContent =
        String(days).padStart(2, "0");

    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");

}


// ========================================
// START COUNTDOWN
// ========================================

updateCountdown();

setInterval(
    updateCountdown,
    1000
);


// ========================================
// SCENE ELEMENTS
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
