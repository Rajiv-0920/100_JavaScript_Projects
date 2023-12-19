const input_info = document.getElementById("input-date")
const calculate = document.getElementById("calculate")
const result = document.getElementById("result")
const show_result = document.querySelector(".show-result")
const error_txt = document.getElementById("error-txt")
const reset_btn = document.getElementById("reset")

let current_info = new Date();

let current_date = {
    year: current_info.getFullYear(),
    month: current_info.getMonth() + 1,
    date: current_info.getDate()
}

calculate.addEventListener("click", () => {
    show_result.classList.add("hide");
    const date_of_birth = new Date(input_info.value);
    let input_date = {
        year: date_of_birth.getFullYear(),
        month: date_of_birth.getMonth() + 1,
        date: date_of_birth.getDate()
    }
    if (date_of_birth == "Invalid Date") {
        error();
    } else {
        const age = calc_Birth(current_date, input_date);
        if (age.year < 0 || age.month < 0 || age.date < 0) {
            error();
        } else {
            show_result.classList.remove("hide");
            result.innerText = `${age.year} years ${age.month} months ${age.date} days`;
            error_txt.classList.add("hide");
            input_info.classList.remove("error");
        }
    }
})

reset_btn.addEventListener("click", () => {
    input_info.value = ''
    reset();
})

function calc_Birth(current_date, input_date) {
    let year = current_date.year - input_date.year;
    let month = current_date.month - input_date.month;
    let days = current_date.date - input_date.date;
    if (month < 0) {
        year--;
        month += 12;
    }
    if (days < 0) {
        month--;
        days += 30;
        if (month < 0) {
            year--;
            month += 12;
        }
    }

    return { year: year, month: month, date: days };
}

function error() {
    error_txt.classList.remove("hide");
    input_info.classList.add("error");
    error_txt.innerText = `Enter valid date of birth`;
}

function reset() {
    show_result.classList.add("hide");
    error_txt.classList.add("hide");
    input_info.classList.remove("error");
}