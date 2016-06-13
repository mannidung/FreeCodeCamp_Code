var playField = {
	"cell11": "",
	"cell12": "",
	"cell13": "",
	"cell21": "",
	"cell22": "",
	"cell23": "",
	"cell31": "",
	"cell32": "",
	"cell33": ""
};

$(document).ready(function() {
	
	$('.tictactoe_cell').click(function() {
		setCellToX($(this).attr('id'));
		if (checkThreeInARow()) {
			console.log("Player won!");
			return;
		}
		computerMove();
		if (checkThreeInARow()) {
			console.log("Computer won!");
			return;
		}
	});

});

function computerMove () {
	var i = Math.floor((Math.random() * 3) + 1);
	var j = Math.floor((Math.random() * 3) + 1);
	while (playField["cell" + i + j] != "") {
		i = Math.floor((Math.random() * 3) + 1);
		j = Math.floor((Math.random() * 3) + 1);
	}
	setCellToO("cell" + i + j);
}

function setCellToX (cellID) {
	console.log(cellID);
	playField[cellID] = "X";
	$("#"+cellID).css("background-color", "black")
}

function setCellToO (cellID) {
	console.log(cellID);
	playField[cellID] = "O";
	$("#"+cellID).css("background-color", "purple")
}

function checkThreeInARow () {
	var baseString = "cell";
	var checkString = "";

	// Check horizontal
	for (var i = 1; i <= 3; i++) {
		for (var j = 1; j <= 3; j++) {
			checkString += playField["cell" + i + j];
		}
		console.log(checkString);
		if (checkString === "XXX" || checkString === "OOO") {
			return true;
		}
		checkString = "";
	}

	// Check vertical
	checkString = "";
	for (var j = 1; j <= 3; j++) {
		for (var i = 1; i <= 3; i++) {
			checkString += playField["cell" + i + j];
		}
		console.log(checkString);
		if (checkString === "XXX" || checkString === "OOO") {
			return true;
		}
		checkString = "";
	}

	// Check diagonal
	checkString = "";
	checkString = playField["cell11"] + playField["cell22"] + playField["cell33"];
	if (checkString === "XXX" || checkString === "OOO") {
		return true;
	}
	checkString = playField["cell31"] + playField["cell22"] + playField["cell13"];
	if (checkString === "XXX" || checkString === "OOO") {
		return true;
	}


	return false;
}