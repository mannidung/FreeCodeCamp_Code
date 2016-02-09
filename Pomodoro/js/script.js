$(document).ready(function() {

	/* Buttons */
	var timeMinus = $("#time_minus");
	var timePlus = $("#time_plus");
	var breakMinus = $("#break_minus");
	var breakPlus = $("#break_plus");
	var pomodoroStart = $("#pomodorotext");
	var resetButton = $("#resetbutton");

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
	var running = false;

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
  		if (pomodoroWork && running == false) {
  			pomodoroStringMinutes.text(timeValue);
  		};
  	};
  });

  timePlus.click(function() {
  	timeValue += 1;
  	timeString.text(timeValue);
  	if (pomodoroWork && running == false) {
  		pomodoroStringMinutes.text(timeValue);
  	};
  });

  breakMinus.click(function() {
  	if (breakValue > 1) {
  		breakValue -= 1;
  		breakString.text(breakValue);
  		if (pomodoroWork == false && running == false) {
  			pomodoroStringMinutes.text(breakValue);
  		};
  	};
  });

  breakPlus.click(function() {
  	breakValue += 1;
  	breakString.text(breakValue);
  	if (pomodoroWork == false && running == false) {
  		pomodoroStringMinutes.text(breakValue);
  	};
  });

  resetButton.click(function() {
  	clearInterval(timer);
  	timeString.text(timeValue);
  	breakString.text(breakValue);
  	pomodoroStringMinutes.text(timeValue);
  	pomodoroStringSeconds.text("0");
  	progressbarRunner.stop();
  	progressbarRunner.css("background-image", "url('https://s3.eu-central-1.amazonaws.com/parperssonmattsson-freecodecamp-assets/pomodoro/img/stickman-repeat.gif')");
  	progressbarRunner.css("margin-left", "0px");
  	pomodoroStart.text("START WORK");
  	running = false;
  });

  /* When clicking start */
  pomodoroStart.click(function() {
  	if (pomodoroWork) {

  		running = true;
  		pomodoroStart.text("");

  		timerMinutes = timeValue;
  		timerSeconds = 0;

      // Animate runner
      progressbarRunner.animate({
      	"margin-left": runningLength
      },
      timerMinutes * 60 * 1000);

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
      		} else {
      			timerSeconds -= 1;
      			pomodoroStringSeconds.text(timerSeconds);
      		};
      	} else {
      		clearInterval(timer);
      		running = false;

      		var audio = new Audio('https://s3.eu-central-1.amazonaws.com/parperssonmattsson-freecodecamp-assets/pomodoro/audio/gong.mp3');
      		audio.play();

      		pomodoroStringMinutes.text(breakValue);
      		pomodoroStringSeconds.text(0);
      		pomodoroStart.text("START BREAK");

      		progressbarRunner.css("background-image", "url('https://s3.eu-central-1.amazonaws.com/parperssonmattsson-freecodecamp-assets/pomodoro/img/stickman-rest.jpg')");

      		pomodoroWork = false;

      	};
      }, 1000);
  } else {

  	running = true;
  	pomodoroStart.text("");

  	timerMinutes = breakValue;
  	timerSeconds = 0;

      // Animate runner
      progressbarRunner.animate({
      	"margin-left": 0
      },
      timerMinutes * 60 * 1000);

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
      		} else {
      			timerSeconds -= 1;
      			pomodoroStringSeconds.text(timerSeconds);
      		};
      	} else {
      		running = false;
      		clearInterval(timer);

      		var audio = new Audio('https://s3.eu-central-1.amazonaws.com/parperssonmattsson-freecodecamp-assets/pomodoro/audio/gong.mp3');
      		audio.play();

      		pomodoroStringMinutes.text(timeValue);
      		pomodoroStringSeconds.text(0);
      		pomodoroStart.text("START WORK");

      		progressbarRunner.css("background-image", "url('https://s3.eu-central-1.amazonaws.com/parperssonmattsson-freecodecamp-assets/pomodoro/img/stickman-repeat.gif')");

      		pomodoroWork = true;
      	};
      }, 1000);
  };
});
});