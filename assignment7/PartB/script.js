document.addEventListener('DOMContentLoaded', () => {
    const timeDisplay = document.getElementById('time-display');
    const datePicker = document.getElementById('date-picker');
    const startButton = document.getElementById('start');
    const stopButton = document.getElementById('stop');
    const resetButton = document.getElementById('reset');

    let intervalId = null;
    let seconds = 0;

    // Set current date
    datePicker.valueAsDate = new Date();

    const updateTime = async () => {
        return new Promise((resolve) => {
            intervalId = setInterval(() => {
                seconds++;
                let hrs = Math.floor(seconds / 3600).toString().padStart(2, '0');
                let mins = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
                let secs = Math.floor(seconds % 60).toString().padStart(2, '0');
                timeDisplay.textContent = `${hrs}:${mins}:${secs}`;
                resolve();
            }, 1000);
        });
    };

    startButton.addEventListener('click', () => {
        if (intervalId === null) { // Prevent multiple intervals
            updateTime();
        }
    });

    stopButton.addEventListener('click', () => {
        if (intervalId !== null) {
            clearInterval(intervalId);
            intervalId = null;
        }
    });

    resetButton.addEventListener('click', () => {
        clearInterval(intervalId);
        intervalId = null;
        seconds = 0;
        timeDisplay.textContent = "00:00:00";
    });
});
