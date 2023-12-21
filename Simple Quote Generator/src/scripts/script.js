const btn_select_quote = document.getElementById("select-quote");
const listEl = document.querySelector(".list-container");
const btn_Generate = document.querySelector(".btn-generate");
const quoteEl = document.querySelector(".quote");
const authorEl = document.querySelector(".author");

btn_select_quote.addEventListener("click", () => {
    document.body.classList.add("overlay");
    listEl.classList.add("show");
});

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("overlay")) {
        reset();
    }
});

document.addEventListener("DOMContentLoaded", () => {
    showList();
    generate_quote("Random")
});

btn_Generate.addEventListener("click", () => {
    generate_quote(btn_select_quote.innerText);
    btn_Generate.disabled = true;
});

async function showList() {
    try {
        const response = await fetch("https://api.quotable.io/tags");
        const data = await response.json();

        const quote_list = document.querySelector(".list");
        for (var i = 0; i < data.length - 1; i++) {
            quote_list.innerHTML += `<li class="list-item">${data[i].name}</li>`
        }
        const listItem = document.querySelectorAll(".list-item");
        listItem.forEach(item => {
            item.addEventListener("click", () => {
                listItem.forEach(item => item.classList.remove("active"));
                item.classList.add("active");
                btn_select_quote.innerText = item.innerText;
                btn_Generate.click();
                reset();
            })
        })
    } catch (error) {
        btn_select_quote.addEventListener("click", () => {
            alert("Try again later");
            reset();
        })
    }
}

function reset() {
    document.body.classList.remove("overlay");
    listEl.classList.remove("show");
}

async function generate_quote(tag) {
    try {
        let apiURL;

        if (tag != "Random") {
            apiURL = `https://api.quotable.io/random?tags=${tag}`;
        } else {
            apiURL = `https://api.quotable.io/random`;
        }

        const response = await fetch(apiURL);
        const data = await response.json();
        show_quote(data);
    } catch (error) {
        quoteEl.innerText = `Try again later`;
        authorEl.innerText = `An error happened`;
        btn_Generate.disabled = false;
    }
}

function show_quote(data) {
    const showLoader = document.querySelector(".loader");
    const quote_container = document.querySelector(".quote-container");

    showLoader.classList.add("show");
    quote_container.classList.add("hide");
    setTimeout(() => {
        quoteEl.innerText = `"${data.content}"`;
        authorEl.innerText = `~ ${data.author}`;
        showLoader.classList.remove("show");
        quote_container.classList.remove("hide");
        btn_Generate.disabled = false;
    }, 3000)
}

const btn_whatsapp = document.getElementById("btn-whatsapp");
const btn_twitter = document.getElementById("btn-twitter");

btn_whatsapp.addEventListener("click", () => {
    shareOn("Whatsapp");
});

btn_twitter.addEventListener("click", () => {
    shareOn("Twitter");
});

function shareOn(app) {
    if (app === "Whatsapp") {
        btn_whatsapp.href =
            `whatsapp://send?text=*${quoteEl.innerText}*%0A%0A_${authorEl.innerText}_%0A%0AGenerate more Quote: ${window.location.href}`;
        btn_whatsapp.target = `_blank`;
    } else {
        btn_twitter.href = `https://twitter.com/intent/tweet?text=${quoteEl.innerText}%0A%0A${authorEl.innerText}%0A%0AGenerate more Quote: ${window.location.href}`;
        btn_twitter.target = `_blank`;
    }
}