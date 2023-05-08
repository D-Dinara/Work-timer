const workingTime = document.querySelector('#working-time');
const relaxingTime = document.querySelector('#relaxing-time');
const minutes = document.querySelector('#minutes');
const seconds = document.querySelector('#seconds');
const startButton = document.querySelector('#startTimer');
const timeOver = document.querySelector('#timeOver');
const timeTo = document.querySelector('#timeTo');
const forestButton = document.querySelector('#forest');
const oceanButton = document.querySelector('#ocean');
const rainButton = document.querySelector('#rain');
const sounds = document.querySelector('.sounds-container');
const forestSound = document.querySelector('#forestSound');
const forestVideo = document.querySelector('#forestVideo');
const oceanSound = document.querySelector('#oceanSound');
const oceanVideo = document.querySelector('#oceanVideo');
const rainSound = document.querySelector('#rainSound');
const rainVideo = document.querySelector('#rainVideo');
const foldingArea = document.querySelector('.folding-area');
const timerContainer = document.querySelector('.timer-container');
const container = document.querySelector('.container');
const showTimerButton = document.querySelector('#showTimer');

startButton.addEventListener('click', startTimer);

function startTimer() {
    if (workingTime.value.length === 0 || relaxingTime.value.length === 0) {
        alert('Please, enter number of minutes to the input fields');
        return false;
    }
    
    if (isNaN(workingTime.value) || isNaN(relaxingTime.value) || workingTime.value < 0 || relaxingTime.value < 0) {
        alert('Please, enter only number of minutes to the input fields');
        return false;
    }
    
    timeTo.style.display = 'block';
    timeTo.textContent = "It's time to work!"
    let workTimeAmount=  workingTime.value * 60; 
    calcTime();

    let workTimer = setInterval(calcTime, 1000);

    startButton.removeEventListener('click',startTimer);
    startButton.textContent = "STOP TIMER";
    startButton.addEventListener('click', stopWorkTimer)
    
    function stopWorkTimer() {
        clearInterval(workTimer);
        startButton.textContent = "START TIMER";
        startButton.addEventListener('click',startTimer);
        minutes.textContent = `0`;
        seconds.textContent = `00`;
        timeTo.style.display = 'none';
        showTimer();
    }

    function calcTime() {
        let workMinutes = Math.floor(workTimeAmount/60);
        let workSeconds = workTimeAmount%60;
        minutes.textContent = workMinutes;
        seconds.textContent = workSeconds;
        workTimeAmount--;
        if (workSeconds < 10) {
            seconds.textContent = `0${workSeconds}`;
        }

        if (workTimeAmount < 0) {
            clearInterval(workTimer);
            let relaxTimer = setInterval(calcRelaxTime, 1000);
            let relaxTimeAmount = relaxingTime.value * 60; 
            timeOver.play();
            timeTo.textContent = "It's time to relax!"
            sounds.style.display = 'flex';
            startButton.addEventListener('click', stopRelaxTimer);
            
            function stopRelaxTimer() {
                clearInterval(relaxTimer);
            }

            function calcRelaxTime() {
                let relaxMinutes = Math.floor(relaxTimeAmount/60);
                let relaxSeconds = relaxTimeAmount%60;
                minutes.textContent = relaxMinutes;
                seconds.textContent = relaxSeconds;
                relaxTimeAmount--;
                if (relaxSeconds < 10) {
                    seconds.textContent = `0${relaxSeconds}`;
                }
                if (relaxTimeAmount < 0) {
                    clearInterval(relaxTimer);
                    workTimer = setInterval(calcTime, 1000);
                    workTimeAmount=  workingTime.value * 60;
                    timeTo.textContent = "It's time to work!"
                    showTimer();
                    timeOver.play();
                }
                showTimerButton.addEventListener('click', () =>  {
                    showTimer();
                    if (relaxTimeAmount > 0) {
                        sounds.style.display = 'flex';
                    }
                });
            }
        }
    }

    function showTimer() {
        sounds.style.display = 'none';
        forestSound.pause();
        forestVideo.style.display = 'none';
        oceanSound.pause();
        oceanVideo.style.display = 'none';
        rainSound.pause();
        rainVideo.style.display = 'none';
        foldingArea.style.display = 'block';
        timerContainer.classList.remove('folded');
        container.classList.remove('folded');
        showTimerButton.style.display = 'none';
    }
}
   
forestButton.addEventListener('click',() => {
    forestSound.play();
    forestVideo.style.display = 'block';
    foldTimer();
})

oceanButton.addEventListener('click',() => {
    oceanSound.play();
    oceanVideo.style.display = 'block';
    foldTimer();
})

rainButton.addEventListener('click',() => {
    rainSound.play();
    rainVideo.style.display = 'block';
    foldTimer();
})

function foldTimer() {
    foldingArea.style.display = 'none';
    timerContainer.classList.add('folded');
    container.classList.add('folded');
    showTimerButton.style.display = 'block';
}





