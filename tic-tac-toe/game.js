let curPlayer = GameSymbol.O;
let done = false;
const board = [
    [GameSymbol.None, GameSymbol.None, GameSymbol.None],
    [GameSymbol.None, GameSymbol.None, GameSymbol.None],
    [GameSymbol.None, GameSymbol.None, GameSymbol.None]
];
const ia = new IA(board, curPlayer == GameSymbol.X ? GameSymbol.O : GameSymbol.X);
const boardChecker = new BoardChecker(board);

function setup() {
    const canvas = createCanvas(600, 600);
    canvas.mousePressed(mousePressedAction);
    background(155);
    const gridLineWidth = 12;

    fill(200);
    noStroke();

    rect(width / 3 * 1 - gridLineWidth/2, 0, gridLineWidth, height);
    rect(width / 3 * 2 - gridLineWidth/2, 0, gridLineWidth, height);
    
    rect(0, height / 3 * 1 - gridLineWidth/2, width, gridLineWidth);
    rect(0, height / 3 * 2 - gridLineWidth/2, width, gridLineWidth);
}

function draw() {
}

function mousePressedAction() {
    if (done)
        return location.reload();

    var x = Math.floor(mouseX / Math.floor(width/3));
    var y = Math.floor(mouseY / Math.floor(height/3));

    if (board[x][y] != GameSymbol.None)
        return;

    board[x][y] = curPlayer;
    drawMove(x, y, curPlayer);

    if (checkWinner())
        return;

    const aiMove = ia.nextPlay();
    if (aiMove == null)
        return;
    
    board[aiMove.x][aiMove.y] = ia.player;
    drawMove(aiMove.x, aiMove.y, ia.player);
    
    if (checkWinner())
        return;
}

function drawMove(x, y, player) {
    if (player == GameSymbol.X)
      drawX(x, y);
    else
      drawO(x, y);
}

function checkWinner() {
    var state = boardChecker.check(board);
    if (state == BoardState.X)
        setTimeout(() => alert("X won!"), 30);
    else if (state == BoardState.O)
        setTimeout(() => alert("O won!"), 30);
    else if (state == BoardState.Draw)
        setTimeout(() => alert("Draw!"), 30);

    if (state != BoardState.NotFinished) {
        done = true;
        return true;
    }
}

function drawO(x, y) {
    const chunkX = width / 3;
    const chunkY = height / 3;
    fill(255);
    stroke(255);
    strokeWeight(20);
    circle(chunkX/2 + chunkX*x, chunkY/2 + chunkY*y, 150);
    fill(155);
    circle(chunkX/2 + chunkX*x, chunkY/2 + chunkY*y, 145);
}

function drawX(x, y) {
    fill(255);
    strokeWeight(30);
    stroke(255);
    const chunkX = width / 3;
    const chunkY = height / 3;
    const chunkX2 = chunkX/2 + chunkX*x; 
    const chunkY2 = chunkY/2 + chunkY*y;
    const size = 70;
    line(chunkX2 - size, chunkY2 - size, chunkX2 + size, chunkY2 + size);
    line(chunkX2 + size, chunkY2 - size, chunkX2 - size, chunkY2 + size);
}

class Coord {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
