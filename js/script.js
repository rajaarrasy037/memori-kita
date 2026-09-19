/* =========================================
   CLOCK & DATE
========================================= */

function updateClock() {

    const now = new Date();

    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    const clock = document.getElementById("clock");

    if (clock) {
        clock.textContent = `${hours} : ${minutes}`;
    }


    const date = document.getElementById("date");

    if (date) {

        const options = {
            day: "2-digit",
            month: "long",
            year: "numeric"
        };

        const formattedDate = now.toLocaleDateString(
            "id-ID",
            options
        );

        date.textContent = formattedDate;
    }
}


updateClock();

setInterval(updateClock, 1000);


/* =========================================
   MOBILE MENU
========================================= */

const menuButton = document.getElementById("menuButton");
const mobileMenu = document.getElementById("mobileMenu");
const closeMenu = document.getElementById("closeMenu");

if (menuButton && mobileMenu) {
    menuButton.addEventListener("click", function () {
        mobileMenu.classList.add("active");
    });
}

if (closeMenu && mobileMenu) {
    closeMenu.addEventListener("click", function () {
        mobileMenu.classList.remove("active");
    });
}

/* klik link → menu ditutup */

if (mobileMenu) {
    const mobileLinks = mobileMenu.querySelectorAll("a");

    mobileLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            mobileMenu.classList.remove("active");
        });
    });
}

/* klik area luar menu */

if (mobileMenu) {
    mobileMenu.addEventListener("click", function (event) {
        if (event.target === mobileMenu) {
            mobileMenu.classList.remove("active");
        }
    });
}

/* tombol escape */

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && mobileMenu) {
        mobileMenu.classList.remove("active");
    }
});


/* =========================================
   SETTINGS PANEL
========================================= */

const settingsButton =
    document.getElementById("settingsButton");

const settingsPanel =
    document.getElementById("settingsPanel");


if (settingsButton) {

    settingsButton.addEventListener("click", () => {

        settingsPanel.classList.add("open");

    });

}


/* =========================================
   CLOSE PANELS
========================================= */

const closeButtons =
    document.querySelectorAll("[data-close]");


closeButtons.forEach(button => {

    button.addEventListener("click", () => {

        const target =
            document.getElementById(
                button.dataset.close
            );

        if (target) {
            target.classList.remove("open");
        }

    });

});


/* =========================================
   CLOSE PANEL WHEN CLICKING BACKGROUND
========================================= */

document.querySelectorAll(".overlay-panel")
.forEach(panel => {

    panel.addEventListener("click", event => {

        if (event.target === panel) {

            panel.classList.remove("open");

        }

    });

});


/* =========================================
   ESCAPE KEY
========================================= */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        document.querySelectorAll(
            ".overlay-panel.open"
        ).forEach(panel => {

            panel.classList.remove("open");

        });

        if (mobileMenu) {
            mobileMenu.classList.remove("active");
        }

    }

});

/* =========================================
   NOTIFICATION
========================================= */

let notificationTimeout;

function showNotification(message) {

    const notification =
        document.getElementById("notification");

    const notificationText =
        document.getElementById("notificationText");


    notificationText.textContent = message;

    notification.classList.add("show");


    clearTimeout(notificationTimeout);


    notificationTimeout =
        setTimeout(() => {

            notification.classList.remove("show");

        }, 3000);

}

/* =========================================
   STAR ANIMATION SETTING
========================================= */

const starToggle =
    document.getElementById("starToggle");


if (starToggle) {

    const savedStars =
        localStorage.getItem("starsEnabled");


    if (savedStars === "false") {

        starToggle.checked = false;

        document.body.classList.add("no-stars");

    }


    starToggle.addEventListener("change", () => {

        const enabled =
            starToggle.checked;


        if (enabled) {

            document.body.classList.remove(
                "no-stars"
            );

            localStorage.setItem(
                "starsEnabled",
                "true"
            );

        } else {

            document.body.classList.add(
                "no-stars"
            );

            localStorage.setItem(
                "starsEnabled",
                "false"
            );

        }

    });

}


/* =========================================
   SOUND SETTING
========================================= */

const soundToggle =
    document.getElementById("soundToggle");


if (soundToggle) {

    const savedSound =
        localStorage.getItem("soundEnabled");


    if (savedSound === "true") {
        soundToggle.checked = true;
    }


    soundToggle.addEventListener("change", () => {

        localStorage.setItem(
            "soundEnabled",
            soundToggle.checked
        );

        if (soundToggle.checked) {

            showNotification(
                "efek suara diaktifkan"
            );

        } else {

            showNotification(
                "efek suara dimatikan"
            );

        }

    });

}


/* =========================================
   MOUSE PARALLAX
========================================= */

const background =
    document.querySelector(".space-background");

const moon =
    document.querySelector(".moon");


document.addEventListener("mousemove", event => {

    if (window.innerWidth < 800) {
        return;
    }


    const x =
        (event.clientX / window.innerWidth - 0.5);

    const y =
        (event.clientY / window.innerHeight - 0.5);


    if (moon) {

        moon.style.transform =
            `translate(${x * 15}px, ${y * 15}px)`;

    }


    const constellation =
        document.querySelectorAll(
            ".constellation"
        );


    constellation.forEach((item, index) => {

        const speed =
            index === 0 ? 8 : -6;


        item.style.transform =
            `translate(${x * speed}px, ${y * speed}px)`;

    });

});


/* =========================================
   RANDOM HERO MESSAGE
========================================= */

const messages = [

    "masih banyak cerita yang belum kita tulis",

    "beberapa kenangan memang pantas disimpan",

    "setiap perjalanan punya ceritanya sendiri",

    "suatu hari nanti kita akan melihat kembali semuanya",

    "ada cerita yang tidak ingin kita lupakan"

];


const messageElement =
    document.querySelector(".time-message");


if (messageElement) {

    let messageIndex =
        Number(
            localStorage.getItem(
                "memoryMessageIndex"
            )
        );


    if (
        Number.isNaN(messageIndex) ||
        messageIndex >= messages.length
    ) {
        messageIndex = 0;
    }


    messageElement.textContent =
        messages[messageIndex];


    setInterval(() => {

        messageIndex =
            (messageIndex + 1) %
            messages.length;


        messageElement.style.opacity = "0";


        setTimeout(() => {

            messageElement.textContent =
                messages[messageIndex];

            messageElement.style.opacity = "1";

            localStorage.setItem(
                "memoryMessageIndex",
                messageIndex
            );

        }, 500);

    }, 7000);

}


/* =========================================
   PAGE LOAD
========================================= */

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});

/* =========================================
   GLOBAL SEARCH
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const searchButton =
        document.getElementById("searchButton");

    const searchPanel =
        document.getElementById("searchPanel");

    const searchInput =
        document.getElementById("searchInput");


    if (!searchButton || !searchPanel) {
        return;
    }


    /* BUKA SEARCH */

    searchButton.addEventListener("click", () => {

        searchPanel.classList.add("open");

        setTimeout(() => {

            if (searchInput) {
                searchInput.focus();
            }

        }, 300);

    });


    /* TEKAN ENTER */

    if (searchInput) {

        searchInput.addEventListener("keydown", event => {

            if (event.key !== "Enter") {
                return;
            }

            const keyword =
                searchInput.value.trim();

            if (!keyword) {
                return;
            }

            window.location.href =
                "hasil-pencarian.html?search=" +
                encodeURIComponent(keyword);

        });

    }

});

/* =========================================
   SISTEM BINTANG
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const starContainers = [
        document.querySelector(".stars-small"),
        document.querySelector(".stars-medium"),
        document.querySelector(".stars-large")
    ].filter(Boolean);


    /* =====================================
       BUAT BINTANG
    ===================================== */

    function createStars(container, jumlah) {

        if (!container) return;

        container.innerHTML = "";

        for (let i = 0; i < jumlah; i++) {

            const star = document.createElement("span");

            star.className = "generated-star";

            const size =
                Math.random() * 2.5 + 1;

            star.style.width = `${size}px`;
            star.style.height = `${size}px`;

            star.style.left =
                `${Math.random() * 100}%`;

            star.style.top =
                `${Math.random() * 100}%`;

            star.style.animationDelay =
                `${Math.random() * 5}s`;

            star.style.animationDuration =
                `${Math.random() * 3 + 2}s`;

            container.appendChild(star);

        }

    }


    /* =====================================
       JUMLAH BINTANG
    ===================================== */

    createStars(
        document.querySelector(".stars-small"),
        80
    );

    createStars(
        document.querySelector(".stars-medium"),
        35
    );

    createStars(
        document.querySelector(".stars-large"),
        15
    );


    /* =====================================
       TOGGLE BINTANG
    ===================================== */

    const starToggle =
        document.getElementById("starToggle");

    const allStars =
        document.querySelectorAll(
            ".stars-small, .stars-medium, .stars-large"
        );


    function setStars(enabled) {

        allStars.forEach(container => {

            container.style.display =
                enabled ? "block" : "none";

        });

        localStorage.setItem(
            "showStars",
            enabled ? "true" : "false"
        );

    }


    if (starToggle) {

        const savedStars =
            localStorage.getItem("showStars");


        if (savedStars === "false") {

            starToggle.checked = false;

            setStars(false);

        } else {

            starToggle.checked = true;

            setStars(true);

        }


        starToggle.addEventListener(
            "change",
            () => {

                setStars(
                    starToggle.checked
                );

            }
        );

    }


    /* =====================================
       EFEK SUARA
    ===================================== */

    const soundToggle =
        document.getElementById("soundToggle");


    function setSound(enabled) {

        const audios =
            document.querySelectorAll("audio");


        audios.forEach(audio => {

            audio.muted = !enabled;

        });


        localStorage.setItem(
            "soundEnabled",
            enabled ? "true" : "false"
        );

    }


    if (soundToggle) {

        const savedSound =
            localStorage.getItem("soundEnabled");


        if (savedSound === "false") {

            soundToggle.checked = false;

        } else {

            soundToggle.checked = true;

        }


        setSound(
            soundToggle.checked
        );


        soundToggle.addEventListener(
            "change",
            () => {

                setSound(
                    soundToggle.checked
                );

            }
        );

    }

});

