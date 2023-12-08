const dateEl = document.querySelector(".date");
const timeEl = document.querySelector(".time");
const numbers = document.querySelectorAll(".number");

const date = new Date();
const interval = 3000;
var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// Set Current Time
const timeID = setInterval(timeAndDate, 1000);

// Set Current Date
dateEl.innerText = `${ordinalNumber(date.getDate())} ${month[date.getMonth()]} ${date.getFullYear()}`;

numbers.forEach(element => {
    let startValue = 0;
    let endValue = +element.dataset.ceil;
    let duration = Math.floor(interval / endValue);
    let counter = setInterval(() => {
        startValue++;
        element.innerText = startValue;
        if (startValue == endValue) {
            clearInterval(counter);
        }
    }, duration)
})

// Current Time
function timeAndDate() {
    const date = new Date();

    let hours = date.getHours();
    let isAM = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    hours = hours > 10 ? hours : 0 + '' + hours;
    minutes = minutes > 10 ? minutes : 0 + '' + minutes;
    seconds = seconds > 10 ? seconds : 0 + '' + seconds;

    timeEl.innerText = `${hours}:${minutes}:${seconds} ${isAM}`
}

// Current Date
function ordinalNumber(number) {
    switch (number) {
        case 1:
        case 21:
        case 31:
            return number + "st";
        case 2:
            return number + "nd";
        case 3:
        case 23:
            return number + "rd";
    }
    return number + "th";
}