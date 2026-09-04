// ========================================
// FINAL MESSAGE SCENE
// ========================================

const finalMessageScene = document.getElementById('final-message-scene');
const finalMessageBack = document.getElementById('back-to-music');
const viviAlbum = document.getElementById('vivi-album');

const finalLightbox = document.getElementById('final-photo-lightbox');
const finalLightboxImage = document.getElementById('final-lightbox-image');
const finalLightboxClose = document.getElementById('final-lightbox-close');


// ========================================
// VIVI PHOTOS
// ========================================

const viviPhotos = Array.from(
    { length: 32 },
    (_, i) => `vivi ${i + 1}.jpeg`
);

const photoPath = (fileName) =>
    `assets/images/${fileName}`;


// ========================================
// FINAL SCENE STATE
// ========================================

let finalSceneObserver = null;


// ========================================
// PHOTO BUTTON
// ========================================

function photoButton(fileName) {
    return `
        <button
            class="wall-photo"
            type="button"
            data-photo="${fileName}"
            aria-label="Open photo"
        >
            <img
                src="${photoPath(fileName)}"
                alt="Vivi"
                loading="lazy"
                decoding="async"
            >
        </button>
    `;
}


// ========================================
// CLOSE LIGHTBOX
// ========================================

function closeFinalLightbox() {

    if (!finalLightbox) return;

    finalLightbox.classList.remove('is-open');

    finalLightbox.setAttribute(
        'aria-hidden',
        'true'
    );

    document.body.classList.remove(
        'final-lightbox-open'
    );
}


// ========================================
// OPEN LIGHTBOX
// ========================================

function openFinalLightbox(fileName) {

    if (!finalLightbox || !finalLightboxImage) {
        return;
    }

    finalLightboxImage.src =
        photoPath(fileName);

    finalLightbox.classList.add(
        'is-open'
    );

    finalLightbox.setAttribute(
        'aria-hidden',
        'false'
    );

    document.body.classList.add(
        'final-lightbox-open'
    );

    if (finalLightboxClose) {
        finalLightboxClose.focus();
    }
}


// ========================================
// INITIALIZE FINAL MESSAGE SCENE
// ========================================

function initializeFinalMessageScene() {

    if (!viviAlbum) {
        return;
    }

    // Prevent duplicate album generation
    if (viviAlbum.children.length > 0) {
        return;
    }


    // ========================================
    // SPLIT 32 PHOTOS INTO 2 ROWS
    // ========================================

    const firstRow = viviPhotos.slice(0, 16);
    const secondRow = viviPhotos.slice(16);


    // ========================================
    // BUILD PHOTO WALL
    // ========================================

    viviAlbum.innerHTML = `

        <div class="memory-wall-row wall-left">

            <div class="memory-wall-track">

                ${firstRow
                    .map(photoButton)
                    .join('')}

                ${firstRow
                    .map(photoButton)
                    .join('')}

            </div>

        </div>


        <div class="memory-wall-row wall-right">

            <div class="memory-wall-track">

                ${secondRow
                    .map(photoButton)
                    .join('')}

                ${secondRow
                    .map(photoButton)
                    .join('')}

            </div>

        </div>

    `;


    // ========================================
    // PHOTO CLICK EVENTS
    // ========================================

    viviAlbum
        .querySelectorAll('.wall-photo')
        .forEach((photo) => {

            photo.addEventListener(
                'click',
                () => {

                    const fileName =
                        photo.dataset.photo;

                    openFinalLightbox(
                        fileName
                    );

                }
            );

        });


    // ========================================
    // ALBUM → LETTER OBSERVER
    // ========================================

    if (
        'IntersectionObserver' in window
    ) {

        finalSceneObserver =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    'is-visible'
                                );

                                finalSceneObserver.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.12
                }
            );


        const albumToLetter =
            document.querySelector(
                '#final-message-scene .album-to-letter'
            );


        if (albumToLetter) {

            finalSceneObserver.observe(
                albumToLetter
            );

        }

    }

}


// ========================================
// LIGHTBOX CLOSE BUTTON
// ========================================

if (finalLightboxClose) {

    finalLightboxClose.addEventListener(
        'click',
        closeFinalLightbox
    );

}


// ========================================
// CLICK OUTSIDE LIGHTBOX
// ========================================

if (finalLightbox) {

    finalLightbox.addEventListener(
        'click',
        (event) => {

            if (
                event.target === finalLightbox
            ) {

                closeFinalLightbox();

            }

        }
    );

}


// ========================================
// ESCAPE KEY
// ========================================

document.addEventListener(
    'keydown',
    (event) => {

        if (
            event.key === 'Escape'
        ) {

            closeFinalLightbox();

        }

    }
);


// ========================================
// BACK TO SCENE 09
// ========================================
//
// Scene 09 = music-scene
// app.js sudah menyediakan showMusicScene()
// ========================================

if (finalMessageBack) {

    finalMessageBack.addEventListener(
        'click',
        () => {

            if (
                typeof showMusicScene === 'function'
            ) {

                showMusicScene();

            }

        }
    );

}


// ========================================
// INITIALIZE IF SCENE IS ALREADY ACTIVE
// ========================================

if (
    finalMessageScene &&
    finalMessageScene.classList.contains('active')
) {

    initializeFinalMessageScene();

}
