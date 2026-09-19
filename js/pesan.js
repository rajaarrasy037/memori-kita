document.addEventListener("DOMContentLoaded", () => {

    const letterSection =
        document.getElementById("letterSection");

    const openLetter =
        document.getElementById("openLetter");

    const letterContent =
        document.getElementById("letterContent");


    if (!letterSection || !openLetter) {
        return;
    }


    let opened = false;


    openLetter.addEventListener("click", () => {

        if (opened) {
            return;
        }


        opened = true;


        letterSection.classList.add("open");


        openLetter.style.opacity = "0";

        openLetter.style.pointerEvents = "none";


        setTimeout(() => {

            letterContent.classList.add("show");


            setTimeout(() => {

                letterContent.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }, 250);


        }, 900);

    });

});