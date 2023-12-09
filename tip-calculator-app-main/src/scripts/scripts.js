const billEl = document.getElementById("bill");
const number_people = document.getElementById("people")
const tip_percentage = document.getElementById("tip-perc");
const percentageEl = document.querySelectorAll(".percentage");
const tip_amount = document.querySelector(".tip-amount");
const total_amount = document.querySelector(".total-amount");
const error_txt = document.querySelector(".error-txt")

billEl.addEventListener("input", () => {
    calculateTip()
})

number_people.addEventListener("input", () => {
    error_txt.classList.remove("error");
    calculateTip()
})

percentageEl.forEach(element => {
    element.addEventListener("click", () => {
        percentageEl.forEach(e => e.classList.remove("active"));
        element.classList.add("active");
        tip_percentage.value = '';
        calculateTip()
    })
})

tip_percentage.addEventListener("input", () => {
    if (tip_percentage.value != 0) {
        percentageEl.forEach(e => e.classList.remove("active"));
    }
    calculateTip()
})

function calculateTip() {
    var percentage = 1;

    var element = Array.from(percentageEl).find((e) => {
        return e.classList.contains("active");
    })
    if (element != undefined) {
        percentage = element.dataset.percentage;
    }
    percentage = tip_percentage.value || percentage;
    if (number_people.value > 0) {
        let tip = billEl.value * percentage / 100 / number_people.value;
        let total = billEl.value / number_people.value + tip;

        if (tip != Infinity && total != Infinity) {
            tip_amount.innerText = `$${tip.toFixed(2)}`;
            total_amount.innerText = `$${total.toFixed(2)}`;
        }
    } else {
        error_txt.classList.add("error");
    }
}

const resetBtn = document.getElementById("reset");

resetBtn.addEventListener("click", () => {
    location.reload();
})