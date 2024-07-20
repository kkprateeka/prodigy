let startTime;
let updatedTime;
let difference;
let tInterval;
let savedTime = 0;
let running = false;
let laps = [];

const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('laps');
const display = document.querySelector('.display');
const lapList = document.getElementById('laplist');

function startStopwatch() {
    if (!running) {
        startTime = new Date().getTime() - savedTime;
        tInterval = setInterval(getShowTime, 1);
        running = true;
        startBtn.style.display = 'none';
        pauseBtn.style.display = 'inline';
    }
}

function pauseStopwatch() {
    if (running) {
        clearInterval(tInterval);
        savedTime = difference;
        running = false;
        startBtn.style.display = 'inline';
        pauseBtn.style.display = 'none';
    }
}

function resetStopwatch() {
    clearInterval(tInterval);
    savedTime = 0;
    difference = 0;
    running = false;
    display.innerText = '00:00:00.000';
    startBtn.style.display = 'inline';
    pauseBtn.style.display = 'none';
    laps = [];
    renderLaps();
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000));
    display.innerText =
        (hours ? (hours > 9 ? hours : '0' + hours) : '00') + ':' +
        (minutes ? (minutes > 9 ? minutes : '0' + minutes) : '00') + ':' +
        (seconds ? (seconds > 9 ? seconds : '0' + seconds) : '00') + '.' +
        (milliseconds > 99 ? milliseconds : milliseconds > 9 ? '0' + milliseconds : '00' + milliseconds);
}

function addLap() {
    if (running) {
        laps.push(display.innerText);
        renderLaps();
    }
}

function renderLaps() {
    lapList.innerHTML = '';
    laps.forEach((lap, index) => {
        const li = document.createElement('li');
        li.innerText = `Lap ${index + 1}: ${lap}`;
        lapList.appendChild(li);
    });
}

startBtn.addEventListener('click', startStopwatch);
pauseBtn.addEventListener('click', pauseStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', addLap);
