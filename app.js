// With querySelector, we assigned the elements to variables 

const countdownTimer = document.querySelector('.countdown-timer');
const hoursSpan = countdownTimer.querySelector('.hours');
const minutesSpan = countdownTimer.querySelector('.minutes');
const secondsSpan = countdownTimer.querySelector('.seconds');
const countdownForm = document.querySelector('.countdown-form');
const countdownInput = document.querySelector('#countdown-input');

// And we create an empty variable for the countdown date

let countdownDate;

// We create a function to update the countdown every second
function updateCountdown() {
    // We create a variable for the current date
    // And calculate the difference between the countdown date and the current date
    const now = new Date();
    const difference = countdownDate - now;

    // We calculate the hours, minutes and seconds from the difference
    // And we assign them to the corresponding elements
    // Because we get the time in milliseconds, we divide it by 1000 to get the time in seconds
    // And if we wanted to get hour; we would multiply it by 60 twice to get the time in hours
    // So same for minutes but after multiplying by 60. We use the % operator to get the remainder
    // If we did not use the % operator, we would get the total number of minutes 
    // Like 90 minutes instead of 30 minutes and 1 hour instead of 1 hour and 30 minutes etc.
    // And we use the floor() method to round the numbers

    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    console.log(hours, minutes, seconds);

    // We add a 0 in front of the numbers if they are less than 10
    // In this way it looks better 😎
    hoursSpan.textContent = hours < 10 ? '0' + hours : hours;
    minutesSpan.textContent = minutes < 10 ? '0' + minutes : minutes;
    secondsSpan.textContent = seconds < 10 ? '0' + seconds : seconds;

    // And we add a message when the countdown is over 🎉
    if (difference <= 0) {
        // Here we clear the interval so that the countdown stops
        clearInterval(countdownInterval);
        // And we assign the values to 00 so that it looks better
        hoursSpan.textContent = '00';
        minutesSpan.textContent = '00';
        secondsSpan.textContent = '00';
        // And we add the message
        countdownTimer.textContent = 'Countdown is over!';

        // We remove the message after 5 seconds so that it does not stay there forever
        // Who wants to see a message that says "Countdown is over!" forever 🤷🏻‍♂️
        setTimeout(() => {
            countdownTimer.textContent = '';
        }
            , 5000);
    }
}

// We create a variable for the countdown interval
// We will use it to clear the interval when the countdown is over
let countdownInterval;

// We add an event listener to the form
// And we assign the countdown date to the countdownDate variable   
countdownForm.addEventListener('submit', (e) => {
    // e.preventDefault() prevents the form from being submitted and the page from reloading
    // For more information: https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
    // I found this information on the internet, I did not know it before 😅

    e.preventDefault();

    // And we assign the countdown date to the countdownDate variable
    // We use the getTime() method to get the time in milliseconds

    countdownDate = new Date(countdownInput.value).getTime();
    countdownInterval = setInterval(updateCountdown, 1000);
});