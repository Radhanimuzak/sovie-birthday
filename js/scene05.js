// ========================================
// SCENE 05 — FLOWER SCENE
// ========================================

const flowerScene =
    document.getElementById(
        "flower-scene"
    );

const birthdayScene =
    document.getElementById(
        "birthday-scene"
    );


// ========================================
// FLOWER ELEMENTS
// ========================================

const flowers =
    document.querySelectorAll(
        ".flower-area .flower"
    );

const bouquetTargets =
    document.querySelectorAll(
        ".bouquet-target"
    );

const bouquetProgress =
    document.getElementById(
        "bouquet-progress"
    );


// ========================================
// COMPLETION MESSAGE
// ========================================

const flowerCompletion =
    document.getElementById(
        "flower-completion"
    );


// ========================================
// CURRENT FLOWER
// ========================================

let currentFlower = null;

let pointerFlower = null;

let flowerDragPreview = null;


// ========================================
// SCENE 05 → SCENE 06
// ========================================

const continueToBirthdayButton =
    document.getElementById(
        "continue-to-birthday"
    );


function showBirthdayScene() {

    console.log(
        "Scene 05 → Scene 06"
    );


    // ========================================
    // JIKA SCENE 06 ADA DI HALAMAN YANG SAMA
    // ========================================

    if (birthdayScene) {

        if (flowerScene) {

            flowerScene.classList.remove(
                "active"
            );

        }

        birthdayScene.classList.add(
            "active"
        );

        return;

    }


    // ========================================
    // JIKA SCENE 06 ADALAH FILE TERPISAH
    // ========================================

    window.location.href =
        "scene06.html";

}


if (continueToBirthdayButton) {

    continueToBirthdayButton.addEventListener(
        "click",
        () => {

            showBirthdayScene();

        }
    );

}


// ========================================
// BACK — SCENE 05 → SCENE 04
// ========================================

if (backToGreetingButton) {

    backToGreetingButton.addEventListener(
        "click",
        () => {

            console.log(
                "Scene 05 → Scene 04"
            );


            // ========================================
            // RESET SCENE 05
            // ========================================

            resetFlowerScene();


            // ========================================
            // HIDE SCENE 05
            // ========================================

            if (flowerScene) {

                flowerScene.classList.remove(
                    "active"
                );

            }


            // ========================================
            // SHOW SCENE 04
            // ========================================

            if (greetingScene) {

                greetingScene.classList.add(
                    "active"
                );

            }


            // ========================================
            // RESTART GREETING ANIMATION
            // ========================================

            startGreetingAnimation();

        }
    );

}


// ========================================
// RESET SCENE 05
// ========================================

function resetFlowerScene() {

    // ========================================
    // RESET PROGRESS
    // ========================================

    if (bouquetProgress) {

        bouquetProgress.textContent =
            `0 / ${flowers.length}`;

    }


    // ========================================
    // RESET COMPLETION MESSAGE
    // ========================================

    if (flowerCompletion) {

        flowerCompletion.classList.remove(
            "visible"
        );

    }


    // ========================================
    // RESET BOUQUET FINAL
    // ========================================

    const bouquetFinal =
        document.querySelector(
            ".bouquet-final"
        );

    if (bouquetFinal) {

        bouquetFinal.classList.remove(
            "visible"
        );

    }


    // ========================================
    // RESET BOUQUET BASE
    // ========================================

    const bouquetBase =
        document.querySelector(
            ".bouquet-base"
        );

    if (bouquetBase) {

        bouquetBase.classList.remove(
            "hidden"
        );

    }


    // ========================================
    // KEMBALIKAN SEMUA BUNGA
    // ========================================

    const flowerArea =
        document.getElementById(
            "flower-area"
        );

    if (flowerArea) {

        flowers.forEach(
            (flower) => {

                flower.classList.remove(
                    "placed",
                    "dragging"
                );

                flower.style.opacity =
                    "";

                flower.style.visibility =
                    "";

                flower.draggable =
                    true;

                flowerArea.appendChild(
                    flower
                );

            }
        );

    }


    // ========================================
    // RESET SEMUA TARGET BOUQUET
    // ========================================

    bouquetTargets.forEach(
        (target) => {

            target.classList.remove(
                "filled",
                "completed",
                "drag-over"
            );

        }
    );


    // ========================================
    // HAPUS SPARKLE CELEBRATION
    // ========================================

    document
        .querySelectorAll(
            ".bouquet-sparkle"
        )
        .forEach(
            (sparkle) => {

                sparkle.remove();

            }
        );


    // ========================================
    // RESET CELEBRATION ANIMATION
    // ========================================

    const bouquetArea =
        document.getElementById(
            "bouquet-area"
        );

    if (bouquetArea) {

        bouquetArea.classList.remove(
            "bouquet-celebration"
        );

    }


    // ========================================
    // RESET DRAG STATE
    // ========================================

    currentFlower = null;

    clearPointerDrag();

}


// ========================================
// PLACE FLOWER IN TARGET
// ========================================

function placeFlowerInTarget(
    flower,
    target
) {

    if (
        !flower ||
        !target ||
        target.classList.contains(
            "filled"
        )
    ) {

        return false;

    }


    // ========================================
    // RESET DRAG VISUAL
    // ========================================

    flower.classList.remove(
        "dragging"
    );


    // ========================================
    // MARK AS PLACED
    // ========================================

    flower.classList.add(
        "placed"
    );

    flower.draggable =
        false;


    // ========================================
    // MASUKKAN BUNGA KE TARGET
    // ========================================

    target.appendChild(
        flower
    );

    target.classList.add(
        "filled"
    );


    // ========================================
    // HITUNG BUNGA
    // ========================================

    const placedCount =
        document.querySelectorAll(
            ".bouquet-target .flower.placed"
        ).length;


    if (bouquetProgress) {

        bouquetProgress.textContent =
            `${placedCount} / ${flowers.length}`;

    }


    // ========================================
    // SEMUA BUNGA SUDAH SELESAI
    // ========================================

    if (
        placedCount ===
        flowers.length
    ) {

        const bouquetBase =
            document.querySelector(
                ".bouquet-base"
            );

        const bouquetFinal =
            document.querySelector(
                ".bouquet-final"
            );


        // ========================================
        // SEMBUNYIKAN BUNGA YANG SUDAH DITEMPEL
        // ========================================

        bouquetTargets.forEach(
            (target) => {

                target.classList.add(
                    "completed"
                );

                const placedFlower =
                    target.querySelector(
                        ".flower"
                    );

                if (placedFlower) {

                    placedFlower.style.opacity =
                        "0";

                    placedFlower.style.visibility =
                        "hidden";

                }

            }
        );


        // ========================================
        // SEMBUNYIKAN BOUQUET KOSONG
        // ========================================

        if (bouquetBase) {

            bouquetBase.classList.add(
                "hidden"
            );

        }


        // ========================================
        // TAMPILKAN FULL BOUQUET
        // ========================================

        if (bouquetFinal) {

            bouquetFinal.classList.add(
                "visible"
            );

        }


        // ========================================
        // TAMPILKAN PESAN SELESAI
        // ========================================

        if (flowerCompletion) {

            flowerCompletion.classList.add(
                "visible"
            );

        }


        // ========================================
        // JALANKAN CELEBRATION
        // ========================================

        createBouquetCelebration();

    }


    return true;

}


// ========================================
// CLEAR POINTER DRAG
// ========================================

function clearPointerDrag() {

    if (pointerFlower) {

        pointerFlower.classList.remove(
            "dragging"
        );

    }


    if (flowerDragPreview) {

        flowerDragPreview.remove();

    }


    pointerFlower =
        null;

    flowerDragPreview =
        null;

}


// ========================================
// BOUQUET CELEBRATION
// ========================================

function createBouquetCelebration() {

    const bouquetArea =
        document.getElementById(
            "bouquet-area"
        );

    if (!bouquetArea) {

        return;

    }


    // ========================================
    // SPARKLE PARTICLES
    // ========================================

    const sparkleSymbols = [
        "✦",
        "✧",
        "✨",
        "✦",
        "♡"
    ];


    for (
        let i = 0;
        i < 30;
        i++
    ) {

        const sparkle =
            document.createElement(
                "span"
            );

        sparkle.className =
            "bouquet-sparkle";

        sparkle.textContent =
            sparkleSymbols[
                Math.floor(
                    Math.random() *
                    sparkleSymbols.length
                )
            ];

        sparkle.style.left =
            `${Math.random() * 100}%`;

        sparkle.style.top =
            `${Math.random() * 100}%`;

        sparkle.style.animationDelay =
            `${Math.random() * 0.8}s`;

        sparkle.style.animationDuration =
            `${1.2 + Math.random() * 1.2}s`;

        bouquetArea.appendChild(
            sparkle
        );


        setTimeout(
            () => {

                sparkle.remove();

            },
            3000
        );

    }


    // ========================================
    // CELEBRATION ANIMATION
    // ========================================

    bouquetArea.classList.add(
        "bouquet-celebration"
    );

}


// ========================================
// DRAG START
// ========================================

if (flowers.length) {

    flowers.forEach(
        (flower) => {

            flower.addEventListener(
                "dragstart",
                (event) => {

                    currentFlower =
                        flower;


                    flower.classList.add(
                        "dragging"
                    );


                    event.dataTransfer.setData(
                        "text/plain",
                        flower.dataset.flower
                    );


                    console.log(
                        "Drag started:",
                        flower.dataset.flower
                    );

                }
            );


            // ========================================
            // DRAG END
            // ========================================

            flower.addEventListener(
                "dragend",
                () => {

                    flower.classList.remove(
                        "dragging"
                    );


                    console.log(
                        "Drag ended"
                    );

                }
            );


            // ========================================
            // POINTER DOWN
            // ========================================

            flower.addEventListener(
                "pointerdown",
                (event) => {

                    if (
                        flower.classList.contains(
                            "placed"
                        )
                    ) {

                        return;

                    }


                    event.preventDefault();


                    currentFlower =
                        flower;

                    pointerFlower =
                        flower;


                    flower.setPointerCapture(
                        event.pointerId
                    );


                    flower.classList.add(
                        "dragging"
                    );


                    flowerDragPreview =
                        flower.cloneNode(
                            true
                        );


                    flowerDragPreview.removeAttribute(
                        "id"
                    );


                    flowerDragPreview.classList.add(
                        "flower-drag-preview"
                    );


                    flowerDragPreview.style.left =
                        `${event.clientX}px`;

                    flowerDragPreview.style.top =
                        `${event.clientY}px`;


                    document.body.appendChild(
                        flowerDragPreview
                    );

                }
            );


            // ========================================
            // POINTER MOVE
            // ========================================

            flower.addEventListener(
                "pointermove",
                (event) => {

                    if (
                        !pointerFlower ||
                        !flowerDragPreview
                    ) {

                        return;

                    }


                    flowerDragPreview.style.left =
                        `${event.clientX}px`;

                    flowerDragPreview.style.top =
                        `${event.clientY}px`;


                    const hoveredTarget =
                        document
                            .elementFromPoint(
                                event.clientX,
                                event.clientY
                            )
                            ?.closest(
                                ".bouquet-target"
                            );


                    bouquetTargets.forEach(
                        (target) => {

                            target.classList.toggle(
                                "drag-over",
                                target ===
                                    hoveredTarget &&
                                !target.classList.contains(
                                    "filled"
                                )
                            );

                        }
                    );

                }
            );


            // ========================================
            // POINTER UP
            // ========================================

            flower.addEventListener(
                "pointerup",
                (event) => {

                    if (!pointerFlower) {

                        return;

                    }


                    const dropTarget =
                        document
                            .elementFromPoint(
                                event.clientX,
                                event.clientY
                            )
                            ?.closest(
                                ".bouquet-target"
                            );


                    placeFlowerInTarget(
                        pointerFlower,
                        dropTarget
                    );


                    bouquetTargets.forEach(
                        (target) => {

                            target.classList.remove(
                                "drag-over"
                            );

                        }
                    );


                    currentFlower =
                        null;


                    clearPointerDrag();

                }
            );


            // ========================================
            // POINTER CANCEL
            // ========================================

            flower.addEventListener(
                "pointercancel",
                () => {

                    bouquetTargets.forEach(
                        (target) => {

                            target.classList.remove(
                                "drag-over"
                            );

                        }
                    );


                    currentFlower =
                        null;


                    clearPointerDrag();

                }
            );

        }
    );

}


// ========================================
// BOUQUET DROP ZONES
// ========================================

if (bouquetTargets.length) {

    bouquetTargets.forEach(
        (target) => {

            // ========================================
            // DRAG OVER
            // ========================================

            target.addEventListener(
                "dragover",
                (event) => {

                    if (
                        !currentFlower ||
                        target.classList.contains(
                            "filled"
                        )
                    ) {

                        return;

                    }


                    event.preventDefault();


                    target.classList.add(
                        "drag-over"
                    );

                }
            );


            // ========================================
            // DRAG LEAVE
            // ========================================

            target.addEventListener(
                "dragleave",
                () => {

                    target.classList.remove(
                        "drag-over"
                    );

                }
            );


            // ========================================
            // DROP
            // ========================================

            target.addEventListener(
                "drop",
                (event) => {

                    event.preventDefault();


                    target.classList.remove(
                        "drag-over"
                    );


                    if (
                        !currentFlower ||
                        target.classList.contains(
                            "filled"
                        )
                    ) {

                        return;

                    }


                    placeFlowerInTarget(
                        currentFlower,
                        target
                    );


                    currentFlower =
                        null;


                    console.log(
                        "Flower snapped to bouquet target"
                    );

                }
            );

        }
    );

}