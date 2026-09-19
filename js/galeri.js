/* =========================================
   GALERI
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const galleryItems = [
        ...document.querySelectorAll(".gallery-item")
    ];

    const filterButtons = [
        ...document.querySelectorAll(".gallery-filter-button")
    ];

    const galleryCount =
        document.getElementById("galleryCount");

    const galleryEmpty =
        document.getElementById("galleryEmpty");

    const searchInput =
        document.getElementById("searchInput");


    /* =====================================
       COUNT
    ===================================== */

    function updateCount() {

        const visibleItems =
            galleryItems.filter(item => {
                return !item.classList.contains("hidden");
            });

        galleryCount.textContent =
            visibleItems.length;

        if (visibleItems.length === 0) {
            galleryEmpty.classList.add("show");
        } else {
            galleryEmpty.classList.remove("show");
        }

    }


    /* =====================================
       FILTER
    ===================================== */

    function filterGallery(category = "all") {

        galleryItems.forEach(item => {

            const itemCategory =
                item.dataset.category;

            if (
                category === "all" ||
                itemCategory === category
            ) {

                item.classList.remove("hidden");

            } else {

                item.classList.add("hidden");

            }

        });

        updateCount();

    }


    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            filterButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            const filter =
                button.dataset.filter;

            filterGallery(filter);

        });

    });


    /* =====================================
       SEARCH
    ===================================== */

    if (searchInput) {

        searchInput.addEventListener("input", () => {

            const keyword =
                searchInput.value
                    .toLowerCase()
                    .trim();

            galleryItems.forEach(item => {

                const title =
                    item.dataset.title
                        ?.toLowerCase() || "";

                const category =
                    item.dataset.category
                        ?.toLowerCase() || "";

                if (
                    title.includes(keyword) ||
                    category.includes(keyword)
                ) {

                    item.classList.remove("hidden");

                } else {

                    item.classList.add("hidden");

                }

            });

            updateCount();

        });

    }


    /* =====================================
       LIGHTBOX
    ===================================== */

    const lightbox =
        document.getElementById("lightbox");

    const lightboxMedia =
        document.getElementById("lightboxMedia");

    const lightboxTitle =
        document.getElementById("lightboxTitle");

    const lightboxDescription =
        document.getElementById("lightboxDescription");

    const lightboxNumber =
        document.getElementById("lightboxNumber");

    const lightboxClose =
        document.getElementById("lightboxClose");

    const lightboxPrev =
        document.getElementById("lightboxPrev");

    const lightboxNext =
        document.getElementById("lightboxNext");


    const cards = [
        ...document.querySelectorAll(".gallery-card")
    ];


    let currentIndex = 0;


    function getVisibleCards() {

        return cards.filter(card => {

            const item =
                card.closest(".gallery-item");

            return !item.classList.contains("hidden");

        });

    }


    function openLightbox(card) {

        const visibleCards =
            getVisibleCards();

        currentIndex =
            visibleCards.indexOf(card);

        if (currentIndex < 0) {
            currentIndex = 0;
        }

        showLightboxItem();

        lightbox.classList.add("active");

        document.body.classList.add("lightbox-open");

    }


    function showLightboxItem() {

        const visibleCards =
            getVisibleCards();

        if (visibleCards.length === 0) {
            return;
        }

        if (currentIndex >= visibleCards.length) {
            currentIndex = 0;
        }

        if (currentIndex < 0) {
            currentIndex =
                visibleCards.length - 1;
        }


        const card =
            visibleCards[currentIndex];

        const type =
            card.dataset.type;

        const src =
            card.dataset.src;

        const title =
            card.dataset.title;

        const description =
            card.dataset.description;

        const item =
            card.closest(".gallery-item");

        const number =
            item.querySelector(".gallery-number")
                ?.textContent || "";


        lightboxMedia.innerHTML = "";


        if (type === "video") {

            const video =
                document.createElement("video");

            video.src = src;

            video.controls = true;

            video.autoplay = true;

            video.playsInline = true;

            lightboxMedia.appendChild(video);

        } else {

            const image =
                document.createElement("img");

            image.src = src;

            image.alt = title;

            lightboxMedia.appendChild(image);

        }


        lightboxNumber.textContent =
            number;

        lightboxTitle.textContent =
            title;

        lightboxDescription.textContent =
            description;

    }


    function closeLightbox() {

        lightbox.classList.remove("active");

        document.body.classList.remove(
            "lightbox-open"
        );

        lightboxMedia.innerHTML = "";

    }


    cards.forEach(card => {

        card.addEventListener("click", () => {

            openLightbox(card);

        });

    });


    lightboxClose.addEventListener(
        "click",
        closeLightbox
    );


    lightbox.addEventListener(
        "click",
        event => {

            if (event.target === lightbox) {
                closeLightbox();
            }

        }
    );


    lightboxPrev.addEventListener(
        "click",
        event => {

            event.stopPropagation();

            currentIndex--;

            showLightboxItem();

        }
    );


    lightboxNext.addEventListener(
        "click",
        event => {

            event.stopPropagation();

            currentIndex++;

            showLightboxItem();

        }
    );


    /* =====================================
       KEYBOARD
    ===================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                !lightbox.classList.contains("active")
            ) {
                return;
            }


            if (event.key === "Escape") {

                closeLightbox();

            }


            if (event.key === "ArrowLeft") {

                currentIndex--;

                showLightboxItem();

            }


            if (event.key === "ArrowRight") {

                currentIndex++;

                showLightboxItem();

            }

        }
    );


    /* =====================================
       INITIAL
    ===================================== */

    updateCount();

});