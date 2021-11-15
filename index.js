const selectBoard = document.querySelector("#app");
const gameTypeButton = document.querySelector(".type");
let gameType = "solo";
gameTypeButton.textContent = gameType;
gameTypeButton.addEventListener("click",()=>{
	if(gameType == "solo"){
		gameType = "1VS1";
	} else if (gameType == "1VS1"){
		gameType = "solo";
	}
	gameTypeButton.textContent = gameType;
})
let board = [0,1,2,3,4,5,6,7,8];
let origboard = [0,1,2,3,4,5,6,7,8];
let availableMoves = [];

const huPlayer = 'O';
const aiPlayer = 'X';
let turn = "";
let itIsaWin = [];
const winCombos = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2]
]
let moves = []
let aimoves = []
let win;
let aiWin;
function reDraw(){
	let drawBlock = createEl("div","drawBlock","block--aiWin");
	let msg = createEl("div","drawBlock--msg");
	msg.textContent = "AI WIN";
	drawBlock.append(msg);
	selectBoard.append(drawBlock);
	drawBlock.addEventListener("click",()=>{
		itIsaWin = [];
		turn = "";
		availableMoves = [];
		selectBoard.innerHTML = "";
		moves = []
		aimoves = []
		board = [0,1,2,3,4,5,6,7,8];
		renderBoard();
	})
}
function checkWin(i) {
	console.log(`insideCheck ${turn}`)
	availableMoves = board.filter(Number.isInteger)
	if(turn=="O")
	{moves.push(i);}
	console.log("aimoves:",aimoves,"moves:",moves,"availableMoves:",availableMoves);
	winCombos.forEach((combo,i)=>{
		win = combo.every(win=> moves.includes(win));
		aiWin = combo.every(win=> aimoves.includes(win))
		if(win){	
			itIsaWin = winCombos[i]
			itIsaWin.forEach((index)=>{
				document.querySelectorAll(".block")[index].classList.add("win")
			})
			let drawBlock = createEl("div","drawBlock","block--win");
			let msg = createEl("div","drawBlock--msg");
			msg.textContent = "WIN";
			drawBlock.append(msg);
			selectBoard.append(drawBlock);
			drawBlock.addEventListener("click",()=>{
				itIsaWin = [];
				turn = "";
				availableMoves = [];
				selectBoard.innerHTML = "";
				moves = []
				aimoves = []
				board = [0,1,2,3,4,5,6,7,8];
				renderBoard();
			})
		}
		if(aiWin){
			itIsaWin = winCombos[i]
			itIsaWin.forEach((index)=>{
				document.querySelectorAll(".block")[index].classList.add("aiwin")
			})
			let drawBlock = createEl("div","drawBlock","block--aiWin");
			let msg = createEl("div","drawBlock--msg");
			msg.textContent = "AI WIN";
			drawBlock.append(msg);
			selectBoard.append(drawBlock);
			drawBlock.addEventListener("click",()=>{
				itIsaWin = [];
				turn = "";
				availableMoves = [];
				selectBoard.innerHTML = "";
				moves = []
				aimoves = []
				board = [0,1,2,3,4,5,6,7,8];
				renderBoard();
			})
		}

	})
	if(!availableMoves.length && !itIsaWin.length && !win && !aiWin){
		console.log("draw")
		let drawBlock = createEl("div","drawBlock");
		let msg = createEl("div","drawBlock--msg");
		msg.textContent = "DRAW";
		drawBlock.append(msg);
		selectBoard.append(drawBlock);
		drawBlock.addEventListener("click",()=>{
			itIsaWin = [];
			turn = "";
			availableMoves = [];
			selectBoard.innerHTML = "";
			moves = []
			aimoves = []
			board = [0,1,2,3,4,5,6,7,8];
			renderBoard();
		})
	}
}
function drawMark(square,i){
	square.addEventListener("click",()=>{
		if(!isNaN(board[i]) && turn == "X" || turn == ""){
			square.textContent = huPlayer;
			console.log(board)
			board[i]=huPlayer;
			turn = "O"
			console.log(`first ${turn}`)
			checkWin(i)
			if(gameType == "solo" && availableMoves.length>0 && !itIsaWin.length){
				console.log(`second ${turn}`,availableMoves)
				let nextmove = (availableMoves[0])
				aimoves.push(board[nextmove])
				document.querySelectorAll(".block")[nextmove].textContent = aiPlayer;
				board[nextmove]=aiPlayer;
				console.log(board)
				turn = "X"
				checkWin(i)
		}
		}
		if(gameType == "1VS1"){
			if(!isNaN(board[i]) && turn == "O"){
			square.textContent = aiPlayer;
			board[i]=aiPlayer;
			turn = "X"
			checkWin(i)
		}
	}


	})
}



function createEl(el, elClass, elId){
	let element = document.createElement(el);
	element.classList = elClass;
	if(elId){
		element.id = elId;
	}
	return element;
}
function renderBoard(element){
	
	console.log(availableMoves)
	board.forEach((element, index)=>{
		const newIndex = index+1;
		let newBlock = createEl("div","block", newIndex);
		selectBoard.append(newBlock);
		drawMark(newBlock, index);
	})
}

renderBoard()