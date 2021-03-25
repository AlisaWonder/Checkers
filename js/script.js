

/*----------Board data-----------------*/

const board = [
	null, 0, null, 1, null, 2, null, 3,
	4, null, 5, null, 6, null, 7, null,
	null, 8, null, 9, null, 10, null, 11,
	null, null, null, null, null, null, null, null,
	null, null, null, null, null, null, null, null,
	12, null, 13, null, 14, null, 15, null,
	null, 16, null, 17, null, 18, null, 19,
	20, null, 21, null, 22, null, 23, null

]

/*Variables*/
let findPiece = function (pieceId) {
	let parsed = parseInt(pieceId);
	return board.indexOf(parsed);
}

/*-------------DOM references--------------*/
const cells = document.querySelectorAll("td");
let white = document.querySelectorAll(".white");
let black = document.querySelectorAll(".black");
const whiteTurn = document.querySelectorAll(".white-turn");
const blackTurn = document.querySelectorAll(".black-turn");

/*-------------Player properties-----------------*/
let turn = true;
let whiteScore = 12;
let blackScore = 12;
let playerShashki;

let selectedShashki = {
	pieceId: -1,
	indexOfBoardPiece: -1,
	isKing: false,
	seventhSpace: false,
	ninthSpace: false,
	fourteenthSpace: false,
	eighteenthSpace: false,
	minusSeventhSpace: false,
	minusNinthSpace: false,
	minusFourteenthSpace: false,
	minusEighteenthSpace: false
}

//listeners for shashki

function Listeners() {
	if (turn) {
		for (let i = 0; i < white.length; i++) {
			white[i].addEventListener("click", getPlayerShashki);
		}
	} else {
		for (let i = 0; i < black.length; i++) {
			black[i].addEventListener("click", getPlayerShashki);
		}
	}
}

function getPlayerShashki() {
	if (turn) {
		playerShashki = white;
	} else {
		playerShashki = black;
	}
	removeCellonclick();
	resetBorders();
}

//to reselect
function removeCellonclick() {
	for (let i = 0; i < cells.length; i++) {
		cells[i].removeAttribute("onclick");
	}
}

function resetBorders() {
	for (let i = 0; i < playerShashki.length; i++) {
		playerShashki[i].style.border = "1px solid white";
	}
	resetSelectedShashkiProperties();
	getSelectedShashki();
}

function resetSelectedShashkiProperties() {
	selectedShashki.pieceId = -1;
	selectedShashki.indexOfBoardPiece = -1;
	selectedShashki.isKing = false;
	selectedShashki.seventhSpace = false;
	selectedShashki.ninthSpace = false;
	selectedShashki.fourteenthSpace = false;
	selectedShashki.eighteenthSpace = false;
	selectedShashki.minusSeventhSpace = false;
	selectedShashki.minusNinthSpace = false;
	selectedShashki.minusFourteenthSpace = false;
	selectedShashki.minusEighteenthSpace = false;
}

//gets ID as a string and than convert it to the number and then get index of the board cell its on

function getSelectedShashki() {
	selectedShashki.pieceId = parseInt(event.target.id);
	selectedShashki.indexOfBoardPiece = findPiece(selectedShashki.pieceId);
	isPieceKing();
}

/*-----checks if it's king------*/
function isPieceKing() {
	if (document.getElementById(selectedShashki.pieceId).classList.contains("king")) {
		selectedShashki.isKing = true;

	} else {
		selectedShashki.isKing = false;
		console.log("here");
	}
	getAvailableSpaces(); //analyzes the surrounding cells that a piece can make without jumping another piece
}

/* analyzes the surrounding cells to move without jumping*/
function getAvailableSpaces() {
	if (board[selectedShashki.indexOfBoardPiece + 7] === null &&
		cells[selectedShashki.indexOfBoardPiece + 7].classList.contains("noPieceHere") !== true) {
		selectedShashki.seventhSpace = true;
	}
	if (board[selectedShashki.indexOfBoardPiece + 9] === null &&
		cells[selectedShashki.indexOfBoardPiece + 9].classList.contains("noPieceHere") !== true) {
		selectedShashki.ninthSpace = true;
	}
	if (board[selectedShashki.indexOfBoardPiece - 7] === null &&
		cells[selectedShashki.indexOfBoardPiece - 7].classList.contains("noPieceHere") !== true) {
		selectedShashki.minusSeventhSpace = true;
	}
	if (board[selectedShashki.indexOfBoardPiece - 9] === null &&
		cells[selectedShashki.indexOfBoardPiece - 9].classList.contains("noPieceHere") !== true) {
		selectedShashki.minusNinthSpace = true;
	}
	checkAvailableJumpSpaces();
}

/* analyzes the surrounding cells to move with jumping*/
function checkAvailableJumpSpaces() {
	if (turn) {
		if (board[selectedShashki.indexOfBoardPiece + 14] === null
			&& cells[selectedShashki.indexOfBoardPiece + 14].classList.contains("nothingHere") !== true
			&& board[selectedShashki.indexOfBoardPiece + 7] >= 12) {
			selectedShashki.fourteenthSpace = true;
		}
		if (board[selectedShashki.indexOfBoardPiece + 18] === null
			&& cells[selectedShashki.indexOfBoardPiece + 18].classList.contains("nothingHere") !== true
			&& board[selectedShashki.indexOfBoardPiece + 9] >= 12) {
			selectedShashki.eighteenthSpace = true;
		}
		if (board[selectedShashki.indexOfBoardPiece - 14] === null
			&& cells[selectedShashki.indexOfBoardPiece - 14].classList.contains("nothingHere") !== true
			&& board[selectedShashki.indexOfBoardPiece - 7] >= 12) {
			selectedShashki.minusFourteenthSpace = true;
		}
		if (board[selectedShashki.indexOfBoardPiece - 18] === null
			&& cells[selectedShashki.indexOfBoardPiece - 18].classList.contains("nothingHere") !== true
			&& board[selectedShashki.indexOfBoardPiece - 9] >= 12) {
			selectedShashki.minusEighteenthSpace = true;
		}
	} else {
		if (board[selectedShashki.indexOfBoardPiece + 14] === null
			&& cells[selectedShashki.indexOfBoardPiece + 14].classList.contains("nothingHere") !== true
			&& board[selectedShashki.indexOfBoardPiece + 7] < 12 && board[selectedShashki.indexOfBoardPiece + 7] !== null) {
			selectedShashki.fourteenthSpace = true;
		}
		if (board[selectedShashki.indexOfBoardPiece + 18] === null
			&& cells[selectedShashki.indexOfBoardPiece + 18].classList.contains("nothingHere") !== true
			&& board[selectedShashki.indexOfBoardPiece + 9] < 12 && board[selectedShashki.indexOfBoardPiece + 9] !== null) {
			selectedShashki.eighteenthSpace = true;
		}
		if (board[selectedShashki.indexOfBoardPiece - 14] === null && cells[selectedShashki.indexOfBoardPiece - 14].classList.contains("nothingHere") !== true
			&& board[selectedShashki.indexOfBoardPiece - 7] < 12
			&& board[selectedShashki.indexOfBoardPiece - 7] !== null) {
			selectedShashki.minusFourteenthSpace = true;
		}
		if (board[selectedShashki.indexOfBoardPiece - 18] === null && cells[selectedShashki.indexOfBoardPiece - 18].classList.contains("nothingHere") !== true
			&& board[selectedShashki.indexOfBoardPiece - 9] < 12
			&& board[selectedShashki.indexOfBoardPiece - 9] !== null) {
			selectedShashki.minusEighteenthSpace = true;
		}
	}
	checkPieceConditions();
}

/*restricts movement if the piece is king*/
function checkPieceConditions() {
	if (selectedShashki.isKing) {
		givePieceBorder();
	} else {
		if (turn) {
			selectedShashki.minusSeventhSpace = false;
			selectedShashki.minusNinthSpace = false;
			selectedShashki.minusFourteenthSpace = false;
			selectedShashki.minusEighteenthSpace = false;
		} else {
			selectedShashki.seventhSpace = false;
			selectedShashki.ninthSpace = false;
			selectedShashki.fourteenthSpace = false;
			selectedShashki.eighteenthSpace = false;
		}
		givePieceBorder();
	}

}

function givePieceBorder() {
	if (selectedShashki.seventhSpace || selectedShashki.ninthSpace || selectedShashki.fourteenthSpace || selectedShashki.eighteenthSpace
		|| selectedShashki.minusSeventhSpace || selectedShashki.minusNinthSpace || selectedShashki.minusFourteenthSpace || selectedShashki.minusEighteenthSpace) {
		document.getElementById(selectedShashki.pieceId).style.border = "3px solid green";
		giveCellsClick();
	} else {
		return;
	}
}

function giveCellsClick() {
	if (selectedShashki.seventhSpace) {
		cells[selectedShashki.indexOfBoardPiece + 7].setAttribute("onclick", "makeMove(7)");
	}
	if (selectedShashki.ninthSpace) {
		cells[selectedShashki.indexOfBoardPiece + 9].setAttribute("onclick", "makeMove(9)");
	}
	if (selectedShashki.fourteenthSpace) {
		cells[selectedShashki.indexOfBoardPiece + 14].setAttribute("onclick", "makeMove(14)");
	}
	if (selectedShashki.eighteenthSpace) {
		cells[selectedShashki.indexOfBoardPiece + 18].setAttribute("onclick", "makeMove(18)");
	}
	if (selectedShashki.minusSeventhSpace) {
		cells[selectedShashki.indexOfBoardPiece - 7].setAttribute("onclick", "makeMove(-7)");
	}
	if (selectedShashki.minusNinthSpace) {
		cells[selectedShashki.indexOfBoardPiece - 9].setAttribute("onclick", "makeMove(-9)");
	}
	if (selectedShashki.minusFourteenthSpace) {
		cells[selectedShashki.indexOfBoardPiece - 14].setAttribute("onclick", "makeMove(-14)");
	}
	if (selectedShashki.minusEighteenthSpace) {
		cells[selectedShashki.indexOfBoardPiece - 18].setAttribute("onclick", "makeMove(-18)");
	}
}

function makeMove(number) {
	document.getElementById(selectedShashki.pieceId).remove();
	cells[selectedShashki.indexOfBoardPiece].innerHTML = "";
	if (turn) {
		if (selectedShashki.isKing) {
			cells[selectedShashki.indexOfBoardPiece + number].innerHTML = `<p class = "white king" id = "${selectedShashki.pieceId}"></p>`;
			white = document.querySelectorAll(".white");
		} else {
			cells[selectedShashki.indexOfBoardPiece + number].innerHTML = `<p class = "white" id = "${selectedShashki.pieceId}"></p>`;
			white = document.querySelectorAll(".white");
		}
	} else {
		if (selectedShashki.isKing) {
			cells[selectedShashki.indexOfBoardPiece + number].innerHTML = `<div class = "black black-king" id = "${selectedShashki.pieceId}"></div>`;
			black = document.querySelectorAll(".black");
		} else {
			cells[selectedShashki.indexOfBoardPiece + number].innerHTML = `<div class = "black" id = "${selectedShashki.pieceId}"></div>`;
			black = document.querySelectorAll(".black");
		}
	}

	let indexOfShashki = selectedShashki.indexOfBoardPiece
	if (number === 14 || number === -14 || number === 18 || number === -18) {
		changeData(indexOfShashki, indexOfShashki + number, indexOfShashki + number / 2);
	} else {
		changeData(indexOfShashki, indexOfShashki + number);
	}
}


//change back end board data
function changeData(indexOfBoardPiece, modifiedIndex, removePiece) {
	board[indexOfBoardPiece] = null; //selected piece that we move no longer exist in the previus position
	board[modifiedIndex] = parseInt(selectedShashki.pieceId); // new position where new id
	if (turn && selectedShashki.pieceId < 12 && modifiedIndex >= 57) {
		document.getElementById(selectedShashki.pieceId).classList.add("king");
		console.log("я дамка");
	}
	if (turn === false && selectedShashki.pieceId >= 12 && modifiedIndex <= 7) {
		document.getElementById(selectedShashki.pieceId).classList.add("king");
		console.log("я дамка");
	}

	if (removePiece) {
		board[removePiece] = null;
		if (turn && selectedShashki.pieceId < 12) {
			cells[removePiece].innerHTML = "";
			blackScore--
		}
		if (turn === false && selectedShashki.pieceId >= 12) {
			cells[removePiece].innerHTML = "";
			whiteScore--
		}
	}
	resetSelectedShashkiProperties();
	removeCellonclick();
	removeEventListener();
}

function removeEventListener() {
	if (turn) {
		for (let i = 0; i < white.length; i++) {
			white[i].removeEventListener("click", getPlayerShashki);
		}
	} else {
		for (let i = 0; i < black.length; i++) {
			black[i].removeEventListener("click", getPlayerShashki);
		}
	}
	checkForWin();
}

function checkForWin() {
	if (blackScore === 0) {
		whiteTurn[0].style.color = "black";
		blackTurn[0].style.display = "none";
		whiteTurn[0].textContent = "White wins";
	}
	else if (whiteScore === 0) {
		blackTurn[0].style.color = "black";
		whiteTurn[0].style.display = "none";
		blackTurn[0].textContent = "Black wins";
	}
	console.log("дошли до checkforwin");
	changePlayer();
}

function changePlayer() {
	if (turn) {
		turn = false;
		whiteTurn[0].style.color = "grey";
		blackTurn[0].style.color = "white";
	} else {
		turn = true;
		blackTurn[0].style.color = "grey";
		whiteTurn[0].style.color = "white";
	}
	Listeners();
}
Listeners();