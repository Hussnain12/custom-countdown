const inputContainer = $('#input-container');
const countdownForm = $('#countdownform');
const dateEl = $('#date-picker');
const countdownEl = $('#countdown');
const countdownTitleEl = $('#countdown-title');
const countdownbtn = $('#countdown-button');
const timeElement1 = $('.span1');
const timeElement2 = $('.span2');
const timeElement3 = $('.span3');
const timeElement4 = $('.span4');
const completeEl = $('#complete');
const completeInfo = $('#complete-info');
const completebtn = $('#complete-button');
let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date;
let countdownActive;
let saveCountdown;
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

function updateDOM() {
    countdownActive = setInterval(() => {

        const now = new Date().getTime();
        const distance = countdownValue - now;
        // console.log(distance);
        const days = Math.floor(distance / day);
        const hours = Math.floor((distance % day) / hour);
        const minutes = Math.floor((distance % hour) / minute);
        const seconds = Math.floor((distance % minute) / second);
        // console.log(days, hours, minutes, seconds);
        inputContainer.prop('hidden', 'hidden');
        if (distance < 0) {
            countdownEl.prop('hidden', 'hidden');
            clearInterval(countdownActive);
            completeInfo.html(`${countdownTitle} finished on ${countdownDate}`);
            completeEl.prop('hidden', '');
        } else {
            countdownTitleEl.html(`${countdownTitle}`);
            timeElement1.html(`${days}`);
            timeElement2.html(`${hours}`);
            timeElement3.html(`${minutes}`);
            timeElement4.html(`${seconds}`);
            completeEl.prop('hidden', 'hidden');
            countdownEl.prop('hidden', '');
        }

    }, second);

}



const today = new Date().toISOString().split('T')[0];
dateEl.attr('min', today);
function updateCountdown(e) {
    e.preventDefault();
    countdownTitle = e.currentTarget[0].value;
    countdownDate = e.currentTarget[1].value;
    saveCountdown = {
        title: countdownTitle,
        date: countdownDate,
    };
    localStorage.setItem('countdown', JSON.stringify(saveCountdown));
    // console.log(countdownTitle, countdownDate);
    countdownValue = new Date(countdownDate).getTime();
    // console.log(countdownValue);
    updateDOM();
}

function reset() {
    countdownEl.prop('hidden', 'hidden');
    completeEl.prop('hidden', 'hidden');
    inputContainer.prop('hidden', '');
    clearInterval(countdownActive);
    countdownTitle = '';
    countdownDate = '';
    localStorage.removeItem('countdown')
}

function restorePreviousCountDown() {
    if (localStorage.getItem('countdown')) {
        inputContainer.prop('hidden', 'hidden');
        saveCountdown = JSON.parse(localStorage.getItem('countdown'));
        countdownTitle=saveCountdown.title;
        countdownDate=saveCountdown.date; 
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
}


countdownForm.submit(updateCountdown);
countdownbtn.click(reset);
completeEl.click(reset);

restorePreviousCountDown();