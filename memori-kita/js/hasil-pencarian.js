document.addEventListener("DOMContentLoaded", function () {

    const params = new URLSearchParams(window.location.search);
    const keyword = (params.get("search") || "").trim().toLowerCase();

    const searchTitle = document.getElementById("searchTitle");
    const searchSubtitle = document.getElementById("searchSubtitle");
    const searchResults = document.getElementById("searchResults");
    const searchNoResult = document.getElementById("searchNoResult");


    /* =========================================
       DATA PENCARIAN
    ========================================= */

    const searchData = [

        /* =========================
           MEMORI
        ========================= */

        {
            type: "memori",
            title: "hari pertama cerita dimulai",
            meta: "12 Januari 2025 · sukabumi · special",
            description:
                "setiap perjalanan selalu punya satu titik awal. mungkin saat itu semuanya terlihat biasa saja, tapi tanpa disadari hari tersebut menjadi bagian dari cerita yang nantinya ingin selalu kita ingat.",
            url: "memori.html"
        },

        {
            type: "memori",
            title: "hari yang tidak direncanakan",
            meta: "28 Februari 2025 · bogor · jalan-jalan",
            description:
                "terkadang momen terbaik justru datang tanpa direncanakan. tidak perlu sesuatu yang besar, cukup sebuah hari sederhana yang akhirnya berubah menjadi kenangan yang menyenangkan.",
            url: "memori.html"
        },

        {
            type: "memori",
            title: "sebuah hari sederhana",
            meta: "15 April 2025 · rumah · random",
            description:
                "bukan tentang seberapa besar sebuah kejadian, tapi tentang bagaimana sebuah hari biasa bisa terasa begitu berarti ketika kita menjalaninya dengan orang yang tepat.",
            url: "memori.html"
        },


        /* =========================
           GALERI
        ========================= */

        {
            type: "galeri",
            title: "hari pertama",
            meta: "galeri · special",
            description:
                "foto dari hari pertama yang menjadi bagian dari cerita kita.",
            url: "galeri.html"
        },

        {
            type: "galeri",
            title: "hari yang tidak direncanakan",
            meta: "galeri · jalan-jalan",
            description:
                "sebuah momen sederhana yang akhirnya menjadi kenangan.",
            url: "galeri.html"
        },

        {
            type: "galeri",
            title: "sebuah hari sederhana",
            meta: "galeri · random",
            description:
                "potongan kecil dari hari yang pernah kita lewati bersama.",
            url: "galeri.html"
        },

        {
            type: "galeri",
            title: "potongan kecil dari kita",
            meta: "galeri · video",
            description:
                "sebuah video yang menyimpan potongan kecil dari cerita kita.",
            url: "galeri.html"
        },


        /* =========================
           PESAN
        ========================= */

        {
            type: "pesan",
            title: "sebuah pesan",
            meta: "pesan · sebuah surat",
            description:
                "ada beberapa hal yang mungkin lebih mudah disampaikan lewat tulisan.",
            url: "pesan.html"
        },

        {
            type: "pesan",
            title: "hai kamu",
            meta: "pesan · surat",
            description:
                "kalau kamu sampai di halaman ini, berarti kamu sudah melihat cukup banyak bagian dari cerita yang ingin aku simpan.",
            url: "pesan.html"
        },

        {
            type: "pesan",
            title: "hal-hal sederhana",
            meta: "pesan · kenangan",
            description:
                "dari beberapa foto, beberapa cerita, dan potongan-potongan kecil dari waktu yang pernah kita lewati.",
            url: "pesan.html"
        },

        {
            type: "pesan",
            title: "terima kasih",
            meta: "pesan · surat",
            description:
                "aku cuma ingin bilang terima kasih karena pernah menjadi bagian dari cerita ini.",
            url: "pesan.html"
        },

        {
            type: "pesan",
            title: "setiap percakapan dan tawa",
            meta: "pesan · surat",
            description:
                "terima kasih untuk setiap percakapan, setiap tawa, setiap waktu yang pernah kita habiskan.",
            url: "pesan.html"
        },

        {
            type: "pesan",
            title: "cerita kita masih bisa bertambah",
            meta: "pesan · surat",
            description:
                "kalau masih ada banyak cerita yang belum tertulis di sini, mungkin memang belum waktunya. karena cerita kita masih bisa terus bertambah.",
            url: "pesan.html"
        },

        {
            type: "pesan",
            title: "dengan penuh cerita, raja",
            meta: "pesan · raja",
            description:
                "sebuah surat yang ditulis raja dan disimpan di antara kenangan.",
            url: "pesan.html"
        },


        /* =========================
           TENTANG KITA
        ========================= */

        {
            type: "tentang kita",
            title: "tentang kita",
            meta: "tentang kita · cerita",
            description:
                "dua orang, satu cerita, dan begitu banyak kenangan yang ingin tetap disimpan.",
            url: "tentang.html"
        },

        {
            type: "tentang kita",
            title: "bagaimana semuanya dimulai",
            meta: "tentang kita · awal cerita",
            description:
                "setiap cerita pasti memiliki awal. begitu juga dengan cerita kita.",
            url: "tentang.html"
        },

        {
            type: "tentang kita",
            title: "pertemuan sederhana",
            meta: "tentang kita · awal",
            description:
                "mungkin awalnya tidak ada yang menyangka kalau pertemuan sederhana bisa membawa kita sampai sejauh ini.",
            url: "tentang.html"
        },

        {
            type: "tentang kita",
            title: "dari obrolan kecil",
            meta: "tentang kita · cerita",
            description:
                "dari obrolan kecil, candaan sederhana, sampai berbagai kejadian yang akhirnya menjadi kenangan.",
            url: "tentang.html"
        },

        {
            type: "tentang kita",
            title: "raja",
            meta: "tentang kita · orang pertama",
            description:
                "seseorang yang ingin menyimpan setiap momen kecil menjadi bagian dari cerita yang tidak mudah dilupakan.",
            url: "tentang.html"
        },

        {
            type: "tentang kita",
            title: "nay",
            meta: "tentang kita · orang kedua",
            description:
                "seseorang yang membuat banyak hari biasa terasa sedikit lebih berarti.",
            url: "tentang.html"
        },

        {
            type: "tentang kita",
            title: "pertama kali bertemu",
            meta: "tentang kita · perjalanan",
            description:
                "sebuah awal kecil yang akhirnya menjadi bagian penting dari cerita kita.",
            url: "tentang.html"
        },

        {
            type: "tentang kita",
            title: "mulai banyak cerita",
            meta: "tentang kita · semakin dekat",
            description:
                "dari percakapan sederhana sampai cerita yang tidak pernah habis untuk dibahas.",
            url: "tentang.html"
        },

        {
            type: "tentang kita",
            title: "masih menulis cerita",
            meta: "tentang kita · sekarang",
            description:
                "karena cerita kita belum selesai sampai di sini.",
            url: "tentang.html"
        },

        {
            type: "tentang kita",
            title: "perjalanan kita",
            meta: "tentang kita · kenangan",
            description:
                "beberapa kenangan memang terlalu indah untuk hanya dibiarkan menjadi masa lalu.",
            url: "tentang.html"
        }

    ];


    /* =========================================
       TAMPILKAN KEYWORD
    ========================================= */

    if (keyword) {

        searchTitle.textContent =
            `"${keyword}"`;

    } else {

        searchTitle.textContent =
            "semua kenangan";

    }


    /* =========================================
       FILTER PENCARIAN
    ========================================= */

    const results = searchData.filter(item => {

        const text = `
            ${item.type}
            ${item.title}
            ${item.meta}
            ${item.description}
        `.toLowerCase();

        return text.includes(keyword);

    });


    /* =========================================
       SUBTITLE
    ========================================= */

    if (results.length > 0) {

        searchSubtitle.textContent =
            `${results.length} hasil ditemukan dari cerita kita`;

    } else {

        searchSubtitle.textContent =
            "menemukan sesuatu dari cerita kita";

    }


    /* =========================================
       JIKA TIDAK ADA HASIL
    ========================================= */

    if (results.length === 0) {

        searchResults.innerHTML = "";

        searchNoResult.style.display = "block";

        return;

    }


    searchNoResult.style.display = "none";


    /* =========================================
       TAMPILKAN HASIL
    ========================================= */

    searchResults.innerHTML = results.map(item => {

        return `
            <article class="search-result-item">

                <span class="search-result-type">
                    ${escapeHTML(item.type)}
                </span>

                <h3>
                    ${escapeHTML(item.title)}
                </h3>

                <p class="search-result-meta">
                    ${escapeHTML(item.meta)}
                </p>

                <p class="search-result-description">
                    ${escapeHTML(item.description)}
                </p>

                <a
                    href="${item.url}"
                    class="search-result-link"
                >
                    buka halaman
                    <span>→</span>
                </a>

            </article>
        `;

    }).join("");


    /* =========================================
       ESCAPE HTML
    ========================================= */

    function escapeHTML(text) {

        return String(text)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }

});