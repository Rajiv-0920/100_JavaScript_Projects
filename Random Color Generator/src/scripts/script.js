const color_container = document.querySelector(".color-container");
const generate_Btn = document.querySelector(".btn");

generate_Btn.addEventListener("click", () => {
    generate_Color()
})


generate_Color();

function generate_Color() {
    color_container.innerHTML = '';
    for (var i = 1; i <= 12; i++) {
        var color_Code = generate_code();
        color_container.innerHTML += `
        <div class="color-box">
        <div class="color" style="background-color: ${color_Code}"></div>
        <div class="color-round" style="background-color: ${color_Code}"></div>
        <div class="color-code">${color_Code}</div>
        <div class="copy">Copied..!</div>
        </div>`
    }
    const cpy_info = document.querySelectorAll(".copy");
    const color = document.querySelectorAll(".color");
    const color_round = document.querySelectorAll(".color-round");
    const color_txt = document.querySelectorAll(".color-code");

    copyToClipboard(color, cpy_info);
    copyToClipboard(color_txt, cpy_info);
    copyToClipboard(color_round, cpy_info);
}

function generate_code() {
    const code = "abcdef0123456789";
    let color_Code = "";
    for (var i = 0; i < 6; i++) {
        let random_num = Math.floor(Math.random() * 16);
        color_Code += code[random_num];
    }
    return `#${color_Code.toUpperCase()}`;
}

function copyToClipboard(element, cpy_info) {
    element.forEach((e, idx) => {
        e.addEventListener("click", () => {
            let color = e.parentNode.children[2].innerText.split('').filter(t => t != '#').join('');
            navigator.clipboard.writeText(color);
            cpy_info.forEach(e => e.classList.remove("active"))
            cpy_info[idx].classList.add("active");
            setTimeout(() => {
                cpy_info[idx].classList.remove("active");
            }, 3000)
        })
    })
}