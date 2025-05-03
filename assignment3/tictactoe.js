new Vue({
  el: '#app',
  data: {
    board: [["", "", ""], ["", "", ""], ["", "", ""]],
    player: 'X',
    computer: 'O',
    gameOver: false
  },
  methods: {
    playerMove(i, j) {
      if (this.board[i][j] === '' && !this.gameOver) {
        this.$set(this.board[i], j, this.player);
        if (!this.checkWin(this.player)) {
          this.computerMove();
        }
      }
    },

    computerMove() {
      let bestMove = this.minimax(this.board, this.computer).move;
      if (bestMove && !this.gameOver) {
        this.$set(this.board[bestMove.i], bestMove.j, this.computer);
        this.checkWin(this.computer);
      }
    },

    checkWin(player) {
      const b = this.board;
      const lines = [
        ...b,
        [b[0][0], b[1][0], b[2][0]],
        [b[0][1], b[1][1], b[2][1]],
        [b[0][2], b[1][2], b[2][2]],
        [b[0][0], b[1][1], b[2][2]],
        [b[0][2], b[1][1], b[2][0]],
      ];
      if (lines.some(line => line.every(cell => cell === player))) {
        this.gameOver = true;
        return true;
      }
      return false;
    },

    resetGame() {
      this.board = [["", "", ""], ["", "", ""], ["", "", ""]];
      this.gameOver = false;
    },

    isFull(board) {
      return board.every(row => row.every(cell => cell !== ''));
    },

    minimax(board, currentPlayer) {
      if (this.checkWinner(board, this.computer)) {
        return { score: 1 };
      } else if (this.checkWinner(board, this.player)) {
        return { score: -1 };
      } else if (this.isFull(board)) {
        return { score: 0 };
      }

      let bestMove;
      let bestScore = (currentPlayer === this.computer) ? -Infinity : Infinity;

      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] === '') {
            board[i][j] = currentPlayer;
            let score = this.minimax(board, (currentPlayer === this.computer) ? this.player : this.computer).score;
            board[i][j] = '';

            if (currentPlayer === this.computer) {
              if (score > bestScore) {
                bestScore = score;
                bestMove = { i, j };
              }
            } else {
              if (score < bestScore) {
                bestScore = score;
                bestMove = { i, j };
              }
            }
          }
        }
      }
      return { score: bestScore, move: bestMove };
    },

    checkWinner(board, player) {
      const lines = [
        ...board,
        [board[0][0], board[1][0], board[2][0]],
        [board[0][1], board[1][1], board[2][1]],
        [board[0][2], board[1][2], board[2][2]],
        [board[0][0], board[1][1], board[2][2]],
        [board[0][2], board[1][1], board[2][0]],
      ];
      return lines.some(line => line.every(cell => cell === player));
    }
  }
});

