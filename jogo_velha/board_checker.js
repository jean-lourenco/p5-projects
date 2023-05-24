class BoardChecker {
    constructor(board) {
        this.board = board;
    }

    check() {
      if (this.#checkIfWon(GameSymbol.X)) return BoardState.X;
      if (this.#checkIfWon(GameSymbol.O)) return BoardState.O;
      if (this.#allSlotsFilled()) return BoardState.Draw;
      return BoardState.NotFinished;
    }
    
    #checkIfWon(cur) {
      return(board[0][0] == cur && board[1][0] == cur && board[2][0] == cur) ||
        (board[0][1] == cur && board[1][1] == cur && board[2][1] == cur) ||
        (board[0][2] == cur && board[1][2] == cur && board[2][2] == cur) ||
        (board[0][0] == cur && board[0][1] == cur && board[0][2] == cur) ||
        (board[1][0] == cur && board[1][1] == cur && board[1][2] == cur) ||
        (board[2][0] == cur && board[2][1] == cur && board[2][2] == cur) ||
        (board[0][0] == cur && board[1][1] == cur && board[2][2] == cur) ||
        (board[2][0] == cur && board[1][1] == cur && board[0][2] == cur);
    }
    
    #allSlotsFilled() {
      for (let x = 0; x < 3; x++)
        for (let y = 0; y < 3; y++)
          if (board[x][y] == GameSymbol.None)
            return false;
            
      return true;
    }
  }