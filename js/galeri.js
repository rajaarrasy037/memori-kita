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
       UPLOAD ELEMENT
    ===================================== */

    const uploadButton =
        document.getElementById("galleryUploadButton");

    const uploadModal =
        document.getElementById("galleryUploadModal");

    const uploadClose =
        document.getElementById("galleryUploadClose");

    const uploadForm =
        document.getElementById("galleryUploadForm");

    const uploadTypeButtons = [
        ...document.querySelectorAll(".upload-type-button")
    ];

    const galleryTitle =
        document.getElementById("galleryTitle");

    const galleryCategory =
        document.getElementById("galleryCategory");

    const galleryDescription =
        document.getElementById("galleryDescription");

    const galleryFile =
        document.getElementById("galleryFile");

    const galleryFileHint =
        document.getElementById("galleryFileHint");

    const gallerySubmitButton =
        document.getElementById("gallerySubmitButton");


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

    const deleteGalleryBtn =
        document.getElementById("deleteGalleryBtn");

    const deleteGalleryConfirmModal =
        document.getElementById("deleteGalleryConfirmModal");

    const deleteGalleryCancelBtn =
        document.getElementById("deleteGalleryCancelBtn");

    const deleteGalleryConfirmBtn =
        document.getElementById("deleteGalleryConfirmBtn");


    /* =====================================
       DATA
    ===================================== */

    let galleryData = [];

    let currentIndex = 0;

    let currentFilter = "all";

    let currentSearch = "";

    let selectedType = "image";

    let currentGalleryItem = null;


    /* =====================================
       NOTIFICATION
    ===================================== */

    function showNotification(message) {

    const notification =
        document.getElementById("notification");

    const notificationText =
        document.getElementById("notificationText");

    if (!notification || !notificationText) {
        return;
    }

    notificationText.textContent =
        message;

    notification.classList.add("show");

    setTimeout(() => {

        notification.classList.remove("show");

    }, 3000);

}


    /* =====================================
       MODAL
    ===================================== */

    function openUploadModal() {

        if (!uploadModal) return;

        uploadModal.classList.add("active");

        document.body.classList.add(
            "gallery-upload-open"
        );

    }


    function closeUploadModal() {

        if (!uploadModal) return;

        uploadModal.classList.remove(
            "active"
        );

        document.body.classList.remove(
            "gallery-upload-open"
        );

    }


    if (uploadButton) {

    uploadButton.addEventListener(
        "click",
        async () => {

            const {
                data: { session }
            } = await supabaseClient.auth.getSession();

            if (!session) {

                window.location.href =
                    "login.html?next=galeri.html";

                return;

            }

            openUploadModal();

        }
    );

}


    if (uploadClose) {

        uploadClose.addEventListener(
            "click",
            closeUploadModal
        );

    }


    if (uploadModal) {

        uploadModal.addEventListener(
            "click",
            event => {

                if (
                    event.target === uploadModal
                ) {

                    closeUploadModal();

                }

            }
        );

    }


    /* =====================================
       TYPE FOTO / VIDEO
    ===================================== */

    uploadTypeButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                uploadTypeButtons.forEach(btn => {

                    btn.classList.remove("active");

                });

                button.classList.add("active");

                selectedType =
                    button.dataset.type || "image";


                if (galleryFile) {

                    galleryFile.value = "";

                }


                if (galleryFileHint) {

                    if (
                        selectedType === "video"
                    ) {

                        galleryFileHint.textContent =
                            "Pilih video untuk diupload";

                        galleryFile.accept =
                            "video/*";

                    } else {

                        galleryFileHint.textContent =
                            "Pilih foto untuk diupload";

                        galleryFile.accept =
                            "image/*";

                    }

                }

            }
        );

    });


    /* =====================================
       LOAD GALLERY
    ===================================== */

    async function loadGallery() {

        galleryGrid.innerHTML = "";

        const {
            data,
            error
        } = await supabaseClient
            .from("gallery")
            .select("*")
            .order("type", {
                ascending: true
            })
            .order("number", {
                ascending: true
            });

        if (error) {

            console.error(
                "Gagal mengambil gallery:",
                error
            );

            showNotification(
                "Gagal memuat galeri."
            );

            updateCount();

            return;

        }

        galleryData =
            data || [];

        renderGallery();

    }


    /* =====================================
   RENDER GALLERY
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

        article.dataset.id =
        item.id;

        article.dataset.filePath =
        item.file_path || "";


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
           FOTO / VIDEO
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

            video.muted =
                true;

            video.playsInline =
                true;

            video.preload =
                "metadata";

            media.appendChild(video);

        } else {

            const image =
                document.createElement("img");

            image.src =
                item.file_url;

            image.alt =
                item.title ||
                "Foto kenangan";

            image.loading =
                "lazy";

            media.appendChild(image);

        }


        /* =================================
           NOMOR
        ================================= */

        const number =
            document.createElement("span");

        number.className =
            "gallery-number";

        number.textContent =
            String(item.number)
                .padStart(2, "0");


        /* nomor berada DI ATAS FOTO */

        media.appendChild(number);


        /* =================================
           KOLOM INFORMASI DI BAWAH FOTO
        ================================= */

        const info =
            document.createElement("div");

        info.className =
            "gallery-info";


        const title =
            document.createElement("h3");

        title.textContent =
            item.title ||
            "Tanpa judul";


        const category =
            document.createElement("p");

        category.textContent =
            item.category ||
            "";


        info.appendChild(title);

        info.appendChild(category);


        /* =================================
           MASUKKAN KE CARD
        ================================= */

        card.appendChild(media);

        card.appendChild(info);

        article.appendChild(card);

        galleryGrid.appendChild(article);

    });


    applyFilter();

}


    /* =====================================
       FILTER
    ===================================== */

    function applyFilter() {

        const items = [
            ...document.querySelectorAll(
                ".gallery-item"
            )
        ];

        const keyword =
            currentSearch
                .toLowerCase()
                .trim();


        items.forEach(item => {

            const type =
                item.dataset.type || "";

            const category =
                item.dataset.category || "";

            const title =
                item.dataset.title || "";

            const description =
                item.dataset.description || "";


            let filterMatch = true;


            if (
                currentFilter === "video"
            ) {

                filterMatch =
                    type === "video";

            } else if (
                currentFilter !== "all"
            ) {

                filterMatch =
                    category === currentFilter;

            }


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
                    searchable.includes(
                        keyword
                    );

            }


            if (
                filterMatch &&
                searchMatch
            ) {

                item.classList.remove(
                    "hidden"
                );

            } else {

                item.classList.add(
                    "hidden"
                );

            }

        });


        updateCount();

    }


    /* =====================================
       COUNT
    ===================================== */

    function updateCount() {

        const visibleItems = [
            ...document.querySelectorAll(
                ".gallery-item:not(.hidden)"
            )
        ];

        if (galleryCount) {

            galleryCount.textContent =
                visibleItems.length;

        }


        if (galleryEmpty) {

            if (
                visibleItems.length === 0
            ) {

                galleryEmpty.classList.add(
                    "show"
                );

            } else {

                galleryEmpty.classList.remove(
                    "show"
                );

            }

        }

    }


    /* =====================================
       FILTER BUTTON
    ===================================== */

    filterButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                filterButtons.forEach(btn => {

                    btn.classList.remove(
                        "active"
                    );

                });

                button.classList.add(
                    "active"
                );

                currentFilter =
                    button.dataset.filter ||
                    "all";

                applyFilter();

            }
        );

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
       GET NEXT NUMBER
    ===================================== */

    async function getNextNumber(type) {

        const {
            data,
            error
        } = await supabaseClient
            .from("gallery")
            .select("number")
            .eq("type", type)
            .order("number", {
                ascending: false
            })
            .limit(1);

        if (error) {

            console.error(
                "Gagal mengambil nomor:",
                error
            );

            throw error;

        }


        if (
            !data ||
            data.length === 0
        ) {

            return 1;

        }


        return Number(data[0].number) + 1;

    }


    /* =====================================
       UPLOAD
    ===================================== */

    if (uploadForm) {

        uploadForm.addEventListener(
            "submit",
            async event => {

                event.preventDefault();


                const title =
                    galleryTitle.value.trim();

                const category =
                    galleryCategory.value;

                const description =
                    galleryDescription.value.trim();

                const file =
                    galleryFile.files[0];


                if (!title) {

                    showNotification(
                        "Judul wajib diisi."
                    );

                    return;

                }


                if (!category) {

                    showNotification(
                        "Kategori wajib dipilih."
                    );

                    return;

                }


                if (!file) {

                    showNotification(
                        "Pilih file terlebih dahulu."
                    );

                    return;

                }


                /* CEK TIPE FILE */

                if (
                    selectedType === "image" &&
                    !file.type.startsWith(
                        "image/"
                    )
                ) {

                    showNotification(
                        "File harus berupa foto."
                    );

                    return;

                }


                if (
                    selectedType === "video" &&
                    !file.type.startsWith(
                        "video/"
                    )
                ) {

                    showNotification(
                        "File harus berupa video."
                    );

                    return;

                }


                try {

                    gallerySubmitButton.disabled =
                        true;

                    gallerySubmitButton.innerHTML =
                        '<i class="bi bi-hourglass-split"></i> Mengupload...';


                    /* NOMOR */

                    const number =
                        await getNextNumber(
                            selectedType
                        );


                    /* BUCKET */

                    const bucket =
                        selectedType === "video"
                            ? "gallery-videos"
                            : "gallery-images";


                    /* FILE NAME */

                    const extension =
                        file.name
                            .split(".")
                            .pop()
                            .toLowerCase();


                    const safeTitle =
                        title
                            .toLowerCase()
                            .replace(
                                /[^a-z0-9]+/g,
                                "-"
                            )
                            .replace(
                                /^-+|-+$/g,
                                ""
                            );


                    const uniqueName =
                        `${Date.now()}-${safeTitle || "gallery"}.${extension}`;


                    const filePath =
                        `${selectedType}/${uniqueName}`;


                    /* UPLOAD STORAGE */

                    const {
                        error: uploadError
                    } = await supabaseClient
                        .storage
                        .from(bucket)
                        .upload(
                            filePath,
                            file,
                            {
                                cacheControl:
                                    "3600",

                                upsert:
                                    false
                            }
                        );


                    if (uploadError) {

                        throw uploadError;

                    }


                    /* PUBLIC URL */

                    const {
                        data: publicUrlData
                    } = supabaseClient
                        .storage
                        .from(bucket)
                        .getPublicUrl(
                            filePath
                        );


                    const fileUrl =
                        publicUrlData
                            .publicUrl;


                    /* SIMPAN DATABASE */

                    const {
                        error: databaseError
                    } = await supabaseClient
                        .from("gallery")
                        .insert([
                            {
                                number:
                                    number,

                                title:
                                    title,

                                description:
                                    description,

                                category:
                                    category,

                                type:
                                    selectedType,

                                file_url:
                                    fileUrl,

                                file_path:
                                    filePath
                            }
                        ]);


                    if (databaseError) {

                        /* HAPUS FILE JIKA DB GAGAL */

                        await supabaseClient
                            .storage
                            .from(bucket)
                            .remove([
                                filePath
                            ]);

                        throw databaseError;

                    }


                    /* BERHASIL */

                    showNotification(
                        selectedType === "video"
                            ? "Video berhasil ditambahkan!"
                            : "Foto berhasil ditambahkan!"
                    );


                    uploadForm.reset();

                    selectedType =
                        "image";


                    uploadTypeButtons.forEach(
                        button => {

                            button.classList.remove(
                                "active"
                            );

                            if (
                                button.dataset.type ===
                                "image"
                            ) {

                                button.classList.add(
                                    "active"
                                );

                            }

                        }
                    );


                    galleryFile.accept =
                        "image/*";


                    galleryFileHint.textContent =
                        "Pilih foto untuk diupload";


                    closeUploadModal();

                    await loadGallery();

                } catch (error) {

                    console.error(
                        "UPLOAD GALLERY ERROR:",
                        error
                    );

                    showNotification(
                        "Upload gagal. Cek Console untuk detail."
                    );

                } finally {

                    gallerySubmitButton.disabled =
                        false;

                    gallerySubmitButton.innerHTML =
                        '<i class="bi bi-cloud-arrow-up"></i> Upload';

                }

            }
        );

    }


    /* =====================================
       LIGHTBOX
    ===================================== */

    function getVisibleCards() {

        return [
            ...document.querySelectorAll(
                ".gallery-item:not(.hidden)"
            )
        ];

    }


    function openLightbox(item) {

    currentGalleryItem = item;

    const visibleItems = getVisibleCards();

    currentIndex = visibleItems.indexOf(item);

    if (currentIndex < 0) {
        currentIndex = 0;
    }

    /* TAMPILKAN LIGHTBOX DULU */
    lightbox.classList.add("active");
    document.body.classList.add("lightbox-open");

    /* TAMPILKAN TOMBOL HAPUS */
    if (deleteGalleryBtn) {

        deleteGalleryBtn.style.setProperty(
            "display",
            "inline-flex",
            "important"
        );

        deleteGalleryBtn.style.setProperty(
            "visibility",
            "visible",
            "important"
        );

        deleteGalleryBtn.style.setProperty(
            "opacity",
            "1",
            "important"
        );

        deleteGalleryBtn.style.setProperty(
            "pointer-events",
            "auto",
            "important"
        );

        deleteGalleryBtn.style.setProperty(
            "position",
            "fixed",
            "important"
        );

        deleteGalleryBtn.style.setProperty(
            "left",
            "50%",
            "important"
        );

        deleteGalleryBtn.style.setProperty(
            "bottom",
            "18px",
            "important"
        );

        deleteGalleryBtn.style.setProperty(
            "transform",
            "translateX(-50%)",
            "important"
        );

        deleteGalleryBtn.style.setProperty(
            "z-index",
            "2147483647",
            "important"
        );

        console.log(
            "DELETE BUTTON STYLE:",
            getComputedStyle(deleteGalleryBtn).display,
            getComputedStyle(deleteGalleryBtn).visibility,
            getComputedStyle(deleteGalleryBtn).opacity
        );
    }

    showLightboxItem();
}

    function showLightboxItem() {

        const visibleItems =
            getVisibleCards();

        if (
            visibleItems.length === 0
        ) {

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


        lightboxMedia.innerHTML =
            "";


        if (
            type === "video"
        ) {

            const video =
                document.createElement(
                    "video"
                );

            video.src =
                src;

            video.controls =
                true;

            video.autoplay =
                true;

            video.playsInline =
                true;

            lightboxMedia.appendChild(
                video
            );

        } else {

            const image =
                document.createElement(
                    "img"
                );

            image.src =
                src;

            image.alt =
                title;

            lightboxMedia.appendChild(
                image
            );

        }


        lightboxNumber.textContent =
            number;

        lightboxTitle.textContent =
            title;

        lightboxDescription.textContent =
            description;

    }


    /* CARD CLICK
   HANYA AREA FOTO / VIDEO YANG BISA DIBUKA
*/

galleryGrid.addEventListener(
    "click",
    event => {

        const media =
            event.target.closest(
                ".gallery-media"
            );

        if (!media) {
            return;
        }

        const item =
            media.closest(
                ".gallery-item"
            );

        if (!item) {
            return;
        }

        openLightbox(item);

    }
);


    /* CLOSE */

    function closeLightbox() {

    lightbox.classList.remove("active");

    document.body.classList.remove("lightbox-open");

    lightboxMedia.innerHTML = "";

    currentGalleryItem = null;

    /* SEMBUNYIKAN TOMBOL HAPUS */

    if (deleteGalleryBtn) {

        deleteGalleryBtn.style.display = "none";

    }

}

    /* =====================================
   DELETE GALLERY
===================================== */

function openDeleteConfirm() {

    if (!currentGalleryItem) {
        return;
    }

    if (!deleteGalleryConfirmModal) {
        return;
    }

    deleteGalleryConfirmModal.classList.add("active");

    deleteGalleryConfirmModal.setAttribute(
        "aria-hidden",
        "false"
    );

}


function closeDeleteConfirm() {

    if (!deleteGalleryConfirmModal) {
        return;
    }

    deleteGalleryConfirmModal.classList.remove("active");

    deleteGalleryConfirmModal.setAttribute(
        "aria-hidden",
        "true"
    );

}


/* TOMBOL HAPUS DI LIGHTBOX */

if (deleteGalleryBtn) {

    deleteGalleryBtn.addEventListener(
        "click",
        event => {

            console.log("TOMBOL HAPUS DIKLIK");

            event.stopPropagation();

            openDeleteConfirm();

        }
    );

}


/* BATAL */

if (deleteGalleryCancelBtn) {

    deleteGalleryCancelBtn.addEventListener(
        "click",
        event => {

            event.stopPropagation();

            closeDeleteConfirm();

        }
    );

}


/* KONFIRMASI HAPUS */

if (deleteGalleryConfirmBtn) {

    deleteGalleryConfirmBtn.addEventListener(
        "click",
        async event => {

            event.stopPropagation();

            if (!currentGalleryItem) {
                return;
            }


            const id =
                currentGalleryItem.dataset.id;

            const type =
                currentGalleryItem.dataset.type;

            const filePath =
                currentGalleryItem.dataset.filePath;


            if (!id) {

                console.error(
                    "ID gallery tidak ditemukan."
                );

                showNotification(
                    "Data galeri tidak ditemukan."
                );

                return;

            }


            try {

                deleteGalleryConfirmBtn.disabled =
                    true;

                deleteGalleryConfirmBtn.innerHTML =
                    "Menghapus...";


                /* =================================
                   BUCKET
                ================================= */

                const bucket =
                    type === "video"
                        ? "gallery-videos"
                        : "gallery-images";


                /* =================================
                   HAPUS FILE STORAGE
                ================================= */

                if (filePath) {

                    const {
                        error: storageError
                    } = await supabaseClient
                        .storage
                        .from(bucket)
                        .remove([
                            filePath
                        ]);


                    if (storageError) {

                        console.error(
                            "Gagal menghapus file Storage:",
                            storageError
                        );

                        throw storageError;

                    }

                }


                /* =================================
                   HAPUS DATABASE
                ================================= */

                const {
                    error: databaseError
                } = await supabaseClient
                    .from("gallery")
                    .delete()
                    .eq("id", id);


                if (databaseError) {

                    console.error(
                        "Gagal menghapus database:",
                        databaseError
                    );

                    throw databaseError;

                }


                /* =================================
                   BERHASIL
                ================================= */

                closeDeleteConfirm();

                closeLightbox();

                currentGalleryItem = null;

                showNotification(
                    "Kenangan berhasil dihapus."
                );


                await loadGallery();


            } catch (error) {

                console.error(
                    "DELETE GALLERY ERROR:",
                    error
                );

                showNotification(
                    "Gagal menghapus kenangan."
                );


            } finally {

                deleteGalleryConfirmBtn.disabled =
                    false;

                deleteGalleryConfirmBtn.innerHTML = `
                    <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path d="M4 7h16"></path>
                        <path d="M9 7V4h6v3"></path>
                        <path d="M7 7l1 13h8l1-13"></path>
                    </svg>
                    Hapus
                `;

            }

        }
    );

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
                    event.target ===
                    lightbox
                ) {

                    closeLightbox();

                }

            }
        );

    }


    /* PREV */

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


    /* NEXT */

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


    /* KEYBOARD */

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


            if (
                event.key === "Escape"
            ) {

                closeLightbox();

            }


            if (
                event.key === "ArrowLeft"
            ) {

                currentIndex--;

                showLightboxItem();

            }


            if (
                event.key === "ArrowRight"
            ) {

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