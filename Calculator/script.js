$(document).ready(function() {
	
	// Set string of display
	updateFullDisplay([0]);
	updateDisplay([0]);

	var fullDisplayArr = [];
	var displayArr = [];

	// Click of button that changes full string
	$(".operator-button").click(function() {
		// Add what is currently shown in lower row if it is a number
		if ($.isNumeric(displayArr[0])) {
			fullDisplayArr.push(displayArr.join(""));
		}

		// Make sure that two operators can't be added after another
		var operator = $(this).html();
		if (isOperator(fullDisplayArr[fullDisplayArr.length - 1])) {
			fullDisplayArr.pop();
		}

		fullDisplayArr.push($(this).html());
		updateFullDisplay(fullDisplayArr);

		// Reset lower row
		displayArr = [];
		updateDisplay(displayArr);
	});

	// Click of button that changes full string
	$(".number-button").click(function() {
		// Avoid too long numbers
		if (displayArr.length < 11) {
			if ($(this).html() === "." && displayArr.indexOf('.') > -1) {
				return;
			}
			displayArr.push($(this).html());
			updateDisplay(displayArr);	
		}
		
		//console.log(displayArr);
	});

	// Clear button
	$(".clear-button").click(function() {
		fullDisplayArr = [];
		displayArr = [];
		// Update displays with 0
		updateFullDisplay([0]);
		updateDisplay([0]);
	});

	// Equals button
	$(".equals-button").click(function() {
		fullDisplayArr.push(displayArr.join(""));
		//console.log(displayArr);
		//console.log(fullDisplayArr);
		displayArr = parseAndReturnValue(fullDisplayArr.slice(0)); // Send in a clone to keep value of fullDisplayArr
		updateFullDisplay(fullDisplayArr);
		updateDisplay(displayArr);
		fullDisplayArr = [];
		displayArr = [];
	});	
});

function parseAndReturnValue(arrayToParse) {
	return postfixAlg(shuntingYard(arrayToParse));
};

function updateFullDisplay(fullDisplayArr) {
	$("#display-fullstring").text(fullDisplayArr.join(""));
};

function updateDisplay(displayArr) {
	$("#display-current").text(displayArr.join(""));
};

function isOperator(character) {
	if (character === "+" || character === "-" || character === "/" || character === "x") {
		return true;
	} else {
		return false;
	}
}

function postfixAlg(inputArr) {
	var stack = [];
	while(inputArr.length > 0) {
		var currentItem = inputArr.shift();
		if ($.isNumeric(currentItem)) {
			stack.push(currentItem);
		} else {
			var result = 0;
			var arg1 = Number(stack.pop());
			var arg2 = Number(stack.pop());
			switch(currentItem) {
				case "+":
				result = arg2 + arg1;
				break;
				case "-":
				result = arg2 - arg1;
				break;
				case "x":
				result = arg2 * arg1;
				break;
				case "/":
				result = arg2 / arg1;
				break;
				default:
				result = 0;
			}
			stack.push(result);
		}
	}
	return stack;
};

function shuntingYard(calculatorArray) {
	console.log("ShuntingYard input: " + calculatorArray);
	var operatorPrecedence = {
		"x": 2,
		"/": 3,
		"+": 1,
		"-": 1
	};
	var output = [];
	var operators = [];
	var numTokens = calculatorArray.length;
	for (var i = 0; i < numTokens; i++) {
		var thisToken = calculatorArray.shift();
		
		if ($.isNumeric(thisToken)) {
			output.push(thisToken);
		} else { // Token is operator
			if (operators.length > 0) {
				console.log(operatorPrecedence[thisToken]);
				console.log(operatorPrecedence[operators[0]]);
				while (operators.length >= 1 && operatorPrecedence[thisToken] < operatorPrecedence[operators[operators.length - 1]]) {
					output.push(operators.pop());
				}
			}
			
			operators.push(thisToken);
		}
	}
	var numOperators = operators.length;
	for (var i = 0; i < numOperators; i++) {
		output.push(operators.pop());
	}
	console.log("shuntingYard output: " + output);
	return output;
};