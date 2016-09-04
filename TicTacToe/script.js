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

var playerFunction = setCellToX;
var computerFunction = setCellToO;
var computerMoveMode = randomComputerMove;
var computerVictories = 0;
var playerVictories = 0;

$(document).ready(function() {

	$(".button_switch").click(function() {
		var tmp = playerFunction;
		playerFunction = computerFunction;
		computerFunction = tmp;
		if (playerFunction === setCellToX) {
			$(this).text("PLAY AS O");
		} else {
			$(this).text("PLAY AS X");
		}
		resetGame();
		if (playerFunction === setCellToO){
			computerMoveMode(computerFunction);
		}
	});

	$(".button_reset").click(function() {
		resetGame();
	});

	$('.tictactoe_cell').click(function() {
		playerFunction($(this).attr('id'));
		if (checkThreeInARow()) {
			console.log("Player won!");
			playerVictories++;
			resetGame();
			return;
		}
		computerMoveMode(computerFunction);
		if (checkThreeInARow()) {
			console.log("Computer won!");
			computerVictories++;
			resetGame();
			return;
		}
	});

});

function randomComputerMove (moveFunction) {
	var keys = Object.keys(playField);
	var freeSpaces = [];
	console.log(keys);
	for (var i = 0; i < keys.length; i++) {
		if (playField[keys[i]] === "") {
			freeSpaces.push(keys[i]);
		}
	}
	console.log(freeSpaces);
	moveFunction(freeSpaces[Math.floor((Math.random() * freeSpaces.length))]);
}

function setCellToX (cellID) {
	console.log(cellID);
	playField[cellID] = "X";
	//$("#"+cellID).css("background-color", "black")
	$("#"+cellID).text("X");
}

function setCellToO (cellID) {
	console.log(cellID);
	playField[cellID] = "O";
	//$("#"+cellID).css("background-color", "purple")
	$("#"+cellID).text("O");
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

function resetGame () {
	playField = {
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
	$("#playerVictories").text("PLAYER: " + playerVictories);
	$("#computerVictories").text("COMPUTER: " + computerVictories);

	for (var i = 1; i <= 3; i++) {
		for (var j = 1; j <= 3; j++) {
			$("#cell" + i + j).text("");
		}
	}

}
