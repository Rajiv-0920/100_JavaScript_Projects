const counterEl = document.getElementById("counter");
const resetBtn = document.getElementById("reset");
const counterIncrement = document.getElementById("increment");
const counterDecrement = document.getElementById("decrement");

counterIncrement.addEventListener("click", () => {
    counter(counterIncrement)
})

counterDecrement.addEventListener("click", () => {
    counter(counterDecrement)
})

resetBtn.addEventListener("click", () => {
    counter(resetBtn);
})

let count = 0;

function counter(element) {
    const id = element.getAttribute("id");

    switch (id) {
        case "increment": count++; break;
        case "decrement": count--; break;
        default: count = 0;
    }

    if (count > 0) {
        counterEl.style.color = "#29ADB2";
    } else if (count < 0) {
        counterEl.style.color = "#FF0032";
    } else {
        counterEl.style.color = "#279EFF";
    }

    count = (count < 10 && count >= 0) ? `0${count}` : count;
    counterEl.innerText = count;
}