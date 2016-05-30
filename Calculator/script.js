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
		fullDisplayArr = [];
		updateDisplay(fullDisplayArr);
	});

	// Equals button
	$(".equals-button").click(function() {
		fullDisplayArr.push(displayArr[0]);
		fullDisplayArr = parseAndReturnValue(fullDisplayArr);
		updateDisplay(fullDisplayArr);
	});	
});

function parseAndReturnValue(arrayToParse) {
	shuntingYard(arrayToParse);
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

function shuntingYard(calculatorArray) {
	var operatorPrecedence = {
		"x": 2,
		"/": 2,
		"+": 1,
		"-": 1
	};
	var output = [];
	var operators = [];
	console.log(calculatorArray);
	var numTokens = calculatorArray.length;
	for (var i = 0; i < numTokens; i++) {
		var thisToken = calculatorArray.shift();
		
		if ($.isNumeric(thisToken)) {
			output.push(thisToken);
		} else { // Token is operator
			console.log(operatorPrecedence[thisToken]);
			console.log(operatorPrecedence[operators[0]]);
			while (operators.length > 1 && operatorPrecedence[thisToken] <= operatorPrecedence[operators[operators.length - 1]]) {
				output.push(operators.pop());
			}
			operators.push(thisToken);
		}
	}
	var numOperators = operators.length;
	for (var i = 0; i < numOperators; i++) {
		output.push(operators.pop());
	}
};