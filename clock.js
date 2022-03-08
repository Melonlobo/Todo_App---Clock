setInterval(clock, 1000);
const dateMonthYear = document.querySelector('.month-day-year');
const day = document.querySelector('.day');
const month = document.querySelector('.month');
const date = document.querySelector('.date');
const year = document.querySelector('.year');
const secondHand = document.querySelector('.second');
const minuteHand = document.querySelector('.minute');
const hourHand = document.querySelector('.hour');

function clock() {
    const currentTime = new Date();
    const currentDay = currentTime.getDay();
    const currentDate = currentTime.getDate();
    const currentMonthNumber = currentTime.getMonth();
    const currentYear = currentTime.getFullYear();
    switch (currentDay) {
        case 0:
            day.textContent = 'Sunday';
            break;
        case 1:
            day.textContent = 'Monday';
            break;
        case 2:
            day.textContent = 'Tuesday';
            break;
        case 3:
            day.textContent = 'Wednesday';
            break;
        case 4:
            day.textContent = 'Thursday';
            break;
        case 5:
            day.textContent = 'Friday';
            break;
        case 6:
            day.textContent = 'Saturday';
            break;
    }
    switch (currentMonthNumber) {
        case 0:
            month.textContent = 'Jan';
            break;
        case 1:
            month.textContent = 'Feb';
            break;
        case 2:
            month.textContent = 'March';
            break;
        case 3:
            month.textContent = 'April';
            break;
        case 4:
            month.textContent = 'May';
            break;
        case 5:
            month.textContent = 'June';
            break;
        case 6:
            month.textContent = 'July';
            break;
        case 7:
            month.textContent = 'Aug';
            break;
        case 8:
            month.textContent = 'Sept';
            break;
        case 9:
            month.textContent = 'Oct';
            break;
        case 10:
            month.textContent = 'Nov';
            break;
        case 11:
            month.textContent = 'Dec';
            break;
    }
    date.textContent = currentDate;
    year.textContent = currentYear;
    const secondRatio = currentTime.getSeconds() / 60;
    const minuteRatio = (secondRatio + currentTime.getMinutes()) / 60;
    const hourRatio = (minuteRatio + currentTime.getHours()) / 12;
    rotate(secondHand, secondRatio);
    rotate(minuteHand, minuteRatio);
    rotate(hourHand, hourRatio);
}

function rotate(hand, rotationRatio) {
    hand.style.setProperty('--rotation', rotationRatio * 360);
}
clock();