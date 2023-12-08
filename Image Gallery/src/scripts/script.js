const image_container = document.querySelector(".img-container");
const nextBtn = document.querySelector(".btn-next");
const prevBtn = document.querySelector(".btn-prev");

var count = 0;
setInterval(() => {
    count += 45;
    image_container.style.transform = `perspective(1000px) rotateY(${count}deg)`;
}, 3000)

nextBtn.addEventListener("click", () => {
    count += 45;
    image_container.style.transform = `perspective(1000px) rotateY(${count}deg)`;
})

prevBtn.addEventListener("click", () => {
    count -= 45;
    image_container.style.transform = `perspective(1000px) rotateY(${count}deg)`;
})