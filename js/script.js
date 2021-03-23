"use strict"

/*----------Board data-----------------*/

const board = [
	null, 00, null, 01, null, 02, null, 03,
	04, null, 05, null, 06, null, 07, null,
	null, 08, null, 09, null, 10, null, 11,
	null, null, null, null, null, null, null, null,
	null, null, null, null, null, null, null, null,
	12, null, 13, null, 14, null, 15, null,
	null, 16, null, 17, null, 18, null, 19,
	20, null, 21, null, 22, null, 23, null

]

/*-------------DOM references--------------*/
const cells = document.querySelectorAll("td");
let white = document.querySelectorAll("p");
let black = document.querySelectorAll("div");
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
			white[i].addEventListener("click", getPlayerShashki)
		}
	} else {
		for (let i = 0; i < black.length; i++) {
			black[i].addEventListener("click", getPlayerShashki)
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

function removeCellonclick() {
	for (let i = 0; i < cells.length; i++) {
		cells[i].removeAttribute("onclick");
	}
}






























































Listeners();