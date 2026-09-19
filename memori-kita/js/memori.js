/* =========================================
   SUPABASE
========================================= */

const SUPABASE_URL =
    "https://lwjnkiexgvmlrbxgwqbt.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_EGaiZXXKufCq6cs6I1z9Fw_5lQqMrcx";

const supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_PUBLISHABLE_KEY
    );

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

let cloudMemories = [];

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

    const items =
        document.querySelectorAll(".memory-item");

    memoryCount.textContent =
        String(items.length).padStart(2, "0");

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
            ...cloudMemories,
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
        let selectedFile = null;


        /* =====================================
           BUKA MODAL TAMBAH
        ===================================== */

        if (addButton && addModal) {

    addButton.addEventListener(
        "click",
        async () => {

            const {
                data: {
                    session
                }
            } = await supabaseClient.auth.getSession();

            if (!session) {

                window.location.href =
                    "login.html";

                return;

            }

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

                    selectedFile = file;

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
    selectedFile = null;

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
                            selectedFile = null;

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
        async event => {

            event.preventDefault();


            /* =================================
               CEK LOGIN
            ================================= */

            const {
                data: {
                    session
                }
            } = await supabaseClient.auth.getSession();


            if (!session) {

                window.location.href =
                    "login.html";

                return;

            }


            /* =================================
               CEK FOTO
            ================================= */

            if (!selectedFile) {

                alert(
                    "pilih foto terlebih dahulu"
                );

                return;

            }


            /* =================================
               AMBIL FORM
            ================================= */

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


            /* =================================
               TOMBOL LOADING
            ================================= */

            const submitButton =
                form.querySelector(
                    'button[type="submit"]'
                );


            if (submitButton) {

                submitButton.disabled = true;

                submitButton.textContent =
                    "menyimpan...";

            }


            try {

                /* =================================
                   NAMA FILE
                ================================= */

                const cleanFileName =
                    selectedFile.name
                        .replace(
                            /[^\w.-]/g,
                            "_"
                        );


                const filePath =
                    `${crypto.randomUUID()}-${cleanFileName}`;


                /* =================================
                   UPLOAD FOTO
                ================================= */

                const {
                    error: uploadError
                } = await supabaseClient.storage
                    .from("memory-images")
                    .upload(
                        filePath,
                        selectedFile,
                        {
                            upsert: false,
                            contentType:
                                selectedFile.type
                        }
                    );


                if (uploadError) {

                    console.error(
                        "Upload foto gagal:",
                        uploadError
                    );

                    alert(
                        "foto gagal diupload: " +
                        uploadError.message
                    );

                    return;

                }


                /* =================================
                   PUBLIC URL
                ================================= */

                const {
                    data: publicUrlData
                } =
                    supabaseClient.storage
                        .from("memory-images")
                        .getPublicUrl(
                            filePath
                        );


                const imageUrl =
                    publicUrlData.publicUrl;


                /* =================================
                   NOMOR KENANGAN
                ================================= */

                const allNumbers = [
                    ...memories.map(
                        memory =>
                            Number(memory.number)
                    ),

                    ...cloudMemories.map(
                        memory =>
                            Number(memory.number)
                    ),

                    ...getSavedMemories().map(
                        memory =>
                            Number(memory.number)
                    )
                ].filter(
                    number =>
                        !Number.isNaN(number)
                );


                const nextNumber =
                    allNumbers.length
                        ? Math.max(...allNumbers) + 1
                        : 1;


                /* =================================
                   SIMPAN KE DATABASE
                ================================= */

                const {
                    data,
                    error: databaseError
                } = await supabaseClient
                    .from("memories")
                    .insert([
                        {
                            number: nextNumber,

                            title: title,

                            date: date,

                            location: location,

                            category: category,

                            description:
                                description,

                            image_url:
                                imageUrl,

                            image_path:
                                filePath
                        }
                    ])
                    .select()
                    .single();


                if (databaseError) {

                    console.error(
                        "Database error:",
                        databaseError
                    );


                    /* hapus foto jika database gagal */

                    await supabaseClient.storage
                        .from("memory-images")
                        .remove([
                            filePath
                        ]);


                    alert(
                        "data kenangan gagal disimpan: " +
                        databaseError.message
                    );

                    return;

                }


                /* =================================
                   UBAH FORMAT DATA
                ================================= */

                const newMemory = {

                    id:
                        data.id,

                    number:
                        String(
                            data.number
                        ).padStart(
                            2,
                            "0"
                        ),

                    image:
                        data.image_url,

                    imagePath:
                        data.image_path,

                    title:
                        data.title,

                    date:
                        data.date,

                    location:
                        data.location,

                    category:
                        data.category,

                    description:
                        data.description

                };


                /* =================================
                   MASUKKAN KE CLOUD MEMORY
                ================================= */

                cloudMemories.push(
                    newMemory
                );


                /* =================================
                   TAMPILKAN LANGSUNG
                ================================= */

                addMemoryToTimeline(
                    newMemory
                );


                updateMemoryCount();


                /* =================================
                   TUTUP MODAL
                ================================= */

                closeAddModal();


                /* =================================
                   RESET FORM
                ================================= */

                form.reset();

                selectedImage = "";

                selectedFile = null;


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
                    "kenangan berhasil disimpan ke cloud ✦"
                );


            } catch (error) {

                console.error(
                    "Gagal menyimpan kenangan:",
                    error
                );


                alert(
                    "terjadi kesalahan saat menyimpan kenangan"
                );


            } finally {

                if (submitButton) {

                    submitButton.disabled =
                        false;

                    submitButton.textContent =
                        "Simpan Kenangan";

                }

            }

        }
    );

}


        /* =====================================
           TAMBAHKAN KE TIMELINE
        ===================================== */

        function addMemoryToTimeline(memory) {

    const timeline =
        document.querySelector(".timeline");

    if (!timeline || !memory) {
        return;
    }


    /* ==============================
       CEK DUPLIKAT SUPABASE
    ============================== */

    if (memory.id) {

        const existing =
            timeline.querySelector(
                `[data-cloud-id="${memory.id}"]`
            );

        if (existing) {
            return;
        }

    }


    /* ==============================
       BUAT ELEMENT
    ============================== */

    const article =
        document.createElement("article");

    article.className =
        "memory-item reveal custom-memory-item";


    if (memory.id) {

        article.dataset.cloudId =
            String(memory.id);

    }


    /* ==============================
       DATA UNTUK FILTER & SEARCH
    ============================== */

    const category =
        memory.category || "random";

    const categoryName =
        getCategoryName(category);

    const location =
        memory.location &&
        memory.location.trim()
            ? memory.location.trim()
            : "tanpa lokasi";


    article.dataset.category =
        category;

    article.dataset.title =
        memory.title || "";

    article.dataset.location =
        location;


    /* ==============================
       NOMOR URUTAN
    ============================== */

    let memoryNumber =
        Number(memory.number);


    if (!Number.isFinite(memoryNumber)) {

        const allNumbers = [

            ...memories,

            ...cloudMemories,

            ...getSavedMemories()

        ]
        .map(item =>
            Number(item?.number)
        )
        .filter(number =>
            Number.isFinite(number)
        );


        memoryNumber =
            allNumbers.length
                ? Math.max(...allNumbers) + 1
                : 1;

    }


    memoryNumber =
        String(memoryNumber)
            .padStart(2, "0");


    /* ==============================
       TANGGAL
    ============================== */

    let day = "--";
    let month = "";
    let year = "";


    if (memory.date) {

        const date =
            new Date(
                memory.date +
                "T00:00:00"
            );


        if (!Number.isNaN(date.getTime())) {

            day =
                date.toLocaleDateString(
                    "id-ID",
                    {
                        day: "2-digit"
                    }
                );


            month =
                date.toLocaleDateString(
                    "id-ID",
                    {
                        month: "short"
                    }
                );


            year =
                date.toLocaleDateString(
                    "id-ID",
                    {
                        year: "numeric"
                    }
                );

        }

    }


    /* ==============================
       HTML KARTU
       SAMA DENGAN KARTU BAWAAN
    ============================== */

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
                    src="${escapeHTML(
                        memory.image || ""
                    )}"
                    alt="${escapeHTML(
                        memory.title ||
                        "Kenangan"
                    )}"
                    onerror="this.parentElement.classList.add('image-empty')"
                >

                <div class="image-overlay">

                    <span>
                        ${memoryNumber}
                    </span>

                </div>

            </div>


            <div class="memory-info">

                <div class="memory-meta">

                    <span>
                        ✦ ${escapeHTML(
                            categoryName
                        )}
                    </span>

                    <span>
                        📍 ${escapeHTML(
                            location
                        )}
                    </span>

                </div>


                <h2>
                    ${escapeHTML(
                        memory.title ||
                        "Tanpa judul"
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


    /* ==============================
       MASUKKAN KE TIMELINE
    ============================== */

    timeline.appendChild(
        article
    );


    /* ==============================
       BACA KENANGAN
    ============================== */

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


    /* ==============================
       ANIMASI
    ============================== */

    observer.observe(
        article
    );

}

        /*  =====================================
            LOAD KENANGAN DARI SUPABASE
        ===================================== */

async function loadCloudMemories() {

    try {

        const {
            data,
            error
        } = await supabaseClient
            .from("memories")
            .select("*")
            .order(
                "date",
                {
                    ascending: true
                }
            );


        if (error) {

    console.error(
        "Gagal mengambil kenangan dari Supabase:",
        error
    );

    return;

}

console.log("DATA DARI SUPABASE:", data);

cloudMemories =
    (data || []).map(
        memory => ({

                    id:
                        memory.id,

                    number:
                        String(
                            memory.number
                        ).padStart(
                            2,
                            "0"
                        ),

                    image:
                        memory.image_url,

                    imagePath:
                        memory.image_path,

                    title:
                        memory.title,

                    date:
                        memory.date,

                    location:
                        memory.location,

                    category:
                        memory.category,

                    description:
                        memory.description

                })
            );


        cloudMemories.forEach(
            memory => {

                addMemoryToTimeline(
                    memory
                );

            }
        );


        updateMemoryCount();


        observeMemoryItems();


    } catch (error) {

        console.error(
            "Cloud memory error:",
            error
        );

    }

}

function renderBuiltInMemories() {

    const timeline =
        document.querySelector(".timeline");

    if (!timeline) {
        return;
    }

    const existingBuiltInItems =
        timeline.querySelectorAll(
            ".memory-item:not(.custom-memory-item)"
        );

    /*
       Kalau 3 kartu bawaan sudah ada di HTML,
       jangan dibuat ulang.
    */
    if (existingBuiltInItems.length >= memories.length) {
        return;
    }

    /*
       Kalau kartu bawaan belum ada,
       buat dari data memories.
    */

    memories.forEach((memory, index) => {

        const article =
            document.createElement("article");

        article.className =
            "memory-item reveal";

        article.dataset.category =
            index === 0
                ? "special"
                : index === 1
                    ? "jalan"
                    : "random";

        article.innerHTML = `

            <div class="timeline-date">

                <span>
                    ${memory.date.split(" ")[0]}
                </span>

                <small>
                    ${memory.date.split(" ")[1] || ""}<br>
                    ${memory.date.split(" ")[2] || ""}
                </small>

            </div>

            <div class="timeline-dot">
                <span></span>
            </div>

            <div class="memory-card">

                <div class="memory-image">

                    <img
                        src="${memory.image}"
                        alt="${escapeHTML(memory.title)}"
                    >

                    <div class="image-overlay">

                        <span>
                            ${memory.number}
                        </span>

                    </div>

                </div>

                <div class="memory-info">

                    <div class="memory-meta">

    <span>
        ${escapeHTML(
            memory.meta.split("·")[0].trim()
        )}
    </span>

    <span>
        ${escapeHTML(
            "📍 " +
            (
                memory.meta.split("📍")[1] || ""
            ).trim()
        )}
    </span>

</div>

                    <h2>
                        ${escapeHTML(memory.title)}
                    </h2>

                    <p>
                        ${escapeHTML(memory.description)}
                    </p>

                    <button
                        class="read-memory"
                        type="button"
                        data-memory="${index}"
                    >
                        baca kenangan
                        <span>→</span>
                    </button>

                </div>

            </div>

        `;

        timeline.appendChild(article);

        observer.observe(article);

    });

    setupReadButtons();

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

        function openCustomMemory(memory) {
    const modal = document.getElementById("memoryModal");

    if (!modal) return;

    const modalImage = document.getElementById("modalImage");
    const modalNumber = document.getElementById("modalNumber");
    const modalMeta = document.getElementById("modalMeta");
    const modalTitle = document.getElementById("modalTitle");
    const modalDate = document.getElementById("modalDate");
    const modalDescription = document.getElementById("modalDescription");

    // =========================
    // DATA KENANGAN
    // =========================

    const categoryName = getCategoryName(
        memory.category || "random"
    );

    const location =
        memory.location?.trim() || "tanpa lokasi";

    // Nomor urutan
    let number = Number(memory.number);

    if (!Number.isFinite(number)) {
        number = 1;
    }

    number = String(number).padStart(2, "0");


    // =========================
    // FOTO
    // =========================

    modalImage.src = memory.image || "";
    modalImage.alt = memory.title || "Kenangan";


    // =========================
    // NOMOR
    // =========================

    modalNumber.textContent = number;


    // =========================
    // KATEGORI + LOKASI
    // =========================

    modalMeta.textContent =
        `✦ ${categoryName} · 📍 ${location}`;


    // =========================
    // JUDUL
    // =========================

    modalTitle.textContent =
        memory.title || "Tanpa judul";


    // =========================
    // TANGGAL
    // =========================

    modalDate.textContent =
        formatMemoryDate(memory.date);


    // =========================
    // CERITA
    // =========================

    modalDescription.textContent =
        memory.description ||
        "Sebuah kenangan yang tersimpan.";


    // =========================
    // BUKA MODAL
    // =========================

    modal.classList.add("open");

    document.body.style.overflow = "hidden";
}


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

observeMemoryItems();

renderSavedMemories();

setupReadButtons();

loadCloudMemories();

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
