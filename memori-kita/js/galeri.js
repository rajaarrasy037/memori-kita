/* =========================================
   GALERI - SUPABASE
========================================= */

document.addEventListener("DOMContentLoaded", async () => {

    /* =====================================
       SUPABASE
    ===================================== */

    const SUPABASE_URL =
        "https://lwjnkiexgvmlrbxgwqbt.supabase.co";

    const SUPABASE_KEY =
        "sb_publishable_EGaiZXXKufCq6cs6I1z9Fw_5lQqMrcx";

    const supabaseClient =
        window.supabase.createClient(
            SUPABASE_URL,
            SUPABASE_KEY
        );


    /* =====================================
       ELEMENT
    ===================================== */

    const galleryGrid =
        document.getElementById("galleryGrid");

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
       LIGHTBOX ELEMENT
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


    /* =====================================
       DATA
    ===================================== */

    let galleryData = [];

    let currentIndex = 0;

    let currentFilter = "all";

    let currentSearch = "";


    /* =====================================
       LOAD DATA SUPABASE
    ===================================== */

    async function loadGallery() {

        galleryGrid.innerHTML = "";

        const {
            data,
            error
        } = await supabaseClient
            .from("gallery")
            .select("*")
            .order("type", { ascending: true })
            .order("number", { ascending: true });

        if (error) {

            console.error(
                "Gagal mengambil data gallery:",
                error
            );

            showEmpty();

            return;

        }

        galleryData = data || [];

        renderGallery();

    }


    /* =====================================
       RENDER
    ===================================== */

    function renderGallery() {

        galleryGrid.innerHTML = "";

        galleryData.forEach(item => {

            const article =
                document.createElement("article");

            article.className =
                "gallery-item";

            article.dataset.category =
                item.category || "";

            article.dataset.type =
                item.type || "image";

            article.dataset.title =
                item.title || "";

            article.dataset.description =
                item.description || "";

            article.dataset.src =
                item.file_url || "";


            /* =================================
               CARD
            ================================= */

            const card =
                document.createElement("div");

            card.className =
                "gallery-card";

            card.dataset.type =
                item.type || "image";

            card.dataset.src =
                item.file_url || "";

            card.dataset.title =
                item.title || "";

            card.dataset.description =
                item.description || "";


            /* =================================
               MEDIA
            ================================= */

            const media =
                document.createElement("div");

            media.className =
                "gallery-media";


            if (item.type === "video") {

                const video =
                    document.createElement("video");

                video.src =
                    item.file_url;

                video.muted = true;

                video.playsInline = true;

                video.preload = "metadata";

                media.appendChild(video);

            } else {

                const image =
                    document.createElement("img");

                image.src =
                    item.file_url;

                image.alt =
                    item.title || "Foto kenangan";

                image.loading = "lazy";

                media.appendChild(image);

            }


            /* =================================
               OVERLAY
            ================================= */

            const overlay =
                document.createElement("div");

            overlay.className =
                "gallery-overlay";


            const number =
                document.createElement("span");

            number.className =
                "gallery-number";

            number.textContent =
                String(item.number).padStart(2, "0");


            const info =
                document.createElement("div");

            info.className =
                "gallery-info";


            const title =
                document.createElement("h3");

            title.textContent =
                item.title || "Tanpa judul";


            const category =
                document.createElement("p");

            category.textContent =
                item.category || "";


            info.appendChild(title);
            info.appendChild(category);

            overlay.appendChild(number);
            overlay.appendChild(info);

            card.appendChild(media);
            card.appendChild(overlay);

            article.appendChild(card);

            galleryGrid.appendChild(article);

        });


        applyFilter();

    }


    /* =====================================
       GET VISIBLE ITEMS
    ===================================== */

    function getVisibleItems() {

        return [
            ...document.querySelectorAll(".gallery-item")
        ].filter(item => {

            return !item.classList.contains("hidden");

        });

    }


    /* =====================================
       FILTER + SEARCH
    ===================================== */

    function applyFilter() {

        const items = [
            ...document.querySelectorAll(".gallery-item")
        ];

        const keyword =
            currentSearch.toLowerCase().trim();


        items.forEach(item => {

            const type =
                item.dataset.type || "";

            const category =
                item.dataset.category || "";

            const title =
                item.dataset.title || "";

            const description =
                item.dataset.description || "";


            /* FILTER */

            let filterMatch = true;

            if (currentFilter === "video") {

                filterMatch =
                    type === "video";

            } else if (currentFilter !== "all") {

                filterMatch =
                    category === currentFilter;

            }


            /* SEARCH */

            let searchMatch = true;

            if (keyword !== "") {

                const searchable =
                    (
                        title +
                        " " +
                        category +
                        " " +
                        description
                    ).toLowerCase();

                searchMatch =
                    searchable.includes(keyword);

            }


            if (
                filterMatch &&
                searchMatch
            ) {

                item.classList.remove("hidden");

            } else {

                item.classList.add("hidden");

            }

        });


        updateCount();

    }


    /* =====================================
       COUNT
    ===================================== */

    function updateCount() {

        const visibleItems =
            getVisibleItems();

        if (galleryCount) {

            galleryCount.textContent =
                visibleItems.length;

        }

        if (galleryEmpty) {

            if (visibleItems.length === 0) {

                galleryEmpty.classList.add("show");

            } else {

                galleryEmpty.classList.remove("show");

            }

        }

    }


    /* =====================================
       FILTER BUTTON
    ===================================== */

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            filterButtons.forEach(btn => {

                btn.classList.remove("active");

            });

            button.classList.add("active");

            currentFilter =
                button.dataset.filter || "all";

            applyFilter();

        });

    });


    /* =====================================
       SEARCH
    ===================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            () => {

                currentSearch =
                    searchInput.value;

                applyFilter();

            }
        );

    }


    /* =====================================
       OPEN LIGHTBOX
    ===================================== */

    function openLightbox(item) {

        const visibleItems =
            getVisibleItems();

        currentIndex =
            visibleItems.indexOf(item);

        if (currentIndex < 0) {

            currentIndex = 0;

        }

        showLightboxItem();

        lightbox.classList.add("active");

        document.body.classList.add(
            "lightbox-open"
        );

    }


    /* =====================================
       SHOW LIGHTBOX
    ===================================== */

    function showLightboxItem() {

        const visibleItems =
            getVisibleItems();

        if (visibleItems.length === 0) {

            return;

        }


        if (
            currentIndex >=
            visibleItems.length
        ) {

            currentIndex = 0;

        }


        if (currentIndex < 0) {

            currentIndex =
                visibleItems.length - 1;

        }


        const item =
            visibleItems[currentIndex];

        const type =
            item.dataset.type;

        const src =
            item.dataset.src;

        const title =
            item.dataset.title;

        const description =
            item.dataset.description;


        const number =
            item.querySelector(
                ".gallery-number"
            )?.textContent || "";


        lightboxMedia.innerHTML = "";


        /* =================================
           VIDEO
        ================================= */

        if (type === "video") {

            const video =
                document.createElement("video");

            video.src = src;

            video.controls = true;

            video.autoplay = true;

            video.playsInline = true;

            lightboxMedia.appendChild(video);

        }


        /* =================================
           IMAGE
        ================================= */

        else {

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


    /* =====================================
       CARD CLICK
    ===================================== */

    galleryGrid.addEventListener(
        "click",
        event => {

            const card =
                event.target.closest(
                    ".gallery-card"
                );

            if (!card) {

                return;

            }

            const item =
                card.closest(".gallery-item");

            if (!item) {

                return;

            }

            openLightbox(item);

        }
    );


    /* =====================================
       CLOSE LIGHTBOX
    ===================================== */

    function closeLightbox() {

        lightbox.classList.remove(
            "active"
        );

        document.body.classList.remove(
            "lightbox-open"
        );

        lightboxMedia.innerHTML = "";

    }


    if (lightboxClose) {

        lightboxClose.addEventListener(
            "click",
            closeLightbox
        );

    }


    if (lightbox) {

        lightbox.addEventListener(
            "click",
            event => {

                if (
                    event.target === lightbox
                ) {

                    closeLightbox();

                }

            }
        );

    }


    /* =====================================
       PREVIOUS
    ===================================== */

    if (lightboxPrev) {

        lightboxPrev.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                currentIndex--;

                showLightboxItem();

            }
        );

    }


    /* =====================================
       NEXT
    ===================================== */

    if (lightboxNext) {

        lightboxNext.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                currentIndex++;

                showLightboxItem();

            }
        );

    }


    /* =====================================
       KEYBOARD
    ===================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                !lightbox.classList.contains(
                    "active"
                )
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
       START
    ===================================== */

    await loadGallery();

});

