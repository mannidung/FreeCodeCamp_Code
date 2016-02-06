$(document).ready(function() {

	/* Buttons */
	var timeMinus = $("#time_minus");
	var timePlus = $("#time_plus");
	var breakMinus = $("#break_minus");
	var breakPlus = $("#break_plus");
	var pomodoroStart = $("#pomodorotext");
	
	/* Strings */
	var timeString = $("#timecounter");
	var breakString = $("#breakcounter");
	var pomodoroStringMinutes = $("#pomodorocounter_minutes");
	var pomodoroStringSeconds = $("#pomodorocounter_seconds");

	/* Other elements */
	var progressbarRunner = $("#runner");
	var progressbarRunnerMargin = 0;

	var timer;
	var pomodoroWork = true;

	/* Initiate strings for the first time */
	var timeValue = 25; // standard working session time
	var breakValue = 5; // standard pause time

	var timerMinutes = timeValue;
	var timerSeconds = 0;
	var runnerCounter = 0;
	var runningLength = 210; // length of the progress bar
	var runnerStepInterval = 1;

	timeString.text(timeValue);
	breakString.text(breakValue);

	/* Adjust strings with plus and minus */
	timeMinus.click(function() {
		if (timeValue > 1) {
			timeValue -= 1;
			timeString.text(timeValue);
			if (pomodoroWork) {
				pomodoroStringMinutes.text(timeValue);
			};
		};
	});

	timePlus.click(function() {
		timeValue += 1;
		timeString.text(timeValue);
		if (pomodoroWork) {
			pomodoroStringMinutes.text(timeValue);
		};
	});

	breakMinus.click(function() {
		if (breakValue > 1) {
			breakValue -= 1;
			breakString.text(breakValue);
			if (pomodoroWork == false) {
				pomodoroStringMinutes.text(breakValue);
			};
		};
	});

	breakPlus.click(function() {
		breakValue += 1;
		breakString.text(breakValue);
		if (pomodoroWork == false) {
			pomodoroStringMinutes.text(breakValue);
		};
	});

	/* When clicking start */
	pomodoroStart.click(function() {
		if (pomodoroWork) {
			pomodoroStart.text("");

			timerMinutes = timeValue;
			timerSeconds = 0;

			runnerStepInterval = Math.ceil((timerMinutes*60)/runningLength);

			// Animate runner
			progressbarRunner.animate({
				"margin-left": runningLength
			},
			timerMinutes*60*1000);

			// Start timer
			timer = setInterval(function() {
				if (timerMinutes >= 0) {
					if (timerSeconds === 0) {
						timerSeconds = 59
						timerMinutes -= 1
						if (timerMinutes >= 0) {
							pomodoroStringMinutes.text(timerMinutes);
							pomodoroStringSeconds.text(timerSeconds);
						};
					} else{
						timerSeconds -= 1;
						pomodoroStringSeconds.text(timerSeconds);
					};
				} else{
					clearInterval(timer);

					var audio = new Audio('audio/gong.wav');
					audio.play();

					pomodoroStringMinutes.text(breakValue);
					pomodoroStringSeconds.text(0);
					pomodoroStart.text("START BREAK");

					progressbarRunner.css("background-image", "url('img/stickman-rest.jpg')");

					pomodoroWork = false;

				};
			}, 1000);
		} else{
			pomodoroStart.text("");

			timerMinutes = breakValue;
			timerSeconds = 0;

			runnerStepInterval = Math.ceil((timerMinutes*60)/runningLength);
			
			// Animate runner
			progressbarRunner.animate({
				"margin-left": 0
			},
			timerMinutes*60*1000);

			// Start timer
			timer = setInterval(function() {
				if (timerMinutes >= 0) {
					if (timerSeconds === 0) {
						timerSeconds = 59
						timerMinutes -= 1
						if (timerMinutes >= 0) {
							pomodoroStringMinutes.text(timerMinutes);
							pomodoroStringSeconds.text(timerSeconds);
						};
					} else{
						timerSeconds -= 1;
						pomodoroStringSeconds.text(timerSeconds);
					};
				} else{
					clearInterval(timer);

					var audio = new Audio('audio/gong.wav');
					audio.play();

					pomodoroStringMinutes.text(timeValue);
					pomodoroStringSeconds.text(0);
					pomodoroStart.text("START WORK");

					progressbarRunner.css("background-image", "url('img/stickman-repeat.gif')");

					pomodoroWork = true;
				};
			}, 1000);
		};
	});
});