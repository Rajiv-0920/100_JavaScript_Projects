const reviews = [
    {
        name: "Tanya Sinclair",
        work: "UX Engineer",
        img: "images/image-tanya.jpg",
        comment: "“ I’ve been interested in coding for a while but never taken the jump, until now. I couldn’t recommend this course enough. I’m now in the job of my dreams and so excited about the future. ”",
    },
    {
        name: "John Tarkpor",
        work: "Junior Front-end Developer",
        img: "images/image-john.jpg",
        comment: "“ If you want to lay the best foundation possible I’d recommend taking this course. The depth the instructors go into is incredible.I now feel so confident about starting up as a professional developer. ”",
    }
]

const img = document.getElementById("img");
const comment = document.getElementById("comment");
const name = document.getElementById("name");
const work = document.getElementById("work");

window.addEventListener("DOMContentLoaded", () => {
    showReviews(0);
})

const next = document.getElementById("next");
const prev = document.getElementById("prev");

next.addEventListener("click", () => {
    nextPrev("next");
})

prev.addEventListener("click", () => {
    nextPrev("previous");
})

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
        nextPrev("next");
    } else {
        nextPrev("previous");
    }
})

function showReviews(i) {
    img.src = reviews[i].img;
    comment.innerText = reviews[i].comment;
    name.innerText = reviews[i].name;
    work.innerText = reviews[i].work;
}

function fadeIn(opa) {
    img.style.opacity = opa;
    comment.style.opacity = opa;
    name.style.opacity = opa;
    work.style.opacity = opa;
}

let i = 0;
function nextPrev(element) {
    if (element == "next") {
        if (i < reviews.length - 1) {
            i++;
            fadeIn(0)
            setTimeout(() => {
                fadeIn(1);
                showReviews(i);
            }, 500);
        }
    } else {
        if (i != 0) {
            i--;
            fadeIn(0)
            setTimeout(() => {
                fadeIn(1);
                showReviews(i);
            }, 500);
        }
    }
}