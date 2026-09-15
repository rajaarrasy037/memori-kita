/* =========================================
   MEMORY DATA
========================================= */

const memories = [

    {
        number: "01",
        image: "images/memory-1.jpg",
        meta: "✦ special · 📍 sukabumi",
        title: "hari pertama cerita dimulai",
        date: "12 Januari 2025",
        description:
            "setiap perjalanan selalu punya satu titik awal. mungkin saat itu semuanya terlihat biasa saja, tapi tanpa disadari hari tersebut menjadi bagian dari cerita yang nantinya ingin selalu kita ingat."
    },

    {
        number: "02",
        image: "images/memory-2.jpg",
        meta: "✦ jalan-jalan · 📍 bogor",
        title: "hari yang tidak direncanakan",
        date: "28 Februari 2025",
        description:
            "terkadang momen terbaik justru datang tanpa direncanakan. tidak perlu sesuatu yang besar, cukup sebuah hari sederhana yang akhirnya berubah menjadi kenangan yang menyenangkan."
    },

    {
        number: "03",
        image: "images/memory-3.jpg",
        meta: "✦ random · 📍 rumah",
        title: "sebuah hari sederhana",
        date: "15 April 2025",
        description:
            "bukan tentang seberapa besar sebuah kejadian, tapi tentang bagaimana sebuah hari biasa bisa terasa begitu berarti ketika kita menjalaninya dengan orang yang tepat."
    }

];


/* =========================================
   ELEMENTS
========================================= */

const filterButtons =
    document.querySelectorAll(".filter-button");

const memoryCount =
    document.getElementById("memoryCount");

const randomButton =
    document.getElementById("randomButton");

const modal =
    document.getElementById("memoryModal");

const modalClose =
    document.getElementById("modalClose");

const modalImage =
    document.getElementById("modalImage");

const modalNumber =
    document.getElementById("modalNumber");

const modalMeta =
    document.getElementById("modalMeta");

const modalTitle =
    document.getElementById("modalTitle");

const modalDate =
    document.getElementById("modalDate");

const modalDescription =
    document.getElementById("modalDescription");


/* =========================================
   STORAGE
========================================= */

const STORAGE_KEY =
    "memoriKitaMemories";


/* =========================================
   AMBIL DATA LOCAL STORAGE
========================================= */

function getSavedMemories() {

    try {

        const data =
            localStorage.getItem(STORAGE_KEY);

        if (!data) {
            return [];
        }

        const parsed =
            JSON.parse(data);

        return Array.isArray(parsed)
            ? parsed
            : [];

    } catch (error) {

        console.error(
            "gagal membaca kenangan:",
            error
        );

        return [];

    }

}


/* =========================================
   SIMPAN DATA
========================================= */

function saveMemories(data) {

    try {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(data)
        );

        return true;

    } catch (error) {

        console.error(
            "gagal menyimpan kenangan:",
            error
        );

        alert(
            "foto terlalu besar untuk disimpan di browser, coba gunakan foto yang lebih kecil"
        );

        return false;

    }

}


/* =========================================
   UPDATE COUNT
========================================= */

function updateMemoryCount(number = null) {

    if (!memoryCount) {
        return;
    }

    if (number !== null) {

        memoryCount.textContent =
            String(number).padStart(2, "0");

        return;

    }

    const saved =
        getSavedMemories();

    const total =
        memories.length + saved.length;

    memoryCount.textContent =
        String(total).padStart(2, "0");

}


/* =========================================
   CATEGORY NAME
========================================= */

function getCategoryName(category) {

    const categories = {

        special: "special",

        jalan: "jalan-jalan",

        random: "random"

    };

    return categories[category] || "kenangan";

}


/* =========================================
   FORMAT TANGGAL
========================================= */

function formatMemoryDate(dateString) {

    if (!dateString) {
        return "-";
    }

    const date =
        new Date(dateString + "T00:00:00");

    return date.toLocaleDateString(
        "id-ID",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );

}


/* =========================================
   ESCAPE HTML
========================================= */

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =========================================
   FILTER
========================================= */

function applyMemoryFilter(filter) {

    const items =
        document.querySelectorAll(".memory-item");

    let visibleCount = 0;

    items.forEach(item => {

        const category =
            item.dataset.category || "";

        if (
            filter === "all" ||
            category === filter
        ) {

            item.classList.remove("hidden");

            visibleCount++;

            setTimeout(() => {

                item.classList.add("reveal");

            }, 50);

        } else {

            item.classList.add("hidden");

            item.classList.remove("reveal");

        }

    });

    updateMemoryCount(visibleCount);

}


/* =========================================
   FILTER BUTTON
========================================= */

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(item => {

            item.classList.remove("active");

        });

        button.classList.add("active");

        const filter =
            button.dataset.filter;

        applyMemoryFilter(filter);

    });

});


/* =========================================
   INITIAL REVEAL
========================================= */

const observer =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "reveal"
                    );

                }

            });

        },

        {
            threshold: 0.12
        }

    );


function observeMemoryItems() {

    const items =
        document.querySelectorAll(".memory-item");

    items.forEach(item => {

        observer.observe(item);

    });

}


/* =========================================
   OPEN MEMORY
========================================= */

function openMemory(index) {

    const memory =
        memories[index];

    if (!memory || !modal) {
        return;
    }

    if (modalImage) {

        modalImage.src =
            memory.image;

        modalImage.alt =
            memory.title;

    }

    if (modalNumber) {

        modalNumber.textContent =
            memory.number;

    }

    if (modalMeta) {

        modalMeta.textContent =
            memory.meta;

    }

    if (modalTitle) {

        modalTitle.textContent =
            memory.title;

    }

    if (modalDate) {

        modalDate.textContent =
            memory.date;

    }

    if (modalDescription) {

        modalDescription.textContent =
            memory.description;

    }

    modal.classList.add("open");

    document.body.style.overflow =
        "hidden";

}


/* =========================================
   READ BUTTON BAWAAN
========================================= */

function setupReadButtons() {

    const readButtons =
        document.querySelectorAll(
            ".read-memory"
        );

    readButtons.forEach(button => {

        if (button.dataset.ready === "true") {
            return;
        }

        button.dataset.ready = "true";

        button.addEventListener("click", () => {

            const index =
                Number(
                    button.dataset.memory
                );

            openMemory(index);

        });

    });

}


/* =========================================
   CLOSE MODAL
========================================= */

function closeMemory() {

    if (!modal) {
        return;
    }

    modal.classList.remove("open");

    document.body.style.overflow = "";

}


/* tombol close */

if (modalClose) {

    modalClose.addEventListener(
        "click",
        closeMemory
    );

}


/* klik background */

if (modal) {

    modal.addEventListener("click", event => {

        if (event.target === modal) {

            closeMemory();

        }

    });

}


/* =========================================
   ESCAPE
========================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            modal &&
            modal.classList.contains("open")
        ) {

            closeMemory();

        }

    }
);


/* =========================================
   RANDOM MEMORY
========================================= */

if (randomButton) {

    randomButton.addEventListener(
        "click",
        () => {

            const saved =
                getSavedMemories();

            const allMemories = [
                ...memories,
                ...saved
            ];

            if (!allMemories.length) {
                return;
            }

            const randomIndex =
                Math.floor(
                    Math.random() *
                    allMemories.length
                );

            const randomMemory =
                allMemories[randomIndex];

            if (randomMemory.id) {

                openCustomMemory(
                    randomMemory
                );

            } else {

                const builtInIndex =
                    memories.indexOf(
                        randomMemory
                    );

                openMemory(
                    builtInIndex
                );

            }

        }
    );

}


/* =========================================
   TAMBAH KENANGAN
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const addButton =
            document.getElementById(
                "addMemoryButton"
            );

        const addModal =
            document.getElementById(
                "addMemoryModal"
            );

        const closeButton =
            document.getElementById(
                "addMemoryClose"
            );

        const form =
            document.getElementById(
                "addMemoryForm"
            );

        const photoInput =
            document.getElementById(
                "memoryPhoto"
            );

        const photoPreview =
            document.getElementById(
                "memoryUploadPreview"
            );

        const titleInput =
            document.getElementById(
                "memoryTitle"
            );

        const dateInput =
            document.getElementById(
                "memoryDate"
            );

        const locationInput =
            document.getElementById(
                "memoryLocation"
            );

        const categoryInput =
            document.getElementById(
                "memoryCategory"
            );

        const descriptionInput =
            document.getElementById(
                "memoryDescription"
            );


        let selectedImage = "";


        /* =====================================
           BUKA MODAL TAMBAH
        ===================================== */

        if (addButton && addModal) {

            addButton.addEventListener(
                "click",
                () => {

                    addModal.classList.add(
                        "active"
                    );

                }
            );

        }


        /* =====================================
           TUTUP MODAL TAMBAH
        ===================================== */

        function closeAddModal() {

            if (!addModal) {
                return;
            }

            addModal.classList.remove(
                "active"
            );

        }


        if (closeButton) {

            closeButton.addEventListener(
                "click",
                closeAddModal
            );

        }


        if (addModal) {

            addModal.addEventListener(
                "click",
                event => {

                    if (
                        event.target ===
                        addModal
                    ) {

                        closeAddModal();

                    }

                }
            );

        }


        /* =====================================
           PREVIEW FOTO
        ===================================== */

        if (photoInput && photoPreview) {

            photoInput.addEventListener(
                "change",
                event => {

                    const file =
                        event.target.files[0];

                    if (!file) {
                        return;
                    }

                    if (
                        !file.type.startsWith(
                            "image/"
                        )
                    ) {

                        alert(
                            "file yang dipilih harus berupa foto"
                        );

                        photoInput.value = "";

                        selectedImage = "";

                        return;

                    }


                    const reader =
                        new FileReader();


                    reader.onload =
                        event => {

                            selectedImage =
                                event.target.result;


                            photoPreview.classList.add(
                                "has-image"
                            );


                            photoPreview.innerHTML = `

                                <img
                                    src="${selectedImage}"
                                    alt="preview foto"
                                >

                                <div class="memory-upload-overlay">

                                    <span>↻</span>

                                    <strong>
                                        ganti foto
                                    </strong>

                                </div>

                            `;

                        };


                    reader.onerror =
                        () => {

                            selectedImage = "";

                            alert(
                                "foto gagal dibaca, coba pilih foto lain"
                            );

                        };


                    reader.readAsDataURL(file);

                }
            );

        }


        /* =====================================
           SUBMIT
        ===================================== */

        if (form) {

            form.addEventListener(
                "submit",
                event => {

                    event.preventDefault();


                    if (!selectedImage) {

                        alert(
                            "pilih foto terlebih dahulu"
                        );

                        return;

                    }


                    const title =
                        titleInput
                            ? titleInput.value.trim()
                            : "";


                    const date =
                        dateInput
                            ? dateInput.value
                            : "";


                    const location =
                        locationInput
                            ? locationInput.value.trim()
                            : "";


                    const category =
                        categoryInput
                            ? categoryInput.value
                            : "random";


                    const description =
                        descriptionInput
                            ? descriptionInput.value.trim()
                            : "";


                    if (!title || !date) {

                        alert(
                            "judul dan tanggal wajib diisi"
                        );

                        return;

                    }


                    const newMemory = {

                        id: Date.now(),

                        image: selectedImage,

                        title: title,

                        date: date,

                        location: location,

                        category: category,

                        description: description

                    };


                    const savedMemories =
                        getSavedMemories();


                    savedMemories.push(
                        newMemory
                    );


                    const saved =
                        saveMemories(
                            savedMemories
                        );


                    if (!saved) {
                        return;
                    }


                    /* tampilkan langsung */

                    addMemoryToTimeline(
                        newMemory
                    );


                    /* update jumlah */

                    updateMemoryCount();


                    /* tutup modal */

                    closeAddModal();


                    /* reset form */

                    form.reset();

                    selectedImage = "";


                    if (photoPreview) {

                        photoPreview.classList.remove(
                            "has-image"
                        );

                        photoPreview.innerHTML = `

                            <span>＋</span>

                            <strong>
                                pilih foto
                            </strong>

                            <small>
                                JPG, PNG, WEBP
                            </small>

                        `;

                    }


                    showMemoryNotification(
                        "kenangan berhasil ditambahkan ✦"
                    );

                }
            );

        }


        /* =====================================
           TAMBAHKAN KE TIMELINE
        ===================================== */

        function addMemoryToTimeline(memory) {

            const timeline =
                document.querySelector(
                    ".timeline"
                );

            if (!timeline) {
                return;
            }


            const article =
                document.createElement(
                    "article"
                );


            article.className =
                "memory-item reveal custom-memory-item";


            article.dataset.category =
                memory.category || "random";


            const date =
                new Date(
                    memory.date +
                    "T00:00:00"
                );


            const day =
                date.toLocaleDateString(
                    "id-ID",
                    {
                        day: "2-digit"
                    }
                );


            const month =
                date.toLocaleDateString(
                    "id-ID",
                    {
                        month: "short"
                    }
                );


            const year =
                date.toLocaleDateString(
                    "id-ID",
                    {
                        year: "numeric"
                    }
                );


            const categoryName =
                getCategoryName(
                    memory.category
                );


            article.innerHTML = `

                <div class="timeline-date">

                    <span>
                        ${day}
                    </span>

                    <small>
                        ${month}<br>
                        ${year}
                    </small>

                </div>


                <div class="timeline-dot">

                    <span></span>

                </div>


                <div class="memory-card">

                    <div class="memory-image">

                        <img
                            src="${memory.image}"
                            alt="${escapeHTML(
                                memory.title
                            )}"
                        >

                        <div class="image-overlay">

                            <span>
                                ✦ ${categoryName}
                            </span>

                        </div>

                    </div>


                    <div class="memory-info">

                        <div class="memory-meta">

                            <span>
                                ${escapeHTML(
                                    memory.location ||
                                    "tanpa lokasi"
                                )}
                            </span>

                            <span>•</span>

                            <span>
                                ${categoryName}
                            </span>

                        </div>


                        <h2>
                            ${escapeHTML(
                                memory.title
                            )}
                        </h2>


                        <p>
                            ${escapeHTML(
                                memory.description ||
                                "sebuah kenangan yang tersimpan"
                            )}
                        </p>


                        <button
                            class="read-memory"
                            type="button"
                        >

                            baca kenangan

                            <span>→</span>

                        </button>

                    </div>

                </div>

            `;


            timeline.appendChild(
                article
            );


            /* tombol buka modal */

            const readButton =
                article.querySelector(
                    ".read-memory"
                );


            if (readButton) {

                readButton.addEventListener(
                    "click",
                    () => {

                        openCustomMemory(
                            memory
                        );

                    }
                );

            }


            /* observer */

            observer.observe(
                article
            );


            /* gambar */

            const image =
                article.querySelector(
                    ".memory-image img"
                );


            if (image) {

                image.addEventListener(
                    "error",
                    () => {

                        console.error(
                            "gambar kenangan gagal ditampilkan:",
                            memory.image
                        );

                    }
                );

            }

        }


        /* =====================================
           TAMPILKAN DATA TERSIMPAN
        ===================================== */

        function renderSavedMemories() {

            const savedMemories =
                getSavedMemories();


            savedMemories.forEach(
                memory => {

                    if (
                        memory &&
                        memory.image &&
                        memory.title
                    ) {

                        addMemoryToTimeline(
                            memory
                        );

                    }

                }
            );


            updateMemoryCount();

            observeMemoryItems();

        }


        /* =====================================
           BUKA MODAL CUSTOM
        ===================================== */

        window.openCustomMemory =
            function(memory) {

                const memoryModal =
                    document.getElementById(
                        "memoryModal"
                    );

                if (!memoryModal) {
                    return;
                }


                const image =
                    document.getElementById(
                        "modalImage"
                    );

                const number =
                    document.getElementById(
                        "modalNumber"
                    );

                const meta =
                    document.getElementById(
                        "modalMeta"
                    );

                const title =
                    document.getElementById(
                        "modalTitle"
                    );

                const date =
                    document.getElementById(
                        "modalDate"
                    );

                const description =
                    document.getElementById(
                        "modalDescription"
                    );


                if (image) {

                    image.src =
                        memory.image;

                    image.alt =
                        memory.title;

                }


                if (number) {

                    number.textContent =
                        "✦";

                }


                if (meta) {

                    meta.textContent =
                        `✦ ${
                            getCategoryName(
                                memory.category
                            )
                        } · 📍 ${
                            memory.location ||
                            "tanpa lokasi"
                        }`;

                }


                if (title) {

                    title.textContent =
                        memory.title;

                }


                if (date) {

                    date.textContent =
                        formatMemoryDate(
                            memory.date
                        );

                }


                if (description) {

                    description.textContent =
                        memory.description ||
                        "";

                }


                /* PENTING:
                   modal memakai class OPEN,
                   bukan ACTIVE */

                memoryModal.classList.add(
                    "open"
                );


                document.body.style.overflow =
                    "hidden";

            };


        /* =====================================
           NOTIFIKASI
        ===================================== */

        function showMemoryNotification(
            message
        ) {

            const notification =
                document.getElementById(
                    "notification"
                );

            if (!notification) {
                return;
            }


            notification.textContent =
                message;


            notification.classList.add(
                "show"
            );


            setTimeout(
                () => {

                    notification.classList.remove(
                        "show"
                    );

                },
                3000
            );

        }


        /* =====================================
           LOAD DATA
        ===================================== */

        renderSavedMemories();

        setupReadButtons();

    }
);


/* =========================================
   SEARCH
========================================= */

const searchInput =
    document.getElementById(
        "searchInput"
    );


if (searchInput) {

    searchInput.addEventListener(
        "input",
        () => {

            const keyword =
                searchInput.value
                    .toLowerCase()
                    .trim();


            const items =
                document.querySelectorAll(
                    ".memory-item"
                );


            if (!keyword) {

                items.forEach(item => {

                    item.classList.remove(
                        "hidden"
                    );

                });


                updateMemoryCount(
                    items.length
                );

                return;

            }


            let result = 0;


            items.forEach(item => {

                const title =
                    (
                        item.dataset.title ||
                        item.querySelector(
                            "h2"
                        )?.textContent ||
                        ""
                    ).toLowerCase();


                const location =
                    (
                        item.dataset.location ||
                        item.querySelector(
                            ".memory-meta span"
                        )?.textContent ||
                        ""
                    ).toLowerCase();


                const category =
                    (
                        item.dataset.category ||
                        ""
                    ).toLowerCase();


                const match =
                    title.includes(keyword) ||
                    location.includes(keyword) ||
                    category.includes(keyword);


                if (match) {

                    item.classList.remove(
                        "hidden"
                    );

                    result++;

                } else {

                    item.classList.add(
                        "hidden"
                    );

                }

            });


            updateMemoryCount(result);

        }
    );

}
