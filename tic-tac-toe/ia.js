class IA {
    constructor(board, player, strategy) {
        this.board = board;
        this.player = player;
        this.strategy = strategy != null ? strategy : new RandomStrategy(board, player);
    }

    nextPlay() {
        return this.strategy.nextPlay();
    }
}

class RandomStrategy {
    constructor(board, player) {
        this.board = board;
        this.player = player;
    }

    nextPlay() {
        let x, y, i = 0;
        
        do {
            x = getRndInteger(0, 3);
            y = getRndInteger(0, 3);
        } while (board[x][y] != GameSymbol.None && i++ < 20);
        
        if (i >= 20)
            return null;
        
        return new Coord(x, y);
    }
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}