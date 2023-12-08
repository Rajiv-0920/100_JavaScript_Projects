const stars = document.querySelectorAll(".star");
const expressions = document.getElementById("expressions");
const submitBtn = document.querySelector(".btn-submit");
const ignoreBtn = document.querySelector(".btn-ignore");

const rate_container = document.querySelector(".rate-container");
const result_container = document.querySelector(".result-container");
const rate = document.querySelector(".rate");

const faces = {
    0: "./public/images/meh.png",
    1: "./public/images/sad.png",
    2: "./public/images/winking.png",
    3: "./public/images/smiling.png",
    4: "./public/images/surprised.png"
}

stars.forEach((star, idx) => {
    star.addEventListener("click", () => {
        submitBtn.disabled = false;
        stars.forEach(s => s.children[0].src = "./public/images/star-bg.svg")
        for (var i = 0; i < idx + 1; i++) {
            stars[i].children[0].src = "./public/images/star.svg";
        }
        rate.innerText = idx + 1;
        expressions.src = faces[idx];
    })
})

submitBtn.addEventListener("click", () => {
    rate_container.classList.add("hide");
    result_container.classList.add("show");
})

ignoreBtn.addEventListener("click", () => {
    var isExit = confirm("You want to exit");
    if (isExit === true)
        history.back();
})