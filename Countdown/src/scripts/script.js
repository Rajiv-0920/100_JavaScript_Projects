const daysEl = document.querySelector(".days");
const hoursEl = document.querySelector(".hours");
const minutesEl = document.querySelector(".minutes");
const secondsEl = document.querySelector(".seconds");

setInterval(() => {
    const date = new Date();
    const next_Year = new Date(`1-1-${date.getFullYear() + 1}`);
    let dif;

    dif = next_Year - date;

    let seconds = Math.floor(dif / 1000 % 60);
    let minutes = Math.floor(dif / 1000 / 60 % 60);
    let hours = Math.floor(dif / 1000 / 60 / 60 % 24);
    let days = Math.floor(dif / 1000 / 60 / 60 / 24);

    seconds = seconds < 10 ? `0${seconds}` : seconds;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    hours = hours < 10 ? `0${hours}` : hours;
    days = days < 10 ? `0${days}` : days;

    daysEl.innerText = days;
    hoursEl.innerText = hours;
    minutesEl.innerText = minutes;
    secondsEl.innerText = seconds;
}, 1000)