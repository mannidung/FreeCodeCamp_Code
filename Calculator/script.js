$(document).ready(function() {
	
	// Set string of display
	updateFullDisplay([0]);
	updateDisplay([0]);

	var fullDisplayArr = [];
	var displayArr = [];

	// Click of button that changes full string
	$(".operator-button").click(function() {
		console.log($(this).html());

		// Add what is currently shown in lower row
		fullDisplayArr.push(displayArr.join(""));

		fullDisplayArr.push($(this).html());
		updateFullDisplay(fullDisplayArr);

		// Reset lower row
		displayArr = [];
		updateDisplay(displayArr);
	});

	// Click of button that changes full string
	$(".number-button").click(function() {
		console.log($(this).html());
		displayArr.push($(this).html());
		updateDisplay(displayArr);
	});

	// Clear button
	$(".clear-button").click(function() {
		fullDisplayArr = [0];
		updateDisplay(fullDisplayArr);
	});

	// Equals button
	$(".equals-button").click(function() {
		fullDisplayArr = parseAndReturnValue(fullDisplayArr);
		updateDisplay(fullDisplayArr);
	});	
});

function parseAndReturnValue(arrayToParse) {
	if (arrayToParse === [0]) {
		console.log("String is 0");
		return [3];
	} else {
		for (var i = arrayToParse.length - 1; i >= 0; i--) {
			arrayToParse[i];
		}
		return[9999];
	}
};

function updateFullDisplay(fullDisplayArr) {
	//while(displayString[0] === '0') {
	//	displayString = displayString.substr(1);
	//}
	$("#display-fullstring").text(fullDisplayArr.join(""));
};

function updateDisplay(displayArr) {
	//while(displayString[0] === '0') {
	//	displayString = displayString.substr(1);
	//}
	$("#display-current").text(displayArr.join(""));
};